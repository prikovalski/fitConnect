import PrivateRoute from '../components/PrivateRoute';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/router';

type DecodedToken = {
  id: number;
  name?: string;
  email: string;
  role: string;
};

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<DecodedToken | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode<DecodedToken>(token);
        setUser(decoded);
      } catch (err) {
        localStorage.removeItem('token');
        router.push('/login');
      }
    }
  }, [router]);

  const handleLogout = () => {
    const confirmLogout = window.confirm('Deseja realmente sair da sua conta?');
    if (confirmLogout) {
      localStorage.removeItem('token');
      router.push('/login');
    }
  };

  return (
    <PrivateRoute>
      <div className="min-h-screen bg-[#F0F9F7] flex flex-col">
        {/* Navbar */}
        <motion.div
          className="bg-white shadow-md py-4 px-6 flex justify-between items-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-center gap-8">
            <h1 className="text-xl font-bold text-[#00B894]">FitConnect</h1>
            <nav className="hidden md:flex gap-4 text-sm text-gray-700">
              <a href="/trainings" className="hover:text-[#00B894]">Treinos</a>
              <a href="/nutrition" className="hover:text-[#00B894]">Alimentação</a>
              <a href="/progress" className="hover:text-[#00B894]">Progresso</a>
            </nav>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <span className="text-gray-600 hidden sm:inline">
              {user?.name || user?.email}
            </span>
            <button
              onClick={handleLogout}
              className="text-red-500 hover:underline"
            >
              Sair
            </button>
          </div>
        </motion.div>

        {/* Conteúdo */}
        <div className="flex-1 flex justify-center items-center px-4">
          <motion.div
            className="bg-white p-8 rounded-xl shadow-md w-full max-w-3xl text-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold text-[#00B894] mb-4">
              Bem-vinda, {user?.name || user?.email} 👋
            </h2>

            <p className="text-gray-600 mt-2">Aqui você verá seu treino do dia, plano alimentar e sua evolução.</p>
          </motion.div>
        </div>
      </div>
    </PrivateRoute>
  );
}