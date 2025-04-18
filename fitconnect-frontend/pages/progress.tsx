import PrivateRoute from '../components/PrivateRoute';

export default function Progress() {
  return (
    <PrivateRoute>
      <div className="min-h-screen bg-[#F0F9F7] flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-md text-center max-w-md w-full">
          <h1 className="text-2xl font-bold text-[#00B894] mb-4">Progresso</h1>
          <p className="text-gray-700">Acompanhe aqui a sua evolução ao longo dos treinos.</p>
        </div>
      </div>
    </PrivateRoute>
  );
}