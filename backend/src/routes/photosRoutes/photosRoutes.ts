import express from 'express';
import multer from 'multer';
import { extname } from 'path';
import Photo from '../../models/Photos.ts';

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

router.post('/upload', upload.single('photo'), async (req, res) => {
  const file = req.file;
  const { date, description } = req.body;

  if (!file) {
    return res.status(400).json({ error: 'Nenhum arquivo foi enviado' });
  }

  const photo = await Photo.create({
    filename: file.filename,
    originalName: file.originalname,
    mimeType: file.mimetype,
    size: file.size,
    url: `/uploads/photos/${file.filename}`,
    date: date ? new Date(date) : undefined,
    description: description || undefined
  });

  res.json(photo);
});

// Rota para buscar todas as fotos
router
  .get('/', async (req, res) => {
    try {
      const photos = await Photo.find().sort({ createdAt: -1 }); // Mais recentes primeiro
      res.json(photos);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar fotos' });
    }
  })

  .put('/:id', async (req, res) => {
    try {
      const { date, description } = req.body;
      const photoId = req.params.id;

      const updateData: any = {};

      if (date) {
        updateData.date = new Date(date);
      }

      if (description !== undefined) {
        updateData.description = description || undefined;
      }

      const updatedPhoto = await Photo.findByIdAndUpdate(
        photoId,
        updateData,
        { new: true } // Retorna o documento atualizado
      );

      if (!updatedPhoto) {
        return res.status(404).json({ error: 'Foto não encontrada' });
      }

      res.json(updatedPhoto);
    } catch (error) {
      console.error('Erro ao atualizar foto:', error);
      res.status(500).json({ error: 'Erro ao atualizar foto' });
    }
  })

  .delete('/:id', async (req, res) => {
    try {
      const photo = await Photo.findByIdAndDelete(req.params.id);
      if (!photo) {
        return res.status(404).json({ error: 'Foto não encontrada' });
      }

      // Aqui você poderia também deletar o arquivo físico se necessário
      // const fs = require('fs');
      // const filePath = path.join('uploads/photos', photo.filename);
      // if (fs.existsSync(filePath)) {
      //   fs.unlinkSync(filePath);
      // }

      res.json({ message: 'Foto deletada com sucesso' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar foto' });
    }
  });

export default router;
