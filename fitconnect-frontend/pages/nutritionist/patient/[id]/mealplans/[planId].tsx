import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import PrivateRoute from '../../../../../components/PrivateRoute';
import BackButton from '../../../../../components/BackButton';
import { motion } from 'framer-motion';

export default function MealPlanDetail() {
  const router = useRouter();
  const { id, planId } = router.query;
  const [plan, setPlan] = useState<any>(null);

  useEffect(() => {
    if (!router.isReady || !planId) return;

    const token = localStorage.getItem('token');
    fetch(`http://localhost:3333/mealplans/${planId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(setPlan)
      .catch(() => setPlan(null));
  }, [router.isReady, planId]);

  if (!plan) return <p className="text-center mt-10">Carregando plano alimentar...</p>;

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
          <h1 className="text-2xl font-bold text-[#00B894] mb-2">{plan.title}</h1>
          <p className="text-sm text-gray-600 mb-4">
            Validade: {new Date(plan.validFrom).toLocaleDateString()} até {new Date(plan.validUntil).toLocaleDateString()}
          </p>
          <p className="mb-6">{plan.description}</p>

          {plan.instructions && (
            <div className="mb-6 p-4 bg-[#F0F9F7] rounded">
              <h2 className="font-semibold mb-2">Instruções:</h2>
              <p>{plan.instructions}</p>
            </div>
          )}

          <h2 className="text-xl font-semibold text-[#00B894] mb-4">Refeições</h2>
          {plan.meals.map(meal => (
            <div key={meal.id} className="mb-6 border p-4 rounded">
              <h3 className="text-lg font-bold">{meal.name} (Ordem: {meal.order})</h3>
              {meal.items.length > 0 ? (
                <ul className="list-disc list-inside mt-2">
                  {meal.items.map(item => (
                    <li key={item.id}>
                      {item.foodName} - {item.quantity} {item.notes && `(${item.notes})`}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500">Nenhum alimento cadastrado.</p>
              )}
            </div>
          ))}

          {/* BOTÃO DE EDIÇÃO */}
          <button
            onClick={() => router.push(`/nutritionist/patient/${id}/mealplans/${planId}/edit`)}
            className="mt-6 bg-[#00B894] text-white px-6 py-2 rounded hover:bg-[#009f84] transition"
          >
            ✏️ Editar Plano
          </button>
        </motion.div>
      </div>
    </PrivateRoute>
  );
}
