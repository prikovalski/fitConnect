import PrivateRoute from '../components/PrivateRoute';
import BackButton from '../components/BackButton';
import { LineChart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

export default function Progress() {
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
            <LineChart className="text-[#00B894]" size={32} />
            <h1 className="text-3xl font-bold text-[#00B894]">Progresso</h1>
          </div>

          <p className="text-gray-700 mb-6">
            Acompanhe aqui a sua evolução de cargas, repetições e registros físicos ao longo do tempo.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div
              onClick={() => router.push('/progress/1')}
              className="bg-[#F0F9F7] p-6 rounded-lg shadow hover:shadow-lg transition cursor-pointer"
            >
              <h2 className="text-lg font-semibold text-[#00B894] mb-2">Supino Reto</h2>
              <p className="text-gray-600 text-sm">Última carga: 45kg - Repetições: 10</p>
              <p className="text-gray-600 text-sm">Data: 10/07/2025</p>
            </div>

            <div
              onClick={() => router.push('/progress/2')}
              className="bg-[#F0F9F7] p-6 rounded-lg shadow hover:shadow-lg transition cursor-pointer"
            >
              <h2 className="text-lg font-semibold text-[#00B894] mb-2">Agachamento</h2>
              <p className="text-gray-600 text-sm">Última carga: 60kg - Repetições: 12</p>
              <p className="text-gray-600 text-sm">Data: 09/07/2025</p>
            </div>
          </div>
        </motion.div>
      </div>
    </PrivateRoute>
  );
}