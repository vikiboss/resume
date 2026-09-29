import {
  Award,
  BriefcaseBusiness,
  Check,
  Copy,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  Printer,
  Sparkles,
  PencilRuler,
  LayoutGrid,
} from "lucide-react";

import { useState } from "react";

import type { ReactNode } from "react";

const resume: Resume = JSON.parse(__RESUME_DATA__);

function formatMonth(d: string) {
  const [y, m] = d.split("-");
  return `${y}.${m}`;
}

function DateRange({ start, end }: { start: string; end: string }) {
  return (
    <span className="shrink-0 text-xs tabular-nums text-muted">
      {formatMonth(start)} - {formatMonth(end)}
    </span>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="mt-1.5 list-disc space-y-0.5 pl-5 text-sm leading-[1.65] marker:text-line">
      {items.map((text, i) => (
        <li key={i}>{text}</li>
      ))}
    </ul>
  );
}

function Section({
  icon,
  title,
  children,
}: {
  icon: ReactNode;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="flex flex-col gap-1 print:gap-0">
      <h2 className="mb-2 flex items-center gap-2 text-base font-semibold uppercase tracking-[0.14em] text-body">
        {icon}
        {title}
      </h2>
      {children}
    </section>
  );
}

function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="rounded border border-edge px-1 py-px text-xs leading-none text-muted">
      {children}
    </span>
  );
}

function InfoRow({
  icon,
  label,
  children,
}: {
  icon: ReactNode;
  label: string;
  children: ReactNode;
}) {
  return (
    <li className="flex items-center gap-1.5">
      <span className="shrink-0 text-muted">{icon}</span>
      <span className="w-8 shrink-0 text-muted">{label}</span>
      <span className="min-w-0 text-body">{children}</span>
    </li>
  );
}

function GitHubIcon({ className }: { className: string }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={`text-current ${className}`}
    >
      <path d="M0 0h24v24H0z" fill="none" />
      <path
        fill="currentColor"
        d="M16.24 22a1 1 0 0 1-1-1v-2.6a2.15 2.15 0 0 0-.54-1.66a1 1 0 0 1 .61-1.67C17.75 14.78 20 14 20 9.77a4 4 0 0 0-.67-2.22a2.75 2.75 0 0 1-.41-2.06a3.7 3.7 0 0 0 0-1.41a7.7 7.7 0 0 0-2.09 1.09a1 1 0 0 1-.84.15a10.15 10.15 0 0 0-5.52 0a1 1 0 0 1-.84-.15a7.4 7.4 0 0 0-2.11-1.09a3.5 3.5 0 0 0 0 1.41a2.84 2.84 0 0 1-.43 2.08a4.07 4.07 0 0 0-.67 2.23c0 3.89 1.88 4.93 4.7 5.29a1 1 0 0 1 .82.66a1 1 0 0 1-.21 1a2.06 2.06 0 0 0-.55 1.56V21a1 1 0 0 1-2 0v-.57a6 6 0 0 1-5.27-2.09a3.9 3.9 0 0 0-1.16-.88a1 1 0 1 1 .5-1.94a4.9 4.9 0 0 1 2 1.36c1 1 2 1.88 3.9 1.52a3.9 3.9 0 0 1 .23-1.58c-2.06-.52-5-2-5-7a6 6 0 0 1 1-3.33a.85.85 0 0 0 .13-.62a5.7 5.7 0 0 1 .33-3.21a1 1 0 0 1 .63-.57c.34-.1 1.56-.3 3.87 1.2a12.16 12.16 0 0 1 5.69 0c2.31-1.5 3.53-1.31 3.86-1.2a1 1 0 0 1 .63.57a5.7 5.7 0 0 1 .33 3.22a.75.75 0 0 0 .11.57a6 6 0 0 1 1 3.34c0 5.07-2.92 6.54-5 7a4.3 4.3 0 0 1 .22 1.67V21a1 1 0 0 1-.94 1"
      />
    </svg>
  );
}

const REPO_URL = "https://github.com/vikiboss/resume";

function toMarkdown(r: Resume) {
  const { personal_info: p, contact: c, education: e } = r;
  const lines: string[] = [];

  lines.push(`# ${p.full_name}`);
  lines.push("");
  lines.push(`**应聘职位：** ${p.target_role}`);
  lines.push("");
  lines.push(
    [
      `📱 ${c.mobile}`,
      `✉️ ${c.email}`,
      `📍 ${c.current_city}`,
      `🔗 [${c.github}](https://github.com/${c.github})`,
    ].join(" · "),
  );
  lines.push("");
  lines.push("---");
  lines.push("");

  lines.push("## 个人简介");
  lines.push("");
  lines.push(r.summary);
  lines.push("");

  lines.push("## 工作经历");
  lines.push("");
  for (const w of r.work_experience) {
    const title = w.company_alias || w.company;
    lines.push(
      `### ${title} · ${w.position}（${formatMonth(w.start_date)} - ${formatMonth(w.end_date)}）`,
    );
    lines.push("");
    lines.push(`> ${w.company} · ${w.department} · ${w.employment_type}`);
    lines.push("");
    for (const item of w.work_content) lines.push(`- ${item}`);
    lines.push("");
  }

  lines.push("## 项目经历");
  lines.push("");
  for (const proj of r.projects) {
    lines.push(
      `### ${proj.name} · ${proj.role}（${formatMonth(proj.start_date)} - ${formatMonth(proj.end_date)}）`,
    );
    lines.push("");
    for (const item of proj.introduction) lines.push(`- ${item}`);
    lines.push("");
  }

  lines.push("## 专业技能");
  lines.push("");
  for (const s of r.skills) lines.push(`- ${s}`);
  lines.push("");

  lines.push("## 教育背景");
  lines.push("");
  lines.push(
    `- ${e.institution} · ${e.major} · ${e.degree}（${e.study_mode}）· ${e.institution_tier}`,
  );
  lines.push("");

  lines.push("## 证书");
  lines.push("");
  lines.push(`- ${r.certifications.join(" / ")}`);
  lines.push("");

  return lines.join("\n");
}

function FloatingActions({ markdown }: { markdown: string }) {
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
        {copied ? (
          <Check className="size-4 shrink-0" />
        ) : (
          <Copy className="size-4 shrink-0" />
        )}
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

export function App() {
  const {
    personal_info,
    contact,
    summary,
    education,
    work_experience,
    projects,
    skills,
    certifications,
  } = resume;

  return (
    <>
      <head><title>{personal_info.full_name} 的在线简历</title></head>

      <main className="mx-auto shadow-md print:shadow-none my-16 print:m-0 print:rounded-none rounded-lg max-w-210 space-y-8 bg-surface p-6 text-ink sm:px-8 sm:py-9 print:max-w-none print:space-y-8 print:bg-white print:p-0">
        {/* ---------------- header ---------------- */}
        <header className="border-b border-edge pb-3.5">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-8 sm:gap-8">
            {/* 左：姓名 + 职位，占 1/3 */}
            <div className="sm:col-span-3">
              <h1 className="text-5xl leading-none font-semibold tracking-tight">
                {personal_info.full_name}
              </h1>
              <p className="mt-2 text-sm text-muted">应聘职位：{personal_info.target_role}</p>
            </div>

            {/* 右：信息网格，占 2/3 */}
            <ul className="grid grid-cols-1 gap-x-4 gap-y-1 text-sm sm:col-span-5 sm:grid-cols-2">
              <InfoRow icon={<Phone className="size-4" />} label="手机">
                <a href={`tel:${contact.mobile}`}>{contact.mobile}</a>
              </InfoRow>
              <InfoRow icon={<Mail className="size-4" />} label="邮箱">
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </InfoRow>
              <InfoRow icon={<MapPin className="size-4" />} label="城市">
                {contact.current_city}
              </InfoRow>
              <InfoRow icon={<GraduationCap className="size-4" />} label="学历">
                {education.institution} ({education.institution_tier}) · {education.degree}
              </InfoRow>
              <InfoRow icon={<GitHubIcon className="size-4" />} label="开源">
                <a href={`https://github.com/${contact.github}`} target="_blank" rel="noreferrer">
                  {contact.github}
                </a>
              </InfoRow>
              <InfoRow icon={<Award className="size-4" />} label="证书">
                {certifications.join(" / ")}
              </InfoRow>
            </ul>
          </div>
        </header>

        {/* ---------------- summary ---------------- */}
        <Section icon={<Sparkles className="size-4" />} title="个人简介">
          <p className="text-sm leading-[1.65] text-body">{summary}</p>
        </Section>

        {/* ---------------- work ---------------- */}
        <Section icon={<BriefcaseBusiness className="size-4" />} title="工作经历">
          <div className="space-y-3">
            {work_experience.map((w, i) => (
              <article key={i} className="avoid-break">
                <div className="flex text-sm items-center justify-between gap-3 bg-gray-200/80 px-1 py-0.5 rounded print:rounded-none border-line print:border-b">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-0.5">
                    <div className="flex items-center gap-x-1">
                      {w.logo && (
                        <img
                          src={w.logo}
                          alt={w.company}
                          className="size-4 rounded-xs print:hidden"
                        />
                      )}
                      <h3 className="inline-flex items-center gap-1.5 font-medium">
                        {w.company_alias || w.company}
                      </h3>
                    </div>
                    <span className="truncate text-muted" title={w.company}>
                      {w.company}
                    </span>
                    <span className="text-body/85">
                      {w.department} · {w.position}
                    </span>
                    {w.employment_type === "实习" && <Tag>{w.employment_type}</Tag>}
                  </div>
                  <DateRange start={w.start_date} end={w.end_date} />
                </div>
                <Bullets items={w.work_content} />
              </article>
            ))}
          </div>
        </Section>

        {/* ---------------- projects ---------------- */}
        <Section icon={<LayoutGrid className="size-4" />} title="项目经历">
          <div className="space-y-3">
            {projects.map((p, i) => (
              <article key={i} className="avoid-break">
                <div className="flex text-sm items-baseline justify-between gap-3 bg-gray-200/80 px-1 py-0.5 rounded print:rounded-none border-line print:border-b">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-0.5">
                    <h3 className="font-medium">{p.name}</h3>
                    <span className="text-body/85">{p.role}</span>
                  </div>
                  <DateRange start={p.start_date} end={p.end_date} />
                </div>
                <Bullets items={p.introduction} />
              </article>
            ))}
          </div>
        </Section>

        {/* ---------------- skills ---------------- */}
        <Section icon={<PencilRuler className="size-4" />} title="专业技能">
          <Bullets items={skills} />
        </Section>
      </main>


      <FloatingActions markdown={toMarkdown(resume)} />
    </>
  );
}
