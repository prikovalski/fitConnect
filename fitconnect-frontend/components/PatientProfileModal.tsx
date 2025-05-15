import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface PatientProfileModalProps {
  onClose: () => void;
  onSave: (data: any) => void;
  onNext?: (data: any) => void;
  initialData?: any;
}

export default function PatientProfileModal({ onClose, onSave, onNext, initialData }: PatientProfileModalProps) {
  const [form, setForm] = useState({
    gender: '',
    height: '',
    weight: '',
    birthDate: '',
    city: '',
    goal: '',
    chronicDisease: '',
    medicalRestriction: '',
    foodAllergy: '',
    avoidFood: '',
    physicalActivity: '',
    activityFrequency: '',
    fixedMealTimes: '',
    mustHaveFood: '',
  });

  const [photos, setPhotos] = useState<any[]>([]);

  function mapGenderToDisplay(genderEnum: string) {
    switch (genderEnum) {
      case 'MALE':
        return 'Masculino';
      case 'FEMALE':
        return 'Feminino';
      case 'OTHER':
        return 'Outro';
      default:
        return '';
    }
  }

  useEffect(() => {
    if (initialData) {
      setForm({
        gender: initialData?.gender ? mapGenderToDisplay(initialData.gender) : '',
        height: initialData.height || '',
        weight: initialData.weight || '',
        birthDate: initialData.birthDate ? initialData.birthDate.slice(0, 10) : '',
        city: initialData.city || '',
        goal: initialData.goal || '',
        chronicDisease: initialData.chronicDisease || '',
        medicalRestriction: initialData.medicalRestriction || '',
        foodAllergy: initialData.foodAllergy || '',
        avoidFood: initialData.avoidFood || '',
        physicalActivity: initialData.physicalActivity || '',
        activityFrequency: initialData.activityFrequency || '',
        fixedMealTimes: initialData.fixedMealTimes || '',
        mustHaveFood: initialData.mustHaveFood || '',
      });
    }
    fetchPhotos();
  }, [initialData]);

  const fetchPhotos = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:3333/patient-profile/photos', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        setPhotos(data);
      } else {
        console.error('Erro ao carregar fotos.');
      }
    } catch (error) {
      console.error('Erro de conexão:', error);
    }
  };

  const handleUploadPhotos = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const token = localStorage.getItem('token');
    if (!token || !event.target.files) return;

    const files = Array.from(event.target.files);

    for (const file of files) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const res = await fetch('http://localhost:3333/patient-profile/photos/upload', {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        });
        if (res.ok) {
          await fetchPhotos();
        }
      } catch (error) {
        console.error('Erro ao enviar foto:', error);
      }
    }
  };

  const handleDeletePhoto = async (photoId: number) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    const confirmDelete = window.confirm('Deseja excluir esta foto?');
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:3333/patient-profile/photos/${photoId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        await fetchPhotos();
      }
    } catch (error) {
      console.error('Erro ao excluir foto:', error);
    }
  };

  const handleChange = (field: string, value: any) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = () => {
    if (onNext) {
      onNext(form);
    } else {
      onSave(form);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <motion.div
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-5xl max-h-[95vh] overflow-y-auto"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
      >
        <h2 className="text-2xl font-bold text-[#00B894] mb-8 text-center">
          {onNext ? 'Complete seu Perfil' : 'Editar Perfil'}
        </h2>

        {/* Formulário */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div>
            <label className="text-sm font-semibold">Gênero</label>
            <select
              className="border rounded p-2 w-full mt-1"
              value={form.gender}
              onChange={(e) => handleChange('gender', e.target.value)}
            >
              <option value="">Selecione</option>
              <option value="Masculino">Masculino</option>
              <option value="Feminino">Feminino</option>
              <option value="Outro">Outro</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-semibold">Altura (cm)</label>
            <input
              type="number"
              className="border rounded p-2 w-full mt-1"
              value={form.height}
              onChange={(e) => handleChange('height', e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-semibold">Peso (kg)</label>
            <input
              type="number"
              className="border rounded p-2 w-full mt-1"
              value={form.weight}
              onChange={(e) => handleChange('weight', e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-semibold">Data de Nascimento</label>
            <input
              type="date"
              className="border rounded p-2 w-full mt-1"
              value={form.birthDate}
              onChange={(e) => handleChange('birthDate', e.target.value)}
            />
          </div>
          <div className="md:col-span-2">
            <label className="text-sm font-semibold">Cidade</label>
            <input
              type="text"
              className="border rounded p-2 w-full mt-1"
              value={form.city}
              onChange={(e) => handleChange('city', e.target.value)}
            />
          </div>
          <div className="md:col-span-2">
            <label className="text-sm font-semibold">Objetivo</label>
            <input
              type="text"
              className="border rounded p-2 w-full mt-1"
              value={form.goal}
              onChange={(e) => handleChange('goal', e.target.value)}
            />
          </div>
        </div>

        {/* 📷 Bloco de Fotos */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-[#00B894] mb-4">Fotos de Progresso</h3>

          <div className="flex justify-end mb-4">
            <label className="bg-[#00B894] text-white px-4 py-2 rounded cursor-pointer hover:bg-[#009f84]">
              + Adicionar Fotos
              <input
                type="file"
                multiple
                onChange={handleUploadPhotos}
                className="hidden"
              />
            </label>
          </div>

          {photos.length === 0 ? (
            <p className="text-gray-500">Nenhuma foto enviada ainda.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {photos.map((photo) => (
                <div key={photo.id} className="relative group">
                  <img
                    src={`http://localhost:3333${photo.url}`}
                    alt="Progresso"
                    className="rounded-lg object-cover w-full h-40"
                  />
                  <button
                    onClick={() => handleDeletePhoto(photo.id)}
                    className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition"
                  >
                    Excluir
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Botões */}
        <div className="flex justify-end gap-4 mt-8">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded bg-gray-300 hover:bg-gray-400 transition"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2 rounded bg-[#00B894] text-white hover:bg-[#009f84] transition"
          >
            {onNext ? 'Avançar' : 'Salvar'}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
