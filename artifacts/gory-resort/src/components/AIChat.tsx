import { useState, useRef, useEffect, useCallback } from 'react';
import { Bot, X, Send, RotateCcw, ChevronDown } from 'lucide-react';

type Role = 'user' | 'assistant';
type ModelName = 'openai' | 'gemini';

interface Message {
  id: string;
  role: Role;
  content: string;
  model?: ModelName;
  fallback?: boolean;
  error?: boolean;
}

const MODEL_LABEL: Record<ModelName, string> = {
  openai: 'GPT-4o mini',
  gemini: 'Gemini 1.5 Flash',
};

function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce"
          style={{ animationDelay: `${i * 0.15}s`, animationDuration: '0.9s' }}
        />
      ))}
    </div>
  );
}

export function AIChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [preferredModel, setPreferredModel] = useState<ModelName>('openai');
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // Focus input when panel opens
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 120);
  }, [open]);

  const sendMessage = useCallback(async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: text,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    // Build the history the API expects (exclude error messages)
    const history = [...messages, userMsg]
      .filter((m) => !m.error)
      .map(({ role, content }) => ({ role, content }));

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history, preferredModel }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error((data as { error?: string }).error ?? `HTTP ${res.status}`);
      }

      const data = (await res.json()) as {
        content: string;
        model: ModelName;
        fallback: boolean;
      };

      // If we got a successful fallback, remember the working model next time
      if (data.fallback) setPreferredModel(data.model);

      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: data.content,
          model: data.model,
          fallback: data.fallback,
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          content:
            err instanceof Error
              ? err.message
              : 'Что-то пошло не так. Попробуйте ещё раз.',
          error: true,
        },
      ]);
    } finally {
      setLoading(false);
    }
  }, [input, loading, messages, preferredModel]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([]);
    setInput('');
  };

  return (
    <>
      {/* ── Floating trigger ── */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Закрыть ассистента' : 'Открыть AI-ассистента'}
        className="fixed bottom-24 right-5 z-50 w-13 h-13 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-105 active:scale-95"
        style={{
          width: 52,
          height: 52,
          background: open
            ? 'hsl(var(--background))'
            : 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a78bfa 100%)',
          border: open ? '1px solid rgba(255,255,255,0.12)' : 'none',
          boxShadow: open
            ? 'none'
            : '0 4px 24px rgba(99,102,241,0.45), 0 0 0 1px rgba(99,102,241,0.2)',
        }}
      >
        {open ? (
          <ChevronDown className="w-5 h-5 text-white/70" />
        ) : (
          <Bot className="w-5 h-5 text-white" />
        )}
      </button>

      {/* ── Chat panel ── */}
      <div
        className="fixed z-40 flex flex-col overflow-hidden"
        style={{
          bottom: 86,
          right: 20,
          width: 'min(420px, calc(100vw - 24px))',
          height: 'min(580px, calc(100dvh - 110px))',
          background: 'hsl(var(--background))',
          border: '1px solid rgba(255,255,255,0.09)',
          borderRadius: 20,
          boxShadow: '0 24px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04)',
          transformOrigin: 'bottom right',
          transform: open ? 'scale(1) translateY(0)' : 'scale(0.92) translateY(16px)',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transition: 'transform 0.22s cubic-bezier(0.34,1.56,0.64,1), opacity 0.18s ease',
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-4 py-3 shrink-0"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}
        >
          <div className="flex items-center gap-2.5">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
              style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
            >
              <Bot className="w-3.5 h-3.5 text-white" />
            </div>
            <div>
              <p className="font-oxanium text-[13px] text-white leading-none tracking-tight">
                EstateofMind AI
              </p>
              <p className="font-space-grotesk text-[10px] text-white/35 mt-0.5">
                {MODEL_LABEL[preferredModel]}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {messages.length > 0 && (
              <button
                onClick={clearChat}
                title="Очистить чат"
                className="w-7 h-7 flex items-center justify-center rounded-lg text-white/35 hover:text-white/60 hover:bg-white/5 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            )}
            <button
              onClick={() => setOpen(false)}
              className="w-7 h-7 flex items-center justify-center rounded-lg text-white/35 hover:text-white/60 hover:bg-white/5 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center px-4">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)' }}
              >
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-oxanium text-[14px] text-white/80 mb-1.5">
                  Чем могу помочь?
                </p>
                <p className="font-space-grotesk text-[12px] text-white/35 leading-relaxed">
                  Спросите о покупке недвижимости за рубежом, ВНЖ, переводе средств или конкретных странах.
                </p>
              </div>
              <div className="flex flex-col gap-2 w-full mt-1">
                {[
                  'Как купить квартиру в Дубае?',
                  'Какие страны дают ВНЖ при покупке?',
                  'Как перевести деньги за рубеж легально?',
                ].map((q) => (
                  <button
                    key={q}
                    onClick={() => { setInput(q); setTimeout(() => inputRef.current?.focus(), 50); }}
                    className="text-left text-[11px] font-space-grotesk text-white/50 hover:text-white/80 px-3 py-2 rounded-xl transition-colors"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col gap-1 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className="max-w-[85%] px-3.5 py-2.5 font-space-grotesk text-[13px] leading-relaxed"
                style={{
                  borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                  background: msg.role === 'user'
                    ? 'linear-gradient(135deg, #6366f1 0%, #7c3aed 100%)'
                    : msg.error
                    ? 'rgba(239,68,68,0.12)'
                    : 'rgba(255,255,255,0.06)',
                  border: msg.error ? '1px solid rgba(239,68,68,0.2)' : 'none',
                  color: msg.error ? 'rgba(252,165,165,0.9)' : 'rgba(255,255,255,0.88)',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                }}
              >
                {msg.content}
              </div>
              {msg.role === 'assistant' && msg.model && (
                <span className="font-space-grotesk text-[10px] text-white/20 px-1">
                  {MODEL_LABEL[msg.model]}
                  {msg.fallback && ' · fallback'}
                </span>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex items-start">
              <div
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  borderRadius: '16px 16px 16px 4px',
                }}
              >
                <TypingDots />
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div
          className="shrink-0 px-3 pb-3 pt-2"
          style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
        >
          <div
            className="flex items-end gap-2 rounded-2xl px-3 py-2"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)' }}
          >
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Напишите сообщение…"
              rows={1}
              className="flex-1 bg-transparent resize-none outline-none font-space-grotesk text-[13px] text-white/80 placeholder:text-white/25 leading-relaxed"
              style={{ maxHeight: 120, overflowY: 'auto' }}
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || loading}
              className="shrink-0 w-8 h-8 rounded-xl flex items-center justify-center transition-all"
              style={{
                background: input.trim() && !loading
                  ? 'linear-gradient(135deg, #6366f1, #8b5cf6)'
                  : 'rgba(255,255,255,0.06)',
                opacity: !input.trim() || loading ? 0.4 : 1,
              }}
            >
              <Send className="w-3.5 h-3.5 text-white" />
            </button>
          </div>
          <p className="font-space-grotesk text-[10px] text-white/18 text-center mt-2">
            Enter — отправить · Shift+Enter — перенос строки
          </p>
        </div>
      </div>
    </>
  );
}
