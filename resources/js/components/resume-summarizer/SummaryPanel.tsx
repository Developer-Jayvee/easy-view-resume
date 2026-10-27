import { useState, type FormEvent } from 'react';
import { DocumentIcon, SparkleIcon } from './icons.js';

type ChatMessage = {
  id: number;
  role: 'assistant' | 'user';
  content: string;
};

const initialMessages: ChatMessage[] = [
  {
    id: 1,
    role: 'assistant',
    content:
      'Hi! I’m your resume assistant. Ask me to highlight strengths, explain experience, or suggest improvements.',
  },
];

export default function SummaryPanel() {
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState(initialMessages);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const userPrompt = prompt.trim();

    if (!userPrompt) {
      return;
    }

    setMessages((currentMessages) => [
      ...currentMessages,
      { id: Date.now(), role: 'user', content: userPrompt },
      {
        id: Date.now() + 1,
        role: 'assistant',
        content:
          'This is a sample response. Once connected to your resume, I can help answer that and point out relevant experience.',
      },
    ]);
    setPrompt('');
  }

  return (
    <section className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-[0_12px_40px_-24px_rgba(30,41,59,0.25)] sm:p-6">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-semibold text-slate-900">Resume assistant</h2>
            <span className="rounded-full bg-amber-50 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-amber-700">
              Demo
            </span>
          </div>
          <p className="mt-1 text-sm text-slate-500">Ask a question about your document.</p>
        </div>
        <span className="flex items-center gap-2 rounded-full bg-emerald-50 px-2.5 py-1.5 text-[11px] font-semibold text-emerald-700">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Ready to chat
        </span>
      </div>

      <div className="mb-4 flex min-w-0 items-center gap-2 rounded-xl border border-slate-100 bg-slate-50 px-3 py-2.5">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-violet-600 shadow-sm">
          <DocumentIcon className="h-4 w-4" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-semibold text-slate-700">Alex Morgan — Resume.pdf</p>
          <p className="text-[10px] text-slate-400">Sample document</p>
        </div>
        <span className="rounded-full bg-emerald-100 px-2 py-1 text-[10px] font-semibold text-emerald-700">Attached</span>
      </div>

      <div
        aria-live="polite"
        aria-label="Chat messages"
        className="flex min-h-75 flex-col gap-4 overflow-y-auto rounded-2xl border border-slate-100 bg-[#fafaff] p-4 sm:min-h-95 sm:p-5"
      >
        <p className="text-center text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
          Today
        </p>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-end gap-2.5 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {message.role === 'assistant' && (
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-violet-600 text-white">
                <SparkleIcon />
              </span>
            )}
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-6 ${
                message.role === 'user'
                  ? 'rounded-br-md bg-violet-600 text-white'
                  : 'rounded-bl-md border border-slate-100 bg-white text-slate-600 shadow-sm'
              }`}
            >
              {message.content}
            </div>
            {message.role === 'user' && (
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-200 text-[10px] font-bold text-slate-600">
                JD
              </span>
            )}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="mt-4">
        <label htmlFor="chat-prompt" className="sr-only">
          Ask a question about your resume
        </label>
        <div className="flex items-end gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm transition focus-within:border-violet-300 focus-within:ring-4 focus-within:ring-violet-50">
          <textarea
            id="chat-prompt"
            rows={1}
            value={prompt}
            onChange={(event) => setPrompt(event.currentTarget.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault();
                event.currentTarget.form?.requestSubmit();
              }
            }}
            placeholder="Ask anything about your resume..."
            className="max-h-28 min-h-10 flex-1 resize-y px-2 py-2 text-sm text-slate-700 outline-none placeholder:text-slate-400"
          />
          <button
            type="submit"
            disabled={!prompt.trim()}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-600 text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
            aria-label="Send message"
          >
            <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="h-5 w-5">
              <path d="M3 10 17 3l-4.5 14-2.2-5.3L3 10Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
              <path d="m10.3 11.7 3.2-3.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <p className="mt-2 text-center text-[10px] text-slate-400">
          Sample chat only · Press Enter to send, Shift + Enter for a new line
        </p>
      </form>
    </section>
  );
}
