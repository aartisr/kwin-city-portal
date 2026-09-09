import { researchNotice, sendJson } from './_response';

export default function handler(_: any, res: any) {
  sendJson(res, {
    ...researchNotice,
    project: { name: 'KWIN City', locationContext: 'North Bengaluru, Karnataka, India', reportedPlanningExtentAcres: 5800 },
    districts: [
      { name: 'Knowledge & Higher Education', reportedAcres: 1500 },
      { name: 'Health & Life Sciences', reportedAcres: 1400 },
      { name: 'Innovation & Smart Enterprise', reportedAcres: 1600 },
      { name: 'Research & Advanced Engineering', reportedAcres: 1300 }
    ],
    primaryReferences: ['https://kiadb.karnataka.gov.in/', 'https://data.opencity.in/dataset/kwin-city-documents']
  });
}
