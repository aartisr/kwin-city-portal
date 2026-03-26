/**
 * JsonLd — injects Schema.org JSON-LD structured data into <head>.
 * Accepted by Google, Bing, and all major search engines.
 * Produces rich results: breadcrumbs, FAQs, organisation cards, and more.
 */
export default function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
