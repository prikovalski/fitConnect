import { useRouter } from 'next/router';
import { LogOut } from 'lucide-react';

export default function NavbarNutritionist() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.clear();
    router.push('/login');
  };

  return (
    <nav className="bg-[#00B894] text-white px-6 py-4 flex justify-between items-center shadow-md">
      <div className="text-xl font-bold cursor-pointer" onClick={() => router.push('/dashboard')}>
        FitConnect
      </div>
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 hover:text-gray-200 transition"
      >
        <LogOut size={20} />
        Sair
      </button>
    </nav>
  );
}