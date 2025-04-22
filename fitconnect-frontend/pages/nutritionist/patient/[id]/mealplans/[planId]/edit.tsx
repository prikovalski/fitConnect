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
    instructions: ''
  });
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
          instructions: data.instructions || ''
        });
      });
  }, [router.isReady, planId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem('token');
    const res = await fetch(`http://localhost:3333/mealplans/${planId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setMessage('Plano atualizado com sucesso!');
      setTimeout(() => router.push(`/nutritionist/patient/${id}/mealplans/${planId}`), 1500);
    } else {
      setMessage('Erro ao atualizar o plano.');
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
          <h1 className="text-2xl font-bold text-[#00B894] mb-6">Editar Plano Alimentar</h1>

          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Título"
            className="border rounded px-3 py-2 w-full mb-3"
          />
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Descrição"
            className="border rounded px-3 py-2 w-full mb-3"
          />
          <label className="text-sm">Data Início</label>
          <input
            type="date"
            name="validFrom"
            value={form.validFrom}
            onChange={handleChange}
            className="border rounded px-3 py-2 w-full mb-3"
          />
          <label className="text-sm">Data Fim</label>
          <input
            type="date"
            name="validUntil"
            value={form.validUntil}
            onChange={handleChange}
            className="border rounded px-3 py-2 w-full mb-3"
          />
          <textarea
            name="instructions"
            value={form.instructions}
            onChange={handleChange}
            placeholder="Instruções/Observações"
            className="border rounded px-3 py-2 w-full mb-6"
          />

          <button
            onClick={handleSubmit}
            className="bg-[#00B894] text-white px-6 py-2 rounded hover:bg-[#009f84] transition w-full"
          >
            Salvar Alterações
          </button>

          {message && <p className="text-center text-sm mt-4">{message}</p>}
        </motion.div>
      </div>
    </PrivateRoute>
  );
}