'use client';

import { useState } from 'react';
import { submitConfession } from '@/app/confessional/actions';
import { useLanguage } from '@/context/language-context'; // 1. Import Context

interface CharacterOption {
  id: string;
  label: string;
}

interface ConfessionalFormProps {
  availableCharacters: CharacterOption[];
}

const ConfessionalForm = ({ availableCharacters }: ConfessionalFormProps) => {
  const { t } = useLanguage(); // 2. Get Dictionary
  
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
  const [publicConsent, setPublicConsent] = useState(false);
  const [futureUseConsent, setFutureUseConsent] = useState(false);
  const [confessionText, setConfessionText] = useState('');
  const [textBoxHeight, setTextBoxHeight] = useState(100);

  const isSubmitEnabled = futureUseConsent && confessionText.trim().length > 0;
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isSubmitEnabled) return;
    setIsSubmitting(true);
    setSubmissionError(null);
    setSuccessMessage(null);
    
    const formData = new FormData(event.currentTarget);
    try {
      const result = await submitConfession(formData);
      if (result?.error) {
        setSubmissionError(result.error);
      } else {
        setSuccessMessage(t.confess.success); // Translated Success
        const form = event.target as HTMLFormElement;
        form.reset();
        setConfessionText('');
        setPublicConsent(false);
        setFutureUseConsent(false);
      }
    } catch (error) {
      setSubmissionError(t.confess.error_network); // Translated Error
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
      <main className="flex flex-col gap-8 items-center max-w-2xl mx-auto w-full pt-12">
        
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold text-[var(--accent-gold)] uppercase tracking-widest font-[family-name:var(--font-cinzel)]">
            {t.confess.title}
          </h1>
          <p className="text-lg italic text-[var(--text-secondary)] font-mono">
            {t.confess.subtitle}
          </p>
        </div>

        {submissionError && (
          <div className="p-4 bg-red-900/50 border border-red-500 text-red-200 rounded w-full text-center">
            {submissionError}
          </div>
        )}

        {successMessage && (
          <div className="p-4 bg-green-900/50 border border-green-500 text-green-200 rounded w-full text-center animate-pulse">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
          
          {/* 1. Sinner Name */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-widest text-[var(--text-secondary)] font-[family-name:var(--font-cinzel)]">
              {t.confess.name_label}
            </label>
            <input 
              type="text" 
              name="sinnerName"
              placeholder={t.confess.name_placeholder}
              className="church-input rounded p-3"
            />
          </div>

          {/* 2. Character Selector */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-widest text-[var(--text-secondary)] font-[family-name:var(--font-cinzel)]">
              {t.confess.character_label}
            </label>
            
            {availableCharacters.length > 0 ? (
                <div className="flex flex-wrap gap-3">
                {availableCharacters.map((char) => (
                    <label key={char.id} className="church-input flex items-center gap-2 px-4 py-2 rounded cursor-pointer hover:border-[var(--accent-gold)] transition-colors select-none">
                    <input 
                        type="checkbox" 
                        name="characters" 
                        value={char.id}
                        className="accent-[var(--accent-gold)] w-4 h-4"
                    />
                    <span className="font-mono text-sm">{char.label}</span>
                    </label>
                ))}
                </div>
            ) : (
                <p className="text-xs text-red-500 font-mono">{t.confess.error_empty_chars}</p>
            )}
          </div>

          {/* 3. Confession Text */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-widest text-[var(--text-secondary)] font-[family-name:var(--font-cinzel)]">
              {t.confess.desire_label}
            </label>
            <textarea 
              name="confession" 
              placeholder={t.confess.desire_placeholder}
              rows={4} 
              className="church-input rounded p-4 w-full"
              value={confessionText}
              onChange={(e) => setConfessionText(e.target.value)}
              onMouseUp={(e) => {
                const newHeight = (e.target as HTMLTextAreaElement).offsetHeight;
                setTextBoxHeight(Math.min(Math.max(newHeight, 100), 500));
              }}
              style={{ height: `${textBoxHeight}px`, resize: 'vertical' }}
            />
          </div>

          {/* 4. Consents */}
          <div className="space-y-3 p-4 border border-[var(--border-color)] bg-[var(--bg-secondary)] rounded-lg">
            
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                name="isPublic"
                id="isPublic"
                className="mt-1 accent-[var(--accent-gold)] w-5 h-5"
                checked={publicConsent}
                onChange={(e) => setPublicConsent(e.target.checked)}
              />
              <label 
                htmlFor="isPublic" 
                className="text-sm text-[var(--text-secondary)] cursor-pointer select-none font-mono"
                // Using HTML insertion to keep colors
                dangerouslySetInnerHTML={{ __html: t.confess.consent_public }}
              />
            </div>

            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                name="futureUseConsent"
                id="futureUseConsent"
                className="mt-1 accent-[var(--accent-gold)] w-5 h-5"
                checked={futureUseConsent}
                onChange={(e) => setFutureUseConsent(e.target.checked)}
              />
              <label 
                htmlFor="futureUseConsent" 
                className="text-sm text-[var(--text-secondary)] cursor-pointer select-none font-mono"
                dangerouslySetInnerHTML={{ __html: t.confess.consent_future }}
              />
            </div>
          </div>

          {/* 5. Submit Button */}
          <button
            type="submit"
            disabled={!isSubmitEnabled || isSubmitting}
            className={`py-4 px-6 rounded-lg text-xl tracking-widest font-[family-name:var(--font-cinzel)] btn-gold`}
          >
            {isSubmitting ? t.confess.submitting : t.confess.submit}
          </button>
          
        </form>
      </main>
  );
}

export default ConfessionalForm;