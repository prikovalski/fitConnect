import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import PrivateRoute from '../../../../components/PrivateRoute';
import BackButton from '../../../../components/BackButton';
import { Dumbbell } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PatientWorkouts() {
  const router = useRouter();
  const { id } = router.query;
  const [workouts, setWorkouts] = useState<any[]>([]);
  const [patientName, setPatientName] = useState<string>('');

  useEffect(() => {
    if (!router.isReady || !id || Array.isArray(id)) return;

    const token = localStorage.getItem('token');
    if (!token) return;

    const fetchWorkouts = async () => {
      try {
        const res = await fetch(`http://localhost:3333/nutritionist/patient/${id}/workouts`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setWorkouts(data.workoutPlans || []);
        setPatientName(data.patientName || '');
      } catch (error) {
        console.error('Erro ao buscar treinos do paciente:', error);
      }
    };

    fetchWorkouts();
  }, [router.isReady, id]);

  const handleWorkoutClick = (workoutId: number) => {
    router.push(`/nutritionist/patient/${id}/workouts/${workoutId}/detail`);
  };

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
              Treinos Ativos de {patientName || 'Paciente'}
            </h1>
          </div>

          {workouts.length === 0 ? (
            <p className="text-gray-600 text-center">Nenhum treino ativo encontrado.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {workouts.map((workout) => (
                <div
                  key={workout.id}
                  onClick={() => handleWorkoutClick(workout.id)}
                  className="bg-[#F0F9F7] p-6 rounded-lg shadow hover:shadow-lg transition cursor-pointer"
                >
                  <h2 className="text-lg font-semibold text-[#00B894] mb-2">{workout.title}</h2>
                  <p className="text-sm text-gray-600 mb-2">Descrição: {workout.description}</p>
                  <p className="text-sm text-gray-600">
                    Validade: {new Date(workout.validFrom).toLocaleDateString()} até {new Date(workout.validUntil).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </PrivateRoute>
  );
}
