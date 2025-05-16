import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';

export default function MealPlanDetailPage() {
  const router = useRouter();
  const { mealPlanId } = router.query;
  const [mealPlan, setMealPlan] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const pdfRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mealPlanId) return;

    const fetchMealPlan = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const res = await fetch(`http://localhost:3333/patient/mealplans/${mealPlanId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) {
          const data = await res.json();
          setMealPlan(data);
        } else {
          console.error('Erro ao buscar plano alimentar.');
        }
      } catch (err) {
        console.error('Erro de conexão:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMealPlan();
  }, [mealPlanId]);

  const handleExportPDF = async () => {
    if (pdfRef.current) {
      const html2pdf = (await import('html2pdf.js')).default;

      html2pdf()
        .set({
          margin: 0.5,
          filename: `${mealPlan.title}.pdf`,
          html2canvas: { scale: 2 },
          jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        })
        .from(pdfRef.current)
        .save();
    }
  };

  if (loading) return <p className="text-center mt-10">Carregando plano alimentar...</p>;
  if (!mealPlan) return <p className="text-center mt-10">Plano alimentar não encontrado.</p>;

  return (
    <div className="min-h-screen bg-[#F0F9F7] p-6">
      <div className="max-w-5xl mx-auto">
        {/* Botões de ação */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => router.push('/nutrition')}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
          >
            ← Voltar
          </button>

          <button
            onClick={handleExportPDF}
            className="bg-[#00B894] text-white px-4 py-2 rounded hover:bg-[#009f84] transition"
          >
            📄 Exportar para PDF
          </button>
        </div>

        <div ref={pdfRef} className="bg-white p-6 rounded-lg shadow">
          <h1 className="text-3xl font-bold text-[#00B894] mb-4">{mealPlan.title}</h1>
          <p className="text-gray-700 mb-6">{mealPlan.description}</p>

          {mealPlan.meals?.length === 0 ? (
            <p className="text-gray-500">Nenhuma refeição cadastrada.</p>
          ) : (
            <div className="space-y-6">
              {mealPlan.meals
                .sort((a: any, b: any) => a.order - b.order)
                .map((meal: any) => (
                  <div key={meal.id} className="bg-[#F9F9F9] p-4 rounded-lg shadow-sm">
                    <h2 className="text-xl font-semibold text-[#00B894] mb-2">{meal.name}</h2>
                    {meal.items.length === 0 ? (
                      <p className="text-gray-500 text-sm">Nenhum alimento registrado.</p>
                    ) : (
                      <ul className="list-disc ml-6 text-gray-800">
                        {meal.items.map((item: any) => (
                          <li key={item.id}>
                            <strong>{item.foodName}</strong> — {item.quantity}
                            {item.notes && <span className="text-gray-500 italic"> ({item.notes})</span>}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
