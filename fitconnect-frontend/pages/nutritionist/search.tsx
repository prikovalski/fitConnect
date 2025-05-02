import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PrivateRoute from '../../components/PrivateRoute';
import NavbarNutritionist from '../../components/NavbarNutritionist';
import { motion } from 'framer-motion';

export default function SearchPatients() {
  const [patients, setPatients] = useState<any[]>([]);
  const [filteredPatients, setFilteredPatients] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchPatients = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const res = await fetch('http://localhost:3333/nutritionist/patients', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setPatients(data);
          setFilteredPatients(data);
        }
      } catch (error) {
        console.error('Erro ao buscar pacientes:', error);
      }
    };

    fetchPatients();
  }, []);

  useEffect(() => {
    if (search.trim() === '') {
      setFilteredPatients(patients);
    } else {
      setFilteredPatients(
        patients.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
      );
    }
  }, [search, patients]);

  const handleViewPatient = (id: number) => {
    router.push(`/nutritionist/patient/${id}`);
  };

  return (
    <PrivateRoute>
      <NavbarNutritionist />
      <div className="min-h-screen bg-[#F0F9F7] py-12 px-4">
        <motion.div
          className="max-w-5xl mx-auto bg-white p-8 rounded-xl shadow-md"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-[#00B894] mb-6 text-center">
            Buscar Pacientes
          </h1>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <input
              type="text"
              placeholder="Digite o nome do paciente..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border rounded p-3 w-full md:w-2/3"
            />
            <button
              onClick={() => router.back()}
              className="bg-[#00B894] text-white px-6 py-2 rounded hover:bg-[#009f84] transition"
            >
              ⬅️ Voltar
            </button>
          </div>

          {filteredPatients.length === 0 ? (
            <p className="text-center text-gray-600">Nenhum paciente encontrado.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredPatients.map((patient) => (
                <motion.div
                    key={patient.id}
                    className="bg-[#F0F9F7] p-6 rounded-lg shadow hover:shadow-lg cursor-pointer relative"
                    whileHover={{ scale: 1.02 }}
                >
                    <h2
                    onClick={() => handleViewPatient(patient.id)}
                    className="text-xl font-semibold text-[#00B894] mb-2 hover:underline"
                    >
                    {patient.name}
                    </h2>
                    <p className="text-gray-700 text-sm mb-1">Email: {patient.email}</p>
                    {patient.latestMealPlan ? (
                    <p className="text-sm text-gray-700">Plano alimentar ativo: {patient.latestMealPlan.title}</p>
                    ) : (
                    <p className="text-sm text-gray-500 italic">Sem plano alimentar ativo</p>
                    )}

                    <button
                    onClick={() => router.push(`/nutritionist/patient/${patient.id}/mealplans/new`)}
                    className="absolute top-4 right-4 bg-[#00B894] text-white text-sm px-3 py-1 rounded hover:bg-[#009f84]"
                    >
                    + Nova Dieta
                    </button>
                </motion.div>
                ))}

            </div>
          )}
        </motion.div>
      </div>
    </PrivateRoute>
  );
}
