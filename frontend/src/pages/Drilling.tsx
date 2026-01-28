import { WorkoutHeatmap } from "@/components/Heatmap";
import { WorkoutProgress } from "@/components/WorkoutProgress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useWorkoutStats } from "@/hooks/use-workout-stats";
import { useWorkoutDays } from "@/hooks/use-workout-days";
import { Dumbbell, Flame, Percent, Plus, SendHorizontal, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export function Drilling() {
  const { count, loading } = useWorkoutStats();
  const { data: heatmapData, loading: heatmapLoading, error: heatmapError } = useWorkoutDays();

  return (
    <>
      <div className="relative mb-4">
        <SidebarTrigger className="absolute mt-0 left-0 top-1/2 -translate-y-1/2" />
        <h1 className="text-center text-2xl font-bold">Treinos</h1>
      </div>

      <hr />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
        <Card className="p-6">
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400">
              <Flame className="h-6 w-6" />
              <h3 className="font-semibold">Streak Atual</h3>
            </div>
            <div className="text-3xl font-bold text-orange-700 dark:text-orange-300">7</div>
            <p className="text-sm text-muted-foreground">Dias consecutivos</p>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
              <Trophy className="h-6 w-6" />
              <h3 className="font-semibold">Melhor Streak</h3>
            </div>
            <div className="text-3xl font-bold text-amber-700 dark:text-amber-300">10</div>
            <p className="text-sm text-muted-foreground">Dias consecutivos</p>
          </div>
        </Card>

        <Card className="p-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 dark:white">
              <Percent className="h-6 w-6" />
              <h3 className="font-semibold">Treinos no ano</h3>
            </div>
            <WorkoutProgress
              current={loading ? 0 : count}
              target={150}
              loading={loading}
            />
          </div>
        </Card>
      </div>
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Consistência</CardTitle>
          <CardDescription>Treinos ao longo do ano</CardDescription>
        </CardHeader>

        <CardContent className="w-full overflow-x-auto">
          {heatmapLoading ? (
            <div className="flex items-center justify-center h-32">
              <p className="text-muted-foreground">Carregando heatmap...</p>
            </div>
          ) : heatmapError ? (
            <div className="flex items-center justify-center h-32">
              <p className="text-destructive">{heatmapError}</p>
            </div>
          ) : (
            <div className="min-w-full">
              <WorkoutHeatmap data={heatmapData} />
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant={"outline"} className="mt-5">
            <Plus /> Cadastrar treino
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2"> <Dumbbell className="h-5 w-5"/> Cadastrar treino</DialogTitle>
            <DialogDescription>
              Preencha os dados abaixo para registrar um novo treino.
            </DialogDescription>
          </DialogHeader>
          <div className="no-scrollbar -mx-4 max-h-[50vh] overflow-y-auto px-4">
            <form>

            </form>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Enviar <SendHorizontal /></Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
