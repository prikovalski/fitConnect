import PrivateRoute from '../../components/PrivateRoute';
import NavbarTrainer from '../../components/NavbarTrainer';

export default function ExpiringWorkouts() {
  const workouts = [
    { id: 1, student: 'João Silva', title: 'Treino Hipertrofia', validUntil: '2025-04-30' },
    { id: 2, student: 'Maria Souza', title: 'Treino Funcional', validUntil: '2025-05-02' },
  ];

  return (
    <PrivateRoute>
      <NavbarTrainer />
      <div className="p-8">
        <h1 className="text-2xl font-bold text-[#00B894] mb-6">Treinos Próximos do Vencimento</h1>
        <ul className="space-y-4">
          {workouts.map(workout => (
            <li key={workout.id} className="bg-white p-4 rounded shadow">
              <p><strong>{workout.student}</strong> - {workout.title}</p>
              <p className="text-sm text-gray-600">Válido até: {new Date(workout.validUntil).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      </div>
    </PrivateRoute>
  );
}
