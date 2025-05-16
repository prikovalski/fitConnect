import { useEffect, useState } from 'react';
import PrivateRoute from '../components/PrivateRoute';
import BackButtonPatient from '../components/BackButtonPatient';
import { Salad } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

export default function Nutrition() {
  const router = useRouter();
  const [plans, setPlans] = useState<any[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId'); 

    if (!token || !userId) return;

    fetch(`http://localhost:3333/mealplans?patientId=${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then(setPlans)
      .catch(() => setPlans([]));
  }, []);

  const goToDetails = (id: number) => {
    router.push(`/nutrition-${id}`);
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
          <BackButtonPatient />
          <div className="flex items-center gap-4 mb-6">
            <Salad className="text-[#00B894]" size={32} />
            <h1 className="text-3xl font-bold text-[#00B894]">Plano Alimentar</h1>
          </div>

          <p className="text-gray-700 mb-6">
            Veja aqui os planos alimentares criados pelos seus nutricionistas, com refeições organizadas por horário.
          </p>

          {plans.length === 0 ? (
            <p className="text-gray-600 text-sm">Nenhum plano alimentar disponível.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className="cursor-pointer hover:bg-gray-100 p-4 rounded"
                  onClick={() => router.push(`/patient/meal-plans/${plan.id}`)}
                >
                  <h3 className="text-lg font-bold text-[#00B894]">{plan.title}</h3>
                  <p className="text-sm text-gray-600">{plan.description}</p>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </PrivateRoute>
  );
}