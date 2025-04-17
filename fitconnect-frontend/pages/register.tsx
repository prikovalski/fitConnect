import { useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import styles from '../styles/ui.module.css';

export default function Register() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'PATIENT',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    setError('');
    setSuccess(false);
    const res = await fetch('http://localhost:3000/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setSuccess(true);
      setTimeout(() => router.push('/login'), 2000);
    } else {
      const data = await res.json();
      setError(data.message || 'Erro ao cadastrar');
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F9F7] flex items-center justify-center px-4">
      <motion.div
        className={styles.card}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className={styles.heading}>Criar Conta no FitConnect</h1>

        <input
          type="text"
          placeholder="Nome"
          name="name"
          value={form.name}
          onChange={handleChange}
          className={styles.input}
        />
        <input
          type="email"
          placeholder="E-mail"
          name="email"
          value={form.email}
          onChange={handleChange}
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Senha"
          name="password"
          value={form.password}
          onChange={handleChange}
          className={styles.input}
        />
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className={styles.input}
        >
          <option value="PATIENT">Paciente</option>
          <option value="TRAINER">Personal Trainer</option>
          <option value="NUTRITIONIST">Nutricionista</option>
        </select>

        {error && <p className={styles['message-error']}>{error}</p>}
        {success && <p className={styles['message-success']}>Cadastro realizado! Redirecionando...</p>}

        <button onClick={handleRegister} className={styles.button}>
          Criar Conta
        </button>

        <p className="text-sm text-center mt-4">
          Já tem uma conta? <a href="/login" className={styles.link}>Fazer login</a>
        </p>
      </motion.div>
    </div>
  );
}