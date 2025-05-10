import { useState } from 'react';

interface PatientProfileModalProps {
  onClose: () => void;
}

export default function PatientProfileModal({ onClose }: PatientProfileModalProps) {
  const [formData, setFormData] = useState({
    gender: '',
    height: '',
    weight: '',
    birthDate: '',
    city: '',
    goal: '',
    chronicDisease: '',
    medicalRestriction: '',
    foodAllergy: '',
    foodAvoidance: '',
    physicalActivity: '',
    activityFrequency: '',
    fixedMealTimes: '',
    mustHaveFood: '',
    neckCircumference: '',
    waistCircumference: '',
    hipCircumference: ''
  });

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async () => {
    // Aqui você pode fazer a requisição para salvar os dados
    console.log('Form data:', formData);
    onClose(); // Fecha o modal depois
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 shadow-lg w-full max-w-2xl mx-4 relative">
        <h2 className="text-2xl font-bold text-[#00B894] mb-6 text-center">
          Complete seu Perfil
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[70vh] overflow-y-auto pr-2">
          <input
            type="text"
            placeholder="Gênero"
            value={formData.gender}
            onChange={(e) => handleChange('gender', e.target.value)}
            className="border rounded p-2"
          />
          <input
            type="text"
            placeholder="Altura (cm)"
            value={formData.height}
            onChange={(e) => handleChange('height', e.target.value)}
            className="border rounded p-2"
          />
          <input
            type="text"
            placeholder="Peso (kg)"
            value={formData.weight}
            onChange={(e) => handleChange('weight', e.target.value)}
            className="border rounded p-2"
          />
          <input
            type="date"
            placeholder="Data de Nascimento"
            value={formData.birthDate}
            onChange={(e) => handleChange('birthDate', e.target.value)}
            className="border rounded p-2"
          />
          <input
            type="text"
            placeholder="Cidade onde reside"
            value={formData.city}
            onChange={(e) => handleChange('city', e.target.value)}
            className="border rounded p-2"
          />
          <input
            type="text"
            placeholder="Qual o objetivo?"
            value={formData.goal}
            onChange={(e) => handleChange('goal', e.target.value)}
            className="border rounded p-2"
          />
          <input
            type="text"
            placeholder="Doença crônica?"
            value={formData.chronicDisease}
            onChange={(e) => handleChange('chronicDisease', e.target.value)}
            className="border rounded p-2"
          />
          <input
            type="text"
            placeholder="Restrição médica?"
            value={formData.medicalRestriction}
            onChange={(e) => handleChange('medicalRestriction', e.target.value)}
            className="border rounded p-2"
          />
          <input
            type="text"
            placeholder="Alergia/intolerância alimentar?"
            value={formData.foodAllergy}
            onChange={(e) => handleChange('foodAllergy', e.target.value)}
            className="border rounded p-2"
          />
          <input
            type="text"
            placeholder="Alimentos a evitar?"
            value={formData.foodAvoidance}
            onChange={(e) => handleChange('foodAvoidance', e.target.value)}
            className="border rounded p-2"
          />
          <input
            type="text"
            placeholder="Pratica atividade física?"
            value={formData.physicalActivity}
            onChange={(e) => handleChange('physicalActivity', e.target.value)}
            className="border rounded p-2"
          />
          <input
            type="text"
            placeholder="Frequência de atividade física"
            value={formData.activityFrequency}
            onChange={(e) => handleChange('activityFrequency', e.target.value)}
            className="border rounded p-2"
          />
          <input
            type="text"
            placeholder="Refeições em horários fixos?"
            value={formData.fixedMealTimes}
            onChange={(e) => handleChange('fixedMealTimes', e.target.value)}
            className="border rounded p-2"
          />
          <input
            type="text"
            placeholder="Alimento indispensável?"
            value={formData.mustHaveFood}
            onChange={(e) => handleChange('mustHaveFood', e.target.value)}
            className="border rounded p-2"
          />
          <input
            type="text"
            placeholder="Circunferência do pescoço (cm)"
            value={formData.neckCircumference}
            onChange={(e) => handleChange('neckCircumference', e.target.value)}
            className="border rounded p-2"
          />
          <input
            type="text"
            placeholder="Circunferência da cintura (cm)"
            value={formData.waistCircumference}
            onChange={(e) => handleChange('waistCircumference', e.target.value)}
            className="border rounded p-2"
          />
          <input
            type="text"
            placeholder="Circunferência do quadril (cm)"
            value={formData.hipCircumference}
            onChange={(e) => handleChange('hipCircumference', e.target.value)}
            className="border rounded p-2"
          />
        </div>

        <div className="flex justify-end mt-6 gap-4">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-300 hover:bg-gray-400 rounded text-gray-800"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-[#00B894] hover:bg-[#009f84] text-white rounded"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}
