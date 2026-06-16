import { fetchCodolioStats } from '../../scripts/codolio-service.js';

export default async function handler(req, res) {
  try {
    const token = process.env.CODOLIO_TOKEN;
    if (!token) {
      return res.status(500).json({ error: 'CODOLIO_TOKEN not set' });
    }

    const data = await fetchCodolioStats(token);

    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');
    return res.status(200).json(data);
  } catch (err) {
    console.error('api/codolio/stats error:', err);
    const message = err instanceof Error ? err.message : 'Failed to fetch Codolio stats';
    return res.status(500).json({ error: message });
  }
}
