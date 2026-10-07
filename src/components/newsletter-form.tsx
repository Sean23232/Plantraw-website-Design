"use client";

import { useState } from "react";
import { ArrowIcon, CheckIcon } from "@/components/icons";

export default function NewsletterForm({
  tone = "dark",
  source = "footer",
}: {
  tone?: "dark" | "light";
  source?: string;
}) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  const dark = tone === "dark";

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) {
      setState("error");
      setMessage("Please enter a valid email address.");
      return;
    }
    setState("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });
      if (!res.ok) throw new Error();
      setState("done");
      setMessage("You're on the list. Watch your inbox.");
    } catch {
      setState("error");
      setMessage("Something went wrong. Please try again.");
    }
  }

  if (state === "done") {
    return (
      <div
        className={`flex items-center gap-3 border px-5 py-4 ${
          dark ? "border-sand/40 text-cream" : "border-botanical/40 bg-cream text-botanical-deep"
        }`}
      >
        <CheckIcon className="h-4 w-4 shrink-0" />
        <p className="text-sm">{message}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="w-full">
      <div
        className={`flex flex-col gap-px overflow-hidden sm:flex-row ${
          dark ? "border border-sand/40" : "border border-cocoa-950/25"
        }`}
      >
        <label htmlFor={`newsletter-${source}`} className="sr-only">
          Email address
        </label>
        <input
          id={`newsletter-${source}`}
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (state === "error") setState("idle");
          }}
          placeholder="Your email address"
          className={`min-w-0 flex-1 px-5 py-4 text-sm outline-none ${
            dark
              ? "bg-transparent text-cream placeholder:text-sand/60"
              : "bg-transparent text-ink placeholder:text-cocoa-500/70"
          }`}
        />
        <button
          type="submit"
          disabled={state === "loading"}
          className={`flex items-center justify-center gap-2 px-7 py-4 label-xs transition-colors disabled:opacity-60 ${
            dark ? "bg-cream text-cocoa-950 hover:bg-sand" : "bg-cocoa-950 text-cream hover:bg-cocoa-700"
          }`}
        >
          {state === "loading" ? "Joining…" : "Join Plantraw"}
          {state !== "loading" && <ArrowIcon className="h-4 w-4" />}
        </button>
      </div>
      {state === "error" && <p className="mt-2 text-xs text-clay">{message}</p>}
    </form>
  );
}
