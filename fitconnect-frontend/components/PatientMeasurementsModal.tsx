import { useState } from 'react';
import { motion } from 'framer-motion';

interface PatientMeasurementsModalProps {
  onClose: () => void;
  onSave: (data: any) => void;
}

export default function PatientMeasurementsModal({ onClose, onSave }: PatientMeasurementsModalProps) {
  const [form, setForm] = useState({
    neckCircumference: '',
    waistCircumference: '',
    hipCircumference: '',
  });

  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([]);
  const [uploadStatus, setUploadStatus] = useState('');

  const handleChange = (field: string, value: any) => {
    setForm({ ...form, [field]: value });
  };

  const handleSave = () => {
    onSave({ ...form, photos: uploadedPhotos });
  };

  const handleUploadPhoto = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    const token = localStorage.getItem('token');
    if (!token) return;

    const formData = new FormData();
    formData.append('file', file);
    console.log('🚀 Dados enviados para API:', formData);
    try {
      const res = await fetch('http://localhost:3333/patient-profile/photos/upload', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        setUploadedPhotos((prev) => [...prev, data.url]);
        setUploadStatus('Upload realizado com sucesso!');
      } else {
        setUploadStatus('Erro ao enviar foto.');
      }
    } catch (err) {
      console.error(err);
      setUploadStatus('Erro de conexão.');
    }
  };

  const handleDeletePhoto = async (photoUrl: string) => {
    const confirmDelete = window.confirm('Tem certeza que deseja excluir esta foto?');
    if (!confirmDelete) return;

    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const res = await fetch('http://localhost:3333/patient-profile/photos/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ url: photoUrl }),
      });

      if (res.ok) {
        setUploadedPhotos((prev) => prev.filter((p) => p !== photoUrl));
      } else {
        alert('Erro ao deletar a foto');
      }
    } catch (err) {
      console.error('Erro:', err);
      alert('Erro de conexão');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <motion.div
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
      >
        <h2 className="text-2xl font-bold text-[#00B894] mb-8 text-center">Medidas Corporais</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div>
            <label className="text-sm font-semibold">Pescoço (cm)</label>
            <input
              type="number"
              className="border rounded p-2 w-full mt-1"
              value={form.neckCircumference}
              onChange={(e) => handleChange('neckCircumference', e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-semibold">Cintura (cm)</label>
            <input
              type="number"
              className="border rounded p-2 w-full mt-1"
              value={form.waistCircumference}
              onChange={(e) => handleChange('waistCircumference', e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-semibold">Quadril (cm)</label>
            <input
              type="number"
              className="border rounded p-2 w-full mt-1"
              value={form.hipCircumference}
              onChange={(e) => handleChange('hipCircumference', e.target.value)}
            />
          </div>
        </div>

        {/* Botão de Upload */}
        <div className="flex justify-end mb-6">
          <label className="bg-[#00B894] text-white px-6 py-2 rounded hover:bg-[#009f84] cursor-pointer">
            + Adicionar Foto
            <input
              type="file"
              accept="image/*"
              onChange={handleUploadPhoto}
              className="hidden"
            />
          </label>
        </div>

        {uploadStatus && (
          <p className="text-center text-sm text-gray-500 mb-4">{uploadStatus}</p>
        )}

        {/* Exibir Miniaturas */}
        {uploadedPhotos.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            {uploadedPhotos.map((photoUrl) => (
              <div key={photoUrl} className="relative">
                <img
                  src={`http://localhost:3333${photoUrl}`}
                  alt="Foto"
                  className="rounded-lg shadow-md w-full h-32 object-cover"
                />
                <button
                  onClick={() => handleDeletePhoto(photoUrl)}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full text-xs hover:bg-red-600"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Botões */}
        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded bg-gray-300 hover:bg-gray-400 transition"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 rounded bg-[#00B894] text-white hover:bg-[#009f84] transition"
          >
            Salvar
          </button>
        </div>
      </motion.div>
    </div>
  );
}
