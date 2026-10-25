"use client";

import {
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type FormEvent,
  type SetStateAction,
} from "react";
import Link from "next/link";
import type { GuideSource } from "./knowledge";
import { requestGuideReply } from "./guideClient";

export interface ChatTurn {
  role: "user" | "assistant";
  content: string;
  sources?: GuideSource[];
  mode?: "guide" | "ai";
}
export const initialConversation: ChatTurn[] = [
  {
    role: "assistant",
    content:
      "Hi, I’m little Luxin, your virtual guide to this little world. ☺\n\nThe real Luxin is a Software / AI Engineer and researcher who loves turning ambitious ideas into useful things. Ask me about the projects, papers, awards, or the person behind them. Make yourself at home!",
    mode: "guide",
  },
];
const suggestions = [
  "Tell me about Luxin",
  "What does Luxin research?",
  "Show me the award-winning projects",
  "How can I connect?",
];

export default function HostChat({
  messages,
  setMessages,
}: {
  messages: ChatTurn[];
  setMessages: Dispatch<SetStateAction<ChatTurn[]>>;
}) {
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const end = useRef<HTMLDivElement>(null);
  const controller = useRef<AbortController>();
  const mounted = useRef(true);
  const inFlight = useRef(false);
  const field = useRef<HTMLInputElement>(null);
  useEffect(() => {
    end.current?.scrollIntoView({ block: "nearest" });
  }, [messages, busy]);
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      controller.current?.abort();
    };
  }, []);

  async function send(question: string) {
    if (inFlight.current || !question.trim()) return;
    inFlight.current = true;
    const content = question.trim();
    const questionTurn: ChatTurn = { role: "user", content };
    const conversation: ChatTurn[] = [...messages, questionTurn];
    setMessages(conversation);
    setInput("");
    setError("");
    setBusy(true);
    controller.current = new AbortController();
    try {
      const result = await requestGuideReply(
        conversation,
        controller.current.signal,
      );
      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          content: result.text,
          sources: result.sources,
          mode: result.mode,
        },
      ]);
    } catch (reason) {
      setMessages((previous) =>
        previous[previous.length - 1] === questionTurn
          ? previous.slice(0, -1)
          : previous,
      );
      if (mounted.current && (reason as Error).name !== "AbortError") {
        setError((reason as Error).message);
        setInput(content);
      }
    } finally {
      inFlight.current = false;
      controller.current = undefined;
      if (mounted.current) {
        setBusy(false);
        requestAnimationFrame(() => {
          if (mounted.current) field.current?.focus();
        });
      }
    }
  }
  function submit(event: FormEvent) {
    event.preventDefault();
    void send(input);
  }

  return (
    <div className="host-chat">
      <div className="host-chat-person">
        <span className="host-avatar">☺</span>
        <div>
          <strong>Little Luxin</strong>
          <span>
            <i />{" "}
            {[...messages]
              .reverse()
              .find((message) => message.role === "assistant")?.mode === "ai"
              ? "AI website guide"
              : "Website guide"}
          </span>
        </div>
        <Link href="/bio">Read my bio ↗</Link>
      </div>
      <div
        className="host-chat-messages"
        role="log"
        aria-label="Conversation with little Luxin"
        aria-live="polite"
        aria-relevant="additions"
      >
        {messages.map((message, index) => (
          <div
            key={index}
            className={`host-message host-message-${message.role}`}
          >
            <span className="message-author">
              {message.role === "user" ? "You" : "Little Luxin"}
            </span>
            <p>{message.content}</p>
            {!!message.sources?.length && (
              <div className="message-sources">
                {message.sources.map((source) => (
                  <a key={source.href} href={source.href}>
                    {source.title} ↗
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
        {busy && (
          <div className="host-thinking" role="status">
            <span />
            <span />
            <span />
            <span className="sr-only">Little Luxin is thinking…</span>
          </div>
        )}
        <div ref={end} />
      </div>
      {messages.length < 3 && (
        <div className="host-suggestions">
          {suggestions.map((question) => (
            <button
              key={question}
              disabled={busy}
              onClick={() => void send(question)}
            >
              {question} ↗
            </button>
          ))}
        </div>
      )}
      {error && (
        <p role="alert" className="chat-error">
          {error}
        </p>
      )}
      <form onSubmit={submit} className="host-chat-form">
        <label htmlFor="host-question" className="sr-only">
          Ask little Luxin about the website
        </label>
        <input
          ref={field}
          id="host-question"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Ask me something…"
          maxLength={2000}
          autoComplete="off"
          disabled={busy}
        />
        <button
          type="submit"
          disabled={busy || !input.trim()}
          aria-label="Send message"
        >
          ↗
        </button>
      </form>
      <p className="host-chat-note">
        A virtual guide grounded in this website. This chat doesn’t send
        messages to Luxin.
      </p>
    </div>
  );
}
