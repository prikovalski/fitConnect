import { useRouter } from 'next/router';
import PrivateRoute from '../../components/PrivateRoute';
import BackButton from '../../components/BackButton';
import { Salad } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function NutritionDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [plan, setPlan] = useState<any>(null);

  useEffect(() => {
    if (!router.isReady || !id || Array.isArray(id)) return;

    const token = localStorage.getItem('token');
    if (!token) return;

    fetch(`http://localhost:3333/mealplans/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then(setPlan)
      .catch(() => setPlan(null));
  }, [router.isReady, id]);

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
            <Salad className="text-[#00B894]" size={28} />
            <h1 className="text-2xl font-bold text-[#00B894]">Plano Alimentar</h1>
          </div>

          {plan ? (
            <>
              <h2 className="text-xl font-semibold text-gray-800">{plan.title}</h2>
              <p className="text-gray-600 mb-2">{plan.description}</p>
              <p className="text-sm text-gray-500 mb-2">
                Validade: {new Date(plan.validFrom).toLocaleDateString()} até {new Date(plan.validUntil).toLocaleDateString()}
              </p>
              {plan.observations && (
                <p className="text-sm text-gray-700 italic mb-4">Observações: {plan.observations}</p>
              )}

              <div className="space-y-6 mt-6">
                {plan.meals && plan.meals.length > 0 ? (
                  plan.meals.map((meal: any) => (
                    <div key={meal.id} className="border border-gray-200 p-4 rounded-lg bg-[#F9FDFD]">
                      <h3 className="font-semibold text-[#00B894] mb-2">{meal.name}</h3>

                      {meal.items && meal.items.length > 0 ? (
                        <ul className="list-disc ml-5 text-sm text-gray-700 space-y-1">
                          {meal.items.map((item: any) => (
                            <li key={item.id}>
                              {item.foodName} — {item.quantity}
                              {item.notes && <span className="text-xs text-gray-500"> ({item.notes})</span>}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-gray-500 italic">Nenhum alimento adicionado a esta refeição.</p>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-600 italic mt-4">Este plano alimentar ainda não possui refeições cadastradas.</p>
                )}
              </div>
            </>
          ) : (
            <p className="text-gray-600">Carregando plano alimentar...</p>
          )}
        </motion.div>
      </div>
    </PrivateRoute>
  );
}