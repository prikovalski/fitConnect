import NavbarTrainer from '../../../../components/NavbarTrainer';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function StudentWorkouts() {
  const router = useRouter();
  const { id } = router.query;

  const [workouts, setWorkouts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchWorkouts = async () => {
      const token = localStorage.getItem('token');
      if (!token || !id) return;
  
      const response = await fetch(`http://localhost:3333/trainer/students/${id}/workouts`, {
        headers: { Authorization: `Bearer ${token}` }
      });
  
      if (response.ok) {
        const data = await response.json();
        setWorkouts(data);
      }
      setLoading(false);
    };
  
    fetchWorkouts();
  }, [id]);
  
  return (
    <div className="min-h-screen bg-[#F0F9F7]">
      <NavbarTrainer />
      <div className="p-8 max-w-4xl mx-auto">
        <motion.h1 className="text-2xl font-bold text-[#00B894] mb-6">
          Treinos do Aluno #{id}
        </motion.h1>

        {loading ? (
            <p className="text-center text-gray-500">Carregando dados...</p>
            ) : workouts.length === 0 ? (
            <p className="text-center text-gray-500">Nenhum treino encontrado.</p>
            ) : (
            workouts.map(workout => (
                <div key={workout.id} className="bg-white p-4 rounded shadow mb-4">
                <h2 className="text-xl font-semibold">{workout.title}</h2>
                <p className="text-gray-600">Válido até: {new Date(workout.validUntil).toLocaleDateString()}</p>
                </div>
            ))
        )}

      </div>
    </div>
  );
}