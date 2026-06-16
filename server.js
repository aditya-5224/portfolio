import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { fetchCodolioStats } from './scripts/codolio-service.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
const port = Number(process.env.PORT || 3001);
const distDir = path.join(__dirname, 'dist');
const publicDir = path.join(__dirname, 'public');

app.get('/api/codolio/stats', async (_req, res) => {
	try {
		const data = await fetchCodolioStats(process.env.CODOLIO_TOKEN);
		res.setHeader('Cache-Control', 'no-store');
		res.json(data);
	} catch (error) {
		const message = error instanceof Error ? error.message : 'Failed to load Codolio stats';
		res.status(500).json({ error: message });
	}
});

if (fs.existsSync(distDir)) {
	app.use(express.static(distDir));
	app.get('*', (_req, res) => {
		res.sendFile(path.join(distDir, 'index.html'));
	});
} else {
	app.use(express.static(publicDir));
	app.get('*', (_req, res) => {
		res.status(404).send('Build the app first with npm run build.');
	});
}

app.listen(port, () => {
	console.log(`Portfolio server listening on http://localhost:${port}`);
});
