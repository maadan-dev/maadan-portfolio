export interface Project {
  title: string;
  role: string;
  problem: string;
  execution: string;
  result: string;
  tech: string[];
  image: string;
  link?: string;
  featured?: boolean;
  highlights?: string[];
  github?: string;
}

export interface Metric {
  label: string;
  value: string;
}

export interface SkillCategory {
  title: string;
  skills: string[];
}
