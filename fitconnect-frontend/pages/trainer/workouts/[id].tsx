// pages/trainer/workouts/[id]/detail.tsx

import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import NavbarTrainer from '../../../components/NavbarTrainer';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function WorkoutPlanDetail() {
  const router = useRouter();
  const { id } = router.query;

  const [workout, setWorkout] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [expandedDays, setExpandedDays] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (!id) return;

    const fetchWorkout = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const res = await fetch(`http://localhost:3333/trainer/workouts/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (res.ok) {
          const data = await res.json();
          setWorkout(data);
        } else {
          console.error('Erro ao buscar plano de treino.');
        }
      } catch (error) {
        console.error('Erro de conexão:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkout();
  }, [id]);

  const calcularCalorias = (setsCount: number, peso: number = 70): number => {
    const MET = 6; // valor médio para musculação
    const tempoPorSerieMin = 0.5; // 30 segundos por série
    const totalMin = setsCount * tempoPorSerieMin;
    return Math.round(MET * peso * 0.0175 * totalMin);
  };

  const caloriasTotais = useMemo(() => {
    if (!workout || !Array.isArray(workout.workoutDays)) return 0;
    const peso = workout.patientPeso || 70;
    let totalSets = 0;

    workout.workoutDays.forEach((day: any) => {
      day.exercises?.forEach((ex: any) => {
        totalSets += ex.sets?.length || 0;
      });
    });

    return calcularCalorias(totalSets, peso);
  }, [workout]);

  const formatKcal = (kcal: number) => new Intl.NumberFormat('pt-BR').format(kcal) + ' kcal';
  const peso = workout?.patientPeso || 70;

  const toggleDay = (dayId: number) => {
    setExpandedDays(prev => {
      const updated = new Set(prev);
      if (updated.has(dayId)) {
        updated.delete(dayId);
      } else {
        updated.add(dayId);
      }
      return updated;
    });
  };

  if (loading) return <p className="text-center mt-10">Carregando plano de treino...</p>;
  if (!workout) return <p className="text-center mt-10">Plano não encontrado.</p>;

  return (
    <div className="min-h-screen bg-[#F0F9F7] flex flex-col">
      <NavbarTrainer />
      <div className="flex-grow flex items-start justify-center">
        <motion.div
          className="p-8 max-w-5xl w-full bg-white rounded-xl shadow"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold text-[#00B894] mb-6">
            Plano: {workout.title}
          </h1>

          <div className="mb-6 bg-[#E0F7F4] p-4 rounded shadow">
            <h2 className="font-semibold text-[#00B894] mb-4">Informações Gerais</h2>
            <p><strong>Descrição:</strong> {workout.description}</p>
            <p><strong>Paciente:</strong> {workout.patientName}</p>
            <p><strong>Peso:</strong> {peso} kg</p>
            <p><strong>Validade:</strong> {new Date(workout.validFrom).toLocaleDateString()} até {new Date(workout.validUntil).toLocaleDateString()}</p>
            <p><strong>Status:</strong> {workout.isActive ? 'Ativo' : 'Inativo'}</p>
            <p><strong>Estimativa Total de Calorias:</strong> {formatKcal(caloriasTotais)}</p>
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-[#00B894] mb-4">Dias de Treino</h2>
            {workout.workoutDays.length === 0 ? (
              <p className="text-gray-500">Nenhum dia de treino registrado.</p>
            ) : (
              workout.workoutDays.map((day: any) => {
                const seriesDoDia = day.exercises.reduce((acc: number, ex: any) => acc + (ex.sets?.length || 0), 0);
                const kcal = calcularCalorias(seriesDoDia, peso);
                const isExpanded = expandedDays.has(day.id);

                return (
                  <div key={day.id} className="bg-gray-100 p-4 rounded mb-4 shadow">
                    <div
                      className="flex justify-between items-center mb-2 cursor-pointer"
                      onClick={() => toggleDay(day.id)}
                    >
                      <h3 className="text-xl font-bold text-[#00B894]">
                        {day.dayOfWeek} - {day.muscleGroup}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600 text-right">{formatKcal(kcal)}</span>
                        {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </div>
                    </div>

                    {isExpanded && (
                      day.exercises.length === 0 ? (
                        <p className="text-gray-500">Nenhum exercício cadastrado.</p>
                      ) : (
                        <div className="grid grid-cols-1 gap-4">
                          {day.exercises.map((exercise: any) => (
                            <div key={exercise.id} className="bg-white p-3 rounded shadow-sm">
                              <p className="font-semibold">{exercise.name}</p>
                              <div className="grid grid-cols-2 gap-2 mt-2">
                                {exercise.sets.map((set: any) => (
                                  <div key={set.id} className="bg-gray-50 p-2 rounded">
                                    <p><strong>Série {set.setNumber}:</strong> {set.targetReps} reps / {set.targetLoad} kg</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      )
                    )}
                  </div>
                );
              })
            )}
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => router.push(`/trainer/workouts/${workout.id}/edit`)}
              className="bg-[#00B894] text-white px-6 py-2 rounded hover:bg-[#009f84] transition"
            >
              Editar Plano
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
