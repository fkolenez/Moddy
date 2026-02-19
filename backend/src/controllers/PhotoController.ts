import { Request, Response } from 'express';
import Photo from '../models/Photos';

export const uploadPhoto = async (req: Request, res: Response) => {
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
};

export const getAllPhotos = async (req: Request, res: Response) => {
    try {
        const photos = await Photo.find().sort({ createdAt: -1 });
        res.json(photos);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar fotos' });
    }
};

export const updatePhoto = async (req: Request, res: Response) => {
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
            { new: true }
        );
        if (!updatedPhoto) {
            return res.status(404).json({ error: 'Foto não encontrada' });
        }
        res.json(updatedPhoto);
    } catch (error) {
        console.error('Erro ao atualizar foto:', error);
        res.status(500).json({ error: 'Erro ao atualizar foto' });
    }
};

export const deletePhoto = async (req: Request, res: Response) => {
    try {
        const photo = await Photo.findByIdAndDelete(req.params.id);
        if (!photo) {
            return res.status(404).json({ error: 'Foto não encontrada' });
        }
        // Aqui você poderia também deletar o arquivo físico se necessário
        res.json({ message: 'Foto deletada com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar foto' });
    }
};
