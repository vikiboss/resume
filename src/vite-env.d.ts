// vite-env.d.ts
declare const __RESUME_DATA__: string;
declare const __RESUME_VERSION__: string;
declare const __BUILD_TIMESTAMP__: string;

interface Resume {
  personal_info: {
    full_name: string;
    date_of_birth: string;
    target_role: string;
  };
  education: {
    institution: string;
    degree: string;
    study_mode: string;
    major: string;
    institution_tier: string;
  };
  contact: {
    current_city: string;
    mobile: string;
    email: string;
    wechat: string;
    github: string;
  };
  projects: {
    name: string;
    role: string;
    start_date: string;
    end_date: string;
    introduction: string[];
  }[];
  work_experience: {
    company: string;
    company_alias?: string;
    logo?: string;
    employment_type: string;
    department: string;
    position: string;
    end_date: string;
    start_date: string;
    work_content: string[];
  }[];
  skills: string[];
  certifications: string[];
  summary: string;
}
