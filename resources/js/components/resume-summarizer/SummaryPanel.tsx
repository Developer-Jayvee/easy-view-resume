import { useState, type FormEvent } from 'react';
import type { DocumentsData } from '@/pages/HomePage.js';
import ChatComposer from './ChatComposer.js';
import ChatMessages, { type ChatMessage } from './ChatMessages.js';
import DocumentSelector from './DocumentSelector.js';
import SummaryHeader from './SummaryHeader.js';

const initialMessages: ChatMessage[] = [
  {
    id: 1,
    role: 'assistant',
    content:
      'Hi! I’m your resume assistant. Ask me to highlight strengths, explain experience, or suggest improvements.',
  },
];

type SummaryPanelProps = {
  documents: DocumentsData[];
  viewDocument: (id: string) => Promise<void>;
  sendUserInput:  (prompt: string, role: "user" | "agent") => Promise<void>; 
  canChat: boolean;
};

export default function SummaryPanel({ documents, viewDocument, sendUserInput, canChat }: SummaryPanelProps) {
  
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
          <SummaryHeader />
          <DocumentSelector documents={documents} viewDocument={viewDocument} />
          <ChatMessages messages={messages} />
          <ChatComposer
              {...{
                  prompt,
                  setPrompt,
                  onSubmit: handleSubmit,
                  sendUserInput: async (role) => await sendUserInput(prompt, role),
                  canChat,
              }}
          />
      </section>
  );
}
