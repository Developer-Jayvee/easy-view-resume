import { useEffect, useState } from 'react';
import PageFooter from '../components/resume-summarizer/PageFooter.js';
import PageIntro from '../components/resume-summarizer/PageIntro.js';
import SummaryPanel from '../components/resume-summarizer/SummaryPanel.js';
import UploadPanel from '../components/resume-summarizer/UploadPanel.js';
import axios from 'axios';
import useUploadDocument from '@/features/documents/hooks/useUploadDocument.js';
import useDocuments from '@/features/documents/hooks/useDocument.js';

export interface DocumentsData {
  id : string;
  fileName : string;
  fileType: string;
  fileUrl: string;
  fileSize: string;
  status: string;
}
export default function HomePage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedDocument,setSelectedDocument] = useState<DocumentsData|null>(null);
  const [documents,setDocuments] = useState<DocumentsData[]>([]);
  const { uploadDocument } = useUploadDocument()
  const { getDocuments, showDocument } = useDocuments()
  const setDocumentList = async () => {
    const data = await getDocuments();
    setDocuments(data?.data ?? [])
  }
  const viewDocument = async  (id : string) => {
      const data = await showDocument(id);
      
      if(data) setSelectedDocument(data?.data ?? null );
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
            uploadDocument,
           }} />
          <SummaryPanel {...{ 
            documents,
            viewDocument
           }}/>
        </div>

        <PageFooter />
      </div>
    </main>
  );
}