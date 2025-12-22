'use client';

import { useLanguage } from "@/context/language-context";

export default function ConfessionalAboutView() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen p-8 pt-24 font-[family-name:var(--font-geist-sans)] flex justify-center">
      <main className="max-w-3xl space-y-12 text-[var(--text-secondary)]">
        
        <h1 className="text-4xl md:text-5xl font-black text-[var(--accent-gold)] uppercase tracking-widest font-[family-name:var(--font-cinzel)] text-center mb-12">
          {t.confessional_about.title}
        </h1>

        <section className="space-y-4">
          <h2 className="text-2xl text-[var(--text-primary)] font-bold font-[family-name:var(--font-cinzel)]">
            {t.confessional_about.q1}
          </h2>
          <p>{t.confessional_about.a1_intro}</p>
          <ul className="list-disc list-inside pl-4 space-y-2 text-[var(--accent-gold)]">
            <li><span className="text-[var(--text-secondary)]">{t.confessional_about.a1_li1}</span></li>
            <li><span className="text-[var(--text-secondary)]">{t.confessional_about.a1_li2}</span></li>
            <li><span className="text-[var(--text-secondary)]">{t.confessional_about.a1_li3}</span></li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl text-[var(--text-primary)] font-bold font-[family-name:var(--font-cinzel)]">
            {t.confessional_about.q2}
          </h2>
          <p>{t.confessional_about.a2}</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl text-[var(--text-primary)] font-bold font-[family-name:var(--font-cinzel)]">
            {t.confessional_about.q3}
          </h2>
          <p>{t.confessional_about.a3}</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl text-[var(--text-primary)] font-bold font-[family-name:var(--font-cinzel)]">
            {t.confessional_about.q4}
          </h2>
          <p>{t.confessional_about.a4}</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl text-[var(--text-primary)] font-bold font-[family-name:var(--font-cinzel)]">
            {t.confessional_about.q5}
          </h2>
          <p>{t.confessional_about.a5}</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl text-[var(--text-primary)] font-bold font-[family-name:var(--font-cinzel)]">
            {t.confessional_about.q6}
          </h2>
          {/* dangerouslySetInnerHTML needed for the link inside the translation */}
          <p dangerouslySetInnerHTML={{ __html: t.confessional_about.a6 }} />
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl text-[var(--text-primary)] font-bold font-[family-name:var(--font-cinzel)]">
            {t.confessional_about.q7}
          </h2>
          <p>{t.confessional_about.a7}</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl text-[var(--text-primary)] font-bold font-[family-name:var(--font-cinzel)]">
            {t.confessional_about.q8}
          </h2>
          <p>{t.confessional_about.a8}</p>
        </section>
        
      </main>
    </div>
  );
}