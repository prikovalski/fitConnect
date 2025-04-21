import PrivateRoute from '../components/PrivateRoute';
import BackButton from '../components/BackButton';
import { Salad } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

export default function Nutrition() {
  const router = useRouter();

  return (
    <PrivateRoute>
      <div className="min-h-screen bg-[#F0F9F7] py-12 px-4 flex flex-col items-center">
        <motion.div
          className="bg-white p-8 rounded-xl shadow-md w-full max-w-4xl"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <BackButton />
          <div className="flex items-center gap-4 mb-6">
            <Salad className="text-[#00B894]" size={32} />
            <h1 className="text-3xl font-bold text-[#00B894]">Plano Alimentar</h1>
          </div>

          <p className="text-gray-700 mb-6">
            Veja aqui os planos alimentares criados pelos seus nutricionistas, com refeições organizadas por horário.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div
              onClick={() => router.push('/nutrition/1')}
              className="bg-[#F0F9F7] p-6 rounded-lg shadow hover:shadow-lg transition cursor-pointer"
            >
              <h2 className="text-lg font-semibold text-[#00B894] mb-2">Emagrecimento - Manhã</h2>
              <p className="text-gray-600 text-sm mb-1">Nutricionista: Dr. André</p>
              <p className="text-gray-600 text-sm">Inclui: Omelete, abacate e café sem açúcar</p>
            </div>

            <div
              onClick={() => router.push('/nutrition/2')}
              className="bg-[#F0F9F7] p-6 rounded-lg shadow hover:shadow-lg transition cursor-pointer"
            >
              <h2 className="text-lg font-semibold text-[#00B894] mb-2">Pré-treino - Tarde</h2>
              <p className="text-gray-600 text-sm mb-1">Nutricionista: Dra. Camila</p>
              <p className="text-gray-600 text-sm">Inclui: Batata doce, frango e salada verde</p>
            </div>
          </div>
        </motion.div>
      </div>
    </PrivateRoute>
  );
}