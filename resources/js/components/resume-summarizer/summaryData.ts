export type SummarySectionData = {
  number: string;
  title: string;
  description: string;
  tags: string[];
  accent: string;
};

export const summarySections: SummarySectionData[] = [
  {
    number: '01',
    title: 'Professional overview',
    description:
      'A product-minded software engineer with 6+ years of experience building reliable web applications. Combines strong frontend craft with a practical understanding of backend systems and team collaboration.',
    tags: ['6+ years experience', 'Full-stack development'],
    accent: 'bg-violet-100 text-violet-700',
  },
  {
    number: '02',
    title: 'Core strengths',
    description:
      'Experienced in React, TypeScript, and Node.js, with a track record of improving application performance and shipping accessible, user-focused features in agile teams.',
    tags: ['React & TypeScript', 'Performance', 'Accessibility'],
    accent: 'bg-sky-100 text-sky-700',
  },
  {
    number: '03',
    title: 'Career highlights',
    description:
      'Led a redesign that increased customer engagement by 28%, introduced shared UI patterns across three teams, and mentored early-career developers through delivery.',
    tags: ['28% engagement lift', 'Team leadership'],
    accent: 'bg-emerald-100 text-emerald-700',
  },
];
