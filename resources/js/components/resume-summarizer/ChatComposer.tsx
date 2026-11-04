import type { FormEvent } from 'react';

type ChatComposerProps = {
  prompt: string;
  setPrompt: (prompt: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  sendUserInput:  ( role: "user" | "agent") => Promise<void>; 
  canChat: boolean;
};

export default function ChatComposer({ prompt, setPrompt, onSubmit, sendUserInput,canChat }: ChatComposerProps) {
    
  return (
    <form onSubmit={onSubmit} className="mt-4">
      <label htmlFor="chat-prompt" className="sr-only">
        Ask a question about your resume
      </label>
      <div className="flex items-end gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm transition focus-within:border-violet-300 focus-within:ring-4 focus-within:ring-violet-50">
        <textarea
          id="chat-prompt"
          rows={1}
          disabled={!canChat}
          value={prompt}
          onChange={(event) => setPrompt(event.currentTarget.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' && !event.shiftKey) {
              event.preventDefault();
              event.currentTarget.form?.requestSubmit();
            }
          }}
          placeholder="Ask anything about your resume..."
          className={` ${!canChat ? 'cursor-not-allowed' : ''}
            max-h-28 min-h-10 flex-1 resize-y px-2 py-2 text-sm text-slate-700 outline-none placeholder:text-slate-400`}
        />
        <button
            onClick={async () => await sendUserInput("user")}
          type="submit"
          disabled={!prompt.trim() || !canChat}
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
  );
}