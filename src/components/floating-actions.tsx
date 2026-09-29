import { useState } from "react";
import { Check, Copy, Printer } from "lucide-react";

import { GitHubIcon } from "./github-icon";

const REPO_URL = "https://github.com/vikiboss/resume";

export function FloatingActions({ markdown }: { markdown: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(markdown);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard 不可用时静默失败
    }
  };

  const base =
    "group inline-flex h-9 items-center rounded-full border border-edge bg-surface px-2.5 " +
    "text-xs text-body shadow-sm transition-all duration-300 " +
    "hover:border-ink hover:bg-ink hover:text-surface hover:px-3.5 " +
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink";

  const label =
    "max-w-0 overflow-hidden whitespace-nowrap opacity-0 " +
    "transition-all duration-300 " +
    "group-hover:ml-1.5 group-hover:max-w-40 group-hover:opacity-100";

  return (
    <div className="print:hidden fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 sm:bottom-6">
      <button type="button" onClick={copy} className={base} aria-live="polite">
        {copied ? <Check className="size-4 shrink-0" /> : <Copy className="size-4 shrink-0" />}
        <span className={label}>{copied ? "已复制" : "复制 Markdown"}</span>
      </button>

      <button type="button" onClick={() => window.print()} className={base}>
        <Printer className="size-4 shrink-0" />
        <span className={label}>导出 PDF</span>
      </button>

      <a href={REPO_URL} target="_blank" rel="noreferrer" className={base}>
        <GitHubIcon className="size-4" />
        <span className={label}>查看源码</span>
      </a>
    </div>
  );
}
