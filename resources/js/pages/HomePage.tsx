import { useState } from 'react';
import PageFooter from '../components/resume-summarizer/PageFooter.js';
import PageIntro from '../components/resume-summarizer/PageIntro.js';
import SummaryPanel from '../components/resume-summarizer/SummaryPanel.js';
import UploadPanel from '../components/resume-summarizer/UploadPanel.js';

export default function HomePage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  return (
    <main className="min-h-screen bg-[#f7f8fc] px-4 py-5 text-slate-900 sm:px-7 sm:py-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <PageIntro />

        <div className="grid items-start gap-5 lg:grid-cols-[minmax(280px,0.82fr)_minmax(0,1.65fr)] lg:gap-6">
          <UploadPanel selectedFile={selectedFile} onFileSelect={setSelectedFile} />
          <SummaryPanel />
        </div>

        <PageFooter />
      </div>
    </main>
  );
}