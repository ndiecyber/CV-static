import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function extractData() {
  const experiences = await import('./src/data/experiences.ts');
  const home = await import('./src/data/home.ts');
  const projects = await import('./src/data/projects.ts');
  const publications = await import('./src/data/publications.ts');
  const research = await import('./src/data/research.ts');
  const services = await import('./src/data/services.ts');
  const teaching = await import('./src/data/teaching.ts');
  const site = await import('./src/data/site.ts');

  const db = {
    home: {
      site: site.site,
      welcome: home.welcome,
      recruitment: home.recruitment,
      researchInterests: home.researchInterests,
      highlights: home.highlights,
      avatarUrl: ""
    },
    experiences: experiences.experiences.map((e, i) => ({ id: i + 1, ...e })),
    projects: projects.fundings.map((p, i) => ({ id: i + 1, ...p })),
    publications: publications.publications.map((p, i) => ({ id: i + 1, ...p })),
    research: research.researchProjects.map((r, i) => ({ id: i + 1, ...r })),
    services: services.communityServices.map((s, i) => ({ id: i + 1, ...s })),
    teaching: teaching.currentCourses.map((t, i) => ({ id: i + 1, ...t })),
    
    // Additional data to preserve
    education: experiences.education.map((e, i) => ({ id: i + 1, ...e })),
    personalInformation: experiences.personalInformation,
    skills: experiences.skills,
    experiencesMemberships: experiences.memberships,
    awards: experiences.awards,
    intellectualProperties: projects.intellectualProperties.map((p, i) => ({ id: i + 1, ...p })),
    conferenceParticipations: publications.conferenceParticipations.map((p, i) => ({ id: i + 1, ...p })),
    publicationPreview: research.publicationPreview,
    editorialRoles: services.editorialRoles,
    invitedRoles: services.invitedRoles,
    trainingPrograms: services.trainingPrograms,
    servicesMemberships: services.memberships,
    pastCourses: teaching.pastCourses,
    supervisions: teaching.supervisions,
    navLinks: site.navLinks
  };

  const dir = path.join(__dirname, 'server', 'data');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(path.join(dir, 'db.json'), JSON.stringify(db, null, 2));
  console.log('Successfully wrote db.json');
}

extractData().catch(console.error);
