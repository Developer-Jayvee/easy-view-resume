import { SparkleIcon } from './icons.js';

export type ChatMessage = {
  id: number;
  role: 'assistant' | 'user';
  content: string;
};

type ChatMessagesProps = {
  messages: ChatMessage[];
};

export default function ChatMessages({ messages }: ChatMessagesProps) {
  return (
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
  );
}