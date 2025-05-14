import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import NavbarTrainer from '../../../../components/NavbarTrainer';
import { motion } from 'framer-motion';

export default function EditAssessment() {
  const router = useRouter();
  const { id } = router.query;
  const [assessment, setAssessment] = useState<any>(null);
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
      setAssessment(data);
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

  const calcularResultados = () => {
    if (!assessment) return null;
  
    const idade = assessment.data.patientAge;
    const sexoRaw = assessment.data.patientGender;
  
    if (!idade || !sexoRaw) {
      console.warn('Idade ou gênero não informados.');
      return null;
    }
  
    const peso = parseFloat(formData.peso);
    const altura = parseFloat(formData.altura) / 100;
  
    if (!peso || !altura) {
      console.warn('Peso ou altura inválidos para cálculo.');
      return null;
    }
  
    const somaDobras = Object.values(formData.dobrasCutaneas || {}).reduce(
      (a: number, b) => a + Number(b || 0), 0
    );
  
    if (Number(somaDobras) <= 0) {
      console.warn('Dobras cutâneas não preenchidas.');
      return null;
    }
  
    const imc = (peso / (altura * altura)).toFixed(2);
    const sexo = sexoRaw === 'MALE' ? 'M' : 'F';
  
    let densidadeCorporal = 0;
    if (sexo === 'M') {
      densidadeCorporal = (1.112 - 0.00043499 * Number(somaDobras) + 0.00000055 * (Number(somaDobras) ** 2) - 0.00028826 * idade);
    } else {
      densidadeCorporal = (1.097 - 0.00046971 * Number(somaDobras) + 0.00000056 * (Number(somaDobras) ** 2) - 0.00012828 * idade);
    }
  
    if (!densidadeCorporal || isNaN(densidadeCorporal)) {
      console.warn('Erro no cálculo da densidade corporal.');
      return null;
    }
  
    const percGordura = Number(((495 / densidadeCorporal) - 450).toFixed(2));
    const massaMagra = (peso - (peso * percGordura / 100)).toFixed(2);
  
    return { IMC: imc, '% Gordura': percGordura, 'Massa Magra (kg)': massaMagra };
  };
  

  const handleSave = async () => {
    const token = localStorage.getItem('token');
  
    const resultadosCalculados = calcularResultados();
  
    const payload = {
      data: {
        ...formData,
        resultados: resultadosCalculados
      }
    };
  
    const res = await fetch(`http://localhost:3333/assessments/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(payload)
    });
  
    if (res.ok) {
      setMessage('Avaliação atualizada com sucesso!');
      setTimeout(() => router.push(`/trainer/assessments/${id}`), 1500);
    } else {
      setMessage('Erro ao atualizar avaliação.');
    }
  };
  

  if (!assessment || !formData) return <p className="text-center mt-10">Carregando dados para edição...</p>;

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
            Editar Avaliação Física
          </h1>

          {/* Bloco Superior */}
          <div className="flex flex-wrap gap-6 mb-6">
            <div><strong>Nome:</strong> {assessment.data.name}</div>
            <div><strong>Idade:</strong> {assessment.data.patientAge} anos</div>
            <div>
              <label><strong>Peso:</strong></label>
              <input
                type="number"
                value={formData.peso}
                onChange={(e) => handleChange('peso', Number(e.target.value))}
                className="border rounded p-1 ml-2 w-24"
              /> kg
            </div>
            <div>
              <label><strong>Altura:</strong></label>
              <input
                type="number"
                value={formData.altura}
                onChange={(e) => handleChange('altura', Number(e.target.value))}
                className="border rounded p-1 ml-2 w-24"
              /> cm
            </div>
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
              {formData.dobrasCutaneas && Object.entries(formData.dobrasCutaneas).map(([key, value]) => (
                <div key={key}>
                  <label><strong>{key}:</strong></label>
                  <input
                    type="number"
                    value={Number(value)}
                    onChange={(e) => handleNestedChange('dobrasCutaneas', key, Number(e.target.value))}
                    className="border rounded w-full p-2 mt-1"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Perimetrias */}
          <div>
            <h2 className="font-semibold text-[#00B894] mb-2">Perimetrias (cm)</h2>
            <div className="grid grid-cols-2 gap-4">
              {['Cintura', 'Quadril', 'Coxa', 'Braço', 'Peito'].map((key) => (
                <div key={key}>
                  <label><strong>{key}:</strong></label>
                  <input
                    type="number"
                    value={formData.perimetrias?.[key] ?? ''}
                    onChange={(e) => handleNestedChange('perimetrias', key, Number(e.target.value))}
                    className="border rounded w-full p-2 mt-1"
                  />
                </div>
              ))}
            </div>
          </div>


          <div className="mt-8 flex justify-end">
            <button
              onClick={handleSave}
              className="bg-[#00B894] text-white px-6 py-2 rounded hover:bg-[#009f84] transition"
            >
              Salvar Alterações
            </button>
          </div>

          {message && <p className="mt-4 text-center">{message}</p>}
        </motion.div>
      </div>
    </div>
  );
}
