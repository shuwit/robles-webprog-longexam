import multer from 'multer';
import { HttpStatus } from '../config/constants.js';

const storage = multer.memoryStorage();

const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
      return;
    }

    cb(new Error('Only JPEG, PNG, and WebP images are allowed.'));
  },
});

const startsWith = (buffer, bytes) =>
  bytes.every((byte, index) => buffer[index] === byte);

export const isRealImage = (buffer = Buffer.alloc(0)) => {
  if (buffer.length < 12) {
    return false;
  }

  const jpeg = startsWith(buffer, [0xff, 0xd8, 0xff]);
  const png = startsWith(buffer, [0x89, 0x50, 0x4e, 0x47]);
  const webp =
    buffer.toString('ascii', 0, 4) === 'RIFF' &&
    buffer.toString('ascii', 8, 12) === 'WEBP';

  return jpeg || png || webp;
};

export const uploadProductImageFile = (req, res, next) => {
  upload.single('image')(req, res, (error) => {
    if (error) {
      if (error.code === 'LIMIT_FILE_SIZE') {
        return res.status(413).json({
          message: 'Image must be 5 MB or smaller.',
        });
      }

      return res.status(HttpStatus.BAD_REQUEST).json({
        message: error.message || 'Only image files are allowed.',
      });
    }

    if (req.file && !isRealImage(req.file.buffer)) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'File is not a valid JPEG, PNG, or WebP image.',
      });
    }

    next();
  });
};

export default upload;
