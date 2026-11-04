import { DocumentIcon } from './icons.js';
import type { DocumentsData } from '@/pages/HomePage.js';

type DocumentSelectorProps = {
  documents: DocumentsData[];
  viewDocument: (id: string) => Promise<void>;
};

export default function DocumentSelector({ documents, viewDocument }: DocumentSelectorProps) {
  return (
    <div className="relative mb-5">
      <DocumentIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-violet-600" />
      <select
        onChange={(dataVal) => viewDocument(dataVal.currentTarget.value)}
        aria-label="Select a resume"
        defaultValue="sample-resume"
        className="block w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-3 text-sm font-medium text-slate-700 shadow-sm outline-none transition hover:border-slate-300 focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
      >
        <option value="">Choose a file</option>
        {documents.map((data, index) => (
          <option value={data.id} key={index}>{data.fileName}</option>
        ))}
      </select>
    </div>
  );
}