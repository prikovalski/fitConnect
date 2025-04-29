import { useEffect, useState } from 'react';
import NavbarTrainer from '../../../components/NavbarTrainer';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

export default function NewWorkoutPlan() {
  const router = useRouter();

  const [students, setStudents] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    validFrom: '',
    validUntil: '',
    patientId: '',
    days: [] as any[]
  });

  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchStudents = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;
  
      try {
        const res = await fetch('http://localhost:3333/trainer/students', {
          headers: { Authorization: `Bearer ${token}` }
        });
  
        if (res.ok) {
          const data = await res.json();
          setStudents(data);
        } else {
          console.error('Erro ao buscar alunos');
        }
      } catch (error) {
        console.error('Erro de conexão ao buscar alunos:', error);
      }
    };
  
    fetchStudents();
  }, []);  

  const handleAddDay = () => {
    setFormData({
      ...formData,
      days: [...formData.days, {
        dayOfWeek: '',
        muscleGroup: '',
        exercises: []
      }]
    });
  };

  const handleAddExercise = (dayIndex: number) => {
    const updatedDays = [...formData.days];
    updatedDays[dayIndex].exercises.push({
      name: '',
      order: updatedDays[dayIndex].exercises.length + 1,
      sets: []
    });
    setFormData({ ...formData, days: updatedDays });
  };

  const handleAddSet = (dayIndex: number, exerciseIndex: number) => {
    const updatedDays = [...formData.days];
    updatedDays[dayIndex].exercises[exerciseIndex].sets.push({
      setNumber: updatedDays[dayIndex].exercises[exerciseIndex].sets.length + 1,
      targetReps: '',
      targetLoad: ''
    });
    setFormData({ ...formData, days: updatedDays });
  };

  const handleChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleDayChange = (index: number, field: string, value: any) => {
    const updatedDays = [...formData.days];
    updatedDays[index][field] = value;
    setFormData({ ...formData, days: updatedDays });
  };

  const handleExerciseChange = (dayIndex: number, exerciseIndex: number, field: string, value: any) => {
    const updatedDays = [...formData.days];
    updatedDays[dayIndex].exercises[exerciseIndex][field] = value;
    setFormData({ ...formData, days: updatedDays });
  };

  const handleSetChange = (dayIndex: number, exerciseIndex: number, setIndex: number, field: string, value: any) => {
    const updatedDays = [...formData.days];
    updatedDays[dayIndex].exercises[exerciseIndex].sets[setIndex][field] = value;
    setFormData({ ...formData, days: updatedDays });
  };

  const handleSave = async () => {
    const token = localStorage.getItem('token');

    const payload = {
      title: formData.title,
      description: formData.description,
      validFrom: formData.validFrom,
      validUntil: formData.validUntil,
      patientId: Number(formData.patientId),
      days: formData.days
    };

    const res = await fetch('http://localhost:3333/trainer/workouts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      setMessage('Plano de treino criado com sucesso!');
      setTimeout(() => router.push('/trainer/workouts'), 2000);
    } else {
      setMessage('Erro ao criar plano.');
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F9F7] flex flex-col">
      <NavbarTrainer />
      <div className="flex-grow flex items-start justify-center">
        <motion.div
          className="mt-12 p-8 max-w-5xl w-full bg-white rounded-xl shadow"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl font-bold text-[#00B894] mb-6">Novo Plano de Treino</h1>

          <div className="grid gap-4 mb-6">
            <input
              type="text"
              placeholder="Título do plano"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              className="border rounded p-2 w-full"
            />

            <textarea
              placeholder="Descrição"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              className="border rounded p-2 w-full"
            />

            <div className="flex gap-4">
              <input
                type="date"
                value={formData.validFrom}
                onChange={(e) => handleChange('validFrom', e.target.value)}
                className="border rounded p-2 w-full"
              />
              <input
                type="date"
                value={formData.validUntil}
                onChange={(e) => handleChange('validUntil', e.target.value)}
                className="border rounded p-2 w-full"
              />
            </div>

            <select
              value={formData.patientId}
              onChange={(e) => handleChange('patientId', e.target.value)}
              className="border rounded p-2 w-full"
            >
              <option value="">Selecione o paciente</option>
              {students.map((student) => (
                <option key={student.id} value={student.id}>{student.name}</option>
              ))}
            </select>
          </div>

          {/* Dias da semana */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-[#00B894] mb-2">Dias da Semana</h2>

            {formData.days.map((day, dayIndex) => (
              <div key={dayIndex} className="bg-gray-100 p-4 rounded mb-4">
                <div className="flex gap-4 mb-2">
                  <input
                    type="text"
                    placeholder="Dia da semana (ex: Segunda-feira)"
                    value={day.dayOfWeek}
                    onChange={(e) => handleDayChange(dayIndex, 'dayOfWeek', e.target.value)}
                    className="border rounded p-2 w-full"
                  />
                  <input
                    type="text"
                    placeholder="Grupo muscular"
                    value={day.muscleGroup}
                    onChange={(e) => handleDayChange(dayIndex, 'muscleGroup', e.target.value)}
                    className="border rounded p-2 w-full"
                  />
                </div>

                {/* Exercícios */}
                {day.exercises.map((exercise, exerciseIndex) => (
                  <div key={exerciseIndex} className="bg-white p-4 rounded shadow mb-2">
                    <input
                      type="text"
                      placeholder="Nome do exercício"
                      value={exercise.name}
                      onChange={(e) => handleExerciseChange(dayIndex, exerciseIndex, 'name', e.target.value)}
                      className="border rounded p-2 w-full mb-2"
                    />

                    {/* Séries */}
                    {exercise.sets.map((set, setIndex) => (
                      <div key={setIndex} className="flex gap-2 mb-2">
                        <input
                          type="number"
                          placeholder="Repetições"
                          value={set.targetReps}
                          onChange={(e) => handleSetChange(dayIndex, exerciseIndex, setIndex, 'targetReps', e.target.value)}
                          className="border rounded p-2 w-1/2"
                        />
                        <input
                          type="number"
                          placeholder="Carga (kg)"
                          value={set.targetLoad}
                          onChange={(e) => handleSetChange(dayIndex, exerciseIndex, setIndex, 'targetLoad', e.target.value)}
                          className="border rounded p-2 w-1/2"
                        />
                      </div>
                    ))}

                    <button
                      onClick={() => handleAddSet(dayIndex, exerciseIndex)}
                      className="text-sm text-[#00B894] hover:underline"
                    >
                      + Adicionar Série
                    </button>
                  </div>
                ))}

                <button
                  onClick={() => handleAddExercise(dayIndex)}
                  className="text-sm text-[#00B894] hover:underline"
                >
                  + Adicionar Exercício
                </button>
              </div>
            ))}

            <button
              onClick={handleAddDay}
              className="bg-[#00B894] text-white px-4 py-2 rounded hover:bg-[#009f84] transition mt-4"
            >
              + Adicionar Dia
            </button>
          </div>

          {/* Salvar */}
          <div className="flex justify-end">
            <button
              onClick={handleSave}
              className="bg-[#00B894] text-white px-6 py-2 rounded hover:bg-[#009f84] transition"
            >
              Salvar Plano
            </button>
          </div>

          {message && <p className="mt-4 text-center">{message}</p>}
        </motion.div>
      </div>
    </div>
  );
}
