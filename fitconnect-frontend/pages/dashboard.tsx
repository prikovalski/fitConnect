import PrivateRoute from '../components/PrivateRoute';
import { motion } from 'framer-motion';

export default function Dashboard() {
  return (
    <PrivateRoute>
      <div className="min-h-screen bg-[#F0F9F7] flex items-center justify-center px-4">
        <motion.div
          className="bg-white p-8 rounded-xl shadow-md w-full max-w-2xl text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold text-[#00B894] mb-4">Painel do Paciente</h1>
          <p className="text-lg text-gray-700">Bem-vinda ao FitConnect, Pricila! 💪</p>
          <p className="text-gray-600 mt-2">Aqui você verá seu treino do dia, plano alimentar e sua evolução.</p>
        </motion.div>
      </div>
    </PrivateRoute>
  );
}