// pages/trainer/students/[studentId]/workouts/[workoutId]/index.tsx

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import NavbarTrainer from '../../../../../../components/NavbarTrainer';
import { motion } from 'framer-motion';

export default function StudentWorkoutDetail() {
  const router = useRouter();
  const { studentId, workoutId } = router.query;

  const [workout, setWorkout] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [expandedDays, setExpandedDays] = useState<number[]>([]);
  const [expandedExercises, setExpandedExercises] = useState<number[]>([]);

  useEffect(() => {
    if (!router.isReady || !studentId || !workoutId) return;

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
          console.error('Erro ao buscar o treino.');
        }
      } catch (error) {
        console.error('Erro de conexão:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkout();
  }, [router.isReady, studentId, workoutId]);

  const toggleDay = (dayId: number) => {
    setExpandedDays(prev =>
      prev.includes(dayId) ? prev.filter(id => id !== dayId) : [...prev, dayId]
    );
  };

  const toggleExercise = (exerciseId: number) => {
    setExpandedExercises(prev =>
      prev.includes(exerciseId) ? prev.filter(id => id !== exerciseId) : [...prev, exerciseId]
    );
  };

  if (loading) return <p className="text-center mt-10">Carregando treino...</p>;
  if (!workout) return <p className="text-center mt-10">Treino não encontrado.</p>;

  return (
    <div className="min-h-screen bg-[#F0F9F7] flex flex-col">
      <NavbarTrainer />
      <div className="flex-grow flex items-start justify-center p-4">
        <motion.div
          className="mt-8 p-6 max-w-5xl w-full bg-white rounded-xl shadow"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold text-[#00B894] mb-6">
            Plano: {workout.title}
          </h1>

          <div className="bg-[#E0F7F4] p-4 rounded mb-8">
            <h2 className="font-semibold text-[#00B894] mb-2">Informações</h2>
            <p><strong>Descrição:</strong> {workout.description}</p>
            <p><strong>Paciente:</strong> {workout.patientName}</p>
            <p><strong>Validade:</strong> {new Date(workout.validFrom).toLocaleDateString()} até {new Date(workout.validUntil).toLocaleDateString()}</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#00B894] mb-4">Dias de Treino</h2>
            {workout.workoutDays.length === 0 ? (
              <p className="text-gray-500">Nenhum dia registrado.</p>
            ) : (
              workout.workoutDays.map((day: any) => (
                <div key={day.id} className="bg-gray-100 rounded p-4 mb-4 shadow-sm">
                  <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => toggleDay(day.id)}
                  >
                    <h3 className="text-xl font-bold text-[#00B894]">{day.dayOfWeek} - {day.muscleGroup}</h3>
                    <span className="text-[#00B894]">{expandedDays.includes(day.id) ? '▲' : '▼'}</span>
                  </div>

                  {expandedDays.includes(day.id) && (
                    <div className="mt-4">
                      {day.exercises.length === 0 ? (
                        <p className="text-gray-500 mt-2">Nenhum exercício registrado.</p>
                      ) : (
                        day.exercises.map((exercise: any) => (
                          <div key={exercise.id} className="bg-white p-3 rounded mb-2 shadow-sm">
                            <div
                              className="flex justify-between items-center cursor-pointer"
                              onClick={() => toggleExercise(exercise.id)}
                            >
                              <p className="font-semibold">{exercise.name}</p>
                              <span className="text-[#00B894]">{expandedExercises.includes(exercise.id) ? '▲' : '▼'}</span>
                            </div>

                            {expandedExercises.includes(exercise.id) && (
                              <div className="grid grid-cols-2 gap-2 mt-3">
                                {exercise.sets.map((set: any) => (
                                  <div key={set.id} className="bg-gray-50 p-2 rounded">
                                    <p><strong>Série {set.setNumber}:</strong> {set.targetReps} reps / {set.targetLoad} kg</p>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </div>
              ))
            )}
            <div className="flex justify-end mt-6">
              <button
                onClick={() => router.push(`/trainer/workouts/${workout.id}/edit`)}
                className="bg-[#00B894] text-white px-6 py-2 rounded hover:bg-[#009f84] transition"
              >
                ✏️ Editar Treino
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
