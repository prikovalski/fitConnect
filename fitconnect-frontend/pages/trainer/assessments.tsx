import { useEffect, useState } from 'react';
import NavbarTrainer from '../../components/NavbarTrainer';
import PrivateRoute from '../../components/PrivateRoute';
import { motion } from 'framer-motion';
import router from 'next/router';

export default function UpcomingAssessments() {
  const [assessments, setAssessments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssessments = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const response = await fetch('http://localhost:3333/trainer/assessments', {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (response.ok) {
          const data = await response.json();
          setAssessments(data);
        } else {
          console.error('Erro ao buscar avaliações');
        }
      } catch (error) {
        console.error('Erro de conexão:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAssessments();
  }, []);

  return (
    <div className="min-h-screen bg-[#F0F9F7]">
      <NavbarTrainer />
      <div className="p-8 max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <motion.h1
            className="text-3xl font-bold text-[#00B894]"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Avaliações Físicas
          </motion.h1>

          <button
            onClick={() => router.push('/trainer/assessments/new')}
            className="bg-[#00B894] text-white px-4 py-2 rounded hover:bg-[#009f84] transition"
          >
            + Nova Avaliação
          </button>
        </div>

        {assessments.length === 0 ? (
          <p className="text-gray-600">Nenhuma avaliação registrada.</p>
        ) : (
          <div className="grid gap-4">
            {assessments.map(assessment => (
              <div key={assessment.id} className="bg-white p-4 rounded shadow hover:shadow-md transition">
                <h2 className="font-semibold text-[#00B894]">Paciente: {assessment.patientName}</h2>
                <p>Método: {assessment.method}</p>
                <p>
                <strong>Próxima Avaliação:</strong>{' '}
                {assessment.nextAssessment
                  ? new Date(assessment.nextAssessment).toLocaleDateString()
                  : 'Não informada'}
              </p>
                <button
                  onClick={() => router.push(`/trainer/assessments/${assessment.id}`)}
                  className="mt-2 text-sm text-[#00B894] hover:underline"
                >
                  Ver Detalhes
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}