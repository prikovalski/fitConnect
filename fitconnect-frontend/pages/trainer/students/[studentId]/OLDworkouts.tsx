// pages/trainer/students/[studentId]/workouts.tsx

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import NavbarTrainer from '../../../../components/NavbarTrainer';
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
        console.log('===> AAAA')
        const res = await fetch(`http://localhost:3333/trainer/students/${studentId}/workouts`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log('teste')
        if (res.ok) {
          console.log('Status:', res.status);
          const data = await res.json();
          console.log('API data:', data);
          setWorkouts(data.workouts || []);
          setStudentName(data.name || '');
        } else {
          console.error('Erro ao buscar treinos do aluno.');
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
    router.push(`/trainer/workouts/${workoutId}/detail`);
  };

  if (loading) return <p className="text-center mt-10">Carregando treinos...</p>;

  return (
    <div className="min-h-screen bg-[#F0F9F7]">
      <NavbarTrainer />
      <div className="p-8 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-[#00B894] mb-6">Treinos de {studentName}</h1>
        {workouts.length === 0 ? (
          <p className="text-gray-500">Nenhum treino encontrado para este aluno.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {workouts.map((workout) => (
              <div
                key={workout.id}
                className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition cursor-pointer"
                onClick={() => handleViewDetail(workout.id)}
              >
                <h2 className="text-lg font-semibold text-[#00B894] mb-2">{workout.title}</h2>
                <p className="text-gray-600 mb-1">{workout.description}</p>
                <p className="text-sm text-gray-500">
                  {new Date(workout.validFrom).toLocaleDateString()} até {new Date(workout.validUntil).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
