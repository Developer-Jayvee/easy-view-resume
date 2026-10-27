import type { SummarySectionData } from './summaryData.js';

type SummaryCardProps = {
  section: SummarySectionData;
};

export default function SummaryCard({ section }: SummaryCardProps) {
  return (
    <article className="rounded-2xl border border-slate-100 bg-white p-4 sm:p-5">
      <div className="mb-3 flex items-center gap-3">
        <span
          className={`flex h-8 w-8 items-center justify-center rounded-xl text-xs font-bold ${section.accent}`}
        >
          {section.number}
        </span>
        <h3 className="text-sm font-semibold text-slate-800">{section.title}</h3>
      </div>
      <p className="text-sm leading-6 text-slate-600">{section.description}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {section.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-600"
          >
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}
