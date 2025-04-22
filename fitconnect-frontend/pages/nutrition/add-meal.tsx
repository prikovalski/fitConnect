import { useRouter } from 'next/router';
import { useState } from 'react';
import PrivateRoute from '../../components/PrivateRoute';
import BackButton from '../../components/BackButton';
import { motion } from 'framer-motion';

export default function AddMealPlan() {
  const router = useRouter();
  const { id } = router.query;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [validFrom, setValidFrom] = useState('');
  const [validUntil, setValidUntil] = useState('');
  const [instructions, setInstructions] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    const token = localStorage.getItem('token');
    const nutritionistId = localStorage.getItem('userId');

    try {
      const response = await fetch('http://localhost:3333/mealplans', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          description,
          validFrom,
          validUntil,
          instructions,
          nutritionistId: Number(nutritionistId),
          patientId: Number(id),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Erro ao criar plano.');
      } else {
        router.push(`/nutrition/${id}/add-meal-items?planId=${data.id}`);
      }
    } catch (err) {
      setError('Erro ao conectar com o servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PrivateRoute>
      <div className="min-h-screen bg-[#F0F9F7] py-12 px-4 flex flex-col items-center">
        <motion.div
          className="bg-white p-8 rounded-xl shadow-md w-full max-w-2xl"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <BackButton />
          <h1 className="text-2xl font-bold text-[#00B894] mb-6">Novo Plano Alimentar</h1>

          <input
            type="text"
            placeholder="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mb-4 w-full px-4 py-2 border rounded"
          />

          <textarea
            placeholder="Descrição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mb-4 w-full px-4 py-2 border rounded"
          />

          <div className="flex gap-4 mb-4">
            <input
              type="date"
              placeholder="Início"
              value={validFrom}
              onChange={(e) => setValidFrom(e.target.value)}
              className="w-full px-4 py-2 border rounded"
            />
            <input
              type="date"
              placeholder="Fim"
              value={validUntil}
              onChange={(e) => setValidUntil(e.target.value)}
              className="w-full px-4 py-2 border rounded"
            />
          </div>

          <textarea
            placeholder="Instruções gerais"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            className="mb-4 w-full px-4 py-2 border rounded"
          />

          {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-[#00B894] text-white px-6 py-2 rounded hover:bg-[#009f84] transition w-full"
          >
            {loading ? 'Salvando...' : 'Salvar e adicionar refeições'}
          </button>
        </motion.div>
      </div>
    </PrivateRoute>
  );
}