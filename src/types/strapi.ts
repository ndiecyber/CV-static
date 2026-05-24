// ---------------------------------------------------------------------------
// Strapi v5 REST API response shapes
// ---------------------------------------------------------------------------

export interface StrapiMeta {
  pagination?: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}

/** Generic list response */
export interface StrapiListResponse<T> {
  data: T[];
  meta: StrapiMeta;
}

/** Generic single-item or single-type response */
export interface StrapiSingleResponse<T> {
  data: T;
  meta: StrapiMeta;
}

// ---------------------------------------------------------------------------
// Content type attribute shapes (without Strapi wrapper)
// ---------------------------------------------------------------------------

export interface StrapiPublication {
  id: number;
  documentId: string;
  type: 'Journal' | 'Conference' | 'Book Chapter';
  title: string;
  authors: string;
  venue: string;
  year: number;
  doi?: string;
  corresponding?: boolean;
  order: number;
  publishedAt: string;
}

export interface StrapiResearchProject {
  id: number;
  documentId: string;
  title: string;
  status: 'Ongoing' | 'Completed';
  period: string;
  description: string;
  tags: string[];
  order: number;
  publishedAt: string;
}

export interface StrapiCollaborator {
  id: number;
  documentId: string;
  name: string;
  affiliation: string;
  url?: string;
  order: number;
  publishedAt: string;
}

export interface StrapiFunding {
  id: number;
  documentId: string;
  title: string;
  agency: string;
  amount: string;
  period: string;
  role: 'Principal Investigator' | 'Co-Investigator' | 'Researcher';
  description: string;
  order: number;
  publishedAt: string;
}

export interface StrapiShowcaseProject {
  id: number;
  documentId: string;
  title: string;
  type: 'Open Source' | 'Research Prototype' | 'Industry Collaboration';
  description: string;
  tech: string[];
  link?: string;
  order: number;
  publishedAt: string;
}

export interface StrapiExperience {
  id: number;
  documentId: string;
  role: string;
  organization: string;
  location: string;
  period: string;
  description: string;
  order: number;
  publishedAt: string;
}

export interface StrapiEducation {
  id: number;
  documentId: string;
  degree: string;
  institution: string;
  location: string;
  period: string;
  description: string;
  order: number;
  publishedAt: string;
}

export interface StrapiSkillGroup {
  id: number;
  documentId: string;
  category: string;
  items: string[];
  order: number;
  publishedAt: string;
}

export interface StrapiAward {
  id: number;
  documentId: string;
  title: string;
  issuer: string;
  year: string;
  description?: string;
  order: number;
  publishedAt: string;
}

export interface StrapiCurrentCourse {
  id: number;
  documentId: string;
  code: string;
  title: string;
  level: 'Undergraduate' | 'Graduate';
  semester: string;
  description: string;
  order: number;
  publishedAt: string;
}

export interface StrapiPastCourse {
  id: number;
  documentId: string;
  code: string;
  title: string;
  level: 'Undergraduate' | 'Graduate';
  years: string;
  order: number;
  publishedAt: string;
}

export interface StrapiSupervision {
  id: number;
  documentId: string;
  level: 'Ph.D.' | 'Master' | 'Undergraduate';
  ongoing: number;
  completed: number;
  order: number;
  publishedAt: string;
}

export interface StrapiJournalReview {
  id: number;
  documentId: string;
  name: string;
  order: number;
  publishedAt: string;
}

export interface StrapiConferenceCommittee {
  id: number;
  documentId: string;
  role: string;
  venue: string;
  year: string;
  order: number;
  publishedAt: string;
}

export interface StrapiTalk {
  id: number;
  documentId: string;
  title: string;
  event: string;
  location: string;
  date: string;
  order: number;
  publishedAt: string;
}

export interface StrapiMembership {
  id: number;
  documentId: string;
  name: string;
  order: number;
  publishedAt: string;
}

export interface StrapiMediaFormat {
  url: string;
  width?: number;
  height?: number;
  size?: number;
  mime?: string;
  name?: string;
}

export interface StrapiMedia {
  id: number;
  documentId: string;
  name: string;
  alternativeText?: string | null;
  caption?: string | null;
  width?: number;
  height?: number;
  url: string;
  mime?: string;
  size?: number;
  formats?: {
    thumbnail?: StrapiMediaFormat;
    small?: StrapiMediaFormat;
    medium?: StrapiMediaFormat;
    large?: StrapiMediaFormat;
  } | null;
}

export interface StrapiSiteConfig {
  id: number;
  documentId: string;
  name: string;
  shortName: string;
  title: string;
  institution: string;
  department?: string;
  location?: string;
  email: string;
  phone?: string;
  bio?: string;
  linkedinUrl?: string;
  scholarUrl?: string;
  githubUrl?: string;
  orcidUrl?: string;
  researchGateUrl?: string;
  cvUrl?: string;
  profileImage?: StrapiMedia | null;
}

export interface ResearchInterest {
  title: string;
  icon: string;
  description: string;
}

export interface Highlight {
  label: string;
  value: string;
}

export interface StrapiHomeConfig {
  id: number;
  documentId: string;
  welcomeHeading: string;
  welcomeParagraphs: string[];
  recruitmentHeading: string;
  recruitmentBody: string;
  recruitmentTags: string[];
  researchInterests: ResearchInterest[];
  highlights: Highlight[];
}
