export interface ExperCardProps {
  role: string;
  company: string;
  description1: string;
  description2: string;
  description3: string;
}

export interface ExperienceData {
  company: string;
  role: string;
  duration: string;
  description1: string;
  description2: string;
  skills: string[];
}

export interface WorkCardProps {
  imgSrc: string;
  title: string;
  mainDescription: string;
  solutions: string[];
  skills: string[];
  duration: string;
}

export interface Skills {
  name: string;
}
