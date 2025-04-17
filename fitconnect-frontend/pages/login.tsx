import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import PageWrapper from '../components/PageWrapper';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) router.push('/dashboard');
  }, []);

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.message || 'Erro ao fazer login');
      } else {
        localStorage.setItem('token', data.token);
        router.push('/dashboard');
      }
    } catch (err) {
      setError('Erro de conexão com o servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrapper>
      <div className="min-h-screen bg-[#F0F9F7] flex items-center justify-center px-4">
        <motion.div
          className="bg-white p-8 rounded-xl shadow-md w-full max-w-md"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-2xl font-bold mb-6 text-[#00B894] text-center">Bem-vindo ao FitConnect</h1>

          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-primary"
          />

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <button
            onClick={handleLogin}
            className="w-full bg-[#00B894] text-white py-2 rounded hover:bg-[#019f80] transition"
            disabled={loading}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </motion.div>
      </div>
    </PageWrapper>
  );
}