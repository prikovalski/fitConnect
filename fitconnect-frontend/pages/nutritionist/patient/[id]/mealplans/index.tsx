import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import PrivateRoute from '../../../../../components/PrivateRoute';
import BackButton from '../../../../../components/BackButton';
import { motion } from 'framer-motion';

export default function MealPlansList() {
  const router = useRouter();
  const { id } = router.query;
  const [plans, setPlans] = useState<any[]>([]);

  useEffect(() => {
    if (!router.isReady || !id) return;

    const token = localStorage.getItem('token');
    fetch(`http://localhost:3333/mealplans/patient/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(setPlans)
      .catch(() => setPlans([]));
  }, [router.isReady, id]);

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
          <h1 className="text-2xl font-bold text-[#00B894] mb-6">Planos Alimentares</h1>

          {plans.length > 0 ? (
            <div className="grid gap-4">
              {plans.map(plan => (
                <div key={plan.id} className="border p-4 rounded shadow-sm">
                  <h2 className="text-lg font-semibold text-[#00B894]">{plan.title}</h2>
                  <p className="text-sm text-gray-600 mb-2">
                    {new Date(plan.validFrom).toLocaleDateString()} até {new Date(plan.validUntil).toLocaleDateString()}
                  </p>
                  <p className={`text-sm ${plan.isActive ? 'text-green-600' : 'text-red-500'}`}>
                    {plan.isActive ? 'Ativo' : 'Inativo'}
                  </p>
                  <button
                    onClick={() => router.push(`/nutritionist/patient/${id}/mealplans/${plan.id}`)}
                    className="mt-2 text-[#00B894] hover:underline text-sm"
                  >
                    Visualizar Plano
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">Nenhum plano encontrado para este paciente.</p>
          )}
        </motion.div>
      </div>
    </PrivateRoute>
  );
}