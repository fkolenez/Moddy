import { useState, useEffect } from 'react';
import { api } from '../../services/api';

interface WorkoutDay {
    date: string;
    count: number;
}

interface UseWorkoutDaysReturn {
    data: WorkoutDay[];
    loading: boolean;
    error: string | null;
}

export function useWorkoutDays(): UseWorkoutDaysReturn {
    const [data, setData] = useState<WorkoutDay[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchWorkoutDays = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await api.get('/api/workoutsDays/all');

                const transformedData: WorkoutDay[] = response.data.map((day: any) => ({
                    date: day.date,
                    count: day.count
                }));

                setData(transformedData);
            } catch (err) {
                setError('Erro ao carregar dados do heatmap');
                console.error('Erro ao buscar workout days:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchWorkoutDays();
    }, []);

    return { data, loading, error };
}
