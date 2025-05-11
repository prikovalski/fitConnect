import { useState } from 'react';
import { motion } from 'framer-motion';

interface PatientMeasurementsModalProps {
  onClose: () => void;
  onSave: (data: any) => void;
}

export default function PatientMeasurementsModal({ onClose, onSave }: PatientMeasurementsModalProps) {
  const [measurements, setMeasurements] = useState({
    neckCircumference: '',
    waistCircumference: '',
    hipCircumference: '',
    photos: [] as File[],
  });

  const handleChange = (field: string, value: any) => {
    setMeasurements((prev) => ({ ...prev, [field]: value }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setMeasurements((prev) => ({ ...prev, photos: filesArray }));
    }
  };

  const handleSave = () => {
    onSave(measurements);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <motion.div
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
      >
        <h2 className="text-2xl font-bold text-[#00B894] mb-8 text-center">
          Complete suas Medidas
        </h2>

        {/* Medidas Corporais */}
        <div className="mb-8 p-6 border rounded-lg shadow-sm bg-[#F9F9F9]">
          <h3 className="text-xl font-semibold text-[#00B894] mb-4">Medidas Corporais</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-semibold">Pescoço (cm)</label>
              <input
                type="number"
                className="border rounded p-2 w-full mt-1"
                value={measurements.neckCircumference}
                onChange={(e) => handleChange('neckCircumference', e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-semibold">Cintura (cm)</label>
              <input
                type="number"
                className="border rounded p-2 w-full mt-1"
                value={measurements.waistCircumference}
                onChange={(e) => handleChange('waistCircumference', e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-semibold">Quadril (cm)</label>
              <input
                type="number"
                className="border rounded p-2 w-full mt-1"
                value={measurements.hipCircumference}
                onChange={(e) => handleChange('hipCircumference', e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Upload de Fotos */}
        <div className="mb-8 p-6 border rounded-lg shadow-sm bg-[#F9F9F9]">
          <h3 className="text-xl font-semibold text-[#00B894] mb-4">Fotos</h3>
          <input
            type="file"
            accept="image/*"
            multiple
            className="border rounded p-2 w-full mt-2"
            onChange={handlePhotoUpload}
          />

          {/* Preview das imagens */}
          {measurements.photos.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              {measurements.photos.map((file, idx) => (
                <img
                  key={idx}
                  src={URL.createObjectURL(file)}
                  alt="Pré-visualização"
                  className="w-full h-32 object-cover rounded"
                />
              ))}
            </div>
          )}
        </div>

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
            Salvar Perfil
          </button>
        </div>
      </motion.div>
    </div>
  );
}
