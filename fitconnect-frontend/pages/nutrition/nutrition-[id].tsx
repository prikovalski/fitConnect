import { useRouter } from 'next/router';
import PrivateRoute from '../../components/PrivateRoute';
import BackButton from '../../components/BackButton';
import { Salad } from 'lucide-react';
import { motion } from 'framer-motion';

export default function NutritionDetail() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <PrivateRoute>
      <div className="min-h-screen bg-[#F0F9F7] py-12 px-4 flex flex-col items-center">
        <motion.div
          className="bg-white p-8 rounded-xl shadow-md w-full max-w-3xl"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <BackButton />
          <div className="flex items-center gap-4 mb-6">
            <Salad className="text-[#00B894]" size={28} />
            <h1 className="text-2xl font-bold text-[#00B894]">Detalhes da Refeição</h1>
          </div>

          <p className="text-gray-700 mb-2">ID da refeição: <strong>{id}</strong></p>
          <p className="text-gray-600">Aqui você verá os detalhes da sua refeição planejada.</p>
        </motion.div>
      </div>
    </PrivateRoute>
  );
}