import { useRouter } from 'next/router';
import PrivateRoute from '../../components/PrivateRoute';
import BackButton from '../../components/BackButton';
import { Dumbbell } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

type WorkoutSet = {
  id: number;
  setNumber: number;
  targetReps: number;
  targetLoad: number;
};

type WorkoutExercise = {
  id: number;
  name: string;
  order: number;
  sets: WorkoutSet[];
};

type WorkoutDay = {
  id: number;
  dayOfWeek: string;
  muscleGroup: string;
  exercises: WorkoutExercise[];
};

export default function TrainingDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [days, setDays] = useState<WorkoutDay[]>([]);
  const [loads, setLoads] = useState<Record<number, string>>({});
  const [lastLoads, setLastLoads] = useState<Record<number, number>>({});
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!router.isReady) return;
    if (!id || Array.isArray(id)) return;

    const token = localStorage.getItem('token');
    if (!token) return;

    // Buscar exercícios
    fetch(`http://localhost:3333/workouts/${id}/exercises`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setDays(data))
      .catch(() => setDays([]));

    // Buscar últimas cargas
    fetch(`http://localhost:3333/workout/logs/latest?planId=${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setLastLoads(data))
      .catch(() => setLastLoads({}));
  }, [router.isReady, id]);

  const handleLoadChange = (setId: number, value: string) => {
    setLoads((prev) => ({ ...prev, [setId]: value }));
  };

  const handleSubmit = async (exercise: WorkoutExercise) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    const payload = exercise.sets
      .filter((s) => loads[s.id])
      .map((s) => ({
        workoutSetId: s.id,
        actualLoad: parseFloat(loads[s.id]),
      }));

    if (payload.length === 0) {
      setMessage('Preencha pelo menos uma carga para salvar.');
      return;
    }

    const res = await fetch('http://localhost:3333/workout/logs/bulk', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      setMessage('Carga registrada com sucesso!');
    } else {
      setMessage('Erro ao registrar carga.');
    }
  };

  return (
    <PrivateRoute>
      <div className="min-h-screen bg-[#F0F9F7] py-12 px-4 flex flex-col items-center">
        <motion.div
          className="bg-white p-8 rounded-xl shadow-md w-full max-w-4xl"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <BackButton />
          <div className="flex items-center gap-4 mb-6">
            <Dumbbell className="text-[#00B894]" size={28} />
            <h1 className="text-2xl font-bold text-[#00B894]">Plano de Treino</h1>
          </div>

          {days.length === 0 ? (
            <p className="text-gray-600">Nenhum exercício cadastrado para este plano.</p>
          ) : (
            days.map((day) => (
              <div key={day.id} className="mb-8">
                <h2 className="text-xl font-semibold text-[#00B894] mb-2">
                  📅 {day.dayOfWeek} — {day.muscleGroup}
                </h2>

                {day.exercises.map((exercise) => (
                  <div key={exercise.id} className="mb-6 ml-4 border p-4 rounded-lg bg-[#F9FDFD]">
                    <p className="font-semibold text-gray-800 mb-2">{exercise.name}</p>
                    <ul className="ml-2 text-sm text-gray-700 space-y-2">
                      {exercise.sets.map((set) => (
                        <li key={set.id} className="flex items-center gap-2 flex-wrap">
                          Série {set.setNumber} ({set.targetReps} reps):
                          <input
                            type="number"
                            step="0.1"
                            min="0"
                            placeholder="kg"
                            value={loads[set.id] || ''}
                            onChange={(e) => handleLoadChange(set.id, e.target.value)}
                            className="border rounded px-2 py-1 w-24"
                          />
                          kg
                          {lastLoads[set.id] !== undefined && (
                            <span className="text-xs text-gray-500 ml-2">
                              Última carga: {lastLoads[set.id]} kg
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={() => handleSubmit(exercise)}
                      className="mt-3 bg-[#00B894] text-white px-4 py-1 rounded hover:bg-[#009f84] transition text-sm"
                    >
                      Salvar carga
                    </button>
                  </div>
                ))}
              </div>
            ))
          )}

          {message && (
            <p className="text-center text-sm mt-4 text-blue-600">{message}</p>
          )}
        </motion.div>
      </div>
    </PrivateRoute>
  );
}