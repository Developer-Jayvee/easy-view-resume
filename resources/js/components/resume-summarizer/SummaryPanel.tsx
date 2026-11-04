import { useState, type Dispatch, type FormEvent, type SetStateAction } from 'react';
import type { DocumentsData } from '@/pages/HomePage.js';
import ChatComposer from './ChatComposer.js';
import ChatMessages, { type ChatMessage } from './ChatMessages.js';
import DocumentSelector from './DocumentSelector.js';
import SummaryHeader from './SummaryHeader.js';



type SummaryPanelProps = {
  documents: DocumentsData[];
  viewDocument: (id: string) => Promise<void>;
  sendUserInput:  (prompt: string, role: "user" | "agent") => Promise<void>; 
  canChat: boolean;
  messages: ChatMessage[],
  setMessages: Dispatch<SetStateAction<ChatMessage[]>>;
  isStreaming: boolean;
  isFetching: boolean;
  error: string|null;

};

export default function SummaryPanel({
    documents,
    viewDocument,
    sendUserInput,
    canChat,
    messages,
    setMessages,
    isFetching,
    isStreaming,
    error
}: SummaryPanelProps) {
    const [prompt, setPrompt] = useState("");

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const userPrompt = prompt.trim();

        if (!userPrompt) {
            return;
        }

        setMessages((currentMessages) => [
            ...currentMessages,
            { id: Date.now(), role: "user", content: userPrompt },
        ]);
        setPrompt("");
    }

    return (
        <section className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-[0_12px_40px_-24px_rgba(30,41,59,0.25)] sm:p-6">
            <SummaryHeader />
            <DocumentSelector
                documents={documents}
                viewDocument={viewDocument}
            />
            <ChatMessages {...{
              messages, isFetching , isStreaming, error
            }}/>
            <ChatComposer
                {...{
                    prompt,
                    setPrompt,
                    onSubmit: handleSubmit,
                    sendUserInput: async (role) =>
                        await sendUserInput(prompt, role),
                    canChat,
                    error
                }}
            />
        </section>
    );
}
