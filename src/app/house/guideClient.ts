import {
  answerFromWebsite,
  type GuideAnswer,
  type GuideMessage,
} from "./knowledge";

export function chatPayload(messages: GuideMessage[]) {
  const trimmed = messages
    .slice(-12)
    .map(({ role, content }) => ({ role, content: content.slice(0, 2000) }));
  const encoder = new TextEncoder();
  while (
    trimmed.length > 1 &&
    encoder.encode(JSON.stringify({ messages: trimmed })).length > 22000
  )
    trimmed.shift();
  return JSON.stringify({ messages: trimmed });
}

export async function requestGuideReply(
  messages: GuideMessage[],
  signal: AbortSignal,
  fetcher: typeof fetch = fetch,
  timeoutMs = 22000,
): Promise<GuideAnswer> {
  const last = messages[messages.length - 1];
  if (!last || last.role !== "user") throw new Error("Please send a question.");
  const local = () => answerFromWebsite(last.content, messages.slice(0, -1));
  const controller = new AbortController();
  const cancel = () => controller.abort();
  if (signal.aborted) cancel();
  else signal.addEventListener("abort", cancel, { once: true });
  const timeout = setTimeout(cancel, timeoutMs);
  try {
    let response: Response;
    try {
      response = await fetcher("/api/host", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: chatPayload(messages),
        signal: controller.signal,
      });
    } catch {
      if (signal.aborted)
        throw new DOMException("Chat was closed.", "AbortError");
      return local();
    }
    if (signal.aborted)
      throw new DOMException("Chat was closed.", "AbortError");
    if (
      response.status === 404 ||
      response.status === 405 ||
      response.status >= 500
    )
      return local();
    let result: Partial<GuideAnswer> & { error?: string };
    try {
      result = await response.json();
    } catch {
      if (signal.aborted)
        throw new DOMException("Chat was closed.", "AbortError");
      if (response.status === 429)
        throw new Error(
          "Let’s take a little breather. Please try again in a minute.",
        );
      return local();
    }
    if (signal.aborted)
      throw new DOMException("Chat was closed.", "AbortError");
    if (!response.ok)
      throw new Error(
        result.error || "Something interrupted our chat. Please try again.",
      );
    if (
      typeof result.text !== "string" ||
      !["ai", "guide"].includes(result.mode || "")
    )
      return local();
    return {
      text: result.text,
      sources: Array.isArray(result.sources) ? result.sources : [],
      mode: result.mode!,
    };
  } finally {
    clearTimeout(timeout);
    signal.removeEventListener("abort", cancel);
  }
}
