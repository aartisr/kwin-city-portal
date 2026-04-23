import Link from 'next/link';
import { motion } from 'framer-motion';

type ContactSuccessStateProps = {
  name: string;
};

export function ContactSuccessState({ name }: ContactSuccessStateProps) {
  return (
    <motion.div
      key="success"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="p-10 flex flex-col items-center text-center gap-5"
    >
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, type: 'spring', stiffness: 220, damping: 16 }}
        className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center"
      >
        <motion.svg
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5, ease: 'easeOut' }}
          viewBox="0 0 24 24"
          fill="none"
          className="w-8 h-8"
        >
          <motion.path
            d="M5 13l4 4L19 7"
            stroke="#10B981"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
      </motion.div>

      <div>
        <h2 className="text-xl font-bold text-white mb-2">Message sent.</h2>
        <p className="text-[#94A3B8] text-sm leading-relaxed max-w-xs">
          Thank you, {name.split(' ')[0]}. We will be in touch shortly.
        </p>
      </div>

      <Link
        href="/"
        className="mt-2 text-sm font-semibold text-[#F5A623] hover:text-amber-300 transition-colors flex items-center gap-1.5"
      >
        <span>←</span> Back to KWIN City
      </Link>
    </motion.div>
  );
}
