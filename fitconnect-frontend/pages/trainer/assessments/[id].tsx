import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import NavbarTrainer from '../../../components/NavbarTrainer';
import { motion } from 'framer-motion';

export default function AssessmentDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [assessment, setAssessment] = useState<any>(null);

  useEffect(() => {
    if (!id) return;
    const fetchAssessment = async () => {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:3333/assessments/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setAssessment(data);
    };
    fetchAssessment();
  }, [id]);

  if (!assessment) return <p className="text-center mt-10">Carregando avaliação...</p>;

  return (
    <div className="min-h-screen bg-[#F0F9F7] flex flex-col">
      <NavbarTrainer />
      <div className="flex-grow flex items-start justify-center">
        <motion.div
          className="mt-12 p-8 max-w-4xl w-full bg-white rounded-xl shadow"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl font-bold text-[#00B894] mb-4">
            Detalhes da Avaliação Física
          </h1>
          <p><strong>Método:</strong> {assessment.method}</p>
          <p><strong>Data:</strong> {new Date(assessment.date).toLocaleDateString()}</p>
          <p className="mt-4 font-semibold">Resultados:</p>
          <pre className="bg-gray-100 p-4 rounded overflow-x-auto">{JSON.stringify(assessment.data.resultados, null, 2)}</pre>
        </motion.div>
      </div>
    </div>
  );
}
