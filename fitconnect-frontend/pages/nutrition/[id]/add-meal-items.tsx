import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PrivateRoute from '../../../components/PrivateRoute';
import BackButton from '../../../components/BackButton';
import { Salad } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AddMealItems() {
  const router = useRouter();
  const { id, planId } = router.query;

  const [mealName, setMealName] = useState('');
  const [order, setOrder] = useState(1);
  const [items, setItems] = useState([{ foodName: '', quantity: '', notes: '' }]);
  const [message, setMessage] = useState('');

  const handleItemChange = (index: number, field: string, value: string) => {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  };

  const addItem = () => {
    setItems([...items, { foodName: '', quantity: '', notes: '' }]);
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem('token');
    if (!token || !planId || Array.isArray(planId)) return;

    const payload = {
      name: mealName,
      order,
      items: items.filter(item => item.foodName && item.quantity)
    };

    const res = await fetch(`http://localhost:3333/meals/${planId}/meals`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      setMessage('Refeição cadastrada com sucesso!');
      setTimeout(() => router.push(`/nutritionist/patient/${id}`), 1500);
    } else {
      setMessage('Erro ao cadastrar refeição.');
    }
  };

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
            <h1 className="text-2xl font-bold text-[#00B894]">Adicionar Refeição</h1>
          </div>

          <input
            type="text"
            placeholder="Nome da Refeição"
            value={mealName}
            onChange={(e) => setMealName(e.target.value)}
            className="border rounded px-3 py-2 w-full mb-3"
          />
          <input
            type="number"
            placeholder="Ordem"
            value={order}
            min={1}
            onChange={(e) => setOrder(Number(e.target.value))}
            className="border rounded px-3 py-2 w-full mb-6"
          />

          <h2 className="font-semibold text-gray-700 mb-2">Alimentos</h2>
          {items.map((item, idx) => (
            <div key={idx} className="mb-4 border p-3 rounded">
              <input
                type="text"
                placeholder="Alimento"
                value={item.foodName}
                onChange={(e) => handleItemChange(idx, 'foodName', e.target.value)}
                className="border rounded px-2 py-1 w-full mb-2"
              />
              <input
                type="text"
                placeholder="Quantidade"
                value={item.quantity}
                onChange={(e) => handleItemChange(idx, 'quantity', e.target.value)}
                className="border rounded px-2 py-1 w-full mb-2"
              />
              <input
                type="text"
                placeholder="Observações"
                value={item.notes}
                onChange={(e) => handleItemChange(idx, 'notes', e.target.value)}
                className="border rounded px-2 py-1 w-full"
              />
            </div>
          ))}
          <button onClick={addItem} className="text-[#00B894] mb-6 hover:underline text-sm">
            + Adicionar alimento
          </button>

          <button
            onClick={handleSubmit}
            className="bg-[#00B894] text-white px-6 py-2 rounded hover:bg-[#009f84] transition w-full"
          >
            Salvar Refeição
          </button>

          {message && <p className="text-center text-sm mt-4">{message}</p>}
        </motion.div>
      </div>
    </PrivateRoute>
  );
}