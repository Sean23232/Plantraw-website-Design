"use client";

import { useState } from "react";
import { ArrowIcon, CheckIcon } from "@/components/icons";

const topics = [
  { id: "general", label: "General question" },
  { id: "order", label: "About my order" },
  { id: "nutrition", label: "Nutrition & ingredients" },
  { id: "wholesale", label: "Wholesale / retail" },
  { id: "feedback", label: "Product feedback" },
];

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", topic: "general", body: "" });
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("loading");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await res.json()) as { ok: boolean; error?: string };
      if (!res.ok || !data.ok) throw new Error(data.error ?? "Please try again.");
      setState("done");
    } catch (err) {
      setState("error");
      setError(err instanceof Error ? err.message : "Please try again.");
    }
  }

  if (state === "done") {
    return (
      <div className="border border-botanical/40 bg-cream p-10">
        <CheckIcon className="h-6 w-6 text-botanical" />
        <h2 className="mt-5 font-display text-3xl text-cocoa-950">Thank you.</h2>
        <p className="mt-4 max-w-md text-[15px] leading-relaxed text-cocoa-700">
          Your message is saved. Izhar and the team read every one — we&apos;ll be in touch at{" "}
          {form.email}.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Your name">
          <input
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full border-b border-sand-dark bg-transparent pb-3 text-[15px] outline-none transition-colors focus:border-cocoa-950"
            placeholder="Jane Doe"
          />
        </Field>
        <Field label="Email address">
          <input
            required
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full border-b border-sand-dark bg-transparent pb-3 text-[15px] outline-none transition-colors focus:border-cocoa-950"
            placeholder="jane@example.com"
          />
        </Field>
      </div>

      <Field label="Topic">
        <div className="flex flex-wrap gap-2 pt-1">
          {topics.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setForm({ ...form, topic: t.id })}
              className={`border px-4 py-2 text-[12px] tracking-wide transition-colors ${
                form.topic === t.id
                  ? "border-cocoa-950 bg-cocoa-950 text-cream"
                  : "border-sand text-cocoa-700 hover:border-cocoa-500"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </Field>

      <Field label="Message">
        <textarea
          required
          rows={5}
          value={form.body}
          onChange={(e) => setForm({ ...form, body: e.target.value })}
          className="w-full resize-none border-b border-sand-dark bg-transparent pb-3 text-[15px] outline-none transition-colors focus:border-cocoa-950"
          placeholder="How can we help?"
        />
      </Field>

      {error && <p className="text-[13px] text-clay">{error}</p>}

      <button
        type="submit"
        disabled={state === "loading"}
        className="group flex items-center gap-2.5 bg-cocoa-950 px-9 py-4 label-xs text-cream transition-colors hover:bg-cocoa-700 disabled:opacity-60"
      >
        {state === "loading" ? "Sending…" : "Send message"}
        {state !== "loading" && <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />}
      </button>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="label-xs text-cocoa-700">{label}</span>
      <span className="mt-3 block">{children}</span>
    </label>
  );
}
