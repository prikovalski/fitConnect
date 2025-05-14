import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface PatientProfileModalProps {
  onClose: () => void;
  onSave: (data: any) => void;
  onNext?: (data: any) => void; // Para diferenciar criação ou edição
  initialData?: any;            // <-- Novo parâmetro opcional
}

export default function PatientProfileModal({ onClose, onSave, onNext, initialData }: PatientProfileModalProps) {
  const [form, setForm] = useState({
    gender: '',
    height: '',
    weight: '',
    birthDate: '',
    city: '',
    goal: '',
    chronicDisease: '',
    medicalRestriction: '',
    foodAllergy: '',
    avoidFood: '',
    physicalActivity: '',
    activityFrequency: '',
    fixedMealTimes: '',
    mustHaveFood: '',
  });

  function mapGenderToDisplay(genderEnum: string) {
    switch (genderEnum) {
      case 'MALE':
        return 'Masculino';
      case 'FEMALE':
        return 'Feminino';
      case 'OTHER':
        return 'Outro';
      default:
        return '';
    }
  }

  // Preenche os campos se vier initialData (modo edição)
  useEffect(() => {
    if (initialData) {
      setForm({
        gender: initialData?.gender ? mapGenderToDisplay(initialData.gender) : '',
        height: initialData.height || '',
        weight: initialData.weight || '',
        birthDate: initialData.birthDate ? initialData.birthDate.slice(0, 10) : '',
        city: initialData.city || '',
        goal: initialData.goal || '',
        chronicDisease: initialData.chronicDisease || '',
        medicalRestriction: initialData.medicalRestriction || '',
        foodAllergy: initialData.foodAllergy || '',
        avoidFood: initialData.avoidFood || '',
        physicalActivity: initialData.physicalActivity || '',
        activityFrequency: initialData.activityFrequency || '',
        fixedMealTimes: initialData.fixedMealTimes || '',
        mustHaveFood: initialData.mustHaveFood || '',
      });
    }
  }, [initialData]);

  const handleChange = (field: string, value: any) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = () => {
    if (onNext) {
      onNext(form);
    } else {
      onSave(form); // Se for edição
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <motion.div
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
      >
        <h2 className="text-2xl font-bold text-[#00B894] mb-8 text-center">
          {onNext ? 'Complete seu Perfil' : 'Editar Perfil'}
        </h2>

        {/* Campos do Formulário */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Gênero */}
          <div>
            <label className="text-sm font-semibold">Gênero</label>
            <select
              className="border rounded p-2 w-full mt-1"
              value={form.gender}
              onChange={(e) => handleChange('gender', e.target.value)}
            >
              <option value="">Selecione</option>
              <option value="Masculino">Masculino</option>
              <option value="Feminino">Feminino</option>
              <option value="Outro">Outro</option>
            </select>
          </div>

          {/* Altura */}
          <div>
            <label className="text-sm font-semibold">Altura (cm)</label>
            <input
              type="number"
              className="border rounded p-2 w-full mt-1"
              value={form.height}
              onChange={(e) => handleChange('height', e.target.value)}
            />
          </div>

          {/* Peso */}
          <div>
            <label className="text-sm font-semibold">Peso (kg)</label>
            <input
              type="number"
              className="border rounded p-2 w-full mt-1"
              value={form.weight}
              onChange={(e) => handleChange('weight', e.target.value)}
            />
          </div>

          {/* Data de nascimento */}
          <div>
            <label className="text-sm font-semibold">Data de Nascimento</label>
            <input
              type="date"
              className="border rounded p-2 w-full mt-1"
              value={form.birthDate}
              onChange={(e) => handleChange('birthDate', e.target.value)}
            />
          </div>

          {/* Cidade */}
          <div className="md:col-span-2">
            <label className="text-sm font-semibold">Cidade</label>
            <input
              type="text"
              className="border rounded p-2 w-full mt-1"
              value={form.city}
              onChange={(e) => handleChange('city', e.target.value)}
            />
          </div>

          {/* Objetivo */}
          <div className="md:col-span-2">
            <label className="text-sm font-semibold">Objetivo</label>
            <input
              type="text"
              className="border rounded p-2 w-full mt-1"
              value={form.goal}
              onChange={(e) => handleChange('goal', e.target.value)}
            />
          </div>
        </div>

        {/* Botões */}
        <div className="flex justify-end gap-4 mt-8">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded bg-gray-300 hover:bg-gray-400 transition"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2 rounded bg-[#00B894] text-white hover:bg-[#009f84] transition"
          >
            {onNext ? 'Avançar' : 'Salvar'}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
