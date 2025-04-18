import { useRouter } from 'next/router';
import { ChevronLeft } from 'lucide-react';

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="flex items-center gap-1 text-sm text-[#00B894] hover:underline mb-6"
    >
      <ChevronLeft size={18} />
      Voltar
    </button>
  );
}