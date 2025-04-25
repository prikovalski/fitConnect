import { useEffect, useState } from 'react';
import NavbarTrainer from '../../components/NavbarTrainer';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

export default function StudentsPage() {
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchStudents = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const response = await fetch('http://localhost:3333/trainer/students', {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (response.ok) {
          const data = await response.json();
          setStudents(data);
        } else {
          console.error('Erro ao buscar alunos');
        }
      } catch (error) {
        console.error('Erro de conexão:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  return (
    <div className="min-h-screen bg-[#F0F9F7]">
      <NavbarTrainer />
      <div className="p-8 max-w-5xl mx-auto">
        <motion.h1
          className="text-3xl font-bold text-[#00B894] mb-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Alunos Vinculados
        </motion.h1>

        {loading ? (
          <p className="text-center text-gray-500">Carregando alunos...</p>
        ) : students.length === 0 ? (
          <p className="text-center text-gray-500">Nenhum aluno vinculado encontrado.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {students.map(student => (
              <motion.div
                key={student.id}
                className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
                whileHover={{ scale: 1.03 }}
              >
                <h2 className="text-xl font-semibold text-[#00B894]">{student.name}</h2>
                <p className="text-gray-600 mb-4">{student.email}</p>
                <div className="flex gap-4">
                  <button
                    onClick={() => router.push(`/trainer/students/${student.id}/workouts`)}
                    className="bg-[#00B894] text-white px-4 py-2 rounded hover:bg-[#009f84]"
                  >
                    Ver Treinos
                  </button>
                  <button
                    onClick={() => router.push(`/trainer/students/${student.id}/assessments`)}
                    className="border border-[#00B894] text-[#00B894] px-4 py-2 rounded hover:bg-[#e0f7f4]"
                  >
                    Ver Avaliações
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
