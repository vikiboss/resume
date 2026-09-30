import {
  Award,
  BriefcaseBusiness,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  Sparkles,
  PencilRuler,
  LayoutGrid,
} from 'lucide-react'
import { Analytics } from '@vercel/analytics/react'

import { GitHubIcon } from './components/github-icon'
import { formatMonth, toMarkdown } from './utils'
import { FloatingActions } from './components/floating-actions'

import type { ReactNode } from 'react'

const resume: Resume = JSON.parse(__RESUME_DATA__)

function DateRange({ start, end }: { start: string; end: string }) {
  return (
    <span className="text-muted shrink-0 text-sm tabular-nums sm:text-base">
      {formatMonth(start)} - {formatMonth(end)}
    </span>
  )
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="marker:text-line mt-1.5 list-disc space-y-0.5 pl-5 text-base leading-[1.65]">
      {items.map((text, i) => (
        <li key={i}>{text}</li>
      ))}
    </ul>
  )
}

function Section({
  icon,
  title,
  children,
}: {
  icon: ReactNode
  title: string
  children: ReactNode
}) {
  return (
    <section className="flex flex-col gap-1 print:gap-0">
      <h2 className="text-body mb-2 flex items-center gap-2 text-base font-semibold tracking-[0.14em] uppercase">
        {icon}
        {title}
      </h2>
      {children}
    </section>
  )
}

function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="border-muted/60 text-muted rounded border px-1 py-px text-sm leading-none print:hidden">
      {children}
    </span>
  )
}

function InfoRow({
  icon,
  label,
  children,
}: {
  icon: ReactNode
  label: string
  children: ReactNode
}) {
  return (
    <li className="flex items-center gap-1 text-xs sm:gap-1.5 sm:text-base">
      <span className="text-muted shrink-0">{icon}</span>
      <span className="text-muted w-8 shrink-0">{label}</span>
      <span className="text-body min-w-0">{children}</span>
    </li>
  )
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
  } = resume

  const title = `${personal_info.full_name} - ${personal_info.target_role}`

  return (
    <>
      <title>{title}</title>

      <main className="bg-surface text-ink mx-auto my-0 max-w-210 space-y-8 p-4 sm:mt-20 sm:mb-40 sm:rounded-lg sm:p-6 sm:px-8 sm:py-9 sm:shadow-md sm:dark:shadow-none print:m-0 print:max-w-none print:space-y-8 print:rounded-none print:bg-white print:p-0 print:shadow-none">
        {/* ---------------- header ---------------- */}
        <header className="border-edge border-b pb-3.5">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-5 sm:gap-8">
            {/* 左：姓名 + 职位 */}
            <div className="sm:col-span-2">
              <h1 className="text-5xl leading-none font-semibold tracking-tight">
                {personal_info.full_name}
              </h1>
              <p className="text-muted mt-2 text-base">应聘职位：{personal_info.target_role}</p>
            </div>

            {/* 右：信息网格 */}
            <ul className="grid grid-cols-2 gap-x-0 gap-y-1 text-base sm:col-span-3 sm:grid-cols-2 sm:gap-x-0">
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
                {certifications.join(' / ')}
              </InfoRow>
            </ul>
          </div>
        </header>

        {/* ---------------- summary ---------------- */}
        <Section icon={<Sparkles className="size-4" />} title="专业简介">
          <p className="text-body text-base leading-[1.65]">{summary}</p>
        </Section>

        {/* ---------------- work ---------------- */}
        <Section icon={<BriefcaseBusiness className="size-4" />} title="工作经历">
          <div className="space-y-3">
            {work_experience.map((w, i) => (
              <article key={i} className="avoid-break">
                <div className="border-line dark:bg-edge bg-edge/36 flex items-center justify-between gap-1 rounded px-1 py-0.5 sm:gap-3 text-base print:rounded-none print:border-b print:bg-transparent print:p-0">
                  <div className="flex items-center gap-x-2 gap-y-0.5 sm:gap-x-4">
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
                    <span className="text-muted hidden truncate sm:inline" title={w.company}>
                      {w.company}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-muted inline sm:hidden">{w.position}</span>
                      <span className="text-muted hidden sm:inline">
                        {w.department} · {w.position}
                      </span>
                      {w.employment_type === '实习' && <Tag>{w.employment_type}</Tag>}
                    </div>
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
                <div className="border-line dark:bg-edge bg-edge/36 flex items-baseline justify-between gap-1 rounded px-1 py-0.5 sm:gap-3 text-base print:rounded-none print:border-b print:bg-transparent print:p-0">
                  <div className="flex items-center gap-x-4 gap-y-0.5">
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

      <Analytics />
    </>
  )
}
