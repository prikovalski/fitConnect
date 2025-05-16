import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function MealPlanDetailPage() {
  const router = useRouter();
  const { mealPlanId } = router.query;

  const [mealPlan, setMealPlan] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!mealPlanId) return;

    const fetchMealPlan = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const res = await fetch(`http://localhost:3333/patient/mealplans/${mealPlanId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          setMealPlan(data);
        } else {
          console.error('Erro ao buscar plano alimentar.');
        }
      } catch (error) {
        console.error('Erro de conexão:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMealPlan();
  }, [mealPlanId]);

  if (loading) return <p className="text-center mt-10">Carregando dieta...</p>;
  if (!mealPlan) return <p className="text-center mt-10">Plano alimentar não encontrado.</p>;

  return (
    <div className="min-h-screen bg-[#F0F9F7] flex flex-col">
      <div className="p-8 max-w-5xl mx-auto">
        <motion.div
          className="bg-white p-8 rounded-xl shadow-md"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold text-[#00B894] mb-4">{mealPlan.title}</h1>

          <p className="text-gray-700 mb-2"><strong>Descrição:</strong> {mealPlan.description}</p>
          <p className="text-gray-500 mb-4">
            Validade: {new Date(mealPlan.validFrom).toLocaleDateString()} até {new Date(mealPlan.validUntil).toLocaleDateString()}
          </p>

          {mealPlan.meals.map((meal: any) => (
            <div key={meal.id} className="mb-6">
              <h2 className="text-xl font-semibold text-[#00B894] mb-2">{meal.name}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {meal.items.map((item: any) => (
                  <div key={item.id} className="bg-gray-100 p-3 rounded-lg shadow-sm">
                    <p className="font-semibold">{item.foodName}</p>
                    <p className="text-sm text-gray-600">{item.quantity}</p>
                    {item.notes && (
                      <p className="text-xs text-gray-500 mt-1">{item.notes}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
