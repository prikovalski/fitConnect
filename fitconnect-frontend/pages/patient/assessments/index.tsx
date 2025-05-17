import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import PrivateRoute from '../../../components/PrivateRoute';

interface Assessment {
  id: number;
  method: string;
  date: string;
  nextAssessment?: string;
  createdBy: { name: string };
}

export default function PatientAssessmentsPage() {
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchAssessments = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const res = await fetch('http://localhost:3333/patient/assessments', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) {
          const data = await res.json();
          setAssessments(data);
        } else {
          console.error('Erro ao buscar avaliações.');
        }
      } catch (error) {
        console.error('Erro de conexão:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAssessments();
  }, []);

  if (loading) return <p className="text-center mt-10">Carregando avaliações...</p>;

  return (
    <PrivateRoute>
      <div className="min-h-screen bg-[#F0F9F7] py-10 px-4">
        <motion.div
          className="max-w-4xl mx-auto bg-white rounded-xl shadow p-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-2xl font-bold text-[#00B894] mb-6 text-center">Minhas Avaliações Físicas</h1>

          {assessments.length === 0 ? (
            <p className="text-gray-500 text-center">Nenhuma avaliação disponível.</p>
          ) : (
            <div className="space-y-4">
              {assessments.map((a) => (
                <div key={a.id} className="border border-gray-200 rounded p-4 shadow-sm bg-gray-50">
                  <p><strong>Método:</strong> {a.method}</p>
                  <p><strong>Data:</strong> {new Date(a.date).toLocaleDateString()}</p>
                  {a.nextAssessment && (
                    <p><strong>Próxima Avaliação:</strong> {new Date(a.nextAssessment).toLocaleDateString()}</p>
                  )}
                  <p><strong>Responsável:</strong> {a.createdBy.name}</p>
                  <button
                    className="mt-2 text-[#00B894] hover:underline text-sm"
                    onClick={() => router.push(`/patient/assessments/${a.id}`)}
                  >
                    Ver detalhes
                  </button>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </PrivateRoute>
  );
}
