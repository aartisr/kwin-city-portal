import React, { useState, useRef, useEffect } from "react";
import { ChatMessage } from "../types";
import { Send, Bot, User, RefreshCw, AlertCircle, Sparkles } from "lucide-react";

export default function AIAssistant() {
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
      // Build history for API
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
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An unexpected error occurred. Please verify your API Key setup.");
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
        id: "m-init",
        role: "assistant",
        content: "Hello! I am your **KWIN Civic Guide**, powered by Gemini. I am grounded in verified project timelines, institutional partnerships, and local discourse. \n\nHow can I help you navigate the verified facts, plans, and ongoing community discussions regarding KWIN City today?",
        createdAt: new Date().toISOString()
      }
    ]);
    setError(null);
    setIsLoading(false);
  };

  // Helper to parse basic markdown (**bold** and \n linebreaks)
  const parseMessageContent = (content: string) => {
    return content.split("\n").map((line, lineIdx) => {
      // Simple bold replacements (**text**)
      const parts = [];
      let currentString = line;
      let boldMatch;
      
      const boldRegex = /\*\*(.*?)\*\*/g;
      let lastIndex = 0;

      while ((boldMatch = boldRegex.exec(line)) !== null) {
        // Add preceding text
        if (boldMatch.index > lastIndex) {
          parts.push(<React.Fragment key={`text-${lastIndex}`}>{line.substring(lastIndex, boldMatch.index)}</React.Fragment>);
        }
        // Add bolded text
        parts.push(<strong key={`bold-${boldMatch.index}`} className="font-bold text-slate-900">{boldMatch[1]}</strong>);
        lastIndex = boldRegex.lastIndex;
      }

      if (lastIndex < line.length) {
        parts.push(<React.Fragment key={`text-${lastIndex}`}>{line.substring(lastIndex)}</React.Fragment>);
      }

      // Check for bullet lists
      if (line.trim().startsWith("- ") || line.trim().startsWith("* ")) {
        return (
          <li key={lineIdx} className="ml-4 list-disc text-slate-700 text-[11px] leading-relaxed my-1">
            {parts.length > 0 ? parts : line.replace(/^[-*]\s+/, "")}
          </li>
        );
      }

      return (
        <p key={lineIdx} className="text-[11.5px] leading-relaxed text-slate-700 my-1">
          {parts.length > 0 ? parts : line}
        </p>
      );
    });
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col h-[520px] max-w-4xl mx-auto overflow-hidden" id="ai-assistant-container">
      {/* Assistant Header */}
      <div className="bg-slate-900 px-5 py-4 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="bg-emerald-600 p-1.5 rounded-lg text-white">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
              Gemini Civic Guide
              <span className="flex items-center gap-0.5 text-[9px] font-semibold bg-emerald-950 text-emerald-400 border border-emerald-900 px-1.5 py-0.2 rounded-full">
                <Sparkles className="w-2.5 h-2.5" />
                Fact-Checked
              </span>
            </h3>
            <p className="text-[10px] text-slate-400">Trained on official KWIN documents, KIADB gazettes and local studies</p>
          </div>
        </div>

        <button
          onClick={handleResetChat}
          title="Reset Conversation"
          className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-all cursor-pointer"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Suggestion Chips */}
      <div className="bg-slate-50 px-4 py-2.5 border-b border-slate-150 flex items-center gap-2 overflow-x-auto">
        <span className="text-[10px] font-bold text-slate-500 whitespace-nowrap">Suggested Inquiries:</span>
        <div className="flex gap-1.5">
          {suggestedPrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(p.text)}
              disabled={isLoading}
              className="text-[10px] bg-white border border-slate-250 text-slate-700 font-semibold px-2.5 py-1 rounded-full hover:bg-slate-50 hover:border-slate-350 transition-all whitespace-nowrap cursor-pointer disabled:opacity-50"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Messages Stream */}
      <div className="flex-1 p-5 overflow-y-auto bg-slate-50/40 flex flex-col gap-4">
        {messages.map((m) => {
          const isAssistant = m.role === "assistant";
          return (
            <div
              key={m.id}
              className={`flex gap-3 max-w-[85%] ${
                isAssistant ? "self-start" : "self-end flex-row-reverse"
              }`}
            >
              {/* Avatar */}
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border ${
                  isAssistant
                    ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                    : "bg-slate-900 text-slate-100 border-slate-800"
                }`}
              >
                {isAssistant ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
              </div>

              {/* Bubble */}
              <div
                className={`p-3.5 rounded-xl border ${
                  isAssistant
                    ? "bg-white border-slate-150 shadow-2xs"
                    : "bg-emerald-600 text-white border-emerald-500 shadow-2xs"
                }`}
              >
                {isAssistant ? (
                  <div className="prose prose-sm max-w-none text-slate-700 flex flex-col">
                    {parseMessageContent(m.content)}
                  </div>
                ) : (
                  <p className="text-[11.5px] leading-relaxed">{m.content}</p>
                )}
              </div>
            </div>
          );
        })}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex gap-3 self-start max-w-[85%]">
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-100 flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4 animate-bounce" />
            </div>
            <div className="p-3.5 rounded-xl bg-white border border-slate-150 shadow-2xs flex items-center gap-2">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
              </div>
              <span className="text-[10px] text-slate-400 italic">Guide is analyzing evidence...</span>
            </div>
          </div>
        )}

        {/* Error Notification */}
        {error && (
          <div className="bg-red-50 text-red-800 border border-red-200 p-3 rounded-lg flex items-start gap-2 max-w-lg mx-auto mt-2">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            <div className="text-[10.5px]">
              <span className="font-bold">Gemini API Connection Required: </span>
              {error}
              <div className="mt-1.5 text-slate-500 text-[10px]">
                Please configure your <span className="font-semibold text-slate-700">GEMINI_API_KEY</span> in the AI Studio Secrets panel.
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form onSubmit={handleFormSubmit} className="p-4 bg-white border-t border-slate-200 flex gap-2">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder={isLoading ? "Please wait while AI formulates a grounded response..." : "Ask about compensation, colleges, research, lakes, monorail..."}
          disabled={isLoading}
          className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-emerald-600 disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={isLoading || !userInput.trim()}
          className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white p-2 rounded-lg flex items-center justify-center transition-all cursor-pointer"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
