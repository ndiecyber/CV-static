const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export type SiteData = {
  name: string;
  shortName: string;
  title: string;
  institution: string;
  department?: string;
  location?: string;
  email: string;
  phone?: string;
  bio?: string;
  socials: {
    linkedin?: string;
    github?: string;
    scholar?: string;
    orcid?: string;
    researchGate?: string;
  };
};

export type HomeData = {
  site: SiteData;
  welcome: { heading: string; paragraphs: string[] };
  recruitment: { heading: string; body: string; tags: string[] };
  researchInterests: { title: string; icon: string; description: string }[];
  highlights: { label: string; value: string }[];
  avatarUrl?: string;
};

export type NavLink = { title: string; href: string };

export type CvData = {
  personalInformation: { label: string; value: string }[];
  education: {
    degree: string;
    institution: string;
    location: string;
    period: string;
    description: string;
  }[];
  experiences: {
    id?: number;
    role: string;
    organization: string;
    location: string;
    period: string;
    description: string;
  }[];
  skills: { category: string; items: string[] }[];
  memberships: string[];
  awards: { title: string; issuer: string; year: string }[];
};

export type ProjectsData = {
  fundings: {
    id?: number;
    title: string;
    agency: string;
    period: string;
    description: string;
  }[];
  intellectualProperties: { id?: number; title: string; year: string; description: string }[];
};

export type PublicationsData = {
  publications: {
    id?: number;
    type: 'Journal' | 'Conference' | 'Book Chapter';
    title: string;
    authors: string;
    venue: string;
    year: number;
    doi?: string;
    corresponding?: boolean;
  }[];
  conferenceParticipations: { id?: number; title: string; location: string; year: string }[];
};

export type ResearchData = {
  researchProjects: {
    id?: number;
    title: string;
    status: 'Ongoing' | 'Completed';
    period: string;
    grant: string;
    tags: string[];
  }[];
  publicationPreview: { title: string; venue: string; year: string }[];
};

export type ServicesData = {
  editorialRoles: string[];
  invitedRoles: { title: string; event: string; location: string; date: string }[];
  trainingPrograms: { title: string; organizer: string; year: string }[];
  memberships: string[];
  communityServices: { id?: number; title: string; grant: string; year: string }[];
};

export type TeachingData = {
  currentCourses: {
    id?: number;
    code: string;
    title: string;
    level: 'Undergraduate' | 'Graduate';
    semester: string;
    description: string;
  }[];
  pastCourses: { code: string; title: string; level: 'Undergraduate' | 'Graduate'; years: string }[];
  supervisions: { level: 'Ph.D.' | 'Master' | 'Undergraduate'; ongoing: number; completed: number }[];
};

type ContentData = {
  home: HomeData;
  navLinks: NavLink[];
  experiences: CvData['experiences'];
  personalInformation: CvData['personalInformation'];
  education: CvData['education'];
  skills: CvData['skills'];
  awards: CvData['awards'];
  experiencesMemberships: string[];
  projects: ProjectsData['fundings'];
  intellectualProperties: ProjectsData['intellectualProperties'];
  publications: PublicationsData['publications'];
  conferenceParticipations: PublicationsData['conferenceParticipations'];
  research: ResearchData['researchProjects'];
  publicationPreview: ResearchData['publicationPreview'];
  services: ServicesData['communityServices'];
  editorialRoles: ServicesData['editorialRoles'];
  invitedRoles: ServicesData['invitedRoles'];
  trainingPrograms: ServicesData['trainingPrograms'];
  servicesMemberships: string[];
  teaching: TeachingData['currentCourses'];
  pastCourses: TeachingData['pastCourses'];
  supervisions: TeachingData['supervisions'];
};

export async function fetchApi(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem('_pk');

  const headers = new Headers(options.headers);
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  if (options.body && typeof options.body === 'string') {
    headers.set('Content-Type', 'application/json');
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  return response;
}

const fetchJson = async <T>(endpoint: string): Promise<T> => {
  const response = await fetchApi(endpoint);
  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || 'Request failed');
  }
  return response.json() as Promise<T>;
};

const fetchContent = async (): Promise<ContentData> => fetchJson('/api/content');

export const fetchHome = async (): Promise<HomeData> => {
  const data = await fetchContent();
  return data.home;
};

export const fetchLayoutData = async (): Promise<{
  site: SiteData;
  navLinks: NavLink[];
  avatarUrl?: string;
}> => {
  const data = await fetchContent();
  return {
    site: data.home?.site,
    navLinks: data.navLinks ?? [],
    avatarUrl: data.home?.avatarUrl || '',
  };
};

export const fetchCvData = async (): Promise<CvData> => {
  const data = await fetchContent();
  return {
    personalInformation: data.personalInformation ?? [],
    education: data.education ?? [],
    experiences: data.experiences ?? [],
    skills: data.skills ?? [],
    memberships: data.experiencesMemberships ?? [],
    awards: data.awards ?? [],
  };
};

export const fetchProjectsData = async (): Promise<ProjectsData> => {
  const data = await fetchContent();
  return {
    fundings: data.projects ?? [],
    intellectualProperties: data.intellectualProperties ?? [],
  };
};

export const fetchPublicationsData = async (): Promise<PublicationsData> => {
  const data = await fetchContent();
  return {
    publications: data.publications ?? [],
    conferenceParticipations: data.conferenceParticipations ?? [],
  };
};

export const fetchResearchData = async (): Promise<ResearchData> => {
  const data = await fetchContent();
  return {
    researchProjects: data.research ?? [],
    publicationPreview: data.publicationPreview ?? [],
  };
};

export const fetchServicesData = async (): Promise<ServicesData> => {
  const data = await fetchContent();
  return {
    editorialRoles: data.editorialRoles ?? [],
    invitedRoles: data.invitedRoles ?? [],
    trainingPrograms: data.trainingPrograms ?? [],
    memberships: data.servicesMemberships ?? [],
    communityServices: data.services ?? [],
  };
};

export const fetchTeachingData = async (): Promise<TeachingData> => {
  const data = await fetchContent();
  return {
    currentCourses: data.teaching ?? [],
    pastCourses: data.pastCourses ?? [],
    supervisions: data.supervisions ?? [],
  };
};
