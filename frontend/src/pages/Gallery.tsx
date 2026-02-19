import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Camera, Plus, SendHorizontal, CheckCircle, XCircle, X, MoreVertical, Trash2, Pencil } from "lucide-react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { toast } from "sonner";
import { api } from "../../services/api";

// Componente de Toast de Sucesso com barra de progresso
const SuccessToast = ({ message, onDismiss }: { message: string; onDismiss: () => void }) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const duration = 4000;
    const interval = 50;
    const step = (100 / duration) * interval;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev - step;
        if (newProgress <= 0) {
          clearInterval(timer);
          return 0;
        }
        return newProgress;
      });
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative bg-background border rounded-lg p-4 shadow-lg overflow-hidden w-full">
      <div className="flex items-center gap-3">
        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
        <div className="flex-1">
          <div className="font-medium text-green-900 dark:text-green-100">Sucesso! ✅</div>
          <div className="text-sm text-green-700 dark:text-green-300">{message}</div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="h-6 w-6 p-0 hover:bg-green-100 dark:hover:bg-green-900"
          onClick={onDismiss}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-green-200 dark:bg-green-800">
        <div
          className="h-full bg-green-500 transition-all duration-50 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

// Componente de Toast de Erro com barra de progresso
const ErrorToast = ({ message, onDismiss }: { message: string; onDismiss: () => void }) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const duration = 4000;
    const interval = 50;
    const step = (100 / duration) * interval;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev - step;
        if (newProgress <= 0) {
          clearInterval(timer);
          return 0;
        }
        return newProgress;
      });
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative bg-background border rounded-lg p-4 shadow-lg overflow-hidden w-full">
      <div className="flex items-center gap-3">
        <XCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
        <div className="flex-1">
          <div className="font-medium text-red-900 dark:text-red-100">Erro! ❌</div>
          <div className="text-sm text-red-700 dark:text-red-300">{message}</div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="h-6 w-6 p-0 hover:bg-red-100 dark:hover:bg-red-900"
          onClick={onDismiss}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-red-200 dark:bg-red-800">
        <div
          className="h-full bg-red-500 transition-all duration-50 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export function Gallery() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [photoDate, setPhotoDate] = useState<string>('');
  const [photoDescription, setPhotoDescription] = useState<string>('');
  const [open, setOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const [editingPhoto, setEditingPhoto] = useState<any>(null);
  const [editDate, setEditDate] = useState<string>('');
  const [editDescription, setEditDescription] = useState<string>('');
  const [editOpen, setEditOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhotoDate(event.target.value);
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPhotoDescription(event.target.value);
  };

  const handleEditDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditDate(event.target.value);
  };

  const handleEditDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditDescription(event.target.value);
  };

  const openEditModal = (photo: any) => {
    setEditingPhoto(photo);
    // Formatar a data para o input de data (YYYY-MM-DD)
    if (photo.date) {
      const date = new Date(photo.date);
      setEditDate(date.toISOString().split('T')[0]);
    } else {
      setEditDate('');
    }
    setEditDescription(photo.description || '');
    setEditOpen(true);
  };

  const handleEditPhoto = async () => {
    if (!editingPhoto) return;

    setIsUpdating(true);

    try {
      const updateData: any = {};

      if (editDate) {
        updateData.date = editDate;
      }

      if (editDescription.trim()) {
        updateData.description = editDescription.trim();
      }

      const response = await api.put(`/api/photos/${editingPhoto._id}`, updateData);

      // Atualiza a foto na lista local
      setPhotos(photos.map(photo =>
        photo._id === editingPhoto._id ? { ...photo, ...response.data } : photo
      ));

      toast.custom((id) => (
        <SuccessToast
          message="Foto atualizada com sucesso!"
          onDismiss={() => toast.dismiss(id)}
        />
      ), {
        duration: 4000,
      });

      setEditOpen(false);
      setEditingPhoto(null);
      setEditDate('');
      setEditDescription('');

    } catch (error) {
      console.error('Erro ao atualizar foto:', error);
      toast.custom((id) => (
        <ErrorToast
          message="Erro ao atualizar a foto. Tente novamente."
          onDismiss={() => toast.dismiss(id)}
        />
      ), {
        duration: 4000,
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);

    // Toast customizado de loading com barra de progresso
    const toastId = toast.custom(() => (
      <div className="relative bg-background border rounded-lg p-4 shadow-lg overflow-hidden w-full">
        <div className="flex items-center gap-3">
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent"></div>
          <div>
            <div className="font-medium">Enviando foto...</div>
            <div className="text-sm text-muted-foreground">Fazendo upload da imagem</div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-muted">
          <div className="h-full bg-blue-500 transition-all duration-100 ease-linear animate-pulse"></div>
        </div>
      </div>
    ), {
      duration: Infinity, // Não remove automaticamente
    });

    try {
      const formData = new FormData();
      formData.append('photo', selectedFile);

      // Adiciona a data da foto se foi fornecida
      if (photoDate) {
        formData.append('date', photoDate);
      }

      // Adiciona a descrição da foto se foi fornecida
      if (photoDescription) {
        formData.append('description', photoDescription);
      }

      const response = await api.post('/api/photos/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Remove o toast de loading
      toast.dismiss(toastId);

      // Toast de sucesso com barra de progresso
      toast.custom((id) => (
        <SuccessToast
          message="Foto enviada com sucesso!"
          onDismiss={() => toast.dismiss(id)}
        />
      ), {
        duration: 4000,
      });

      setOpen(false);
      setSelectedFile(null);
      setPhotoDate('');
      setPhotoDescription('');

      // Recarrega as fotos para mostrar a nova imagem
      fetchPhotos();

      console.log('Upload successful:', response.data);
    } catch (error) {
      console.error('Upload error:', error);

      // Remove o toast de loading
      toast.dismiss(toastId);

      // Toast de erro com barra de progresso
      toast.custom((id) => (
        <ErrorToast
          message="Erro ao enviar a foto. Tente novamente."
          onDismiss={() => toast.dismiss(id)}
        />
      ), {
        duration: 4000,
      });

      setOpen(false);
    } finally {
      setIsUploading(false);
    }
  };

  const [photos, setPhotos] = useState<any[]>([]);
  const [loadingPhotos, setLoadingPhotos] = useState(true);

  // Buscar fotos ao carregar o componente
  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      setLoadingPhotos(true);
      const response = await api.get('/api/photos');
      setPhotos(response.data);
    } catch (error) {
      console.error('Erro ao buscar fotos:', error);
      toast.custom((id) => (
        <ErrorToast
          message="Erro ao carregar as fotos da galeria."
          onDismiss={() => toast.dismiss(id)}
        />
      ), {
        duration: 4000,
      });
    } finally {
      setLoadingPhotos(false);
    }
  };

  const deletePhoto = async (photoId: string) => {
    try {
      await api.delete(`/api/photos/${photoId}`);

      // Remove a foto da lista local
      setPhotos(photos.filter(photo => photo._id !== photoId));

      toast.custom((id) => (
        <SuccessToast
          message="Foto deletada com sucesso!"
          onDismiss={() => toast.dismiss(id)}
        />
      ), {
        duration: 4000,
      });
    } catch (error) {
      console.error('Erro ao deletar foto:', error);
      toast.custom((id) => (
        <ErrorToast
          message="Erro ao deletar a foto. Tente novamente."
          onDismiss={() => toast.dismiss(id)}
        />
      ), {
        duration: 4000,
      });
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Data não disponível';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getPhotoDate = (photo: any) => {
    // Prioriza o campo 'date' se existir, senão usa 'createdAt'
    return photo.date || photo.createdAt;
  };

  return (
    <>
      <div className="relative mb-4">
        <SidebarTrigger className="absolute mt-0 left-0 top-1/2 -translate-y-1/2" />
        <h1 className="text-center text-2xl font-bold"> nossas fotos :) </h1>
      </div>

      <hr />

      <div className="flex justify-center">
        <Card className="mt-6 mb-6">
          <div className="p-6 text-center space-y-4">
            <div className="flex flex-col items-center space-y-3">
              <div className="p-3 rounded-full bg-muted">
                <Camera className="h-6 w-6 text-muted-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">
                  Adicione novas fotos!
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Clique no botão abaixo para adicionar novas fotos
                </p>
              </div>
            </div>
            <AlertDialog open={open} onOpenChange={setOpen}>
              <AlertDialogTrigger asChild>
                <Button variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar foto
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-center">Adicionar nova foto</AlertDialogTitle>
                  <AlertDialogDescription className="text-center">
                    Selecione uma foto para fazer upload para a galeria.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="grid w-full max-w items-center gap-4">
                  <div className="space-y-2">
                    <label htmlFor="picture" className="text-sm font-medium">
                      Selecionar foto
                    </label>
                    <Input
                      className="max-w"
                      id="picture"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      disabled={isUploading}
                    />
                    {selectedFile && (
                      <p className="text-sm text-muted-foreground">
                        Arquivo selecionado: {selectedFile.name}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="photoDate" className="text-sm font-medium">
                      Data da foto (opcional)
                    </label>
                    <Input
                      id="photoDate"
                      type="date"
                      value={photoDate}
                      onChange={handleDateChange}
                      disabled={isUploading}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="photoDescription" className="text-sm font-medium">
                      Descrição da foto (opcional)
                    </label>
                    <Textarea
                      id="photoDescription"
                      placeholder="Descreva o que está acontecendo na foto..."
                      value={photoDescription}
                      onChange={handleDescriptionChange}
                      disabled={isUploading}
                      className="w-full min-h-[80px]"
                      maxLength={200}
                    />
                    <p className="text-xs text-muted-foreground">
                      Máximo 200 caracteres ({photoDescription.length}/200)
                    </p>
                  </div>
                </div>
                <AlertDialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-between sm:space-x-2">
                  <AlertDialogCancel
                    onClick={() => {
                      setSelectedFile(null);
                      setPhotoDate('');
                      setPhotoDescription('');
                    }}
                    disabled={isUploading}
                  >
                    Cancelar
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleUpload}
                    disabled={!selectedFile || isUploading}
                  >
                    {isUploading ? "Enviando..." : "Fazer Upload"}
                    <SendHorizontal />
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </Card>
      </div>

      {/* Modal de Edição */}
      <AlertDialog open={editOpen} onOpenChange={setEditOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center">Editar foto</AlertDialogTitle>
            <AlertDialogDescription className="text-center">
              Edite a data e descrição da foto.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="grid w-full max-w items-center gap-4">
            <div className="space-y-2">
              <label htmlFor="editDate" className="text-sm font-medium">
                Data da foto
              </label>
              <Input
                id="editDate"
                type="date"
                value={editDate}
                onChange={handleEditDateChange}
                disabled={isUpdating}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="editDescription" className="text-sm font-medium">
                Descrição da foto
              </label>
              <Textarea
                id="editDescription"
                placeholder="Descreva o que está acontecendo na foto..."
                value={editDescription}
                onChange={handleEditDescriptionChange}
                disabled={isUpdating}
                className="w-full min-h-[80px]"
                maxLength={200}
              />
              <p className="text-xs text-muted-foreground">
                Máximo 200 caracteres ({editDescription.length}/200)
              </p>
            </div>
          </div>
          <AlertDialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-between sm:space-x-2">
            <AlertDialogCancel
              onClick={() => {
                setEditOpen(false);
                setEditingPhoto(null);
                setEditDate('');
                setEditDescription('');
              }}
              disabled={isUpdating}
            >
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleEditPhoto}
              disabled={isUpdating}
            >
              {isUpdating ? "Atualizando..." : "Salvar alterações"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="content-center align-center">
        {loadingPhotos ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent"></div>
            <span className="ml-3 text-muted-foreground">Carregando fotos...</span>
          </div>
        ) : photos.length > 0 ? (
          <ResponsiveMasonry
            columnsCountBreakPoints={{ 900: 3, 600: 2, 300: 1 }}
          >
            <Masonry gutter="16px">
              {photos.map((photo, index) => (
                <div
                  key={photo._id || index}
                  className="relative group bg-white dark:bg-black p-4 rounded-lg transition-all duration-300 hover:-translate-y-2 cursor-pointer shadow-md hover:shadow-xl dark:shadow-white/10 dark:hover:shadow-white/20"
                >
                  <div className="mb-3 bg-neutral-100 dark:bg-neutral-800 p-1 rounded">
                    <img
                      src={`http://localhost:3000${photo.url}`}
                      alt={photo.originalName || `Foto ${index + 1}`}
                      className="w-full h-auto rounded object-cover"
                      loading="lazy"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(`http://localhost:3000${photo.url}`, '_blank');
                      }}
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-neutral-600 dark:text-neutral-300">
                        {formatDate(getPhotoDate(photo))}
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"

                            className="h-6 w-6 p-0 bg-transparent hover:bg-neutral-200 dark:hover:bg-neutral-700"
                          >
                            <MoreVertical className="h-3 w-3 text-black dark:text-white" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40">
                          <DropdownMenuItem
                            className="text-red-600 dark:text-red-400 cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              deletePhoto(photo._id);
                            }}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Excluir
                          </DropdownMenuItem>

                          <DropdownMenuItem
                            className="text-blue-600 dark:text-blue-400 cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              openEditModal(photo);
                            }}
                          >
                            <Pencil className="mr-2 h-4 w-4" />
                            Editar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    {photo.description && (
                      <div className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                        {photo.description}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </Masonry>
          </ResponsiveMasonry>
        ) : (
          <div className="flex justify-center py-12">
            <div className="text-center space-y-2">
              <h3 className="text-lg font-medium text-muted-foreground">Nenhuma foto encontrada</h3>
              <p className="text-sm text-muted-foreground">Adicione algumas fotos para começar sua galeria!</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
