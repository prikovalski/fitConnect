import { useRouter } from 'next/router';
import PrivateRoute from '../../components/PrivateRoute';
import BackButton from '../../components/BackButton';
import { Dumbbell } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

type WorkoutPlan = {
  id: number;
  title: string;
  description: string;
  validFrom: string;
  validUntil: string;
  trainer: {
    name: string;
  };
};

export default function TrainingDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [plan, setPlan] = useState<WorkoutPlan | null>(null);

  console.log('📍 ID DA URL:', id);

  useEffect(() => {
    if (!id || Array.isArray(id)) return;

    const token = localStorage.getItem('token');
    if (!token) return;

    fetch(`http://localhost:3333/workouts/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('📦 Plano recebido:', data);
        setPlan(data);
      })
      .catch((err) => {
        console.error('Erro ao buscar plano:', err);
        setPlan(null);
      });
  }, [id]);

  return (
    <PrivateRoute>
      <div className="min-h-screen bg-[#F0F9F7] py-12 px-4 flex flex-col items-center">
        <motion.div
          className="bg-white p-8 rounded-xl shadow-md w-full max-w-3xl"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <BackButton />
          <div className="flex items-center gap-4 mb-6">
            <Dumbbell className="text-[#00B894]" size={28} />
            <h1 className="text-2xl font-bold text-[#00B894]">Detalhes do Treino</h1>
          </div>

          {!plan ? (
            <p className="text-gray-600">Carregando plano de treino...</p>
          ) : (
            <>
              <p className="text-lg font-semibold text-[#00B894] mb-2">{plan.title}</p>
              <p className="text-gray-700 mb-2">{plan.description}</p>
              <p className="text-gray-600 text-sm mb-1">
                Validade: {new Date(plan.validFrom).toLocaleDateString()} até{' '}
                {new Date(plan.validUntil).toLocaleDateString()}
              </p>
              <p className="text-gray-600 text-sm">
                Treinador: {plan.trainer?.name || 'Desconhecido'}
              </p>
            </>
          )}
        </motion.div>
      </div>
    </PrivateRoute>
  );
}