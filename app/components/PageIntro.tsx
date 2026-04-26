import SourceReferences from '@/components/SourceReferences';

export default function PageIntro({
  eyebrow,
  title,
  description,
  sourceIds,
}: {
  eyebrow: string;
  title: string;
  description: string;
  sourceIds: string[];
}) {
  return (
    <section className="kwin-page-top pb-10 bg-gradient-to-br from-white via-gray-50 to-white border-b border-gray-200">
      <div className="container">
        <div className="max-w-4xl">
          <div className="text-xs font-semibold tracking-[0.2em] text-blue-600 uppercase mb-4">{eyebrow}</div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-5">{title}</h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mb-8">{description}</p>
          <div className="max-w-3xl">
            <SourceReferences sourceIds={sourceIds} compact />
          </div>
        </div>
      </div>
    </section>
  );
}
