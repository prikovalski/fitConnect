import PrivateRoute from '../components/PrivateRoute';
import { Dumbbell } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Trainings() {
  return (
    <PrivateRoute>
      <div className="min-h-screen bg-[#F0F9F7] py-12 px-4 flex flex-col items-center">
        <motion.div
          className="bg-white p-8 rounded-xl shadow-md w-full max-w-4xl"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-4 mb-6">
            <Dumbbell className="text-[#00B894]" size={32} />
            <h1 className="text-3xl font-bold text-[#00B894]">Meus Treinos</h1>
          </div>

          <p className="text-gray-700 mb-6">
            Abaixo você encontrará todas as planilhas de treino ativas e arquivadas criadas pelos seus treinadores. Clique em uma delas para visualizar os detalhes.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Exemplo de Card de Treino */}
            <div className="bg-[#F0F9F7] p-6 rounded-lg shadow hover:shadow-lg transition cursor-pointer">
              <h2 className="text-lg font-semibold text-[#00B894] mb-2">Hipertrofia - Junho</h2>
              <p className="text-gray-600 text-sm mb-1">Treinador: João Silva</p>
              <p className="text-gray-600 text-sm">Validade: 01/06/2025 a 30/06/2025</p>
            </div>

            <div className="bg-[#F0F9F7] p-6 rounded-lg shadow hover:shadow-lg transition cursor-pointer">
              <h2 className="text-lg font-semibold text-[#00B894] mb-2">Funcional + Core</h2>
              <p className="text-gray-600 text-sm mb-1">Treinador: Carla Torres</p>
              <p className="text-gray-600 text-sm">Validade: 10/05/2025 a 10/07/2025</p>
            </div>
          </div>
        </motion.div>
      </div>
    </PrivateRoute>
  );
}