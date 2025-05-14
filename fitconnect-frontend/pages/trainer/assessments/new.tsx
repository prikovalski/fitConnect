import { useEffect, useState } from 'react';
import NavbarTrainer from '../../../components/NavbarTrainer';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

export default function AssessmentForm() {
  const router = useRouter();
  const { id } = router.query;
  const isEditMode = Boolean(id);

  const [students, setStudents] = useState([]);
  const [patientInfo, setPatientInfo] = useState<{ age: number; gender: string } | null>(null);

  const [formData, setFormData] = useState({
    patientId: '',
    method: 'Pollock 7 Dobras',
    peso: '',
    altura: '',
    dobrasCutaneas: {
      Peitoral: '',
      Abdominal: '',
      Coxa: '',
      Tríceps: '',
      Subescapular: '',
      'Supra-ilíaca': '',
      'Axilar Média': ''
    },
    perimetrias: {
      Cintura: '',
      Quadril: '',
      Coxa: '',
      Braço: '',
      Peito: ''
    },
    nextAssessment: ''
  });

  const [resultados, setResultados] = useState<any>(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchStudents = async () => {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:3333/trainer/students', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setStudents(data);
    };
    fetchStudents();
  }, []);

  const handlePatientChange = async (e) => {
    const patientId = e.target.value;
    setFormData({ ...formData, patientId });

    if (!patientId) return;

    const token = localStorage.getItem('token');
    const res = await fetch(`http://localhost:3333/trainer/students/${patientId}/basic-info`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (res.ok) {
      const data = await res.json();
      setPatientInfo({ age: data.age, gender: data.gender });
    }
  };

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleNestedChange = (section, field, value) => {
    setFormData({
      ...formData,
      [section]: {
        ...formData[section],
        [field]: value
      }
    });
  };

  const calcularResultados = () => {
    if (!patientInfo) return null;

    const peso = parseFloat(formData.peso);
    const altura = parseFloat(formData.altura) / 100;
    const imc = (peso / (altura * altura)).toFixed(2);

    const somaDobras = Object.values(formData.dobrasCutaneas).reduce((a: number, b) => a + Number(b || 0), 0);

    const idade = patientInfo.age;
    const sexo = patientInfo.gender === 'MALE' ? 'M' : 'F';

    let densidadeCorporal = 0;
    if (sexo === 'M') {
      densidadeCorporal = (1.112 - 0.00043499 * somaDobras + 0.00000055 * (somaDobras ** 2) - 0.00028826 * idade);
    } else {
      densidadeCorporal = (1.097 - 0.00046971 * somaDobras + 0.00000056 * (somaDobras ** 2) - 0.00012828 * idade);
    }
    const percGordura = Number(((495 / densidadeCorporal) - 450).toFixed(2));
    const massaMagra = (peso - (peso * percGordura / 100)).toFixed(2);

    return { IMC: imc, '% Gordura': percGordura, 'Massa Magra (kg)': massaMagra };
  };

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    const userId = Number(localStorage.getItem('userId'));

    if (!userId || !formData.patientId) {
      setMessage('Erro: Selecione um paciente e verifique o login.');
      return;
    }

    const resultadosCalculados = calcularResultados();
    setResultados(resultadosCalculados);

    const payload = {
      method: formData.method,
      data: {
        peso: formData.peso,
        altura: formData.altura,
        patientAge: patientInfo?.age,
        patientGender: patientInfo?.gender,
        dobrasCutaneas: formData.dobrasCutaneas,
        perimetrias: formData.perimetrias,
        nextAssessment: formData.nextAssessment,
        resultados: resultadosCalculados
      },
      patientId: Number(formData.patientId),
      createdById: userId,
      nextAssessment: formData.nextAssessment
    };

    const res = await fetch('http://localhost:3333/assessments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      setMessage('Avaliação cadastrada com sucesso!');
      setTimeout(() => router.push('/trainer/assessments'), 2000);
    } else {
      setMessage('Erro ao salvar avaliação.');
    }
  };

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
            Nova Avaliação Física
          </h1>

          {/* Bloco: Seleção de Paciente */}
          <div className="mb-6">
            <label className="block font-semibold mb-2 text-[#00B894]">Paciente</label>
            <select
              value={formData.patientId}
              onChange={handlePatientChange}
              className="border rounded w-full p-2 focus:ring-2 focus:ring-[#00B894]"
            >
              <option value="">Selecione o paciente</option>
              {students.map((s) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>

          {/* Bloco: Dados do Paciente */}
          {patientInfo && (
            <div className="mb-6 bg-[#E0F7F4] p-4 rounded shadow">
              <h2 className="font-semibold text-[#00B894] border-b pb-2 mb-4">Dados do Paciente</h2>
              <div className="flex flex-wrap gap-6">
                <div><strong>Idade:</strong> {patientInfo.age} anos</div>
                <div><strong>Sexo:</strong> {patientInfo.gender === 'MALE' ? 'Masculino' : 'Feminino'}</div>
                <div>
                  <label><strong>Peso:</strong></label>
                  <input
                    type="number"
                    value={formData.peso}
                    onChange={(e) => handleChange('peso', e.target.value)}
                    className="border rounded p-1 ml-2 w-24 focus:ring-2 focus:ring-[#00B894]"
                  /> kg
                </div>
                <div>
                  <label><strong>Altura:</strong></label>
                  <input
                    type="number"
                    value={formData.altura}
                    onChange={(e) => handleChange('altura', e.target.value)}
                    className="border rounded p-1 ml-2 w-24 focus:ring-2 focus:ring-[#00B894]"
                  /> cm
                </div>
              </div>
            </div>
          )}

          {/* Bloco: Dobras Cutâneas */}
          <div className="mb-6 bg-gray-100 p-4 rounded shadow">
            <h2 className="font-semibold text-[#00B894] border-b pb-2 mb-4">Dobras Cutâneas (mm)</h2>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(formData.dobrasCutaneas).map(([key, value]) => (
                <div key={key}>
                  <label><strong>{key}:</strong></label>
                  <input
                    type="number"
                    value={value}
                    onChange={(e) => handleNestedChange('dobrasCutaneas', key, e.target.value)}
                    className="border rounded w-full p-2 mt-1 focus:ring-2 focus:ring-[#00B894]"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Bloco: Perimetrias */}
          <div className="mb-6 bg-gray-200 p-4 rounded shadow">
            <h2 className="font-semibold text-[#00B894] border-b pb-2 mb-4">Perimetrias (cm)</h2>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(formData.perimetrias).map(([key, value]) => (
                <div key={key}>
                  <label><strong>{key}:</strong></label>
                  <input
                    type="number"
                    value={value}
                    onChange={(e) => handleNestedChange('perimetrias', key, e.target.value)}
                    className="border rounded w-full p-2 mt-1 focus:ring-2 focus:ring-[#00B894]"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Bloco: Próxima Avaliação */}
          <div className="mb-6">
            <label className="font-semibold text-[#00B894]">Próxima Avaliação</label>
            <input
              type="date"
              value={formData.nextAssessment}
              onChange={(e) => handleChange('nextAssessment', e.target.value)}
              className="border rounded w-full p-2 mt-1 focus:ring-2 focus:ring-[#00B894]"
            />
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleSave}
              className="bg-[#00B894] text-white px-6 py-2 rounded hover:bg-[#009f84] transition"
            >
              Salvar Avaliação
            </button>
          </div>

          {/* Bloco: Resultados Calculados */}
          {resultados && (
            <div className="mt-6 bg-[#DFF6F2] p-4 rounded shadow">
              <h2 className="font-semibold text-[#00B894] border-b pb-2 mb-4">Resultados Calculados</h2>
              <div className="flex gap-6">
                <div><strong>IMC:</strong> {resultados.IMC}</div>
                <div><strong>% Gordura:</strong> {resultados['% Gordura']}%</div>
                <div><strong>Massa Magra:</strong> {resultados['Massa Magra (kg)']} kg</div>
              </div>
            </div>
          )}

          {message && <p className="mt-4 text-center">{message}</p>}
        </motion.div>
      </div>
    </div>
  );
}
