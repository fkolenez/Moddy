import { useState, useEffect } from 'react';
import { api } from '../../services/api';

interface WorkoutStats {
    count: number;
    loading: boolean;
    error: string | null;
}

export function useWorkoutStats(): WorkoutStats {
    const [count, setCount] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchWorkoutCount = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await api.get('/api/workouts/count');
                setCount(response.data.count || 0);
            } catch (err) {
                setError('Erro ao carregar estatísticas de treinos');
                console.error('Erro ao buscar contagem de treinos:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchWorkoutCount();
    }, []);

    return { count, loading, error };
}
