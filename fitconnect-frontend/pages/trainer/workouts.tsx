import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import NavbarTrainer from '../../components/NavbarTrainer';

export default function WorkoutPlansList() {
  const router = useRouter();
  const [workouts, setWorkouts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkouts = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const res = await fetch('http://localhost:3333/trainer/workouts', {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (res.ok) {
          const data = await res.json();
          setWorkouts(data);
        } else {
          console.error('Erro ao buscar planos de treino');
        }
      } catch (error) {
        console.error('Erro de conexão:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  const handleCreateNew = () => {
    router.push('/trainer/workouts/new');
  };

  const handleViewWorkout = (id: number) => {
    router.push(`/trainer/workouts/${id}`);
  };

  return (
    <div className="min-h-screen bg-[#F0F9F7] flex flex-col">
      <NavbarTrainer />

      <div className="flex-grow flex flex-col items-center">
        <motion.div
          className="mt-12 p-8 max-w-5xl w-full bg-white rounded-xl shadow"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-[#00B894]">Planos de Treino</h1>

            <button
              onClick={handleCreateNew}
              className="bg-[#00B894] text-white px-4 py-2 rounded hover:bg-[#009f84] transition"
            >
              + Novo Plano
            </button>
          </div>

          {loading ? (
            <p className="text-center text-gray-500">Carregando planos...</p>
          ) : workouts.length === 0 ? (
            <p className="text-center text-gray-500">Nenhum plano de treino encontrado.</p>
          ) : (
            <div className="grid gap-4">
              {workouts.map((plan) => (
                <div
                  key={plan.id}
                  className="bg-gray-100 p-4 rounded shadow hover:shadow-md transition cursor-pointer"
                  onClick={() => handleViewWorkout(plan.id)}
                >
                  <h2 className="text-xl font-bold text-[#00B894]">{plan.title}</h2>
                  <p className="text-gray-600 mb-1">{plan.description}</p>
                  <p><strong>Aluno:</strong> {plan.patientName}</p>
                  <p><strong>Validade:</strong> {new Date(plan.validFrom).toLocaleDateString()} até {new Date(plan.validUntil).toLocaleDateString()}</p>
                  <p><strong>Status:</strong> {plan.isActive ? 'Ativo' : 'Inativo'}</p>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
