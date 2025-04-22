import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PrivateRoute from '../components/PrivateRoute';
import { User, Salad, Dumbbell } from 'lucide-react';
import { motion } from 'framer-motion';

export default function DashboardNutritionist() {
  const [patients, setPatients] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    fetch('http://localhost:3333/nutritionist/patients', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then(setPatients)
      .catch(() => setPatients([]));
  }, []);

  const viewPatient = (id: number) => {
    router.push(`/nutritionist/patient/${id}`);
  };

  return (
    <PrivateRoute>
      <div className="min-h-screen bg-[#F0F9F7] py-12 px-4 flex flex-col items-center">
        <motion.div
          className="bg-white p-8 rounded-xl shadow-md w-full max-w-5xl"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-[#00B894] mb-6 text-center">Dashboard do Nutricionista</h1>

          {patients.length === 0 ? (
            <p className="text-gray-600 text-center">Nenhum paciente compartilhou dados ainda.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {patients.map((patient) => (
                <div
                  key={patient.id}
                  className="bg-[#F0F9F7] p-6 rounded-lg shadow hover:shadow-lg transition cursor-pointer"
                  onClick={() => viewPatient(patient.id)}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <User className="text-[#00B894]" />
                    <h2 className="text-lg font-semibold text-[#00B894]">{patient.name}</h2>
                  </div>
                  <p className="text-gray-600 text-sm mb-1">Email: {patient.email}</p>

                  {patient.latestWorkout ? (
                    <p className="flex items-center text-sm text-gray-700">
                      <Dumbbell size={16} className="mr-1" /> Plano de treino ativo: {patient.latestWorkout.title}
                    </p>
                  ) : (
                    <p className="text-sm text-gray-500 italic">Sem treino compartilhado</p>
                  )}

                  {patient.latestMealPlan ? (
                    <p className="flex items-center text-sm text-gray-700 mt-1">
                      <Salad size={16} className="mr-1" /> Última dieta: {patient.latestMealPlan.title}
                    </p>
                  ) : (
                    <p className="text-sm text-gray-500 italic mt-1">Sem dieta cadastrada</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </PrivateRoute>
  );
}