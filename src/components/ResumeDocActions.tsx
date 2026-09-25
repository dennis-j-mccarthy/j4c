"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ResumeDocActions({ id }: { id: string }) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  const remove = async () => {
    if (deleting) return;
    if (!confirm("Delete this tailored resume? This can't be undone.")) return;
    setDeleting(true);
    const res = await fetch(`/api/resumes/${id}`, { method: "DELETE" }).catch(() => null);
    if (res?.ok) router.push("/resumes");
    else setDeleting(false);
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={() => window.print()}
        className="rounded-full bg-brand px-5 py-2 text-sm font-semibold text-white shadow-md shadow-brand/30 transition hover:bg-brand-dark"
      >
        Download PDF
      </button>
      <button
        onClick={remove}
        disabled={deleting}
        className="rounded-full px-5 py-2 text-sm font-semibold text-muted ring-1 ring-slate-200 transition hover:text-red-500 hover:ring-red-200 disabled:opacity-60"
      >
        {deleting ? "Deleting…" : "Delete"}
      </button>
    </div>
  );
}

export function CopyLetterButton({ letter }: { letter: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(letter);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch {}
      }}
      className="rounded-full px-4 py-1.5 text-xs font-semibold text-brand-dark ring-1 ring-brand/40 transition hover:bg-brand-tint"
    >
      {copied ? "Copied ✓" : "Copy letter"}
    </button>
  );
}
