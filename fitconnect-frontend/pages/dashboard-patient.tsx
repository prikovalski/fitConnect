import PrivateRoute from '../components/PrivateRoute';
import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/router';
import PatientProfileModal from '../components/PatientProfileModal';
import PatientMeasurementsModal from '../components/PatientMeasurementsModal';

type DecodedToken = {
  id: number;
  name?: string;
  email: string;
  role: string;
};

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<DecodedToken | null>(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showMeasurementsModal, setShowMeasurementsModal] = useState(false);
  const [patientProfileData, setPatientProfileData] = useState<any>(null);
  const [showProfileEditModal, setShowProfileEditModal] = useState(false);
  const [initialProfileData, setInitialProfileData] = useState<any>(null);
  const modalRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode<DecodedToken>(token);
        setUser(decoded);

        // 👇 Nova verificação no backend
        fetch('http://localhost:3333/patient-profile/profile', {
          headers: { Authorization: `Bearer ${token}` }
        })
          .then(res => {
            if (res.status === 404) {
              // Perfil não encontrado → Exibir modal
              setShowProfileModal(true);
            }
          })
          .catch(err => {
            console.error('Erro ao verificar perfil do paciente:', err);
          });

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

  const handleNextProfile = (data: any) => {
    setPatientProfileData(data);
    setShowProfileModal(false);
    setShowMeasurementsModal(true);
  };

  const handleSaveMeasurements = async (measurementsData: any) => {
    try {
      const fullProfileData = { ...patientProfileData, ...measurementsData };
      await sendPatientProfile(fullProfileData);
      localStorage.setItem('profileComplete', 'true');
      setShowMeasurementsModal(false);
      alert('Perfil salvo com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar perfil:', error);
      alert('Erro ao salvar perfil. Tente novamente.');
    }
  };

  async function sendPatientProfile(profileData: any) {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Usuário não autenticado');

    const response = await fetch('http://localhost:3333/patient-profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(profileData),
    });

    if (!response.ok) {
      throw new Error('Erro ao salvar perfil');
    }

    return await response.json();
  }

  // ⬇️ Novo: Quando clicar no nome para editar
  const handleOpenEditProfile = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const res = await fetch('http://localhost:3333/patient-profile/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setInitialProfileData(data);
        setShowProfileEditModal(true);
      } else {
        console.error('Erro ao carregar perfil');
      }
    } catch (err) {
      console.error('Erro de conexão ao buscar perfil:', err);
    }
  };

  return (
    <PrivateRoute>
      <div className="min-h-screen bg-[#F0F9F7] flex flex-col">
        {/* Navbar */}
        <motion.div
          ref={modalRef}
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
            <button
              onClick={handleOpenEditProfile}
              className="text-gray-600 hidden sm:inline hover:text-[#00B894] transition"
            >
              {user?.name || user?.email}
            </button>
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
            <p className="text-gray-600 mt-2">
              Aqui você verá seu treino do dia, plano alimentar e sua evolução.
            </p>
          </motion.div>
        </div>

        {/* Modais de primeiro acesso */}
        {showProfileModal && (
          <PatientProfileModal
            onClose={() => setShowProfileModal(false)}
            onSave={() => {}}
            onNext={handleNextProfile}
          />
        )}
        {showMeasurementsModal && (
          <PatientMeasurementsModal
            onClose={() => setShowMeasurementsModal(false)}
            onSave={handleSaveMeasurements}
          />
        )}

        {/* Modal de edição */}
        {showProfileEditModal && (
          <PatientProfileModal
            initialData={initialProfileData}
            onClose={() => setShowProfileEditModal(false)}
            onSave={async (updatedData) => {
              try {
                await sendPatientProfile(updatedData);
                setShowProfileEditModal(false);
                alert('Perfil atualizado com sucesso!');
              } catch (error) {
                console.error(error);
                alert('Erro ao atualizar perfil.');
              }
            }}
          />
        )}
      </div>
    </PrivateRoute>
  );
}
