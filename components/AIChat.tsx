
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { gemini } from '../services/geminiService';
import { UI_STRINGS } from '../constants';

interface AIChatProps {
  currentCode: string;
}

const AIChat: React.FC<AIChatProps> = ({ currentCode }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMsg: ChatMessage = { role: 'user', content: input, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    const aiResponse = await gemini.chat(input, currentCode);
    
    setIsTyping(false);
    const aiMsg: ChatMessage = { role: 'assistant', content: aiResponse, timestamp: Date.now() };
    setMessages(prev => [...prev, aiMsg]);
  };

  return (
    <div className="w-80 h-full bg-[#1e1e1e] border-l border-[#2b2b2b] flex flex-col shadow-2xl">
      <div className="p-4 border-b border-[#2b2b2b] flex items-center justify-between">
        <h2 className="text-sm font-semibold flex items-center gap-2">
          <i className="fas fa-robot text-purple-400"></i>
          Gemini Assistant
        </h2>
        <span className="text-[10px] bg-purple-900/30 text-purple-300 px-2 py-0.5 rounded-full border border-purple-800">PRO</span>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center p-4 text-gray-500 space-y-4 opacity-60">
            <i className="fas fa-wand-magic-sparkles text-4xl"></i>
            <p className="text-sm">I can help you debug, refactor, or explain your code. Just ask!</p>
            <div className="text-xs space-y-2 w-full">
                <button onClick={() => setInput("Explain this code")} className="w-full p-2 border border-[#333] rounded hover:bg-[#2a2a2a]">"Explain this code"</button>
                <button onClick={() => setInput("Refactor for performance")} className="w-full p-2 border border-[#333] rounded hover:bg-[#2a2a2a]">"Refactor for performance"</button>
            </div>
          </div>
        )}
        
        {messages.map((m, i) => (
          <div key={i} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
            <div className={`max-w-[90%] p-3 rounded-xl text-sm ${
              m.role === 'user' 
                ? 'bg-[#007acc] text-white rounded-tr-none' 
                : 'bg-[#2d2d2d] text-gray-200 rounded-tl-none border border-[#3d3d3d]'
            }`}>
              <div className="whitespace-pre-wrap leading-relaxed">{m.content}</div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex items-start">
            <div className="bg-[#2d2d2d] p-3 rounded-xl rounded-tl-none border border-[#3d3d3d]">
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-[#2b2b2b] bg-[#1a1a1a]">
        <div className="relative group">
          <textarea
            className="w-full bg-[#252526] border border-[#333] rounded-lg p-3 pr-10 text-sm focus:outline-none focus:border-purple-500 transition-all resize-none h-24"
            placeholder={UI_STRINGS.chatPlaceholder}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="absolute bottom-3 right-3 text-gray-500 hover:text-purple-400 disabled:opacity-30 transition-colors"
          >
            <i className="fas fa-paper-plane"></i>
          </button>
        </div>
        <div className="mt-2 text-[10px] text-center text-gray-600">
            Powered by Google AI Studio • Gemini 3.0 Pro
        </div>
      </div>
    </div>
  );
};

export default AIChat;
