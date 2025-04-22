import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function DashboardRedirect() {
  const router = useRouter();

  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role === 'NUTRITIONIST') {
      router.replace('/dashboard-nutritionist');
    } else if (role === 'PATIENT') {
      router.replace('/dashboard-patient');
    } else {
      router.replace('/login');
    }
  }, [router]);

  return <p className="text-center mt-10 text-gray-600">Redirecionando...</p>;
}
