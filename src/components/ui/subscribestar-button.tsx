'use client';
import { useState } from 'react';
import { useLanguage } from '@/context/language-context';

export default function SubscribestarButton() {
  const { t } = useLanguage();
  // We force 'guest' state for now, but the UI will be disabled regardless
  const [status, setStatus] = useState<'loading' | 'disabled'>('disabled');

  return (
    <button
      disabled
      className="group relative px-8 py-3 bg-zinc-800 text-zinc-500 text-xs font-black uppercase tracking-widest rounded-full cursor-not-allowed opacity-75 border border-zinc-700"
    >
      {t.ui.integration_pending}
    </button>
  );
}