import { useEffect, useState } from 'react';
import NavbarTrainer from '../../../components/NavbarTrainer';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

export default function NewAssessment() {
  const router = useRouter();
  const [students, setStudents] = useState([]);
  const [patientInfo, setPatientInfo] = useState<{ age: number; gender: string } | null>(null);

  const [formData, setFormData] = useState({
    patientId: '',
    method: 'Pollock 7 Dobras',
    peso: '',
    altura: '',
    dobrasCutaneas: {},
    perimetrias: {},
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
      densidadeCorporal = (1.112 - 0.00043499 * Number(somaDobras) + 0.00000055 * (Number(somaDobras) ** 2) - 0.00028826 * idade);
    } else {
      densidadeCorporal = (1.097 - 0.00046971 * Number(somaDobras) + 0.00000056 * (Number(somaDobras) ** 2) - 0.00012828 * idade);
    }
    const percGordura = Number(((495 / densidadeCorporal) - 450).toFixed(2));
    const massaMagra = (peso - (peso * percGordura / 100)).toFixed(2);

    return { IMC: imc, '% Gordura': percGordura, 'Massa Magra (kg)': massaMagra };
  };

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    const userIdRaw = localStorage.getItem('userId');
    const userId = userIdRaw ? Number(userIdRaw) : null;

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
      // Exibe resultados por alguns segundos antes de redirecionar
      setTimeout(() => router.push('/trainer/assessments'), 2000);
    } else {
      setMessage('Erro ao salvar avaliação.');
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F9F7]">
      <NavbarTrainer />
      <div className="p-8 max-w-4xl mx-auto bg-white rounded-xl shadow">
        <motion.h1 className="text-2xl font-bold text-[#00B894] mb-6">Nova Avaliação Física</motion.h1>

        <select value={formData.patientId} onChange={handlePatientChange} className="border p-2 rounded w-full mb-4">
          <option value="">Selecione o Paciente</option>
          {students.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
        </select>

        {patientInfo && (
          <div className="mb-4">
            <p><strong>Idade:</strong> {patientInfo.age} anos</p>
            <p><strong>Sexo:</strong> {patientInfo.gender === 'MALE' ? 'Masculino' : 'Feminino'}</p>
          </div>
        )}

        <input type="number" placeholder="Peso (kg)" value={formData.peso} onChange={(e) => handleChange('peso', e.target.value)} className="border p-2 rounded w-full mb-4" />
        <input type="number" placeholder="Altura (cm)" value={formData.altura} onChange={(e) => handleChange('altura', e.target.value)} className="border p-2 rounded w-full mb-4" />

        <h2 className="font-semibold">Dobras Cutâneas (mm)</h2>
        {['Peitoral', 'Abdominal', 'Coxa', 'Tríceps', 'Subescapular', 'Supra-ilíaca', 'Axilar Média'].map((dobra) => (
          <input
            key={dobra}
            type="number"
            placeholder={dobra}
            onChange={(e) => handleNestedChange('dobrasCutaneas', dobra, e.target.value)}
            className="border p-2 rounded w-full mb-2"
          />
        ))}

        <input type="date" value={formData.nextAssessment} onChange={(e) => handleChange('nextAssessment', e.target.value)} className="border p-2 rounded w-full mb-4" />

        <button onClick={handleSave} className="bg-[#00B894] text-white px-4 py-2 rounded">Salvar Avaliação</button>

        {resultados && (
          <div className="mt-6">
            <h3 className="font-bold mb-2">Resultados Calculados:</h3>
            <pre className="bg-gray-100 p-4 rounded">{JSON.stringify(resultados, null, 2)}</pre>
          </div>
        )}

        {message && <p className="mt-4 text-center">{message}</p>}
      </div>
    </div>
  );
}
