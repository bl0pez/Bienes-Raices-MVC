import multer from 'multer';
import path from 'path';
import url from 'url';
import { generarId } from '../helpers/tokens.js';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', 'public', 'uploads'));
    },
    filename: function (req, file, cb) {
        cb(null, generarId() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

export default upload;