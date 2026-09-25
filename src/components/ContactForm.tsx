"use client";

import { useState } from "react";

const inputCls =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-ink placeholder:text-muted/70 transition focus:border-brand focus:ring-2 focus:ring-brand/20 focus:outline-none";

const TOPICS = ["General question", "Employers & pricing", "Candidates & profiles", "Freelance marketplace", "Something's broken"];

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState(TOPICS[0]);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, topic, message }),
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
      <div className="rounded-3xl bg-white p-10 text-center shadow-sm ring-1 ring-black/5">
        <p className="font-heading text-2xl font-medium text-ink">Message received 🙏</p>
        <p className="mt-2 text-muted">We read everything and reply within one business day.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-black/5">
      <div className="grid gap-4 sm:grid-cols-2">
        <input className={inputCls} placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
        <input className={inputCls} type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
      </div>
      <select className={`${inputCls} mt-4`} value={topic} onChange={(e) => setTopic(e.target.value)}>
        {TOPICS.map((t) => (
          <option key={t}>{t}</option>
        ))}
      </select>
      <textarea
        className={`${inputCls} mt-4 min-h-32 resize-y`}
        placeholder="How can we help?"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        maxLength={4000}
      />
      {error && (
        <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600">{error}</p>
      )}
      <button
        type="submit"
        disabled={sending}
        className="mt-5 w-full rounded-full bg-brand px-6 py-3.5 font-semibold text-white shadow-lg shadow-brand/30 transition hover:bg-brand-dark disabled:opacity-60"
      >
        {sending ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
