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
      console.log("Assessment: ", data)
    };
    fetchAssessment();
  }, [id]);

  if (!assessment) return <p className="text-center mt-10">Carregando avaliação...</p>;

  const { data } = assessment;

  return (
    <div className="min-h-screen bg-[#F0F9F7] flex flex-col">
      <NavbarTrainer />
      <div className="flex-grow flex items-start justify-center">
        <motion.div
          className="mt-12 p-8 max-w-4xl w-full bg-white rounded-xl shadow"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl font-bold text-[#00B894] mb-6">
            Detalhes da Avaliação Física
          </h1>

          {/* Bloco Superior */}
          <div className="flex flex-wrap gap-6 mb-6">
            <div><strong>Nome:</strong> {assessment.patientName || 'Pacientes'}</div>
            <div><strong>Idade:</strong> {assessment.data.patientAge || '---'} anos</div>
            <div><strong>Peso:</strong> {data.peso} kg</div>
            <div><strong>Altura:</strong> {data.altura} cm</div>
          </div>

          {/* Resultados */}
          <div className="bg-[#F0F9F7] p-4 rounded mb-6">
            <h2 className="font-semibold mb-2 text-[#00B894]">Resultados</h2>
            <div className="flex gap-6">
              <div><strong>IMC:</strong> {data.resultados?.IMC}</div>
              <div><strong>% Gordura:</strong> {data.resultados?.['% Gordura']}%</div>
              <div><strong>Massa Magra:</strong> {data.resultados?.['Massa Magra (kg)']} kg</div>
            </div>
          </div>

          {/* Dobras Cutâneas */}
          <div className="mb-6">
            <h2 className="font-semibold text-[#00B894] mb-2">Dobras Cutâneas (mm)</h2>
            <div className="grid grid-cols-2 gap-4">
              {data.dobrasCutaneas && (Object.entries(data.dobrasCutaneas)as [string, string | number][]).map(([key, value]) => (
                <div key={key} className="bg-gray-100 p-2 rounded">
                  <strong>{key}:</strong> {value}
                </div>
              ))}
            </div>
          </div>

          {/* Perimetrias */}
          <div>
            <h2 className="font-semibold text-[#00B894] mb-2">Perimetrias (cm)</h2>
            <div className="grid grid-cols-2 gap-4">
              {data.perimetrias && Object.entries(data.perimetrias).length > 0 ? (
               (Object.entries(data.perimetrias)as [string, string | number][]).map(([key, value]) => (
                  <div key={key} className="bg-gray-100 p-2 rounded">
                    <strong>{key}:</strong> {value} cm
                  </div>
                ))
              ) : (
                <p className="text-gray-500 col-span-2">Nenhuma perimetria registrada.</p>
              )}
            </div>
          </div>

          {/* Botão Editar */}
          <div className="mt-8 flex justify-end">
            <button
              onClick={() => router.push(`/trainer/assessments/${id}/edit`)}
              className="bg-[#00B894] text-white px-6 py-2 rounded hover:bg-[#009f84] transition"
            >
              Editar Avaliação
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
