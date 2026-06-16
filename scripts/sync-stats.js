import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { fetchCodolioStats } from './codolio-service.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '..', '.env') });

export default async function syncStats() {
	const data = await fetchCodolioStats(process.env.CODOLIO_TOKEN);

	const outputDir = path.join(__dirname, '..', 'public', 'data');
	const outputFile = path.join(outputDir, 'stats.json');

	fs.mkdirSync(outputDir, { recursive: true });
	fs.writeFileSync(outputFile, JSON.stringify(data, null, 2));
}

const isDirectRun = process.argv[1] && path.resolve(process.argv[1]) === __filename;

if (isDirectRun) {
	syncStats().catch((error) => {
		console.error('Failed to sync Codolio stats:', error);
		process.exit(1);
	});
}
