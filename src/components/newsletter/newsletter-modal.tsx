"use client";

import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { NewsletterForm } from "./newsletter-form";

const STORAGE_KEY = "rah_newsletter_dismissed";

export function NewsletterModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const dismissed = localStorage.getItem(STORAGE_KEY);
    if (!dismissed) {
      const timer = setTimeout(() => setOpen(true), 15000);
      return () => clearTimeout(timer);
    }
  }, []);

  function dismiss() {
    localStorage.setItem(STORAGE_KEY, "1");
    setOpen(false);
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-border bg-card p-6 shadow-xl">
          <Dialog.Title className="text-xl font-bold">Stay ahead with AI tools</Dialog.Title>
          <Dialog.Description className="mt-2 text-sm text-muted-foreground">
            Join 10,000+ researchers getting weekly tool picks and comparisons.
          </Dialog.Description>
          <div className="mt-4">
            <NewsletterForm />
          </div>
          <button
            onClick={dismiss}
            className="absolute right-4 top-4 rounded-lg p-1 hover:bg-muted"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
          <button onClick={dismiss} className="mt-4 w-full text-center text-xs text-muted-foreground hover:underline">
            No thanks
          </button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
