import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import NavbarTrainer from '../../../../components/NavbarTrainer';
import { motion } from 'framer-motion';

export default function EditWorkoutPlan() {
  const router = useRouter();
  const { id } = router.query;

  const [formData, setFormData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!id) return;

    const fetchWorkout = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const res = await fetch(`http://localhost:3333/trainer/workouts/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (res.ok) {
          const data = await res.json();
          setFormData(data);
        } else {
          console.error('Erro ao buscar plano para edição.');
        }
      } catch (error) {
        console.error('Erro de conexão:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkout();
  }, [id]);

  const handleChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    if (!token || !formData) return;

    const payload = {
      ...formData
    };

    const res = await fetch(`http://localhost:3333/workouts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      setMessage('Plano atualizado com sucesso!');
      setTimeout(() => router.push(`/trainer/workouts/${id}`), 1500);
    } else {
      setMessage('Erro ao atualizar plano.');
    }
  };

  const addDay = () => {
    setFormData({
      ...formData,
      workoutDays: [
        ...formData.workoutDays,
        { dayOfWeek: '', muscleGroup: '', exercises: [] }
      ]
    });
  };

  const removeDay = (index: number) => {
    const updatedDays = [...formData.workoutDays];
    updatedDays.splice(index, 1);
    setFormData({ ...formData, workoutDays: updatedDays });
  };

  const handleDayChange = (index: number, field: string, value: any) => {
    const updatedDays = [...formData.workoutDays];
    updatedDays[index][field] = value;
    setFormData({ ...formData, workoutDays: updatedDays });
  };

  const addExercise = (dayIndex: number) => {
    const updatedDays = [...formData.workoutDays];
    updatedDays[dayIndex].exercises.push({ name: '', sets: [] });
    setFormData({ ...formData, workoutDays: updatedDays });
  };

  const removeExercise = (dayIndex: number, exerciseIndex: number) => {
    const updatedDays = [...formData.workoutDays];
    updatedDays[dayIndex].exercises.splice(exerciseIndex, 1);
    setFormData({ ...formData, workoutDays: updatedDays });
  };

  const handleExerciseChange = (dayIndex: number, exerciseIndex: number, value: string) => {
    const updatedDays = [...formData.workoutDays];
    updatedDays[dayIndex].exercises[exerciseIndex].name = value;
    setFormData({ ...formData, workoutDays: updatedDays });
  };

  const addSet = (dayIndex: number, exerciseIndex: number) => {
    const updatedDays = [...formData.workoutDays];
    updatedDays[dayIndex].exercises[exerciseIndex].sets.push({ setNumber: 1, targetReps: 0, targetLoad: 0 });
    setFormData({ ...formData, workoutDays: updatedDays });
  };

  const handleSetChange = (dayIndex: number, exerciseIndex: number, setIndex: number, field: string, value: any) => {
    const updatedDays = [...formData.workoutDays];
    updatedDays[dayIndex].exercises[exerciseIndex].sets[setIndex][field] = value;
    setFormData({ ...formData, workoutDays: updatedDays });
  };

  if (loading) return <p className="text-center mt-10">Carregando plano para edição...</p>;
  if (!formData) return <p className="text-center mt-10">Plano não encontrado.</p>;

  return (
    <div className="min-h-screen bg-[#F0F9F7] flex flex-col">
      <NavbarTrainer />
      <div className="flex-grow flex items-start justify-center">
        <motion.div
          className="mt-12 p-8 max-w-5xl w-full bg-white rounded-xl shadow"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl font-bold text-[#00B894] mb-6">
            Editar Plano de Treino
          </h1>

          {/* Formulário básico */}
          <div className="grid gap-4 mb-8">
            <input
              type="text"
              placeholder="Título do Plano"
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
                value={formData.validFrom?.slice(0, 10)}
                onChange={(e) => handleChange('validFrom', e.target.value)}
                className="border rounded p-2 w-full"
              />
              <input
                type="date"
                value={formData.validUntil?.slice(0, 10)}
                onChange={(e) => handleChange('validUntil', e.target.value)}
                className="border rounded p-2 w-full"
              />
            </div>
          </div>

          {/* Dias de treino */}
          <div>
            <h2 className="text-xl font-semibold text-[#00B894] mb-4">Dias de Treino</h2>
            {formData.workoutDays.map((day: any, dayIndex: number) => (
              <div key={dayIndex} className="bg-gray-100 p-4 mb-4 rounded shadow-sm">
                <div className="flex gap-4 mb-2">
                  <input
                    type="text"
                    placeholder="Dia da Semana"
                    value={day.dayOfWeek}
                    onChange={(e) => handleDayChange(dayIndex, 'dayOfWeek', e.target.value)}
                    className="border rounded p-2 flex-1"
                  />
                  <input
                    type="text"
                    placeholder="Grupo Muscular"
                    value={day.muscleGroup}
                    onChange={(e) => handleDayChange(dayIndex, 'muscleGroup', e.target.value)}
                    className="border rounded p-2 flex-1"
                  />
                  <button
                    onClick={() => removeDay(dayIndex)}
                    className="bg-red-500 text-white px-4 rounded hover:bg-red-600"
                  >
                    Remover Dia
                  </button>
                </div>

                {/* Exercícios */}
                {day.exercises.map((exercise: any, exerciseIndex: number) => (
                  <div key={exerciseIndex} className="bg-white p-3 rounded shadow-sm mb-2">
                    <input
                      type="text"
                      placeholder="Nome do Exercício"
                      value={exercise.name}
                      onChange={(e) => handleExerciseChange(dayIndex, exerciseIndex, e.target.value)}
                      className="border rounded p-2 w-full mb-2"
                    />

                    {/* Séries */}
                    {exercise.sets.map((set: any, setIndex: number) => (
                      <div key={setIndex} className="flex gap-2 mb-2">
                        <input
                          type="number"
                          placeholder="Reps"
                          value={set.targetReps}
                          onChange={(e) => handleSetChange(dayIndex, exerciseIndex, setIndex, 'targetReps', Number(e.target.value))}
                          className="border rounded p-2 w-24"
                        />
                        <input
                          type="number"
                          placeholder="Carga (kg)"
                          value={set.targetLoad}
                          onChange={(e) => handleSetChange(dayIndex, exerciseIndex, setIndex, 'targetLoad', Number(e.target.value))}
                          className="border rounded p-2 w-24"
                        />
                      </div>
                    ))}

                    <button
                      onClick={() => addSet(dayIndex, exerciseIndex)}
                      className="bg-[#00B894] text-white px-4 py-1 rounded hover:bg-[#009f84] mt-2"
                    >
                      + Adicionar Série
                    </button>
                  </div>
                ))}

                <button
                  onClick={() => addExercise(dayIndex)}
                  className="bg-[#00B894] text-white px-4 py-1 rounded hover:bg-[#009f84]"
                >
                  + Adicionar Exercício
                </button>
              </div>
            ))}

            <div className="flex justify-end">
              <button
                onClick={addDay}
                className="bg-[#00B894] text-white px-6 py-2 rounded hover:bg-[#009f84] transition mt-4"
              >
                + Adicionar Dia
              </button>
            </div>
          </div>

          {/* Botão de salvar */}
          <div className="flex justify-end mt-8">
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
