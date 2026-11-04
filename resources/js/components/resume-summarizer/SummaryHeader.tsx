export default function SummaryHeader() {
  return (
    <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
      <div>
        <div className="flex items-center gap-2">
          <h2 className="text-base font-semibold text-slate-900">Resume assistant</h2>
          <span className="rounded-full bg-amber-50 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-amber-700">
            Demo
          </span>
        </div>
        <p className="mt-1 text-sm text-slate-500">Ask a question about your document.</p>
      </div>
      <span className="flex items-center gap-2 rounded-full bg-emerald-50 px-2.5 py-1.5 text-[11px] font-semibold text-emerald-700">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
        Ready to chat
      </span>
    </div>
  );
}