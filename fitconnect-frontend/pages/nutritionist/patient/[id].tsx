import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import PrivateRoute from '../../../components/PrivateRoute';
import BackButton from '../../../components/BackButton';
import { User, Salad, Dumbbell, PlusCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PatientDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [patient, setPatient] = useState<any>(null);

  useEffect(() => {
    if (!router.isReady || !id || Array.isArray(id)) return;

    const token = localStorage.getItem('token');
    if (!token) return;

    fetch(`http://localhost:3333/nutritionist/patient/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then(setPatient)
      .catch(() => setPatient(null));
  }, [router.isReady, id]);

  const handleAddMeal = () => {
    router.push(`/nutrition/${id}/add-meal`);
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
          <div className="flex items-center gap-3 mb-6">
            <User className="text-[#00B894]" size={28} />
            <h1 className="text-2xl font-bold text-[#00B894]">Detalhes do Paciente</h1>
          </div>

          {patient ? (
          <>
            <p className="text-gray-700 mb-2"><strong>Nome:</strong> {patient.name}</p>
            <p className="text-gray-700 mb-6"><strong>Email:</strong> {patient.email}</p>

            <div className="mb-4">
              <h2 className="font-semibold text-[#00B894] mb-2 flex items-center">
                <Salad size={20} className="mr-2" /> Última Dieta
              </h2>
              {patient.latestMealPlan ? (
                <p className="text-gray-700">{patient.latestMealPlan.title}</p>
              ) : (
                <p className="text-sm text-gray-500 italic">Nenhuma dieta cadastrada.</p>
              )}
            </div>

            <div className="mb-6">
              <h2 className="font-semibold text-[#00B894] mb-2 flex items-center">
                <Dumbbell size={20} className="mr-2" /> Plano de Treino Ativo
              </h2>
              {patient.latestWorkout ? (
                <p className="text-gray-700">{patient.latestWorkout.title}</p>
              ) : (
                <p className="text-sm text-gray-500 italic">Sem treino compartilhado.</p>
              )}
            </div>

            <button
              onClick={handleAddMeal}
              className="flex items-center justify-center bg-[#00B894] text-white px-6 py-2 rounded hover:bg-[#009f84] transition w-full"
            >
              <PlusCircle className="mr-2" size={20} /> Cadastrar Nova Dieta
            </button>
            
            <button
              onClick={() => router.push(`/nutritionist/patient/${id}/mealplans`)}
              className="flex items-center justify-center bg-[#00B894] text-white px-6 py-2 rounded hover:bg-[#009f84] transition w-full mt-4"
            >
              📄 Ver Planos Alimentares Anteriores
            </button>

            <button
              onClick={() => router.push(`/nutritionist/patient/${id}/workouts`)}
              className="flex items-center justify-center bg-[#00B894] text-white px-6 py-2 rounded hover:bg-[#009f84] transition w-full mt-4"
            >
              🏋️ Ver Treinos Ativos
            </button>
          </>
        ) : (
          <p className="text-gray-600">Carregando dados do paciente...</p>
        )}

        </motion.div>
      </div>
    </PrivateRoute>
  );
}
