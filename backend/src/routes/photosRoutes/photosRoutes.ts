import express from 'express';
import multer from 'multer';
import { extname } from 'path';
import Photo from '../../models/Photos.ts';
import { uploadPhoto, getAllPhotos, updatePhoto, deletePhoto } from '../../controllers/PhotoController';

const router = express.Router();

const storage = multer.diskStorage({
  destination: 'uploads/photos',
  filename: (req, file, cb) => {
    const ext = extname(file.originalname);
    cb(null, `${Date.now()}${ext}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Arquivo inválido'));
    }
    cb(null, true);
  }
});

router.post('/upload', upload.single('photo'), uploadPhoto);

// Rota para buscar todas as fotos
router
  .get('/', getAllPhotos)
  .put('/:id', updatePhoto)
  .delete('/:id', deletePhoto);

export default router;
