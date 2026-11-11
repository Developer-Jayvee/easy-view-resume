import { useEffect, useRef, useState } from 'react';
import PageFooter from '../components/resume-summarizer/PageFooter.js';
import PageIntro from '../components/resume-summarizer/PageIntro.js';
import SummaryPanel from '../components/resume-summarizer/SummaryPanel.js';
import UploadPanel from '../components/resume-summarizer/UploadPanel.js';
import axios from 'axios';
import useUploadDocument from '@/features/documents/hooks/useUploadDocument.js';
import useDocuments from '@/features/documents/hooks/useDocument.js';
import usePrompt from '@/features/prompt/hooks/usePrompt.js';
import useStreamChat from '@/features/stream/hooks/useStreamChat.js';
import type { ChatMessage } from '@/components/resume-summarizer/ChatMessages.js';

export interface ConversationData {
    id: string;
    title: string;
    description: string | null;
    summary: string | null;
    last_message_summary_id: string | null;
    document_id: string | null;
}
export interface DocumentsData {
  id : string;
  fileName : string;
  fileType: string;
  fileUrl: string;
  fileSize: string;
  status: string;
  conversation: ConversationData|null;
}

const initialMessages: ChatMessage[] = [
  // {
  //   id: 1,
  //   role: 'assistant',
  //   content:
  //     'Hi! I’m your resume assistant. Ask me to highlight strengths, explain experience, or suggest improvements.',
  // },
];


export default function HomePage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedDocument,setSelectedDocument] = useState<DocumentsData|null>(null);
  const [documents,setDocuments] = useState<DocumentsData[]>([]);
  const { uploadDocument } = useUploadDocument()
  const { getDocuments, showDocument } = useDocuments()
  const { storeUserPrompt } = usePrompt()
  const [messages, setMessages] = useState(initialMessages);
  const [streamMessage,setStreamMessage] = useState<string>("");
  const streamMessageRef = useRef<string>("");
  const [streamError,setStreamError] = useState<string|null>(null);
  const {
      send: sendAgentChat,
      isStreaming,
      isFetching,
  } = useStreamChat({
      onErrorCallback: (error: Error) => {
          if(error.message) {
            setStreamError(error.message)
          }
      },
      onDataCallback: (data) => {
          streamMessageRef.current += data;
          setStreamMessage(streamMessageRef.current);
      },
      onFinishCallback: () => {
          try {
              setMessages((currentMessages) => [
                  ...currentMessages,
                  {
                      id: Date.now() + 1,
                      role: "assistant",
                      content: streamMessage,
                  },
              ]);
          } catch(error: any) {
              if( error instanceof Error) {
                setStreamError(error.message)
              }
          }
          finally {
              streamMessageRef.current = "";
              setStreamMessage("");
          }
      },
  });
  
  const setDocumentList = async () => {
    const data = await getDocuments();
    setDocuments(data?.data ?? [])
  }
  const viewDocument = async (id: string) => {
      if (id === "") {
          setSelectedDocument(null);
          return;
      }
      const data = await showDocument(id);
      setSelectedDocument(data?.data ?? null);
  };
  const uploadUserDocument = async (selectedFile: File | null) => {
    const data = await uploadDocument(selectedFile);
    if(data) {
      await getDocuments();
      await setDocumentList()
    }
  }
  const sendUserInput = async (prompt: string, role: "user" | "agent") => {
    
    if(! selectedDocument) return;
    const params = {
        chat: prompt,
        document_id: selectedDocument?.id,
        convo_id: selectedDocument.conversation?.id ?? null,
    };
    const response = await storeUserPrompt(params);
    const data = response?.data;
    if(data) {
      sendAgentChat({
        ...params,
        chat: data?.content,
        convo_id: data?.conversation_id
      })
    }
      
  }


  useEffect(() => {
    setDocumentList()
  },[])
  
  return (
    <main className="min-h-screen bg-[#f7f8fc] px-4 py-5 text-slate-900 sm:px-7 sm:py-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <PageIntro />

        <div className="grid items-start gap-5 lg:grid-cols-[minmax(280px,0.82fr)_minmax(0,1.65fr)] lg:gap-6">
          <UploadPanel {...{ 
            onFileSelect:(file) => { setSelectedFile(file) },
            selectedFile,
            uploadDocument: uploadUserDocument,
           }} />
          <SummaryPanel {...{ 
            documents,
            viewDocument,
            sendUserInput,
            canChat: selectedDocument !== null,
            messages,
            setMessages,
            isFetching,
            isStreaming,
            error: streamError
           }}/>
        </div>

        <PageFooter />
      </div>
    </main>
  );
}