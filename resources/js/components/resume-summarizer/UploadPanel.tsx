import { DocumentIcon, ShieldCheckIcon, SparkleIcon, UploadIcon } from './icons.js';

type UploadPanelProps = {
  selectedFile: File | null;
  onFileSelect: (file: File | null) => void;
};

export default function UploadPanel({ selectedFile, onFileSelect }: UploadPanelProps) {
  return (
    <section className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-[0_12px_40px_-24px_rgba(30,41,59,0.25)] sm:p-6">
      <div className="mb-6 flex items-start justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold text-slate-900">Upload a document</h2>
          <p className="mt-1 text-sm text-slate-500">Start with a resume or CV.</p>
        </div>
        <span className="rounded-full bg-violet-50 px-2.5 py-1 text-[11px] font-semibold text-violet-700">
          STEP 1
        </span>
      </div>

      <label
        htmlFor="resume-upload"
        className="group flex min-h-52 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/70 px-5 py-7 text-center transition hover:border-violet-300 hover:bg-violet-50/50 focus-within:ring-4 focus-within:ring-violet-100"
      >
        <input
          id="resume-upload"
          type="file"
          accept=".pdf,.doc,.docx,.txt"
          className="sr-only"
          onChange={(event) => onFileSelect(event.currentTarget.files?.[0] ?? null)}
        />
        <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-violet-600 shadow-sm ring-1 ring-slate-200/80 transition group-hover:-translate-y-0.5">
          {selectedFile ? <DocumentIcon className="h-6 w-6" /> : <UploadIcon />}
        </span>
        <span className="max-w-full truncate text-sm font-semibold text-slate-800">
          {selectedFile ? selectedFile.name : 'Drop your file here'}
        </span>
        <span className="mt-1 text-xs text-slate-500">
          or <span className="font-semibold text-violet-700">browse files</span>
        </span>
        <span className="mt-4 text-[11px] text-slate-400">PDF, DOC, DOCX or TXT · Up to 10 MB</span>
      </label>

      <div className="mt-5 flex items-start gap-3 rounded-xl bg-slate-50 px-3.5 py-3">
        <ShieldCheckIcon />
        <p className="text-xs leading-5 text-slate-500">
          Your file is only used to create your summary. We never share your personal information.
        </p>
      </div>

      <button
        type="button"
        disabled={!selectedFile}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-3 text-sm font-semibold text-white shadow-md shadow-violet-200 transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none"
      >
        <SparkleIcon />
        Generate summary
      </button>
      <p className="mt-3 text-center text-[11px] text-slate-400">
        A sample summary is shown on the right.
      </p>
    </section>
  );
}
