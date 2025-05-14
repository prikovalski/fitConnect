import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import PrivateRoute from '../../../../../../components/PrivateRoute';
import BackButton from '../../../../../../components/BackButton';
import { motion } from 'framer-motion';

export default function EditMealPlan() {
  const router = useRouter();
  const { id, planId } = router.query;

  const [form, setForm] = useState({
    title: '',
    description: '',
    validFrom: '',
    validUntil: '',
    observations: ''
  });
  const [meals, setMeals] = useState<any[]>([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!router.isReady || !planId) return;

    const token = localStorage.getItem('token');
    fetch(`http://localhost:3333/mealplans/${planId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => {
        setForm({
          title: data.title,
          description: data.description,
          validFrom: data.validFrom.slice(0,10),
          validUntil: data.validUntil.slice(0,10),
          observations: data.observations || ''
        });
        setMeals(data.meals);
      });
  }, [router.isReady, planId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleMealChange = (mealIndex: number, field: string, value: any) => {
    const updatedMeals = [...meals];
    updatedMeals[mealIndex][field] = value;
    setMeals(updatedMeals);
  };

  const handleItemChange = (mealIndex: number, itemIndex: number, field: string, value: string) => {
    const updatedMeals = [...meals];
    updatedMeals[mealIndex].items[itemIndex][field] = value;
    setMeals(updatedMeals);
  };

  const handleAddItem = (mealIndex: number) => {
    const updatedMeals = [...meals];
    updatedMeals[mealIndex].items.push({ foodName: '', quantity: '', notes: '' });
    setMeals(updatedMeals);
  };

  const handleRemoveItem = (mealIndex: number, itemIndex: number) => {
    const updatedMeals = [...meals];
    updatedMeals[mealIndex].items.splice(itemIndex, 1);
    setMeals(updatedMeals);
  };

  const handleSaveMeal = async (meal: any) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`http://localhost:3333/meals/${meal.id}/items`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        name: meal.name,
        order: meal.order,
        items: meal.items
      }),
    });

    if (res.ok) {
      setMessage(`Refeição "${meal.name}" atualizada!`);
      setTimeout(() => router.push(`/nutritionist/patient/${id}/mealplans/${planId}`), 1000);

    } else {
      setMessage('Erro ao atualizar a refeição.');
    }
  };

  const handleSubmitPlan = async () => {
    const token = localStorage.getItem('token');
    const res = await fetch(`http://localhost:3333/mealplans/${planId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setMessage('Plano atualizado com sucesso!');
      setTimeout(() => router.push(`/nutritionist/patient/${id}/mealplans/${planId}`), 1000);
    } else {
      setMessage('Erro ao atualizar o plano.');
    }
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
          <h1 className="text-2xl font-bold text-[#00B894] mb-6">Editar Plano Alimentar</h1>

          <input type="text" name="title" value={form.title} onChange={handleChange} placeholder="Título" className="border rounded px-3 py-2 w-full mb-3" />
          <textarea name="description" value={form.description} onChange={handleChange} placeholder="Descrição" className="border rounded px-3 py-2 w-full mb-3" />
          <label className="text-sm">Data Início</label>
          <input type="date" name="validFrom" value={form.validFrom} onChange={handleChange} className="border rounded px-3 py-2 w-full mb-3" />
          <label className="text-sm">Data Fim</label>
          <input type="date" name="validUntil" value={form.validUntil} onChange={handleChange} className="border rounded px-3 py-2 w-full mb-3" />
          <textarea name="observations" value={form.observations} onChange={handleChange} placeholder="Instruções/Observações" className="border rounded px-3 py-2 w-full mb-6" />

          <button onClick={handleSubmitPlan} className="bg-[#00B894] text-white px-6 py-2 rounded hover:bg-[#009f84] transition w-full mb-8">
            Salvar Alterações do Plano
          </button>

          <h2 className="text-xl font-semibold text-[#00B894] mb-4">Refeições</h2>
          {meals.map((meal, index) => (
            <div key={meal.id} className="mb-8 border p-4 rounded">
              <input type="text" value={meal.name} onChange={(e) => handleMealChange(index, 'name', e.target.value)} className="border rounded px-2 py-1 w-full mb-2" placeholder="Nome da Refeição" />
              <input type="number" value={meal.order} onChange={(e) => handleMealChange(index, 'order', Number(e.target.value))} className="border rounded px-2 py-1 w-full mb-4" placeholder="Ordem" />
              <h3 className="font-semibold mb-2">Alimentos</h3>
              {meal.items.map((item, idx) => (
                <div key={idx} className="mb-2 flex gap-2">
                  <input type="text" value={item.foodName} onChange={(e) => handleItemChange(index, idx, 'foodName', e.target.value)} placeholder="Alimento" className="border px-2 py-1" />
                  <input type="text" value={item.quantity} onChange={(e) => handleItemChange(index, idx, 'quantity', e.target.value)} placeholder="Quantidade" className="border px-2 py-1" />
                  <input type="text" value={item.notes} onChange={(e) => handleItemChange(index, idx, 'notes', e.target.value)} placeholder="Observações" className="border px-2 py-1" />
                  <button onClick={() => handleRemoveItem(index, idx)} className="text-red-500">Remover</button>
                </div>
              ))}
              <button onClick={() => handleAddItem(index)} className="text-[#00B894] mt-2 text-sm">+ Adicionar Alimento</button>
              <button onClick={() => handleSaveMeal(meal)} className="mt-4 bg-[#00B894] text-white px-4 py-2 rounded hover:bg-[#009f84] transition w-full">
                Salvar Refeição
              </button>
            </div>
          ))}

          {message && <p className="text-center text-sm mt-4">{message}</p>}
        </motion.div>
      </div>
    </PrivateRoute>
  );
}