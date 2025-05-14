import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import NavbarTrainer from '../components/NavbarTrainer';
import { motion } from 'framer-motion';

export default function DashboardTrainer() {
  const router = useRouter();
  const [trainerName, setTrainerName] = useState('');
  const [studentsCount, setStudentsCount] = useState(0);
  const [upcomingAssessments, setUpcomingAssessments] = useState(0);
  const [expiringWorkouts, setExpiringWorkouts] = useState(0);

  useEffect(() => {
    const name = localStorage.getItem('name') || 'Personal';
    setTrainerName(name);

    const fetchSummary = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await fetch('http://localhost:3333/trainer/summary', {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        setStudentsCount(data.studentsCount);
        setUpcomingAssessments(data.upcomingAssessments);
        setExpiringWorkouts(data.expiringWorkouts);
      } else {
        console.error('Erro ao buscar dados do dashboard');
      }
    };
    fetchSummary();
  }, []);

  return (
    <div className="min-h-screen bg-[#F0F9F7]">
      <NavbarTrainer />
      <div className="p-8">
        <motion.h1 
          className="text-3xl font-bold text-[#00B894] mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Olá, {trainerName}! 💪
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div 
            className="bg-white p-6 rounded-xl shadow text-center cursor-pointer"
            whileHover={{ scale: 1.05 }}
            onClick={() => router.push('/trainer/students')}
          >
            <h2 className="text-xl font-semibold text-gray-700">Alunos Ativos</h2>
            <p className="text-4xl text-[#00B894] mt-2">{studentsCount}</p>
          </motion.div>

          <motion.div 
            className="bg-white p-6 rounded-xl shadow text-center cursor-pointer"
            whileHover={{ scale: 1.05 }}
            onClick={() => router.push('/trainer/assessments')}
          >
            <h2 className="text-xl font-semibold text-gray-700">Próximas Avaliações</h2>
            <p className="text-4xl text-[#00B894] mt-2">{upcomingAssessments}</p>
          </motion.div>

          <motion.div 
            className="bg-white p-6 rounded-xl shadow text-center cursor-pointer"
            whileHover={{ scale: 1.05 }}
            onClick={() => router.push('/trainer/expiring')}
          >
            <h2 className="text-xl font-semibold text-gray-700">Próximos do Vencimento</h2>
            <p className="text-4xl text-[#00B894] mt-2">{expiringWorkouts}</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
