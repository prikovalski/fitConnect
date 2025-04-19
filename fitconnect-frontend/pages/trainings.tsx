import PrivateRoute from '../components/PrivateRoute';
import BackButton from '../components/BackButton';
import { Dumbbell } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

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

type TokenPayload = {
  sub: number;
  email: string;
  role: string;
};

export default function Trainings() {
  const router = useRouter();
  const [plans, setPlans] = useState<WorkoutPlan[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    const decoded = jwtDecode<TokenPayload>(token);
    const patientId = decoded.sub;

    fetch(`http://localhost:3333/workouts/plans?patientId=${patientId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setPlans(data))
      .catch((err) => console.error('Erro ao buscar planos:', err));
  }, []);

  const handleClick = (id: number) => {
    router.push(`/trainings/${id}`);
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
            <Dumbbell className="text-[#00B894]" size={32} />
            <h1 className="text-3xl font-bold text-[#00B894]">Meus Treinos</h1>
          </div>

          <p className="text-gray-700 mb-6">
            Abaixo estão os planos de treino cadastrados pelos seus treinadores.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.id}
                onClick={() => handleClick(plan.id)}
                className="bg-[#F0F9F7] p-6 rounded-lg shadow hover:shadow-lg transition cursor-pointer"
              >
                <h2 className="text-lg font-semibold text-[#00B894] mb-2">
                  {plan.title}
                </h2>
                <p className="text-gray-600 text-sm mb-1">
                  Treinador: {plan.trainer?.name || 'Desconhecido'}
                </p>
                <p className="text-gray-600 text-sm">
                  Validade: {new Date(plan.validFrom).toLocaleDateString()} até{' '}
                  {new Date(plan.validUntil).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </PrivateRoute>
  );
}