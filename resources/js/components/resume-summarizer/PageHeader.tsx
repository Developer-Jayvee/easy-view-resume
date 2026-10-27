import { SparkleIcon } from './icons.js';

export default function PageHeader() {
  return (
    <header className="mb-8 flex items-center justify-between gap-4 sm:mb-10">
      <a href="/" className="flex items-center gap-3" aria-label="Briefly home">
        <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-violet-600 text-white shadow-lg shadow-violet-200">
          <SparkleIcon />
        </span>
        <span className="text-lg font-bold tracking-tight">
          briefly<span className="text-violet-600">.</span>
        </span>
      </a>

      <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-500 sm:flex">
        <span className="h-2 w-2 rounded-full bg-emerald-400" />
        Your documents stay private
      </div>

      <button
        type="button"
        className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-sm font-semibold text-slate-600 shadow-sm"
        aria-label="Account menu"
      >
        JD
      </button>
    </header>
  );
}
