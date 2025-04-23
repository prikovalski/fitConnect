import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import PrivateRoute from '../../../../../components/PrivateRoute';
import BackButton from '../../../../../components/BackButton';
import { motion } from 'framer-motion';
import jsPDF from 'jspdf';

export default function MealPlanDetail() {
  const router = useRouter();
  const { id, planId } = router.query;
  const [plan, setPlan] = useState<any>(null);

  const generatePDF = () => {
    const doc = new jsPDF();
  
    // 🎨 Cabeçalho
    doc.setFontSize(20);
    doc.setTextColor('#00B894');
    doc.text('FitConnect - Plano Alimentar', 10, 15);
  
    doc.setFontSize(10);
    doc.setTextColor(0);
  
    // Aqui você pode substituir por dados reais se tiver:
    const patientName = plan.patientName || 'Paciente';
    const nutritionistName = plan.nutritionistName || 'Nutricionista';
  
    doc.text(`Paciente: ${patientName}`, 10, 22);
    doc.text(`Nutricionista: ${nutritionistName}`, 10, 27);
    doc.text(`Emitido em: ${new Date().toLocaleDateString()}`, 150, 27);
  
    // 🔹 Informações do Plano
    let y = 35;
    doc.setDrawColor('#00B894');
    doc.line(10, y, 200, y);
  
    y += 10;
    doc.setFontSize(14);
    doc.setTextColor('#00B894');
    doc.text(plan.title, 10, y);
  
    doc.setFontSize(12);
    doc.setTextColor(0);
    y += 8;
    doc.text(`Descrição: ${plan.description}`, 10, y);
    y += 8;
    doc.text(`Validade: ${new Date(plan.validFrom).toLocaleDateString()} até ${new Date(plan.validUntil).toLocaleDateString()}`, 10, y);
  
    if (plan.instructions) {
      y += 8;
      doc.text(`Instruções: ${plan.instructions}`, 10, y);
    }
  
    //Listagem de Refeições
    y += 12;
    doc.setFontSize(14);
    doc.setTextColor('#00B894');
    doc.text('Refeições', 10, y);
  
    plan.meals.forEach((meal) => {
      y += 10;
      if (y > 270) {  // Controle de quebra de página
        doc.addPage();
        y = 20;
      }
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.setTextColor(0);
      doc.text(`${meal.order} - ${meal.name}`, 10, y);
  
      meal.items.forEach(item => {
        y += 8;
        if (y > 270) {
          doc.addPage();
          y = 20;
        }
        doc.setFont('helvetica', 'normal');
        doc.text(`• ${item.foodName} - ${item.quantity} ${item.notes ? '(' + item.notes + ')' : ''}`, 15, y);
      });
  
      y += 5;
      doc.setDrawColor(200);
      doc.line(10, y, 200, y);
    });
  
    //Rodapé
    doc.setFontSize(10);
    doc.text('Plano gerado pelo FitConnect — www.fitconnect.com', 10, 290);
  
    doc.save(`Plano_Alimentar_${plan.title}.pdf`);
  };
  
  

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

          {plan.observations && (
            <div className="mb-6 p-4 bg-[#F0F9F7] rounded">
              <h2 className="font-semibold mb-2">Instruções:</h2>
              <p>{plan.observations}</p>
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
          <button
            onClick={generatePDF}
            className="mt-4 bg-[#00B894] text-white px-4 py-2 rounded hover:bg-[#009f84] transition"
          >
            📄 Gerar PDF do Plano
          </button>
        </motion.div>
      </div>
      <div id="pdf-content" className="hidden" style={{ width: '800px', padding: '20px', backgroundColor: '#fff' }}>
        <h1>{plan.title}</h1>
        <p>Descrição: {plan.description}</p>
        <p>Validade: {new Date(plan.validFrom).toLocaleDateString()} até {new Date(plan.validUntil).toLocaleDateString()}</p>
        {plan.observations && <p><strong>Instruções:</strong> {plan.observations}</p>}

        <h2>Refeições:</h2>
        {plan.meals.map(meal => (
          <div key={meal.id}>
            <h3>{meal.order} - {meal.name}</h3>
            <ul>
              {meal.items.map(item => (
                <li key={item.id}>{item.foodName} - {item.quantity} {item.notes && `(${item.notes})`}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

    </PrivateRoute>
  );
}
