import { researchNotice, sendJson } from './_response';

export default function handler(_: any, res: any) {
  sendJson(res, {
    ...researchNotice,
    topic: 'KIADB and Karnataka industrial approval research',
    authoritativeSources: [
      { name: 'Karnataka Industrial Areas Development Board', url: 'https://kiadb.karnataka.gov.in/' },
      { name: 'Karnataka Udyog Mitra', url: 'https://kum.karnataka.gov.in/' }
    ],
    limitation: 'Clearance steps, timelines, and land status must be verified directly with the competent authority.'
  });
}
