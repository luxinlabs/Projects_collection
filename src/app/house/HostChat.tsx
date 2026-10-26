"use client";

import { useEffect, useRef, type Dispatch, type SetStateAction } from "react";
import Link from "next/link";
import {
  getPresetAnswer,
  presetQuestions,
  type GuideSource,
} from "./faqContent";
import LuxinAvatar from "./LuxinAvatar";

export interface ChatTurn {
  role: "user" | "assistant";
  content: string;
  sources?: GuideSource[];
}
export const initialConversation: ChatTurn[] = [
  {
    role: "assistant",
    content:
      "Hi, I’m little Luxin, your guide to this castle of ideas. ☺\n\nChoose a question below to learn about Luxin’s story and work. Every answer is prewritten and runs right here on the page.",
  },
];

export default function HostChat({
  messages,
  setMessages,
}: {
  messages: ChatTurn[];
  setMessages: Dispatch<SetStateAction<ChatTurn[]>>;
}) {
  const end = useRef<HTMLDivElement>(null);
  useEffect(() => {
    end.current?.scrollIntoView({ block: "nearest" });
  }, [messages]);
  function select(id: string) {
    const item = getPresetAnswer(id);
    if (!item) return;
    setMessages((previous) => [
      ...previous.slice(-19),
      { role: "user", content: item.question },
      { role: "assistant", content: item.answer, sources: item.sources },
    ]);
  }
  return (
    <div className="host-chat">
      <div className="host-chat-person">
        <LuxinAvatar className="host-avatar host-avatar-portrait" />
        <div>
          <strong>Little Luxin</strong>
          <span>
            <i /> Your castle guide
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
        <div ref={end} />
      </div>
      <div className="host-preset-heading">
        <span>Choose a question</span>
        <button onClick={() => setMessages(initialConversation)}>
          Start over ↺
        </button>
      </div>
      <div
        className="host-preset-questions"
        aria-label="Preset questions about Luxin"
      >
        {presetQuestions.map((item) => (
          <button key={item.id} onClick={() => select(item.id)}>
            {item.question}
            <span>↗</span>
          </button>
        ))}
      </div>
      <p className="host-chat-note">
        Prewritten answers · Fully local · No AI calls or token usage
      </p>
    </div>
  );
}
