import NavbarTrainer from '../../../../components/NavbarTrainer';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function StudentAssessments() {
  const router = useRouter();
  const { id } = router.query;

  const [assessments, setAssessments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [studentName, setStudentName] = useState<string>('');

  useEffect(() => {
    const fetchAssessments = async () => {
      const token = localStorage.getItem('token');
      if (!token || !id) return;

      const response = await fetch(`http://localhost:3333/trainer/students/${id}/assessments`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        setAssessments(data.assessments || data);  // Ajuste conforme o retorno da API
        setStudentName(data.studentName || `#${id}`);
      } else {
        console.error('Erro ao buscar avaliações');
      }
      setLoading(false);
    };

    fetchAssessments();
  }, [id]);

  return (
    <div className="min-h-screen bg-[#F0F9F7]">
      <NavbarTrainer />
      <div className="p-8 max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <motion.h1
            className="text-3xl font-bold text-[#00B894] mb-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Avaliações de {studentName}
          </motion.h1>
          <button
            onClick={() => router.push('/trainer/assessments/new')}
            className="bg-[#00B894] text-white px-4 py-2 rounded hover:bg-[#009f84] transition"
          >
            + Nova Avaliação
          </button>
        </div>
        {loading ? (
          <p className="text-center text-gray-500">Carregando dados...</p>
        ) : assessments.length === 0 ? (
          <p className="text-gray-600">Nenhuma avaliação registrada para este aluno.</p>
        ) : (
          <div className="grid gap-4">
            {assessments.map(assessment => (
              <div key={assessment.id} className="bg-white p-4 rounded shadow hover:shadow-md transition">
                <h2 className="font-semibold text-[#00B894]">{assessment.method}</h2>
                <p><strong>Data:</strong> {new Date(assessment.date).toLocaleDateString()}</p>
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
