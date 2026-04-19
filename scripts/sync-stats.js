import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default async function syncStats() {
	if (!process.env.CODOLIO_TOKEN) {
		throw new Error('CODOLIO_TOKEN is not set');
	}

	const response = await axios.get('https://api.codolio.com/user', {
		headers: {
			Authorization: process.env.CODOLIO_TOKEN,
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
