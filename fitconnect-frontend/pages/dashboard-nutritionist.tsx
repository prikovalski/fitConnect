import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PrivateRoute from '../components/PrivateRoute';
import { User, Salad, Dumbbell } from 'lucide-react';
import { motion } from 'framer-motion';
import NavbarNutritionist from '../components/NavbarNutritionist';

export default function DashboardNutritionist() {
  const [patients, setPatients] = useState<any[]>([]);
  const [filteredPatients, setFilteredPatients] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [expiringCount, setExpiringCount] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    fetch('http://localhost:3333/nutritionist/patients', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then((data) => {
        setPatients(data);
        setFilteredPatients(data);
        const now = new Date();
        const oneWeekAhead = new Date();
        oneWeekAhead.setDate(now.getDate() + 7);

        const expiring = data.filter((patient) => {
          if (patient.latestMealPlan?.validUntil) {
            const expiryDate = new Date(patient.latestMealPlan.validUntil);
            return expiryDate <= oneWeekAhead && expiryDate >= now;
          }
          return false;
        });
        setExpiringCount(expiring.length);
      })
      .catch(() => setPatients([]));
  }, []);

  useEffect(() => {
    if (search.trim() === '') {
      setFilteredPatients(patients);
    } else {
      setFilteredPatients(patients.filter((p) => 
        p.name.toLowerCase().includes(search.toLowerCase())
      ));
    }
  }, [search, patients]);

  const viewPatient = (id: number) => {
    router.push(`/nutritionist/patient/${id}`);
  };

  return (
    <PrivateRoute>
      <NavbarNutritionist />
      <div className="min-h-screen bg-[#F0F9F7] p-8">
        <motion.h1
          className="text-3xl font-bold text-[#00B894] mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Olá, Nutricionista! 🥗
        </motion.h1>

        {/* RESUMO EM CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <motion.div
            className="bg-white p-6 rounded-xl shadow text-center"
            whileHover={{ scale: 1.05 }}
          >
            <h2 className="text-xl font-semibold text-gray-700">Pacientes Ativos</h2>
            <p className="text-4xl text-[#00B894] mt-2">{patients.length}</p>
          </motion.div>

          <motion.div
            className="bg-white p-6 rounded-xl shadow text-center"
            whileHover={{ scale: 1.05 }}
          >
            <h2 className="text-xl font-semibold text-gray-700">Planos Ativos</h2>
            <p className="text-4xl text-[#00B894] mt-2">
              {patients.filter(p => p.latestMealPlan).length}
            </p>
          </motion.div>

          <motion.div
            className="bg-white p-6 rounded-xl shadow text-center"
            whileHover={{ scale: 1.05 }}
          >
            <h2 className="text-xl font-semibold text-gray-700">Vencendo em 7 dias</h2>
            <p className="text-4xl text-[#00B894] mt-2">{expiringCount}</p>
          </motion.div>
        </div>

        {/* CAMPO DE BUSCA */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <input
            type="text"
            placeholder="Buscar paciente por nome..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded p-3 w-full md:w-1/2"
          />
          <button
            onClick={() => router.push('/nutritionist/search')}
            className="bg-[#00B894] text-white px-6 py-2 rounded hover:bg-[#009f84] transition"
          >
            🔎 Busca Avançada
          </button>
        </div>

        {/* LISTA DE PACIENTES */}
        {filteredPatients.length === 0 ? (
          <p className="text-gray-600 text-center">Nenhum paciente encontrado.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {filteredPatients.map((patient) => {
              const expiringSoon = patient.latestMealPlan?.validUntil &&
                new Date(patient.latestMealPlan.validUntil) <= new Date(new Date().setDate(new Date().getDate() + 7));
              return (
                <div
                  key={patient.id}
                  className={`p-6 rounded-lg shadow hover:shadow-lg transition cursor-pointer ${
                    expiringSoon ? 'border-2 border-yellow-400' : 'bg-[#F0F9F7]'
                  }`}
                  onClick={() => viewPatient(patient.id)}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <User className="text-[#00B894]" />
                    <h2 className="text-lg font-semibold text-[#00B894]">{patient.name}</h2>
                  </div>
                  <p className="text-gray-600 text-sm mb-1">Email: {patient.email}</p>

                  {patient.latestMealPlan ? (
                    <p className="flex items-center text-sm text-gray-700">
                      <Salad size={16} className="mr-1" />
                      Dieta: {patient.latestMealPlan.title}
                    </p>
                  ) : (
                    <p className="text-sm text-gray-500 italic">Sem dieta ativa</p>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </PrivateRoute>
  );
}
