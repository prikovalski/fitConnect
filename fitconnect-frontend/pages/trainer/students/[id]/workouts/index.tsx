// pages/trainer/students/[patientId]/workouts/index.tsx

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import NavbarTrainer from '../../../../../components/NavbarTrainer';
import BackButton from '../../../../../components/BackButton';

export default function StudentWorkoutsPage() {
  const router = useRouter();
  const { patientId } = router.query;
  const [workouts, setWorkouts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [patientName, setPatientName] = useState('');

  useEffect(() => {
    if (!router.isReady || !patientId) return;

    const fetchWorkouts = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const res = await fetch(`http://localhost:3333/trainer/patient/${patientId}/workouts`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) {
          const data = await res.json();
          setWorkouts(data.workouts || []);
          setPatientName(data.patientName || '');
        } else {
          console.error('Erro ao buscar treinos.');
        }
      } catch (err) {
        console.error('Erro de conexão:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, [router.isReady, patientId]);

  if (loading) return <p className="text-center mt-10">Carregando treinos...</p>;

  return (
    <div className="min-h-screen bg-[#F0F9F7] flex flex-col">
      <NavbarTrainer />
      <div className="flex-grow px-4 py-6 flex flex-col items-center">
        <motion.div
          className="w-full max-w-4xl bg-white p-6 rounded-xl shadow"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <BackButton />
          <h1 className="text-2xl font-bold text-[#00B894] mb-6">
            Treinos de {patientName || 'Aluno'}
          </h1>

          {workouts.length === 0 ? (
            <p className="text-gray-600">Nenhum treino encontrado.</p>
          ) : (
            <div className="grid gap-4">
              {workouts.map((workout) => (
                <div
                  key={workout.id}
                  className="bg-[#F0F9F7] p-4 rounded shadow hover:shadow-lg transition cursor-pointer"
                  onClick={() => router.push(`/trainer/workouts/${workout.id}/detail`)}
                >
                  <h2 className="text-lg font-semibold text-[#00B894]">{workout.title}</h2>
                  <p className="text-sm text-gray-700">Validade: {new Date(workout.validFrom).toLocaleDateString()} até {new Date(workout.validUntil).toLocaleDateString()}</p>
                  <p className="text-sm text-gray-600">Status: {workout.isActive ? 'Ativo' : 'Inativo'}</p>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
