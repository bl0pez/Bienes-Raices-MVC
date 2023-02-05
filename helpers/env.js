import path from 'path';
import url from 'url';
import dotenv from 'dotenv'; 

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const env = path.join(__dirname, '..', '.env');

export default function loadEnv() {
    dotenv.config({ path: env });
}