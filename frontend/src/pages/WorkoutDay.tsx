import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Calendar, Dumbbell, TextAlignJustify, Trash, Trophy } from "lucide-react";
import { api } from "../../services/api.ts";
import { Button } from "@/components/ui/button.tsx";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type Workout = {
  _id: string;
  date: string;
  category: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

type WorkoutDayData = {
  _id: string;
  date: string;
  workouts: Workout[];
  count: number;
};

export function WorkoutDayPage() {
  const { date } = useParams();
  const [workoutDayData, setWorkoutDayData] = useState<WorkoutDayData | null>(null);
  const [loading, setLoading] = useState(true);

  // Função para formatar a data
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Função para formatar categoria
  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'academia': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'cardio': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'funcional': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  useEffect(() => {
    if (!date) return;

    const fetchWorkoutDay = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/api/workoutsDays/${date}`);
        setWorkoutDayData(response.data);
      } catch (err) {
        console.error('Erro ao buscar treinos do dia:', err);
        setWorkoutDayData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkoutDay();
  }, [date]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="relative mb-6 p-6 border-b">
        <SidebarTrigger className="absolute left-6 top-1/2 -translate-y-1/2" />
        <div className="text-center">
          <h1 className="text-3xl font-bold">Treinos do Dia</h1>
          {date && (
            <p className="text-muted-foreground text-lg mt-2 capitalize">
              {formatDate(date)}
            </p>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {loading && (
          <div className="space-y-4">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        )}

        {!loading && !workoutDayData && (
          <Card className="text-center p-12">
            <CardContent>
              <Calendar className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">Nenhum treino encontrado</h3>
              <p className="text-muted-foreground">
                Não há treinos registrados para esta data.
              </p>
            </CardContent>
          </Card>
        )}

        {!loading && workoutDayData && (
          <>
            {/* Resumo do dia */}
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 border-blue-200 dark:border-blue-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
                  <Trophy className="h-6 w-6" />
                  Resumo do Dia
                </CardTitle>
                <CardDescription>
                  Estatísticas dos treinos realizados
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                      {workoutDayData.count}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {workoutDayData.count === 1 ? 'Treino realizado' : 'Treinos realizados'}
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                      {workoutDayData.workouts.length}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {workoutDayData.workouts.length === 1 ? 'Exercício' : 'Exercícios'}
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                      {new Set(workoutDayData.workouts.map(w => w.category)).size}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {new Set(workoutDayData.workouts.map(w => w.category)).size === 1 ? 'Categoria' : 'Categorias'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold flex items-center gap-2">
                <Dumbbell className="h-6 w-6" />
                Treinos Realizados
              </h2>

              {workoutDayData.workouts.map((workout, index) => (
                <Card key={workout._id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <CardTitle className="flex items-center gap-2">
                          <Dumbbell className="h-5 w-5 text-muted-foreground" />
                          Treino #{index + 1}
                        </CardTitle>
                        <Badge className={getCategoryColor(workout.category)}>
                          {workout.category}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant={"ghost"} size="sm">
                              <TextAlignJustify className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuLabel>Ações</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                              <DropdownMenuItem className="text-destructive focus:text-destructive cursor-pointer border-destructive">
                                <Trash className="h-4 w-4 mr-2" />
                                Excluir treino
                              </DropdownMenuItem>
                            </DropdownMenuGroup>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground leading-relaxed">
                      {workout.description}
                    </p>
                    <div className="mt-4 pt-4 border-t">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex gap-2">
                          <span className="text-muted-foreground">Data:</span>
                          <span className="font-medium">
                            {new Date(workout.date).toLocaleDateString('pt-BR')}
                          </span>
                        </div>
                        <div className="flex justify-end gap-2">
                          <span className="text-muted-foreground">Registrado: </span>
                          <span className="font-medium">
                            {new Date(workout.createdAt).toLocaleDateString('pt-BR')}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
