import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import NavbarTrainer from '../../../../components/NavbarTrainer';
import { motion } from 'framer-motion';

export default function EditAssessment() {
  const router = useRouter();
  const { id } = router.query;
  const [formData, setFormData] = useState<any>(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!id) return;
    const fetchAssessment = async () => {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:3333/assessments/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setFormData(data.data);
    };
    fetchAssessment();
  }, [id]);

  const handleChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleNestedChange = (section: string, field: string, value: any) => {
    setFormData({
      ...formData,
      [section]: {
        ...formData[section],
        [field]: value
      }
    });
  };

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    const res = await fetch(`http://localhost:3333/assessments/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ data: formData })
    });
    if (res.ok) {
      setMessage('Avaliação atualizada com sucesso!');
      setTimeout(() => router.push(`/trainer/assessments/${id}`), 1500);
    } else {
      setMessage('Erro ao atualizar avaliação.');
    }
  };

  if (!formData) return <p className="text-center mt-10">Carregando dados para edição...</p>;

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
            Editar Avaliação Física
          </h1>

          <div className="grid gap-4">
            <div>
              <label>Peso (kg)</label>
              <input
                type="number"
                value={formData.peso}
                onChange={(e) => handleChange('peso', Number(e.target.value))}
                className="border rounded w-full p-2"
              />
            </div>

            <div>
              <label>Altura (cm)</label>
              <input
                type="number"
                value={formData.altura}
                onChange={(e) => handleChange('altura', Number(e.target.value))}
                className="border rounded w-full p-2"
              />
            </div>

            {formData.dobrasCutaneas && (
              <>
                <h2 className="font-semibold mt-4">Dobras Cutâneas (mm)</h2>
                {Object.keys(formData.dobrasCutaneas).map((key) => (
                  <div key={key}>
                    <label>{key}</label>
                    <input
                      type="number"
                      value={formData.dobrasCutaneas[key]}
                      onChange={(e) => handleNestedChange('dobrasCutaneas', key, Number(e.target.value))}
                      className="border rounded w-full p-2"
                    />
                  </div>
                ))}
              </>
            )}

            {formData.perimetrias && (
              <>
                <h2 className="font-semibold mt-4">Perimetrias (cm)</h2>
                {Object.keys(formData.perimetrias).map((key) => (
                  <div key={key}>
                    <label>{key}</label>
                    <input
                      type="number"
                      value={formData.perimetrias[key]}
                      onChange={(e) => handleNestedChange('perimetrias', key, Number(e.target.value))}
                      className="border rounded w-full p-2"
                    />
                  </div>
                ))}
              </>
            )}
          </div>

          <button
            onClick={handleSave}
            className="mt-6 bg-[#00B894] text-white px-6 py-2 rounded hover:bg-[#009f84]"
          >
            Salvar Alterações
          </button>

          {message && <p className="mt-4 text-center">{message}</p>}
        </motion.div>
      </div>
    </div>
  );
}
