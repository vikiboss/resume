export function formatMonth(d: string) {
  const [y, m] = d.split("-");
  return `${y}.${m}`;
}

export function toMarkdown(r: Resume) {
  const { personal_info: p, contact: c, education: e } = r;
  const lines: string[] = [];

  lines.push(`# ${p.full_name}`);
  lines.push("");
  lines.push(`**应聘职位：** ${p.target_role}`);
  lines.push("");
  lines.push(
    [
      `电话 ${c.mobile}`,
      `邮件 ${c.email}`,
      `地址 ${c.current_city}`,
      `GitHub [${c.github}](https://github.com/${c.github})`,
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
