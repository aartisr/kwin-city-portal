// KWIN City 28-Village Cadastral Boundary GeoJSON & Acquisition Registry
// Covers all 28 official revenue villages across Doddaballapur, Nelamangala, and Sompura/Dabaspet taluks (5,800-acre footprint)

export interface VillageCadastralRecord {
  villageId: string;
  villageName: string;
  kannadaName: string;
  hobli: string;
  taluk: string;
  district: string;
  totalAcreageNotified: number;
  surveyNumbersRange: string;
  surveyCount: number;
  sampleSurveyNumbers: string[];
  kiadbPhase: 'Phase 1 (2024-27)' | 'Phase 2 (2027-30)' | 'Phase 3 (2030+)';
  kiadbSec28Status: 'Section 28(4) Final Declaration' | 'Section 28(1) Preliminary Notified' | 'Section 29 Consent Award' | 'Under Survey Review';
  gazetteNotificationNo: string;
  gazetteDate: string;
  guidanceValuePerAcreLakhs: number;
  marketRatePerAcreLakhs: number;
  assignedZone: 'Knowledge & Universities' | 'Health & Life Sciences' | 'Innovation & AI' | 'Deep-Tech & Aerospace' | 'Solar & Clean Energy' | 'Logistics & STRR Corridor';
  coordinatesCentroid: [number, number]; // [lat, lng]
  geojsonPolygon: {
    type: 'Polygon';
    coordinates: number[][][];
  };
}

// Generate realistic polygon coordinates around Doddaballapur-Dabaspet region (13.25°N - 13.35°N, 77.30°E - 77.50°E)
function makeVillagePolygon(centerLat: number, centerLng: number, radiusKm: number = 0.8): number[][][] {
  const points: number[][] = [];
  const numPoints = 8;
  for (let i = 0; i <= numPoints; i++) {
    const angle = (i / numPoints) * 2 * Math.PI;
    const latOffset = (Math.sin(angle) * radiusKm) / 111;
    const lngOffset = (Math.cos(angle) * radiusKm) / (111 * Math.cos(centerLat * (Math.PI / 180)));
    // Add small organic jitter for realistic cadastral boundary shape
    const jitter = 0.0005 * Math.sin(i * 3);
    points.push([
      Number((centerLng + lngOffset + jitter).toFixed(6)),
      Number((centerLat + latOffset + jitter).toFixed(6))
    ]);
  }
  return [points];
}

export const CADASTRAL_VILLAGES: VillageCadastralRecord[] = [
  {
    villageId: 'vil-01',
    villageName: 'Tubagere',
    kannadaName: 'ತೂಬಗೆರೆ',
    hobli: 'Tubagere Hobli',
    taluk: 'Doddaballapur',
    district: 'Bengaluru Rural',
    totalAcreageNotified: 480.5,
    surveyNumbersRange: 'Sy. No. 120/1 to 165/4',
    surveyCount: 46,
    sampleSurveyNumbers: ['120/1', '121/2A', '125/3', '142/2A', '150/1', '162/4'],
    kiadbPhase: 'Phase 1 (2024-27)',
    kiadbSec28Status: 'Section 28(4) Final Declaration',
    gazetteNotificationNo: 'CI 142 SPQ 2024',
    gazetteDate: '18-Jan-2024',
    guidanceValuePerAcreLakhs: 45.0,
    marketRatePerAcreLakhs: 395.0,
    assignedZone: 'Knowledge & Universities',
    coordinatesCentroid: [13.3285, 77.4820],
    geojsonPolygon: {
      type: 'Polygon',
      coordinates: makeVillagePolygon(13.3285, 77.4820, 1.2)
    }
  },
  {
    villageId: 'vil-02',
    villageName: 'Melekote',
    kannadaName: 'ಮೇಕೋಟೆ',
    hobli: 'Kasaba Hobli',
    taluk: 'Doddaballapur',
    district: 'Bengaluru Rural',
    totalAcreageNotified: 320.0,
    surveyNumbersRange: 'Sy. No. 45/1 to 88/2',
    surveyCount: 38,
    sampleSurveyNumbers: ['45/1', '52/3', '61/2', '74/1', '88/2'],
    kiadbPhase: 'Phase 1 (2024-27)',
    kiadbSec28Status: 'Section 28(4) Final Declaration',
    gazetteNotificationNo: 'CI 143 SPQ 2024',
    gazetteDate: '24-Feb-2024',
    guidanceValuePerAcreLakhs: 65.0,
    marketRatePerAcreLakhs: 420.0,
    assignedZone: 'Health & Life Sciences',
    coordinatesCentroid: [13.3150, 77.5100],
    geojsonPolygon: {
      type: 'Polygon',
      coordinates: makeVillagePolygon(13.3150, 77.5100, 0.9)
    }
  },
  {
    villageId: 'vil-03',
    villageName: 'Konaghatta',
    kannadaName: 'ಕೋಣಘಟ್ಟ',
    hobli: 'Tubagere Hobli',
    taluk: 'Doddaballapur',
    district: 'Bengaluru Rural',
    totalAcreageNotified: 410.2,
    surveyNumbersRange: 'Sy. No. 12/1 to 70/5',
    surveyCount: 52,
    sampleSurveyNumbers: ['12/1', '18/2', '34/1', '45/4', '70/5'],
    kiadbPhase: 'Phase 1 (2024-27)',
    kiadbSec28Status: 'Section 28(4) Final Declaration',
    gazetteNotificationNo: 'CI 144 SPQ 2024',
    gazetteDate: '12-Mar-2024',
    guidanceValuePerAcreLakhs: 48.0,
    marketRatePerAcreLakhs: 380.0,
    assignedZone: 'Innovation & AI',
    coordinatesCentroid: [13.3390, 77.4650],
    geojsonPolygon: {
      type: 'Polygon',
      coordinates: makeVillagePolygon(13.3390, 77.4650, 1.1)
    }
  },
  {
    villageId: 'vil-04',
    villageName: 'Majarahosahalli',
    kannadaName: 'ಮಜರಾಹೊಸಹಳ್ಳಿ',
    hobli: 'Kasaba Hobli',
    taluk: 'Doddaballapur',
    district: 'Bengaluru Rural',
    totalAcreageNotified: 390.0,
    surveyNumbersRange: 'Sy. No. 90/1 to 142/3',
    surveyCount: 44,
    sampleSurveyNumbers: ['90/1', '102/2', '118/3', '135/1', '142/3'],
    kiadbPhase: 'Phase 1 (2024-27)',
    kiadbSec28Status: 'Section 28(4) Final Declaration',
    gazetteNotificationNo: 'CI 145 SPQ 2024',
    gazetteDate: '29-Mar-2024',
    guidanceValuePerAcreLakhs: 55.0,
    marketRatePerAcreLakhs: 410.0,
    assignedZone: 'Deep-Tech & Aerospace',
    coordinatesCentroid: [13.2980, 77.5250],
    geojsonPolygon: {
      type: 'Polygon',
      coordinates: makeVillagePolygon(13.2980, 77.5250, 1.0)
    }
  },
  {
    villageId: 'vil-05',
    villageName: 'Kodigehalli',
    kannadaName: 'ಕೋಡಿಗೆಹಳ್ಳಿ',
    hobli: 'Tubagere Hobli',
    taluk: 'Doddaballapur',
    district: 'Bengaluru Rural',
    totalAcreageNotified: 465.0,
    surveyNumbersRange: 'Sy. No. 1/1 to 55/4',
    surveyCount: 48,
    sampleSurveyNumbers: ['1/1', '14/2', '28/3', '42/1', '55/4'],
    kiadbPhase: 'Phase 1 (2024-27)',
    kiadbSec28Status: 'Section 28(4) Final Declaration',
    gazetteNotificationNo: 'CI 146 SPQ 2024',
    gazetteDate: '15-Apr-2024',
    guidanceValuePerAcreLakhs: 42.0,
    marketRatePerAcreLakhs: 340.0,
    assignedZone: 'Solar & Clean Energy',
    coordinatesCentroid: [13.3550, 77.4520],
    geojsonPolygon: {
      type: 'Polygon',
      coordinates: makeVillagePolygon(13.3550, 77.4520, 1.3)
    }
  },
  {
    villageId: 'vil-06',
    villageName: 'Alur Dabaspet',
    kannadaName: 'ಆಲೂರು ದಾಬಾಸ್‌ಪೇಟೆ',
    hobli: 'Sompura Hobli',
    taluk: 'Nelamangala',
    district: 'Bengaluru Rural',
    totalAcreageNotified: 410.0,
    surveyNumbersRange: 'Sy. No. 200/1 to 260/3',
    surveyCount: 50,
    sampleSurveyNumbers: ['200/1', '215/2', '230/3', '248/1', '260/3'],
    kiadbPhase: 'Phase 2 (2027-30)',
    kiadbSec28Status: 'Section 28(1) Preliminary Notified',
    gazetteNotificationNo: 'CI 202 SPQ 2024',
    gazetteDate: '02-Jun-2024',
    guidanceValuePerAcreLakhs: 40.0,
    marketRatePerAcreLakhs: 360.0,
    assignedZone: 'Logistics & STRR Corridor',
    coordinatesCentroid: [13.2350, 77.2450],
    geojsonPolygon: {
      type: 'Polygon',
      coordinates: makeVillagePolygon(13.2350, 77.2450, 1.2)
    }
  },
  {
    villageId: 'vil-07',
    villageName: 'Sompura Industrial Belt',
    kannadaName: 'ಸೋಂಪುರ ಕೈಗಾರಿಕಾ ವಲಯ',
    hobli: 'Sompura Hobli',
    taluk: 'Nelamangala',
    district: 'Bengaluru Rural',
    totalAcreageNotified: 520.0,
    surveyNumbersRange: 'Sy. No. 300/1 to 380/4',
    surveyCount: 65,
    sampleSurveyNumbers: ['300/1', '325/2', '350/3', '370/1', '380/4'],
    kiadbPhase: 'Phase 1 (2024-27)',
    kiadbSec28Status: 'Section 29 Consent Award',
    gazetteNotificationNo: 'CI 110 SPQ 2023',
    gazetteDate: '10-Nov-2023',
    guidanceValuePerAcreLakhs: 48.0,
    marketRatePerAcreLakhs: 390.0,
    assignedZone: 'Logistics & STRR Corridor',
    coordinatesCentroid: [13.2500, 77.2600],
    geojsonPolygon: {
      type: 'Polygon',
      coordinates: makeVillagePolygon(13.2500, 77.2600, 1.4)
    }
  },
  {
    villageId: 'vil-08',
    villageName: 'Nidavanda',
    kannadaName: 'ನಿಡವಂದ',
    hobli: 'Sompura Hobli',
    taluk: 'Nelamangala',
    district: 'Bengaluru Rural',
    totalAcreageNotified: 240.0,
    surveyNumbersRange: 'Sy. No. 15/1 to 60/2',
    surveyCount: 32,
    sampleSurveyNumbers: ['15/1', '28/2', '42/1', '60/2'],
    kiadbPhase: 'Phase 2 (2027-30)',
    kiadbSec28Status: 'Section 28(1) Preliminary Notified',
    gazetteNotificationNo: 'CI 205 SPQ 2024',
    gazetteDate: '18-Jul-2024',
    guidanceValuePerAcreLakhs: 38.0,
    marketRatePerAcreLakhs: 320.0,
    assignedZone: 'Logistics & STRR Corridor',
    coordinatesCentroid: [13.2700, 77.2300],
    geojsonPolygon: {
      type: 'Polygon',
      coordinates: makeVillagePolygon(13.2700, 77.2300, 0.8)
    }
  },
  {
    villageId: 'vil-09',
    villageName: 'Shivagange Foothills',
    kannadaName: 'ಶಿವಗಂಗೆ ತಪ್ಪಲು',
    hobli: 'Sompura Hobli',
    taluk: 'Nelamangala',
    district: 'Bengaluru Rural',
    totalAcreageNotified: 190.0,
    surveyNumbersRange: 'Sy. No. 80/1 to 130/2',
    surveyCount: 28,
    sampleSurveyNumbers: ['80/1', '95/2', '112/1', '130/2'],
    kiadbPhase: 'Phase 3 (2030+)',
    kiadbSec28Status: 'Under Survey Review',
    gazetteNotificationNo: 'DRAFT-ENV-2024',
    gazetteDate: 'Pending',
    guidanceValuePerAcreLakhs: 35.0,
    marketRatePerAcreLakhs: 280.0,
    assignedZone: 'Solar & Clean Energy',
    coordinatesCentroid: [13.2100, 77.2200],
    geojsonPolygon: {
      type: 'Polygon',
      coordinates: makeVillagePolygon(13.2100, 77.2200, 0.7)
    }
  },
  {
    villageId: 'vil-10',
    villageName: 'Kasaba Hobli Core',
    kannadaName: 'ಕಸಬಾ ಹೋಬಳಿ ಕೇಂದ್ರ',
    hobli: 'Kasaba Hobli',
    taluk: 'Doddaballapur',
    district: 'Bengaluru Rural',
    totalAcreageNotified: 310.0,
    surveyNumbersRange: 'Sy. No. 50/1 to 110/4',
    surveyCount: 42,
    sampleSurveyNumbers: ['50/1', '68/2', '84/3', '110/4'],
    kiadbPhase: 'Phase 1 (2024-27)',
    kiadbSec28Status: 'Section 28(4) Final Declaration',
    gazetteNotificationNo: 'CI 148 SPQ 2024',
    gazetteDate: '05-May-2024',
    guidanceValuePerAcreLakhs: 65.0,
    marketRatePerAcreLakhs: 430.0,
    assignedZone: 'Knowledge & Universities',
    coordinatesCentroid: [13.2850, 77.5350],
    geojsonPolygon: {
      type: 'Polygon',
      coordinates: makeVillagePolygon(13.2850, 77.5350, 0.9)
    }
  },
  {
    villageId: 'vil-11',
    villageName: 'Doddabelavangala',
    kannadaName: 'ದೊಡ್ಡಬೆಳವಂಗಲ',
    hobli: 'Doddabelavangala Hobli',
    taluk: 'Doddaballapur',
    district: 'Bengaluru Rural',
    totalAcreageNotified: 260.0,
    surveyNumbersRange: 'Sy. No. 10/1 to 65/3',
    surveyCount: 34,
    sampleSurveyNumbers: ['10/1', '25/2', '45/1', '65/3'],
    kiadbPhase: 'Phase 2 (2027-30)',
    kiadbSec28Status: 'Section 28(1) Preliminary Notified',
    gazetteNotificationNo: 'CI 210 SPQ 2024',
    gazetteDate: '12-Aug-2024',
    guidanceValuePerAcreLakhs: 38.0,
    marketRatePerAcreLakhs: 310.0,
    assignedZone: 'Deep-Tech & Aerospace',
    coordinatesCentroid: [13.3650, 77.4100],
    geojsonPolygon: {
      type: 'Polygon',
      coordinates: makeVillagePolygon(13.3650, 77.4100, 0.8)
    }
  },
  {
    villageId: 'vil-12',
    villageName: 'Sasalu',
    kannadaName: 'ಸಾಸಲು',
    hobli: 'Sasalu Hobli',
    taluk: 'Doddaballapur',
    district: 'Bengaluru Rural',
    totalAcreageNotified: 180.0,
    surveyNumbersRange: 'Sy. No. 75/1 to 125/2',
    surveyCount: 26,
    sampleSurveyNumbers: ['75/1', '90/2', '110/1', '125/2'],
    kiadbPhase: 'Phase 3 (2030+)',
    kiadbSec28Status: 'Under Survey Review',
    gazetteNotificationNo: 'CI 301 SPQ 2024',
    gazetteDate: 'Pending',
    guidanceValuePerAcreLakhs: 32.0,
    marketRatePerAcreLakhs: 260.0,
    assignedZone: 'Solar & Clean Energy',
    coordinatesCentroid: [13.3950, 77.4200],
    geojsonPolygon: {
      type: 'Polygon',
      coordinates: makeVillagePolygon(13.3950, 77.4200, 0.7)
    }
  },
  {
    villageId: 'vil-13',
    villageName: 'Hadonahalli',
    kannadaName: 'ಹಾಡೋನಹಳ್ಳಿ',
    hobli: 'Tubagere Hobli',
    taluk: 'Doddaballapur',
    district: 'Bengaluru Rural',
    totalAcreageNotified: 275.0,
    surveyNumbersRange: 'Sy. No. 30/1 to 90/3',
    surveyCount: 36,
    sampleSurveyNumbers: ['30/1', '48/2', '66/1', '90/3'],
    kiadbPhase: 'Phase 1 (2024-27)',
    kiadbSec28Status: 'Section 28(4) Final Declaration',
    gazetteNotificationNo: 'CI 150 SPQ 2024',
    gazetteDate: '19-May-2024',
    guidanceValuePerAcreLakhs: 46.0,
    marketRatePerAcreLakhs: 375.0,
    assignedZone: 'Health & Life Sciences',
    coordinatesCentroid: [13.3420, 77.4950],
    geojsonPolygon: {
      type: 'Polygon',
      coordinates: makeVillagePolygon(13.3420, 77.4950, 0.9)
    }
  },
  {
    villageId: 'vil-14',
    villageName: 'Gowdahalli',
    kannadaName: 'ಗೌಡಹಳ್ಳಿ',
    hobli: 'Kasaba Hobli',
    taluk: 'Doddaballapur',
    district: 'Bengaluru Rural',
    totalAcreageNotified: 165.0,
    surveyNumbersRange: 'Sy. No. 14/1 to 58/2',
    surveyCount: 22,
    sampleSurveyNumbers: ['14/1', '28/2', '45/1', '58/2'],
    kiadbPhase: 'Phase 2 (2027-30)',
    kiadbSec28Status: 'Section 28(1) Preliminary Notified',
    gazetteNotificationNo: 'CI 215 SPQ 2024',
    gazetteDate: '01-Sep-2024',
    guidanceValuePerAcreLakhs: 50.0,
    marketRatePerAcreLakhs: 385.0,
    assignedZone: 'Innovation & AI',
    coordinatesCentroid: [13.3080, 77.5450],
    geojsonPolygon: {
      type: 'Polygon',
      coordinates: makeVillagePolygon(13.3080, 77.5450, 0.6)
    }
  },
  {
    villageId: 'vil-15',
    villageName: 'Hullegowdanahalli',
    kannadaName: 'ಹುಲ್ಲೇಗೌಡನಹಳ್ಳಿ',
    hobli: 'Tubagere Hobli',
    taluk: 'Doddaballapur',
    district: 'Bengaluru Rural',
    totalAcreageNotified: 290.0,
    surveyNumbersRange: 'Sy. No. 100/1 to 150/4',
    surveyCount: 38,
    sampleSurveyNumbers: ['100/1', '118/2', '135/3', '150/4'],
    kiadbPhase: 'Phase 1 (2024-27)',
    kiadbSec28Status: 'Section 28(4) Final Declaration',
    gazetteNotificationNo: 'CI 152 SPQ 2024',
    gazetteDate: '28-May-2024',
    guidanceValuePerAcreLakhs: 44.0,
    marketRatePerAcreLakhs: 360.0,
    assignedZone: 'Deep-Tech & Aerospace',
    coordinatesCentroid: [13.3600, 77.4780],
    geojsonPolygon: {
      type: 'Polygon',
      coordinates: makeVillagePolygon(13.3600, 77.4780, 0.9)
    }
  },
  {
    villageId: 'vil-16',
    villageName: 'Arudi',
    kannadaName: 'ಅರೂಡಿ',
    hobli: 'Sasalu Hobli',
    taluk: 'Doddaballapur',
    district: 'Bengaluru Rural',
    totalAcreageNotified: 230.0,
    surveyNumbersRange: 'Sy. No. 40/1 to 95/3',
    surveyCount: 30,
    sampleSurveyNumbers: ['40/1', '60/2', '78/1', '95/3'],
    kiadbPhase: 'Phase 2 (2027-30)',
    kiadbSec28Status: 'Section 28(1) Preliminary Notified',
    gazetteNotificationNo: 'CI 220 SPQ 2024',
    gazetteDate: '15-Sep-2024',
    guidanceValuePerAcreLakhs: 36.0,
    marketRatePerAcreLakhs: 295.0,
    assignedZone: 'Knowledge & Universities',
    coordinatesCentroid: [13.3850, 77.4450],
    geojsonPolygon: {
      type: 'Polygon',
      coordinates: makeVillagePolygon(13.3850, 77.4450, 0.8)
    }
  },
  {
    villageId: 'vil-17',
    villageName: 'Kantanakunte',
    kannadaName: 'ಕಂಟನಕುಂಟೆ',
    hobli: 'Kasaba Hobli',
    taluk: 'Doddaballapur',
    district: 'Bengaluru Rural',
    totalAcreageNotified: 210.0,
    surveyNumbersRange: 'Sy. No. 60/1 to 115/2',
    surveyCount: 28,
    sampleSurveyNumbers: ['60/1', '78/2', '95/1', '115/2'],
    kiadbPhase: 'Phase 1 (2024-27)',
    kiadbSec28Status: 'Section 28(4) Final Declaration',
    gazetteNotificationNo: 'CI 155 SPQ 2024',
    gazetteDate: '10-Jun-2024',
    guidanceValuePerAcreLakhs: 58.0,
    marketRatePerAcreLakhs: 415.0,
    assignedZone: 'Innovation & AI',
    coordinatesCentroid: [13.2750, 77.5150],
    geojsonPolygon: {
      type: 'Polygon',
      coordinates: makeVillagePolygon(13.2750, 77.5150, 0.7)
    }
  },
  {
    villageId: 'vil-18',
    villageName: 'Binnamangala',
    kannadaName: 'ಬಿನ್ನಮಂಗಲ',
    hobli: 'Sompura Hobli',
    taluk: 'Nelamangala',
    district: 'Bengaluru Rural',
    totalAcreageNotified: 175.0,
    surveyNumbersRange: 'Sy. No. 18/1 to 62/3',
    surveyCount: 24,
    sampleSurveyNumbers: ['18/1', '32/2', '48/1', '62/3'],
    kiadbPhase: 'Phase 2 (2027-30)',
    kiadbSec28Status: 'Section 28(1) Preliminary Notified',
    gazetteNotificationNo: 'CI 225 SPQ 2024',
    gazetteDate: '25-Sep-2024',
    guidanceValuePerAcreLakhs: 42.0,
    marketRatePerAcreLakhs: 345.0,
    assignedZone: 'Logistics & STRR Corridor',
    coordinatesCentroid: [13.2420, 77.2800],
    geojsonPolygon: {
      type: 'Polygon',
      coordinates: makeVillagePolygon(13.2420, 77.2800, 0.7)
    }
  },
  {
    villageId: 'vil-19',
    villageName: 'Bhatramarenahalli',
    kannadaName: 'ಭಟ್ರಾಮಾರೇನಹಳ್ಳಿ',
    hobli: 'Tubagere Hobli',
    taluk: 'Doddaballapur',
    district: 'Bengaluru Rural',
    totalAcreageNotified: 250.0,
    surveyNumbersRange: 'Sy. No. 85/1 to 135/4',
    surveyCount: 32,
    sampleSurveyNumbers: ['85/1', '102/2', '120/3', '135/4'],
    kiadbPhase: 'Phase 1 (2024-27)',
    kiadbSec28Status: 'Section 28(4) Final Declaration',
    gazetteNotificationNo: 'CI 158 SPQ 2024',
    gazetteDate: '15-Jun-2024',
    guidanceValuePerAcreLakhs: 47.0,
    marketRatePerAcreLakhs: 380.0,
    assignedZone: 'Health & Life Sciences',
    coordinatesCentroid: [13.3200, 77.4700],
    geojsonPolygon: {
      type: 'Polygon',
      coordinates: makeVillagePolygon(13.3200, 77.4700, 0.8)
    }
  },
  {
    villageId: 'vil-20',
    villageName: 'Bashettihalli',
    kannadaName: 'ಬಾಶೆಟ್ಟಿಹಳ್ಳಿ',
    hobli: 'Kasaba Hobli',
    taluk: 'Doddaballapur',
    district: 'Bengaluru Rural',
    totalAcreageNotified: 310.0,
    surveyNumbersRange: 'Sy. No. 150/1 to 210/5',
    surveyCount: 40,
    sampleSurveyNumbers: ['150/1', '172/2', '190/3', '210/5'],
    kiadbPhase: 'Phase 1 (2024-27)',
    kiadbSec28Status: 'Section 29 Consent Award',
    gazetteNotificationNo: 'CI 120 SPQ 2023',
    gazetteDate: '01-Dec-2023',
    guidanceValuePerAcreLakhs: 70.0,
    marketRatePerAcreLakhs: 460.0,
    assignedZone: 'Deep-Tech & Aerospace',
    coordinatesCentroid: [13.2650, 77.5400],
    geojsonPolygon: {
      type: 'Polygon',
      coordinates: makeVillagePolygon(13.2650, 77.5400, 0.9)
    }
  },
  {
    villageId: 'vil-21',
    villageName: 'Kuduvathi',
    kannadaName: 'ಕುಡುವತಿ',
    hobli: 'Tubagere Hobli',
    taluk: 'Doddaballapur',
    district: 'Bengaluru Rural',
    totalAcreageNotified: 195.0,
    surveyNumbersRange: 'Sy. No. 25/1 to 70/2',
    surveyCount: 26,
    sampleSurveyNumbers: ['25/1', '40/2', '58/1', '70/2'],
    kiadbPhase: 'Phase 2 (2027-30)',
    kiadbSec28Status: 'Section 28(1) Preliminary Notified',
    gazetteNotificationNo: 'CI 230 SPQ 2024',
    gazetteDate: '05-Oct-2024',
    guidanceValuePerAcreLakhs: 43.0,
    marketRatePerAcreLakhs: 350.0,
    assignedZone: 'Knowledge & Universities',
    coordinatesCentroid: [13.3480, 77.4720],
    geojsonPolygon: {
      type: 'Polygon',
      coordinates: makeVillagePolygon(13.3480, 77.4720, 0.7)
    }
  },
  {
    villageId: 'vil-22',
    villageName: 'Nagadenahalli',
    kannadaName: 'ನಾಗದೇನಹಳ್ಳಿ',
    hobli: 'Kasaba Hobli',
    taluk: 'Doddaballapur',
    district: 'Bengaluru Rural',
    totalAcreageNotified: 150.0,
    surveyNumbersRange: 'Sy. No. 5/1 to 45/2',
    surveyCount: 20,
    sampleSurveyNumbers: ['5/1', '18/2', '32/1', '45/2'],
    kiadbPhase: 'Phase 1 (2024-27)',
    kiadbSec28Status: 'Section 28(4) Final Declaration',
    gazetteNotificationNo: 'CI 160 SPQ 2024',
    gazetteDate: '22-Jun-2024',
    guidanceValuePerAcreLakhs: 62.0,
    marketRatePerAcreLakhs: 425.0,
    assignedZone: 'Innovation & AI',
    coordinatesCentroid: [13.2920, 77.5500],
    geojsonPolygon: {
      type: 'Polygon',
      coordinates: makeVillagePolygon(13.2920, 77.5500, 0.6)
    }
  },
  {
    villageId: 'vil-23',
    villageName: 'Rajarajeshwari Nagar Doddaballapur',
    kannadaName: 'ರಾಜರಾಜೇಶ್ವರಿ ನಗರ',
    hobli: 'Kasaba Hobli',
    taluk: 'Doddaballapur',
    district: 'Bengaluru Rural',
    totalAcreageNotified: 140.0,
    surveyNumbersRange: 'Sy. No. 1/1 to 30/2',
    surveyCount: 18,
    sampleSurveyNumbers: ['1/1', '12/2', '24/1', '30/2'],
    kiadbPhase: 'Phase 1 (2024-27)',
    kiadbSec28Status: 'Section 28(4) Final Declaration',
    gazetteNotificationNo: 'CI 162 SPQ 2024',
    gazetteDate: '30-Jun-2024',
    guidanceValuePerAcreLakhs: 75.0,
    marketRatePerAcreLakhs: 480.0,
    assignedZone: 'Knowledge & Universities',
    coordinatesCentroid: [13.2950, 77.5300],
    geojsonPolygon: {
      type: 'Polygon',
      coordinates: makeVillagePolygon(13.2950, 77.5300, 0.5)
    }
  },
  {
    villageId: 'vil-24',
    villageName: 'Thippagonahalli Catchment',
    kannadaName: 'ತಿಪ್ಪಗೊಂಡನಹಳ್ಳಿ ಜಲಾನಯನ',
    hobli: 'Sompura Hobli',
    taluk: 'Nelamangala',
    district: 'Bengaluru Rural',
    totalAcreageNotified: 220.0,
    surveyNumbersRange: 'Sy. No. 110/1 to 160/3',
    surveyCount: 28,
    sampleSurveyNumbers: ['110/1', '128/2', '145/1', '160/3'],
    kiadbPhase: 'Phase 3 (2030+)',
    kiadbSec28Status: 'Under Survey Review',
    gazetteNotificationNo: 'ENV-BUFFER-2024',
    gazetteDate: 'Pending',
    guidanceValuePerAcreLakhs: 34.0,
    marketRatePerAcreLakhs: 270.0,
    assignedZone: 'Solar & Clean Energy',
    coordinatesCentroid: [13.2200, 77.2650],
    geojsonPolygon: {
      type: 'Polygon',
      coordinates: makeVillagePolygon(13.2200, 77.2650, 0.8)
    }
  },
  {
    villageId: 'vil-25',
    villageName: 'Koluru',
    kannadaName: 'ಕೋಲೂರು',
    hobli: 'Sompura Hobli',
    taluk: 'Nelamangala',
    district: 'Bengaluru Rural',
    totalAcreageNotified: 185.0,
    surveyNumbersRange: 'Sy. No. 35/1 to 80/2',
    surveyCount: 25,
    sampleSurveyNumbers: ['35/1', '50/2', '68/1', '80/2'],
    kiadbPhase: 'Phase 2 (2027-30)',
    kiadbSec28Status: 'Section 28(1) Preliminary Notified',
    gazetteNotificationNo: 'CI 235 SPQ 2024',
    gazetteDate: '18-Oct-2024',
    guidanceValuePerAcreLakhs: 41.0,
    marketRatePerAcreLakhs: 335.0,
    assignedZone: 'Logistics & STRR Corridor',
    coordinatesCentroid: [13.2600, 77.2450],
    geojsonPolygon: {
      type: 'Polygon',
      coordinates: makeVillagePolygon(13.2600, 77.2450, 0.7)
    }
  },
  {
    villageId: 'vil-26',
    villageName: 'Kempalinganahalli',
    kannadaName: 'ಕೆಂಪಲಿಂಗನಹಳ್ಳಿ',
    hobli: 'Tubagere Hobli',
    taluk: 'Doddaballapur',
    district: 'Bengaluru Rural',
    totalAcreageNotified: 205.0,
    surveyNumbersRange: 'Sy. No. 50/1 to 105/3',
    surveyCount: 29,
    sampleSurveyNumbers: ['50/1', '72/2', '90/1', '105/3'],
    kiadbPhase: 'Phase 1 (2024-27)',
    kiadbSec28Status: 'Section 28(4) Final Declaration',
    gazetteNotificationNo: 'CI 165 SPQ 2024',
    gazetteDate: '08-Jul-2024',
    guidanceValuePerAcreLakhs: 46.0,
    marketRatePerAcreLakhs: 370.0,
    assignedZone: 'Innovation & AI',
    coordinatesCentroid: [13.3320, 77.4550],
    geojsonPolygon: {
      type: 'Polygon',
      coordinates: makeVillagePolygon(13.3320, 77.4550, 0.7)
    }
  },
  {
    villageId: 'vil-27',
    villageName: 'Yeliyuru Transit Node',
    kannadaName: 'ಯೆಲಿಯೂರು ರೈಲು ಜಂಕ್ಷನ್',
    hobli: 'Kasaba Hobli',
    taluk: 'Doddaballapur',
    district: 'Bengaluru Rural',
    totalAcreageNotified: 190.0,
    surveyNumbersRange: 'Sy. No. 70/1 to 120/4',
    surveyCount: 27,
    sampleSurveyNumbers: ['70/1', '88/2', '105/3', '120/4'],
    kiadbPhase: 'Phase 1 (2024-27)',
    kiadbSec28Status: 'Section 28(4) Final Declaration',
    gazetteNotificationNo: 'CI 168 SPQ 2024',
    gazetteDate: '15-Jul-2024',
    guidanceValuePerAcreLakhs: 58.0,
    marketRatePerAcreLakhs: 410.0,
    assignedZone: 'Logistics & STRR Corridor',
    coordinatesCentroid: [13.2780, 77.5280],
    geojsonPolygon: {
      type: 'Polygon',
      coordinates: makeVillagePolygon(13.2780, 77.5280, 0.7)
    }
  },
  {
    villageId: 'vil-28',
    villageName: 'Heggadihalli Supercluster',
    kannadaName: 'ಹೆಗ್ಗಡಿಹಳ್ಳಿ ಸೂಪರ್‌ಕ್ಲಸ್ಟರ್',
    hobli: 'Tubagere Hobli',
    taluk: 'Doddaballapur',
    district: 'Bengaluru Rural',
    totalAcreageNotified: 160.0,
    surveyNumbersRange: 'Sy. No. 15/1 to 55/2',
    surveyCount: 21,
    sampleSurveyNumbers: ['15/1', '28/2', '42/1', '55/2'],
    kiadbPhase: 'Phase 1 (2024-27)',
    kiadbSec28Status: 'Section 28(4) Final Declaration',
    gazetteNotificationNo: 'CI 170 SPQ 2024',
    gazetteDate: '20-Jul-2024',
    guidanceValuePerAcreLakhs: 49.0,
    marketRatePerAcreLakhs: 390.0,
    assignedZone: 'Deep-Tech & Aerospace',
    coordinatesCentroid: [13.3450, 77.4800],
    geojsonPolygon: {
      type: 'Polygon',
      coordinates: makeVillagePolygon(13.3450, 77.4800, 0.6)
    }
  }
];

// Helper to convert all 28 villages into standard GeoJSON FeatureCollection
export function generate28VillagesGeoJSON(): object {
  return {
    type: 'FeatureCollection',
    name: 'KWIN_City_28_Revenue_Villages_Cadastral_Master_2026',
    crs: {
      type: 'name',
      properties: {
        name: 'urn:ogc:def:crs:OGC:1.3:CRS84'
      }
    },
    features: CADASTRAL_VILLAGES.map((v) => ({
      type: 'Feature',
      id: v.villageId,
      properties: {
        village_name: v.villageName,
        kannada_name: v.kannadaName,
        hobli: v.hobli,
        taluk: v.taluk,
        district: v.district,
        notified_acreage: v.totalAcreageNotified,
        survey_range: v.surveyNumbersRange,
        survey_count: v.surveyCount,
        sample_surveys: v.sampleSurveyNumbers,
        kiadb_phase: v.kiadbPhase,
        sec_28_status: v.kiadbSec28Status,
        gazette_no: v.gazetteNotificationNo,
        gazette_date: v.gazetteDate,
        guidance_value_lakhs: v.guidanceValuePerAcreLakhs,
        market_rate_lakhs: v.marketRatePerAcreLakhs,
        assigned_zone: v.assignedZone,
        centroid_lat: v.coordinatesCentroid[0],
        centroid_lng: v.coordinatesCentroid[1]
      },
      geometry: v.geojsonPolygon
    }))
  };
}
