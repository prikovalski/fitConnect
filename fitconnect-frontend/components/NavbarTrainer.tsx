import Link from 'next/link';
import { useRouter } from 'next/router';

export default function NavbarTrainer() {
  const router = useRouter();

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
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <div className="text-2xl font-bold text-[#00B894]">
        FitConnect
      </div>
      <div className="flex space-x-6">
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
      </div>
    </nav>
  );
}
