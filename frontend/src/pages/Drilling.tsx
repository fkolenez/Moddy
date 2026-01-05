import { WorkoutHeatmap } from "@/components/Heatmap";
import MetricCard from "@/components/MetricCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SidebarTrigger } from "@/components/ui/sidebar";

// Treinos reais:
// Data: 01-01-2026
// Categoria: Cardio
// Descrição: Treino de bike 20km

// Data: 03-01-2026
// Categoria: Cardio
// Descrição: Treino de bike 25km


export function Drilling() {
    return (
        <>
            <div className="relative mb-4">
                <SidebarTrigger className="absolute mt-0 left-0 top-1/2 -translate-y-1/2" />
                <h1 className="text-center text-2xl font-bold">Treinos</h1>
            </div>

            <hr />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
                <MetricCard
                    title="Streak atual"
                    value="Dias consecutivos: 7 🔥"
                    subtitle="Maior sequencia: 10"
                />

                <MetricCard
                    title="Treinos no ano"
                    value="42 / 150"
                    subtitle="Meta anual"
                />
            </div>
            <Card className="mt-6">
                <CardHeader>
                    <CardTitle>Consistência</CardTitle>
                    <CardDescription>Treinos ao longo do ano</CardDescription>
                </CardHeader>

                <CardContent className="w-full">
                    <WorkoutHeatmap
                        data={[
                            { date: "2026-01-01", count: 1 },
                            { date: "2026-01-02", count: 1 },
                            { date: "2026-01-03", count: 2 },
                            { date: "2026-01-05", count: 1 },
                        ]}
                    />
                </CardContent>
            </Card>
        </>
    );
}
