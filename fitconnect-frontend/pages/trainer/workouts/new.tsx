import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NavbarTrainer from '../../../components/NavbarTrainer';

export default function WorkoutPlanForm() {
  const [students, setStudents] = useState<any[]>([]);
  const [plan, setPlan] = useState({
    title: '',
    description: '',
    validFrom: '',
    validUntil: '',
    patientId: '',
    workoutDays: [],
  });
  const [openDayIndex, setOpenDayIndex] = useState<number | null>(null);

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
  
  const handleChange = (path: string[], value: any) => {
    const newPlan = { ...plan };
    let ref = newPlan;
    for (let i = 0; i < path.length - 1; i++) {
      ref = ref[path[i]];
    }
    ref[path[path.length - 1]] = value;
    setPlan(newPlan);
  };

  const handleAddDay = () => {
    setPlan({
      ...plan,
      workoutDays: [
        ...plan.workoutDays,
        { dayOfWeek: '', muscleGroup: '', exercises: [] }
      ],
    });
    setOpenDayIndex(plan.workoutDays.length); // abre o novo
  };

  const handleRemoveDay = (index: number) => {
    const updated = [...plan.workoutDays];
    updated.splice(index, 1);
    setPlan({ ...plan, workoutDays: updated });
    setOpenDayIndex(null);
  };

  const handleAddExercise = (dayIndex: number) => {
    const updated = [...plan.workoutDays];
    updated[dayIndex].exercises.push({ name: '', sets: [] });
    setPlan({ ...plan, workoutDays: updated });
  };

  const handleRemoveExercise = (dayIndex: number, exerciseIndex: number) => {
    const updated = [...plan.workoutDays];
    updated[dayIndex].exercises.splice(exerciseIndex, 1);
    setPlan({ ...plan, workoutDays: updated });
  };

  const handleAddSet = (dayIndex: number, exerciseIndex: number) => {
    const updated = [...plan.workoutDays];
    updated[dayIndex].exercises[exerciseIndex].sets.push({
      setNumber: updated[dayIndex].exercises[exerciseIndex].sets.length + 1,
      targetReps: 10,
      targetLoad: 0,
    });
    setPlan({ ...plan, workoutDays: updated });
  };

  const handleRemoveSet = (dayIndex: number, exerciseIndex: number, setIndex: number) => {
    const updated = [...plan.workoutDays];
    updated[dayIndex].exercises[exerciseIndex].sets.splice(setIndex, 1);
    setPlan({ ...plan, workoutDays: updated });
  };

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    const userId = Number(localStorage.getItem('userId'));
    
    const res = await fetch('http://localhost:3333/workouts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...plan,
        trainerId: userId,
        patientId: Number(plan.patientId),
      }),
    });
    if (res.ok) {
      alert('Plano salvo com sucesso!');
    } else {
      alert('Erro ao salvar plano.');
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F9F7] flex flex-col">
      <NavbarTrainer />
      <div className="flex-grow flex items-start justify-center p-8">
        <motion.div
          className="w-full max-w-5xl bg-white rounded-xl p-6 shadow"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl font-bold text-[#00B894] mb-6">Novo Plano de Treino</h1>

          <div className="grid gap-4">

            {/* SELEÇÃO DE PACIENTE */}
            <select
              className="border p-2 rounded"
              value={plan.patientId}
              onChange={(e) => handleChange(['patientId'], e.target.value)}
            >
              <option value="">Selecione o paciente</option>
              {students.map(student => (
                <option key={student.id} value={student.id}>
                  {student.name}
                </option>
              ))}
            </select>

            <input
              className="border p-2 rounded"
              placeholder="Título do Plano"
              value={plan.title}
              onChange={(e) => handleChange(['title'], e.target.value)}
            />
            <textarea
              className="border p-2 rounded"
              placeholder="Descrição"
              value={plan.description}
              onChange={(e) => handleChange(['description'], e.target.value)}
            />
            <div className="flex gap-4">
              <input
                type="date"
                className="border p-2 rounded w-full"
                value={plan.validFrom}
                onChange={(e) => handleChange(['validFrom'], e.target.value)}
              />
              <input
                type="date"
                className="border p-2 rounded w-full"
                value={plan.validUntil}
                onChange={(e) => handleChange(['validUntil'], e.target.value)}
              />
            </div>

            {/* Dias de Treino */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-[#00B894]">Dias de Treino</h2>
                <button
                  onClick={handleAddDay}
                  className="bg-[#00B894] text-white px-4 py-1 rounded hover:bg-[#009f84]"
                >
                  + Adicionar Dia
                </button>
              </div>

              <div className="space-y-4">
                {plan.workoutDays.map((day, dayIndex) => (
                  <div key={dayIndex} className="border rounded overflow-hidden bg-gray-50">
                    <button
                      className="w-full text-left p-4 bg-[#E0F7F4] font-semibold"
                      onClick={() => setOpenDayIndex(openDayIndex === dayIndex ? null : dayIndex)}
                    >
                      {day.dayOfWeek || 'Novo Dia'} - {day.muscleGroup || 'Grupo Muscular'}
                    </button>

                    <AnimatePresence>
                      {openDayIndex === dayIndex && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="p-4"
                        >
                          <div className="grid gap-4 mb-4">
                            <input
                              className="border p-2 rounded"
                              placeholder="Dia da Semana"
                              value={day.dayOfWeek}
                              onChange={(e) => handleChange(['workoutDays', String(dayIndex), 'dayOfWeek'], e.target.value)}
                            />
                            <input
                              className="border p-2 rounded"
                              placeholder="Grupo Muscular"
                              value={day.muscleGroup}
                              onChange={(e) => handleChange(['workoutDays', String(dayIndex), 'muscleGroup'], e.target.value)}
                            />
                          </div>

                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <h3 className="text-lg font-semibold text-[#00B894]">Exercícios</h3>
                              <button
                                onClick={() => handleAddExercise(dayIndex)}
                                className="text-sm text-[#00B894] hover:underline"
                              >
                                + Adicionar Exercício
                              </button>
                            </div>

                            {day.exercises.map((exercise, exerciseIndex) => (
                              <div key={exerciseIndex} className="border p-4 rounded bg-white mb-2">
                                <div className="flex justify-between items-center">
                                  <input
                                    className="border p-2 rounded w-full"
                                    placeholder="Nome do Exercício"
                                    value={exercise.name}
                                    onChange={(e) =>
                                      handleChange(['workoutDays', dayIndex, 'exercises', exerciseIndex, 'name'], e.target.value)
                                    }
                                  />
                                  <button
                                    onClick={() => handleRemoveExercise(dayIndex, exerciseIndex)}
                                    className="text-red-500 ml-2"
                                  >
                                    🗑️
                                  </button>
                                </div>

                                <div className="mt-2">
                                  <h4 className="font-semibold text-[#00B894]">Séries</h4>
                                  {exercise.sets.map((set, setIndex) => (
                                    <div key={setIndex} className="flex gap-2 mb-2">
                                      <input
                                        type="number"
                                        className="border p-2 rounded w-1/3"
                                        placeholder="Repetições"
                                        value={set.targetReps}
                                        onChange={(e) =>
                                          handleChange([
                                            'workoutDays', dayIndex, 'exercises', exerciseIndex, 'sets', setIndex, 'targetReps'
                                          ], e.target.value)
                                        }
                                      />
                                      <input
                                        type="number"
                                        className="border p-2 rounded w-2/3"
                                        placeholder="Carga (kg)"
                                        value={set.targetLoad}
                                        onChange={(e) =>
                                          handleChange([
                                            'workoutDays', dayIndex, 'exercises', exerciseIndex, 'sets', setIndex, 'targetLoad'
                                          ], e.target.value)
                                        }
                                      />
                                      <button
                                        onClick={() => handleRemoveSet(dayIndex, exerciseIndex, setIndex)}
                                        className="text-red-500"
                                      >
                                        🗑️
                                      </button>
                                    </div>
                                  ))}
                                  <button
                                    onClick={() => handleAddSet(dayIndex, exerciseIndex)}
                                    className="text-sm text-[#00B894] hover:underline mt-2"
                                  >
                                    + Adicionar Série
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="flex justify-end">
                            <button
                              onClick={() => handleRemoveDay(dayIndex)}
                              className="mt-4 text-red-500 hover:underline"
                            >
                              Remover Dia
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>

            {/* Botão salvar */}
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleSave}
                className="bg-[#00B894] text-white px-6 py-2 rounded hover:bg-[#009f84]"
              >
                Salvar Plano
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
