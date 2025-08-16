//src/components/ui/toast.tsx
"use client";

import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import clsx from "clsx";

type Toast = { id: string; title?: string; description?: string; variant?: "default"|"success"|"error" };
type Ctx = { show: (t: Omit<Toast,"id">) => void };

const ToastCtx = createContext<Ctx | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Toast[]>([]);
  const show = useCallback((t: Omit<Toast,"id">) => {
    const id = Math.random().toString(36).slice(2, 9);
    setItems((prev) => [...prev, { id, ...t }]);
    setTimeout(() => setItems((prev) => prev.filter((x) => x.id !== id)), 3200);
  }, []);
  const ctx = useMemo(() => ({ show }), [show]);

  return (
    <ToastCtx.Provider value={ctx}>
      {children}
      <div className="fixed inset-x-0 bottom-0 z-50 flex w-full justify-center pb-6 pointer-events-none">
        <div className="flex w-full max-w-sm flex-col gap-2 px-4">
          {items.map((t) => (
            <div
              key={t.id}
              className={clsx(
                "pointer-events-auto rounded-md border p-3 shadow-md bg-surface text-text",
                t.variant === "success" && "border-green-600/50",
                t.variant === "error" && "border-danger/70",
                !t.variant && "border-border"
              )}
              role="status"
            >
              {t.title && <div className="text-sm font-medium">{t.title}</div>}
              {t.description && <div className="text-xs text-muted mt-0.5">{t.description}</div>}
            </div>
          ))}
        </div>
      </div>
    </ToastCtx.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastCtx);
  if (!ctx) throw new Error("useToast must be used within <ToastProvider>");
  return ctx;
}
