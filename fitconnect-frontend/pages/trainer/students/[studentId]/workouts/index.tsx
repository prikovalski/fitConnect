// pages/trainer/students/[studentId]/workouts.tsx

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import NavbarTrainer from '../../../../../components/NavbarTrainer';
import { motion } from 'framer-motion';

export default function StudentWorkoutsPage() {
  const router = useRouter();
  const { studentId } = router.query;

  const [workouts, setWorkouts] = useState<any[]>([]);
  const [studentName, setStudentName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!router.isReady || !studentId) return;

    const fetchWorkouts = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const res = await fetch(`http://localhost:3333/trainer/students/${studentId}/workouts`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) {
          const data = await res.json();
          setWorkouts(data.workouts || []);
          setStudentName(data.student?.name || 'Aluno');
        } else {
          console.error('Erro ao buscar treinos do alunos.');
        }
      } catch (error) {
        console.error('Erro de conexão:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, [router.isReady, studentId]);

  const handleViewDetail = (workoutId: number) => {
    router.push(`/trainer/students/${studentId}/workouts/${workoutId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F0F9F7]">
        <NavbarTrainer />
        <div className="p-8 max-w-5xl mx-auto text-center">
          <p className="text-gray-500">Carregando treinos do aluno...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F0F9F7]">
      <NavbarTrainer />
      <div className="p-8 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-[#00B894] mb-6">
          Treinos de {studentName}
        </h1>

        {workouts.length === 0 ? (
          <p className="text-gray-500 text-center">Nenhum treino encontrado para este aluno.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {workouts.map((workout) => (
              <motion.div
                key={workout.id}
                whileHover={{ scale: 1.05 }}
                className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition cursor-pointer"
                onClick={() => handleViewDetail(workout.id)}
              >
                <h2 className="text-lg font-semibold text-[#00B894] mb-2">{workout.title}</h2>
                <p className="text-gray-600 mb-1">{workout.description}</p>
                <p className="text-sm text-gray-500">
                  {new Date(workout.validFrom).toLocaleDateString()} até {new Date(workout.validUntil).toLocaleDateString()}
                </p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
