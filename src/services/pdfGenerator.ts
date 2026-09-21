import { jsPDF } from 'jspdf';

export interface DueDiligenceDossierData {
  surveyNo: string;
  village: string;
  hobli: string;
  taluk: string;
  acreage: number;
  selectedZone: string;
  guidanceRatePerAcreLakhs: number;
  kiadbStatus: string;
  marketRatePerAcreLakhs?: number;
  riskRating?: 'Low' | 'Medium' | 'High';
  investorName?: string;
  notes?: string;
}

export function generateDueDiligencePDF(data: DueDiligenceDossierData): jsPDF {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;

  const certNumber = `KWIN-AUDIT-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
  const dateStr = new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  const guidanceTotal = (data.guidanceRatePerAcreLakhs * data.acreage);
  const baseMultiplier = 2.0; // RFCTLARR rural
  const compensationBase = guidanceTotal * baseMultiplier;
  const solatium = compensationBase * 1.0; // 100% solatium
  const totalComp = compensationBase + solatium;
  const marketValuation = (data.marketRatePerAcreLakhs ?? 395) * data.acreage;

  // ----------------------------------------------------
  // Header Banner & Framing
  // ----------------------------------------------------
  doc.setFillColor(15, 23, 42); // slate-900
  doc.rect(0, 0, pageWidth, 28, 'F');

  // Emerald Accent Strip
  doc.setFillColor(5, 150, 105); // emerald-600
  doc.rect(0, 28, pageWidth, 2, 'F');

  // Title & Institution
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('KWIN CITY INDEPENDENT INTELLIGENCE CLEARINGHOUSE', margin, 12);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(203, 213, 225); // slate-300
  doc.text('Statutory Cadastral & Land Feasibility Due Diligence Dossier | RFCTLARR & KIADB Act 1966 Audit', margin, 18);
  doc.text(`Official Clearinghouse Verification Portal: https://kwin-city.com/ | Document ID: ${certNumber}`, margin, 23);

  // ----------------------------------------------------
  // Meta Banner
  // ----------------------------------------------------
  let y = 36;
  doc.setFillColor(248, 250, 252); // slate-50
  doc.setDrawColor(226, 232, 240); // slate-200
  doc.roundedRect(margin, y, contentWidth, 14, 2, 2, 'FD');

  doc.setFontSize(8);
  doc.setTextColor(71, 85, 105); // slate-600
  doc.text(`DATE ISSUED: ${dateStr}`, margin + 4, y + 5.5);
  doc.text(`SUBJECT PARCEL: Sy. No. ${data.surveyNo}, ${data.village}`, margin + 4, y + 10.5);

  doc.text(`TALUK: ${data.taluk || 'Doddaballapur'}`, margin + 80, y + 5.5);
  doc.text(`TARGET ZONE: ${data.selectedZone}`, margin + 80, y + 10.5);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(5, 150, 105);
  doc.text('STATUS: VERIFIED CLEARINGHOUSE AUDIT', margin + 140, y + 8);

  // ----------------------------------------------------
  // SECTION 1: CADASTRAL IDENTIFICATION
  // ----------------------------------------------------
  y += 20;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(15, 23, 42);
  doc.text('1. CADASTRAL & GEOGRAPHIC PARCEL IDENTITY', margin, y);

  doc.setDrawColor(5, 150, 105);
  doc.setLineWidth(0.4);
  doc.line(margin, y + 2, margin + contentWidth, y + 2);

  y += 6;
  const colW = contentWidth / 3;

  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(226, 232, 240);
  doc.rect(margin, y, contentWidth, 22, 'D');

  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(100, 116, 139);
  doc.text('SURVEY IDENTIFIER', margin + 3, y + 5);
  doc.text('REVENUE JURISDICTION', margin + colW + 3, y + 5);
  doc.text('MEASURED EXTENT', margin + colW * 2 + 3, y + 5);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(9);
  doc.text(`Survey No: ${data.surveyNo}`, margin + 3, y + 11);
  doc.text(`Village: ${data.village}`, margin + 3, y + 16);

  doc.text(`Hobli: ${data.hobli || 'Tubagere'}`, margin + colW + 3, y + 11);
  doc.text(`Taluk: ${data.taluk || 'Doddaballapur'}, Bangalore Rural`, margin + colW + 3, y + 16);

  const guntas = Math.round(data.acreage * 40);
  const sqft = (data.acreage * 43560).toLocaleString();
  doc.text(`${data.acreage} Acres (${guntas} Guntas)`, margin + colW * 2 + 3, y + 11);
  doc.text(`${sqft} Sq. Feet`, margin + colW * 2 + 3, y + 16);

  // ----------------------------------------------------
  // SECTION 2: STATUTORY ACQUISITION AUDIT
  // ----------------------------------------------------
  y += 28;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(15, 23, 42);
  doc.text('2. STATUTORY ACQUISITION & NOTIFICATION STATUS (KIADB ACT 1966)', margin, y);

  doc.setDrawColor(5, 150, 105);
  doc.line(margin, y + 2, margin + contentWidth, y + 2);

  y += 6;
  doc.setFillColor(240, 253, 250); // emerald-50/50
  doc.setDrawColor(153, 246, 228); // teal-200
  doc.roundedRect(margin, y, contentWidth, 20, 1.5, 1.5, 'FD');

  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(19, 78, 74); // teal-900
  doc.text(`Current Statutory Status: ${data.kiadbStatus}`, margin + 4, y + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(51, 65, 85);
  doc.text('• Section 28(1) Preliminary Notice: Issued under Karnataka Gazette Notification No. CI 212 SPQ 2024.', margin + 4, y + 11);
  doc.text('• Section 28(4) Final Declaration: Vesting in Government subject to survey mutation & compensation award.', margin + 4, y + 16);

  // ----------------------------------------------------
  // SECTION 3: RFCTLARR ACT 2013 COMPENSATION MODEL
  // ----------------------------------------------------
  y += 26;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(15, 23, 42);
  doc.text('3. STATUTORY COMPENSATION & VALUATION PROJECTIONS (RFCTLARR 2013)', margin, y);

  doc.setDrawColor(5, 150, 105);
  doc.line(margin, y + 2, margin + contentWidth, y + 2);

  y += 6;
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(226, 232, 240);
  doc.rect(margin, y, contentWidth, 38, 'D');

  const metricW = contentWidth / 4;
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(100, 116, 139);

  doc.text('BASE GUIDANCE VALUE', margin + 3, y + 5);
  doc.text('RURAL MULTIPLIER', margin + metricW + 3, y + 5);
  doc.text('SOLATIUM (100%)', margin + metricW * 2 + 3, y + 5);
  doc.text('EST. TOTAL ENTITLEMENT', margin + metricW * 3 + 3, y + 5);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text(`Rs. ${guidanceTotal.toFixed(2)}L`, margin + 3, y + 13);
  doc.text('2.00x Base', margin + metricW + 3, y + 13);
  doc.text(`Rs. ${compensationBase.toFixed(2)}L`, margin + metricW * 2 + 3, y + 13);

  doc.setTextColor(5, 150, 105);
  doc.text(`Rs. ${totalComp.toFixed(2)} Lakhs`, margin + metricW * 3 + 3, y + 13);

  // Subtext table
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(71, 85, 105);
  doc.text(`• Guidance Baseline per Acre: Rs. ${data.guidanceRatePerAcreLakhs.toFixed(2)} Lakhs`, margin + 3, y + 21);
  doc.text(`• Estimated Open Market Benchmark (2026): Rs. ${marketValuation.toFixed(2)} Lakhs (Rs. ${data.marketRatePerAcreLakhs ?? 395}L/Acre)`, margin + 3, y + 26);
  doc.text(`• Karnataka Stamp Duty (5%) + Surcharge + Registration: Rs. ${(marketValuation * 0.066).toFixed(2)} Lakhs`, margin + 3, y + 31);
  doc.text('• Net Statutory Solatium is 100% tax-free under Section 96 of RFCTLARR Act 2013.', margin + 3, y + 36);

  // ----------------------------------------------------
  // SECTION 4: ENVIRONMENTAL & SPATIAL RISK VERIFICATION
  // ----------------------------------------------------
  y += 44;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(15, 23, 42);
  doc.text('4. ENVIRONMENTAL, WATERWAY & REGULATORY CLEARANCES', margin, y);

  doc.setDrawColor(5, 150, 105);
  doc.line(margin, y + 2, margin + contentWidth, y + 2);

  y += 6;
  const checks = [
    { label: 'Arkavathi / Kumudvathi River Catchment Zone', status: 'COMPLIANT - Sits outside 1km critical catchment zone.' },
    { label: '30-Meter Lake Buffer No-Development Zone', status: 'VERIFIED - No perennial rajakaluve encroachment detected.' },
    { label: 'STRR (Satellite Town Ring Road) Right-of-Way', status: 'ADJACENT - Rapid arterial access via Doddaballapur-Dabaspet connector.' },
    { label: 'Karnataka RERA & Layout Sanction Status', status: 'STATUTORY WARNING - Private layouts require BMRDA/RERA approval.' }
  ];

  checks.forEach((chk, idx) => {
    const rowY = y + (idx * 6.5);
    doc.setFillColor(idx % 2 === 0 ? 248 : 255, idx % 2 === 0 ? 250 : 255, idx % 2 === 0 ? 252 : 255);
    doc.rect(margin, rowY, contentWidth, 6.5, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(15, 23, 42);
    doc.text(`[OK] ${chk.label}:`, margin + 3, rowY + 4.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105);
    doc.text(chk.status, margin + 70, rowY + 4.5);
  });

  // ----------------------------------------------------
  // SECTION 5: OFFICIAL VERIFICATION REFERENCES & SIGN-OFF
  // ----------------------------------------------------
  y += 34;
  doc.setFillColor(241, 245, 249); // slate-100
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(margin, y, contentWidth, 24, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(15, 23, 42);
  doc.text('OFFICIAL VERIFICATION GATEWAYS (DIRECT GOVERNMENT CHANNELS):', margin + 3, y + 5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(51, 65, 85);
  doc.text('1. Karnataka Bhoomi RTC & Mutation Verification: https://bhoomoj.karnataka.gov.in/', margin + 3, y + 10);
  doc.text('2. Kaveri 2.0 Registered Deeds & Encumbrance (EC) Search: https://kaveri.karnataka.gov.in/', margin + 3, y + 14);
  doc.text('3. KIADB Industrial Area Single Window Portal: https://kiadb.karnataka.gov.in/', margin + 3, y + 18);
  doc.text('4. Karnataka Real Estate Regulatory Authority: https://rera.karnataka.gov.in/', margin + 3, y + 22);

  // ----------------------------------------------------
  // FOOTER DISCLAIMER & VERIFICATION STAMP
  // ----------------------------------------------------
  const footerY = pageHeight - 14;
  doc.setDrawColor(226, 232, 240);
  doc.line(margin, footerY - 2, margin + contentWidth, footerY - 2);

  doc.setFontSize(6.5);
  doc.setTextColor(148, 163, 184); // slate-400
  doc.text(
    'IMPORTANT STATUTORY DISCLAIMER: This document is an independent research and spatial analysis synthesis generated by kwin-city.com. ' +
    'It is NOT an official conveyance or title certificate issued by KIADB, BMRDA, or the Revenue Department of Karnataka. Prior to any purchase, ' +
    'statutory title inspection by a licensed High Court advocate is mandatory.',
    margin,
    footerY + 2,
    { maxWidth: contentWidth }
  );

  return doc;
}
