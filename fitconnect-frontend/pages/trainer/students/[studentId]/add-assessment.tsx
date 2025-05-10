import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import NavbarTrainer from '../../../../components/NavbarTrainer';
import PrivateRoute from '../../../../components/PrivateRoute';
import { motion } from 'framer-motion';
import jsPDF from 'jspdf';

export default function AddAssessment() {
  const router = useRouter();
  const { id } = router.query;

  const [patient, setPatient] = useState<any>({});
  const [formData, setFormData] = useState<any>({});
  const [results, setResults] = useState<any>(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchPatient = async () => {
      const token = localStorage.getItem('token');
      if (!token || !id) return;

      const res = await fetch(`http://localhost:3333/users/${id}`, {  // Ajuste conforme sua rota de user
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.ok) {
        const data = await res.json();
        setPatient(data);
      }
    };
    fetchPatient();
  }, [id]);

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: parseFloat(value) });
  };

  const calculateResults = () => {
    const peso = formData.peso;
    const altura = formData.altura / 100;  // Convertendo para metros
    const idade = getIdade(patient.birthDate);
    const sexo = patient.gender;

    const imc = peso / (altura * altura);

    const somaDobras = [
      formData.peitoral, formData.abdominal, formData.triceps,
      formData.subescapular, formData.suprailiaca, formData.coxa, formData.axilar
    ].reduce((a, b) => a + b, 0);

    let densidade = 0;
    if (sexo === 'MALE') {
      densidade = 1.112 - 0.00043499 * somaDobras + 0.00000055 * (somaDobras ** 2) - 0.00028826 * idade;
    } else {
      densidade = 1.097 - 0.00046971 * somaDobras + 0.00000056 * (somaDobras ** 2) - 0.00012828 * idade;
    }

    const percentualGordura = ((4.95 / densidade) - 4.5) * 100;
    const massaMagra = peso - (percentualGordura / 100 * peso);

    setResults({
      imc: imc.toFixed(2),
      percentualGordura: percentualGordura.toFixed(2),
      massaMagra: massaMagra.toFixed(2)
    });

    setMessage('Avaliação calculada com sucesso!');
  };

  const getIdade = (birthDate: string) => {
    const nascimento = new Date(birthDate);
    const hoje = new Date();
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const m = hoje.getMonth() - nascimento.getMonth();
    if (m < 0 || (m === 0 && hoje.getDate() < nascimento.getDate())) {
      idade--;
    }
    return idade;
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text(`Avaliação Física - ${patient.name}`, 10, 10);
    doc.text(`Idade: ${getIdade(patient.birthDate)} anos`, 10, 20);
    doc.text(`Peso: ${formData.peso} kg`, 10, 30);
    doc.text(`Altura: ${formData.altura} cm`, 10, 40);
    doc.text(`IMC: ${results.imc}`, 10, 50);
    doc.text(`% Gordura: ${results.percentualGordura}%`, 10, 60);
    doc.text(`Massa Magra: ${results.massaMagra} kg`, 10, 70);
    doc.save(`Avaliacao_${patient.name}.pdf`);
  };

  return (
    <PrivateRoute>
      <NavbarTrainer />
      <div className="p-8 max-w-4xl mx-auto">
        <motion.h1
          className="text-2xl font-bold text-[#00B894] mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Avaliação Física de {patient.name} ({getIdade(patient.birthDate)} anos)
        </motion.h1>

        <h2 className="font-semibold mb-2">Dados Básicos</h2>
        <input type="number" placeholder="Peso (kg)" onChange={(e) => handleInputChange('peso', e.target.value)} className="border px-3 py-2 rounded w-full mb-3" />
        <input type="number" placeholder="Altura (cm)" onChange={(e) => handleInputChange('altura', e.target.value)} className="border px-3 py-2 rounded w-full mb-6" />

        <h2 className="font-semibold mb-2">Dobras Cutâneas (mm)</h2>
        {['peitoral', 'abdominal', 'triceps', 'subescapular', 'suprailiaca', 'coxa', 'axilar'].map(field => (
          <input key={field} type="number" placeholder={field} onChange={(e) => handleInputChange(field, e.target.value)} className="border px-3 py-2 rounded w-full mb-3" />
        ))}

        <h2 className="font-semibold mb-2 mt-6">Perimetria (cm)</h2>
        {['cintura', 'quadril', 'coxa_perimetria', 'braco', 'panturrilha'].map(field => (
          <input key={field} type="number" placeholder={field} onChange={(e) => handleInputChange(field, e.target.value)} className="border px-3 py-2 rounded w-full mb-3" />
        ))}

        <button
          onClick={calculateResults}
          className="bg-[#00B894] text-white px-6 py-2 rounded hover:bg-[#009f84] transition w-full mt-6"
        >
          Calcular e Salvar
        </button>

        {message && <p className="text-center mt-4">{message}</p>}

        {results && (
          <div className="mt-8 p-4 bg-[#e0f7f4] rounded">
            <h3 className="font-bold text-lg mb-2">Resultados:</h3>
            <p>IMC: {results.imc}</p>
            <p>% Gordura: {results.percentualGordura}%</p>
            <p>Massa Magra: {results.massaMagra} kg</p>

            <button
              onClick={generatePDF}
              className="mt-4 bg-[#00B894] text-white px-6 py-2 rounded hover:bg-[#009f84] transition"
            >
              Gerar PDF
            </button>
          </div>
        )}
      </div>
    </PrivateRoute>
  );
}
