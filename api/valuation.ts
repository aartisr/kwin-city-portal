import { researchNotice, sendJson } from './_response';

export default function handler(req: any, res: any) {
  sendJson(res, {
    ...researchNotice,
    district: typeof req.query?.district === 'string' ? req.query.district : null,
    model: {
      metric: 'Portal-reported historical land CAGR',
      valuePercent: 14.2,
      period: '2020–2026',
      limitation: 'Historical and projected figures are scenario inputs, not a valuation, offer, guarantee, or investment recommendation.'
    }
  });
}
