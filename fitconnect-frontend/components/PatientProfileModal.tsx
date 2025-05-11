import { useState } from 'react';
import { motion } from 'framer-motion';

interface PatientProfileModalProps {
    onClose: () => void | Promise<void>;
    onSave: (data: any) => void;
    onNext: (data: any) => void; // ⬅️ adicionar isso
  }
  
  

export default function PatientProfileModal({ onNext }: PatientProfileModalProps) {
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

  const handleChange = (field: string, value: any) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    onNext(form);
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
          Complete seu Perfil
        </h2>

        {/* Dados Pessoais */}
        <div className="mb-8 p-6 border rounded-lg shadow-sm bg-[#F9F9F9]">
          <h3 className="text-xl font-semibold text-[#00B894] mb-4">Dados Pessoais</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <div>
              <label className="text-sm font-semibold">Data de Nascimento</label>
              <input
                type="date"
                className="border rounded p-2 w-full mt-1"
                value={form.birthDate}
                onChange={(e) => handleChange('birthDate', e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-semibold">Altura (cm)</label>
              <input
                type="number"
                className="border rounded p-2 w-full mt-1"
                value={form.height}
                onChange={(e) => handleChange('height', e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-semibold">Peso (kg)</label>
              <input
                type="number"
                className="border rounded p-2 w-full mt-1"
                value={form.weight}
                onChange={(e) => handleChange('weight', e.target.value)}
              />
            </div>
            <div className="md:col-span-2">
              <label className="text-sm font-semibold">Cidade</label>
              <input
                type="text"
                className="border rounded p-2 w-full mt-1"
                value={form.city}
                onChange={(e) => handleChange('city', e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Hábitos Alimentares */}
        <div className="mb-8 p-6 border rounded-lg shadow-sm bg-[#F9F9F9]">
          <h3 className="text-xl font-semibold text-[#00B894] mb-4">Hábitos</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold">Qual seu objetivo?</label>
              <input
                type="text"
                className="border rounded p-2 w-full mt-1"
                value={form.goal}
                onChange={(e) => handleChange('goal', e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-semibold">Possui alguma doença crônica?</label>
              <input
                type="text"
                className="border rounded p-2 w-full mt-1"
                value={form.chronicDisease}
                onChange={(e) => handleChange('chronicDisease', e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-semibold">Possui alguma restrição médica?</label>
              <input
                type="text"
                className="border rounded p-2 w-full mt-1"
                value={form.medicalRestriction}
                onChange={(e) => handleChange('medicalRestriction', e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-semibold">Possui alergia/intolerância a algum alimento?</label>
              <input
                type="text"
                className="border rounded p-2 w-full mt-1"
                value={form.foodAllergy}
                onChange={(e) => handleChange('foodAllergy', e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-semibold">Alimentos a evitar no seu cardápio</label>
              <input
                type="text"
                className="border rounded p-2 w-full mt-1"
                value={form.avoidFood}
                onChange={(e) => handleChange('avoidFood', e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-semibold">Pratica atividade física?</label>
              <input
                type="text"
                className="border rounded p-2 w-full mt-1"
                value={form.physicalActivity}
                onChange={(e) => handleChange('physicalActivity', e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-semibold">Se pratica atividade física, quais e qual a frequência?</label>
              <input
                type="text"
                className="border rounded p-2 w-full mt-1"
                value={form.activityFrequency}
                onChange={(e) => handleChange('activityFrequency', e.target.value)}
              />
            </div>
            <div className="md:col-span-2">
              <label className="text-sm font-semibold">Costuma fazer as refeições em horário fixo?</label>
              <input
                type="text"
                className="border rounded p-2 w-full mt-1"
                value={form.fixedMealTimes}
                onChange={(e) => handleChange('fixedMealTimes', e.target.value)}
              />
            </div>
            <div className="md:col-span-2">
              <label className="text-sm font-semibold">Alimentos que não podem faltar no seu dia</label>
              <input
                type="text"
                className="border rounded p-2 w-full mt-1"
                value={form.mustHaveFood}
                onChange={(e) => handleChange('mustHaveFood', e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Botão Avançar */}
        <div className="flex justify-end mt-8">
            <button
                onClick={() => onNext(form)}
                className="px-6 py-2 rounded bg-[#00B894] text-white hover:bg-[#009f84] transition"
                >
                Avançar
            </button>

        </div>
      </motion.div>
    </div>
  );
}
