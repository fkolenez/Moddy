import { Progress } from "@/components/ui/progress";

interface WorkoutProgressProps {
    current: number;
    target: number;
    loading?: boolean;
}

export function WorkoutProgress({ current, target, loading = false }: WorkoutProgressProps) {
    const percentage = loading ? 0 : Math.min((current / target) * 100, 100);

    return (
        <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
                <span className="font-medium">
                    {loading ? "..." : `${current}/${target}`}
                </span>
            </div>
            <Progress value={percentage} className="h-2" />
            <div className="text-xs text-muted-foreground">
                {loading ? "Carregando..." : `${percentage.toFixed(1)}% da meta`}
            </div>
        </div>
    );
}
