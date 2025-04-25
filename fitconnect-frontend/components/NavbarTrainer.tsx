import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function NavbarTrainer() {
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard-trainer' },
    { name: 'Alunos', path: '/trainer/students' },
    { name: 'Treinos', path: '/trainer/workouts' },
    { name: 'Progresso', path: '/trainer/progress' },
    { name: 'Logout', path: '/login' }
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');
    router.push('/login');
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center relative">
      <div className="text-2xl font-bold text-[#00B894]">
        FitConnect
      </div>
      <div className="flex space-x-6 items-center">
        {menuItems.map((item) => (
          item.name !== 'Logout' ? (
            <Link key={item.name} href={item.path} legacyBehavior>
              <a className={`hover:text-[#00B894] ${router.pathname === item.path ? 'text-[#00B894] font-semibold' : 'text-gray-700'}`}>
                {item.name}
              </a>
            </Link>
          ) : (
            <button key={item.name} onClick={handleLogout} className="text-gray-700 hover:text-red-500">
              {item.name}
            </button>
          )
        ))}

        {/* Dropdown Avaliações */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="text-gray-700 hover:text-[#00B894] focus:outline-none"
          >
            Avaliações ▾
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-50">
              <Link href="/trainer/assessments" legacyBehavior>
                <a className="block px-4 py-2 hover:bg-gray-100">Listar Avaliações</a>
              </Link>
              <Link href="/trainer/assessments/new" legacyBehavior>
                <a className="block px-4 py-2 hover:bg-gray-100">Nova Avaliação</a>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
