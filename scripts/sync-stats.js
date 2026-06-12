import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '..', '.env') });

function normalizeBearerToken(token) {
	const trimmed = typeof token === 'string' ? token.trim() : '';
	if (!trimmed) return '';
	return trimmed.toLowerCase().startsWith('bearer ') ? trimmed : `Bearer ${trimmed}`;
}

export default async function syncStats() {
	const authorization = normalizeBearerToken(process.env.CODOLIO_TOKEN);

	if (!authorization) {
		throw new Error('CODOLIO_TOKEN is not set');
	}

	const response = await axios.get('https://api.codolio.com/user', {
		headers: {
			Authorization: authorization,
		},
	});

	const outputDir = path.join(__dirname, '..', 'public', 'data');
	const outputFile = path.join(outputDir, 'stats.json');

	fs.mkdirSync(outputDir, { recursive: true });
	fs.writeFileSync(outputFile, JSON.stringify(response.data, null, 2));
}

const isDirectRun = process.argv[1] && path.resolve(process.argv[1]) === __filename;

if (isDirectRun) {
	syncStats().catch((error) => {
		console.error('Failed to sync Codolio stats:', error);
		process.exit(1);
	});
}
