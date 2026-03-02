"use client";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import {
  fetchUserTokensById,
  generateChatResponse,
  subtractTokens,
} from "../../utils/actions";
import toast from "react-hot-toast";
import { useAuth } from "@clerk/nextjs";

const Chat = () => {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const { userId } = useAuth();

  const { mutate, isPending } = useMutation({
    mutationFn: async (query) => {
      const currentTokens = await fetchUserTokensById(userId);
      if (currentTokens < 100) {
        toast.error("Token balance too low....");
        return;
      }
      const response = await generateChatResponse([...messages, query]);
      if (!response) {
        toast.error("Something went wrong....");
        return;
      }
      setMessages((prev) => [...prev, response.message]);
      const newTokens = await subtractTokens(userId, response.tokens);
      toast.success(`${newTokens} tokens remaining...`);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const query = { role: "user", content: text };
    setMessages((prev) => [...prev, query]);
    mutate(query);
    setText("");
  };

  return (
    <div className="min-h-full grid grid-rows-[1fr,auto]">
      <div>
        {messages.map(({ role, content }, index) => {
          const avatar = role === "user" ? "👤" : "🤖";
          const bcg = role === "user" ? "bg-base-200" : "bg-base-100";
          return (
            <div
              key={index}
              className={`${bcg} py-6 -mx-8 px-8 text-xl leading-loose border-b border-base-300`}>
              <span className="mr-4">{avatar}</span>
              <p className="max-w-3xl">{content}</p>
            </div>
          );
        })}
        {isPending && <span className="loading"></span>}
      </div>
      <form onSubmit={handleSubmit} className="max-w-4xl pt-18">
        <div className="join w-full">
          <input
            type="text"
            placeholder="Message GeniusGPT"
            value={text}
            required
            onChange={(e) => setText(e.target.value)}
            className="input input-bordered w-full join-item"
          />
          <button
            type="submit"
            disabled={isPending}
            className="join-item btn btn-primary capitalize">
            {isPending ? "please wait" : "ask question"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chat;
