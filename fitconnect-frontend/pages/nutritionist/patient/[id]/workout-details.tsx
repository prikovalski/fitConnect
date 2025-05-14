// pages/nutritionist/patient/[id]/workouts/[workoutId]/detail.tsx

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import PrivateRoute from '../../../../components/PrivateRoute';
import BackButton from '../../../../components/BackButton';
import { motion } from 'framer-motion';
import { Dumbbell } from 'lucide-react';

export default function WorkoutDetailPage() {
  const router = useRouter();
  const { id, workoutId } = router.query;
  const [workout, setWorkout] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!router.isReady || !workoutId) return;

    const fetchWorkout = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const res = await fetch(`http://localhost:3333/trainer/workouts/${workoutId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) {
          const data = await res.json();
          setWorkout(data);
        } else {
          console.error('Erro ao buscar o plano de treino.');
        }
      } catch (err) {
        console.error('Erro ao conectar:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkout();
  }, [router.isReady, workoutId]);

  if (loading) return <p className="text-center mt-10">Carregando plano...</p>;
  if (!workout) return <p className="text-center mt-10">Plano de treino não encontrado.</p>;

  return (
    <PrivateRoute>
      <div className="min-h-screen bg-[#F0F9F7] py-12 px-4 flex flex-col items-center">
        <motion.div
          className="bg-white p-8 rounded-xl shadow-md w-full max-w-5xl"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <BackButton />

          <div className="flex items-center gap-3 mb-6">
            <Dumbbell className="text-[#00B894]" size={28} />
            <h1 className="text-2xl font-bold text-[#00B894]">
              Detalhes do Treino: {workout.title}
            </h1>
          </div>

          <div className="mb-6 bg-[#E0F7F4] p-4 rounded shadow">
            <p><strong>Descrição:</strong> {workout.description}</p>
            <p><strong>Validade:</strong> {new Date(workout.validFrom).toLocaleDateString()} até {new Date(workout.validUntil).toLocaleDateString()}</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#00B894] mb-4">Dias de Treino</h2>
            {workout.workoutDays.length === 0 ? (
              <p className="text-gray-500">Nenhum dia de treino registrado.</p>
            ) : (
              workout.workoutDays.map((day: any) => (
                <div key={day.id} className="bg-gray-100 p-4 rounded mb-4 shadow">
                  <h3 className="text-lg font-semibold text-[#00B894] mb-2">{day.dayOfWeek} - {day.muscleGroup}</h3>
                  {day.exercises.length === 0 ? (
                    <p className="text-gray-500">Sem exercícios registrados.</p>
                  ) : (
                    <ul className="space-y-3">
                      {day.exercises.map((ex: any) => (
                        <li key={ex.id} className="bg-white p-3 rounded shadow-sm">
                          <p className="font-semibold">{ex.name}</p>
                          <div className="grid grid-cols-2 gap-2 mt-2">
                            {ex.sets.map((set: any) => (
                              <div key={set.id} className="bg-gray-50 p-2 rounded">
                                <p><strong>Série {set.setNumber}:</strong> {set.targetReps} reps / {set.targetLoad} kg</p>
                              </div>
                            ))}
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </PrivateRoute>
  );
}
