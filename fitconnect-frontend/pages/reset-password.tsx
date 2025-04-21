import { useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { KeyRound } from 'lucide-react';

export default function ResetPassword() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError(null);
    setMessage(null);

    try {
      const res = await fetch('http://localhost:3333/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, newPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Erro ao redefinir senha');
      }

      setMessage(data.message);
      setEmail('');
      setNewPassword('');
      setTimeout(() => router.push('/login'), 2000);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F9F7] flex items-center justify-center px-4">
      <motion.div
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-3 mb-6">
          <KeyRound className="text-[#00B894]" size={28} />
          <h1 className="text-2xl font-bold text-[#00B894]">Redefinir Senha</h1>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Seu e-mail"
            className="border rounded-lg px-4 py-2 w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Nova senha"
            className="border rounded-lg px-4 py-2 w-full"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-[#00B894] text-white px-4 py-2 rounded-lg hover:bg-[#00a17e] transition"
          >
            Redefinir Senha
          </button>
        </form>

        {message && (
          <p className="text-green-600 mt-4 text-center">{message}</p>
        )}
        {error && (
          <p className="text-red-600 mt-4 text-center">{error}</p>
        )}
      </motion.div>
    </div>
  );
}