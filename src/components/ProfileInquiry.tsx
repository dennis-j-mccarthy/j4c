"use client";

import { useState } from "react";

const inputCls =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-ink placeholder:text-muted/70 transition focus:border-brand focus:ring-2 focus:ring-brand/20 focus:outline-none";

export default function ProfileInquiry({
  freelancerId,
  firstName,
}: {
  freelancerId: string;
  firstName: string;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    setError(null);
    try {
      const res = await fetch("/api/freelancers/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ freelancerId, name, email, message }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Something went wrong.");
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSending(false);
    }
  };

  if (done) {
    return (
      <div className="rounded-2xl bg-brand-tint p-6 text-center">
        <p className="font-semibold text-ink">Sent! 🙏</p>
        <p className="mt-1 text-sm text-muted">
          {firstName} will get back to you at {email}.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={send} className="space-y-3">
      <input className={inputCls} placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
      <input className={inputCls} type="email" placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <textarea
        className={`${inputCls} min-h-28 resize-y`}
        placeholder="What do you need? Dates, scope, budget if you have one…"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      {error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600">{error}</p>
      )}
      <button
        type="submit"
        disabled={sending}
        className="w-full rounded-full bg-brand px-6 py-3 font-semibold text-white shadow-md shadow-brand/30 transition hover:bg-brand-dark disabled:opacity-60"
      >
        {sending ? "Sending…" : `Message ${firstName}`}
      </button>
    </form>
  );
}
