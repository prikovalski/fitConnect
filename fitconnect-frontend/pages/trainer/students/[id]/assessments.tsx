import NavbarTrainer from '../../../../components/NavbarTrainer';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';


export default function StudentAssessments() {
  const router = useRouter();
  const { id } = router.query;

  const [assessments, setAssessments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssessments = async () => {
      const token = localStorage.getItem('token');
      if (!token || !id) return;
  
      const response = await fetch(`http://localhost:3333/trainer/students/${id}/assessments`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        setAssessments(data);
      }
      setLoading(false);
    };
  
    fetchAssessments();
  }, [id]);
  return (
    <div className="min-h-screen bg-[#F0F9F7]">
      <NavbarTrainer />
      <div className="p-8 max-w-4xl mx-auto">
        <motion.h1 className="text-2xl font-bold text-[#00B894] mb-6">
          Avaliações do Aluno #{id}
        </motion.h1>

        {loading ? (
            <p className="text-center text-gray-500">Carregando dados...</p>
            ) : assessments.length === 0 ? (
            <p className="text-center text-gray-500">Nenhum treino encontrado.</p>
            ) : (
            assessments.map(assessment => (
                <div key={assessment.id} className="bg-white p-4 rounded shadow mb-4">
                <h2 className="text-xl font-semibold">{assessment.method}</h2>
                <p className="text-gray-600">Data: {new Date(assessment.date).toLocaleDateString()}</p>
                </div>
            ))
        )}
      </div>
    </div>
  );
}