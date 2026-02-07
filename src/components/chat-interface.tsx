"use client";

import { useChat } from "ai/react";
import { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

export function ChatInterface() {
    const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
        initialMessages: [
            {
                id: "welcome",
                role: "assistant",
                content: "I am BrainMate. State your objective.",
            },
        ],
    });
    
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <div className="w-full max-w-4xl mx-auto h-[85vh] flex flex-col bg-card/50 backdrop-blur-xl border border-border/50 rounded-2xl shadow-2xl overflow-hidden">
            {/* Header */}
            <header className="p-4 border-b border-white/10 flex items-center gap-3 bg-black/20">
                <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-400">
                    <Terminal size={20} />
                </div>
                <div>
                    <h1 className="text-sm font-semibold tracking-wide text-white">BRAINMATE</h1>
                    <p className="text-xs text-muted-foreground">DSA Mentor & Interviewer</p>
                </div>
            </header>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
                <AnimatePresence initial={false}>
                    {messages.map((message) => (
                        <motion.div
                            key={message.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className={cn(
                                "flex gap-4 max-w-[85%]",
                                message.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                            )}
                        >
                            <div
                                className={cn(
                                    "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                                    message.role === "user"
                                        ? "bg-white text-black"
                                        : "bg-indigo-500/20 text-indigo-400"
                                )}
                            >
                                {message.role === "user" ? <User size={16} /> : <Bot size={16} />}
                            </div>
                            <div
                                className={cn(
                                    "p-4 rounded-xl text-sm leading-relaxed whitespace-pre-wrap",
                                    message.role === "user"
                                        ? "bg-white text-black rounded-tr-none"
                                        : "bg-white/5 text-white/90 rounded-tl-none border border-white/5"
                                )}
                            >
                                {message.content}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {isLoading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex gap-4 max-w-[85%] mr-auto"
                    >
                        <div className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
                            <Bot size={16} />
                        </div>
                        <div className="flex items-center gap-1.5 p-4 rounded-xl bg-white/5 rounded-tl-none border border-white/5">
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce" />
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce delay-100" />
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce delay-200" />
                        </div>
                    </motion.div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/10 bg-black/20">
                <form onSubmit={handleSubmit} className="relative flex items-end gap-2">
                    <input
                        value={input}
                        onChange={handleInputChange}
                        placeholder="Type your solution or question..."
                        className="w-full bg-white/5 border border-white/10 focus:border-indigo-500/50 rounded-xl px-4 py-3 pr-12 text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-indigo-500/20 transition-all font-mono"
                    />
                    <button
                        type="submit"
                        disabled={!input.trim() || isLoading}
                        className="absolute right-2 top-2 p-1.5 rounded-lg bg-indigo-500 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-600 transition-colors"
                    >
                        <Send size={16} />
                    </button>
                </form>
            </div>
        </div>
    );
}
