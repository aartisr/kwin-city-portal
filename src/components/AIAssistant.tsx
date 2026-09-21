import React, { useState, useRef, useEffect } from "react";
import { ChatMessage } from "../types";
import { Send, Bot, User, RefreshCw, AlertCircle, Sparkles, X } from "lucide-react";

interface AIAssistantProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function AIAssistant({ isOpen, onClose }: AIAssistantProps = {}) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "m-init",
      role: "assistant",
      content: "Hello! I am your **KWIN Civic Guide**, powered by Gemini. I am grounded in verified project timelines, institutional partnerships, and local discourse. \n\nHow can I help you navigate the verified facts, plans, and ongoing community discussions regarding KWIN City today?",
      createdAt: new Date().toISOString()
    }
  ]);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedPrompts = [
    { text: "What are the 4 districts of KWIN City?", label: "Districts" },
    { text: "Is the Tata IISc Medical School confirmed?", label: "Tata IISc" },
    { text: "What are the land disputes near Doddaballapur?", label: "Land Protests" },
    { text: "What water/lake plans are in the masterplan?", label: "Lake Rejuvenation" },
  ];

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  if (isOpen !== undefined && !isOpen) {
    return null;
  }

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    setError(null);
    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}-u`,
      role: "user",
      content: text,
      createdAt: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMsg]);
    setUserInput("");
    setIsLoading(true);

    try {
      const history = messages.map(m => ({
        role: m.role,
        content: m.content
      }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: text,
          history: history
        })
      });

      if (!response.ok) {
        throw new Error("Failed to get response from Gemini API backend.");
      }

      const data = await response.json();
      
      const assistantMsg: ChatMessage = {
        id: `msg-${Date.now()}-a`,
        role: "assistant",
        content: data.text || "I was unable to formulate a response. Please try again.",
        createdAt: new Date().toISOString()
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (err: unknown) {
      console.error("Chat error:", err);
      setError(err instanceof Error ? err.message : "Failed to connect to the assistant service.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(userInput);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: "m-init-reset",
        role: "assistant",
        content: "Conversation history has been cleared. How can I assist your research into KWIN City?",
        createdAt: new Date().toISOString()
      }
    ]);
    setError(null);
  };

  const parseMessageContent = (content: string) => {
    const lines = content.split('\n');
    return lines.map((line, lineIdx) => {
      const parts = [];
      let lastIdx = 0;
      const regex = /\*\*(.*?)\*\*/g;
      let match;
      
      while ((match = regex.exec(line)) !== null) {
        if (match.index > lastIdx) {
          parts.push(line.substring(lastIdx, match.index));
        }
        parts.push(
          <strong key={`${lineIdx}-${match.index}`} className="font-bold text-slate-900 dark:text-white">
            {match[1]}
          </strong>
        );
        lastIdx = regex.lastIndex;
      }
      
      if (lastIdx < line.length) {
        parts.push(line.substring(lastIdx));
      }

      return (
        <p key={lineIdx} className="text-[11.5px] leading-relaxed text-slate-800 dark:text-slate-200 my-1 font-normal">
          {parts.length > 0 ? parts : line}
        </p>
      );
    });
  };

  const assistantBody = (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col h-[540px] max-h-[85vh] w-full overflow-hidden" id="ai-assistant-container">
      {/* Assistant Header */}
      <div className="bg-slate-900 px-5 py-3.5 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="bg-emerald-600 p-1.5 rounded-lg text-white">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-white flex items-center gap-1.5 font-serif">
              Gemini Civic Guide
              <span className="flex items-center gap-0.5 text-[9px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800 px-1.5 py-0.2 rounded-full">
                <Sparkles className="w-2.5 h-2.5" />
                Fact-Checked
              </span>
            </h3>
            <p className="text-[10px] text-slate-400">Trained on verified KWIN gazettes, masterplans, and public hearings</p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={handleResetChat}
            title="Reset Conversation"
            className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-all cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          {onClose && (
            <button
              onClick={onClose}
              title="Close Guide"
              className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Suggestion Chips */}
      <div className="bg-slate-50 dark:bg-slate-950 px-4 py-2 border-b border-slate-200 dark:border-slate-800 flex items-center gap-2 overflow-x-auto">
        <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400 whitespace-nowrap">Suggested:</span>
        <div className="flex gap-1.5">
          {suggestedPrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(p.text)}
              disabled={isLoading}
              className="text-[10px] bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-bold px-2.5 py-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-all whitespace-nowrap cursor-pointer disabled:opacity-50 shadow-2xs"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Messages Stream */}
      <div className="flex-1 p-4 sm:p-5 overflow-y-auto bg-slate-50/50 dark:bg-slate-950/40 flex flex-col gap-3.5">
        {messages.map((m) => {
          const isAssistant = m.role === "assistant";
          return (
            <div
              key={m.id}
              className={`flex gap-3 max-w-[88%] ${
                isAssistant ? "self-start" : "self-end flex-row-reverse"
              }`}
            >
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border ${
                  isAssistant
                    ? "bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800"
                    : "bg-slate-900 text-white border-slate-800"
                }`}
              >
                {isAssistant ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
              </div>

              <div
                className={`p-3.5 rounded-2xl border ${
                  isAssistant
                    ? "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 shadow-2xs"
                    : "bg-emerald-700 text-white border-emerald-600 shadow-2xs"
                }`}
              >
                {isAssistant ? (
                  <div className="text-slate-800 dark:text-slate-200 flex flex-col">
                    {parseMessageContent(m.content)}
                  </div>
                ) : (
                  <p className="text-[11.5px] leading-relaxed font-medium">{m.content}</p>
                )}
              </div>
            </div>
          );
        })}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex gap-3 self-start max-w-[85%]">
            <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4 animate-bounce" />
            </div>
            <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs flex items-center gap-2">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
              </div>
              <span className="text-[10px] text-slate-500 font-medium">Guide is analyzing verified evidence...</span>
            </div>
          </div>
        )}

        {/* Error Notification */}
        {error && (
          <div className="bg-red-50 text-red-900 dark:bg-red-950/40 dark:text-red-200 border border-red-300 dark:border-red-800 p-3 rounded-xl flex items-start gap-2 max-w-lg mx-auto mt-2">
            <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
            <div className="text-[10.5px]">
              <span className="font-bold">Gemini API Notice: </span>
              {error}
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form onSubmit={handleFormSubmit} className="p-3.5 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex gap-2">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder={isLoading ? "Formulating verified response..." : "Ask about compensation, colleges, research, lakes, monorail..."}
          disabled={isLoading}
          className="flex-1 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-emerald-600 disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={isLoading || !userInput.trim()}
          className="bg-emerald-700 hover:bg-emerald-800 disabled:bg-slate-300 dark:disabled:bg-slate-800 text-white p-2.5 rounded-xl flex items-center justify-center transition-all cursor-pointer shadow-2xs"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );

  if (isOpen !== undefined) {
    return (
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-fadeIn"
        onClick={onClose}
      >
        <div className="w-full max-w-2xl" onClick={(e) => e.stopPropagation()}>
          {assistantBody}
        </div>
      </div>
    );
  }

  return assistantBody;
}
