import React, { useState } from 'react';
import './../css/EstimateWriteComponent.css';

const EstimateWriteComponent: React.FC = () => {
  const [formData, setFormData] = useState({
    productName: '',
    serialNumber: '',
    notes: '',
    appraisalNumber: '',
    photos: [null, null, null, null, null],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (index: number, file: File | null) => {
    const updatedPhotos = [...formData.photos];
    updatedPhotos[index] = file;
    setFormData((prev) => ({ ...prev, photos: updatedPhotos }));
  };

  return (
    <form>
      <div>
        <label>상품명: </label>
        <input type="text" name="productName" value={formData.productName} onChange={handleChange} />
      </div>
      <div>
        <label>시리얼: </label>
        <input type="text" name="serialNumber" value={formData.serialNumber} onChange={handleChange} />
      </div>
      <div>
        <label>특이사항: </label>
        <textarea name="notes" value={formData.notes} onChange={handleChange} />
      </div>
      <div>
        <label>감정번호: </label>
        <input type="text" name="appraisalNumber" value={formData.appraisalNumber} onChange={handleChange} />
      </div>
      {[1, 2, 3, 4, 5].map((num, index) => (
        <div key={index}>
          <label>실물사진{num}: </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(index, e.target.files ? e.target.files[0] : null)}
          />
        </div>
      ))}
    </form>
  );
};

export default EstimateWriteComponent;