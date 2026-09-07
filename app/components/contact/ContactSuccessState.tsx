import Link from 'next/link';

export function ContactSuccessState({ name }: { name: string }) {
  return (
    <div className="py-10 text-center">
      <div aria-hidden="true" className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-3xl text-emerald-700">✓</div>
      <h2 className="mt-6 text-2xl font-black text-slate-950">Your message is on its way.</h2>
      <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-600">Thank you, {name.split(' ')[0]}. We have received your enquiry. Keep an eye on the email address you provided for a reply.</p>
      <div className="mt-7 flex flex-wrap justify-center gap-3"><Link href="/updates" className="rounded-xl bg-[#0b1738] px-4 py-3 text-sm font-bold text-white">Follow updates</Link><Link href="/" className="rounded-xl border border-slate-300 px-4 py-3 text-sm font-bold text-slate-800">Return to KWIN City</Link></div>
    </div>
  );
}
