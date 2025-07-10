import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import './css/EstimateWriteComponent.css';

interface FormData {
  productName: string;
  serialNumber: string;
  notes: string;
  appraisalNumber: string;
  files: (File | null)[];
}

const EstimateFormComponent: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    productName: '',
    serialNumber: '',
    notes: '',
    appraisalNumber: '',
    files: [null, null, null, null, null],
  });

  const [imageURL, setImageURL] = useState<string | null>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (index: number, file: File | null) => {
    const newFiles = [...formData.files];
    newFiles[index] = file;
    setFormData({ ...formData, files: newFiles });
  };

  const handleGenerateImage = async () => {
    if (!outputRef.current) return;
    const canvas = await html2canvas(outputRef.current);
    const dataURL = canvas.toDataURL('image/jpeg');
    setImageURL(dataURL);
  };

  return (
    <>
      <form className="form-container">
        <div className="form-field">
          <label>상품명:</label>
          <input type="text" name="productName" value={formData.productName} onChange={handleChange} />
        </div>
        <div className="form-field">
          <label>시리얼:</label>
          <input type="text" name="serialNumber" value={formData.serialNumber} onChange={handleChange} />
        </div>
        <div className="form-field">
          <label>특이사항:</label>
          <textarea name="notes" value={formData.notes} onChange={handleChange} />
        </div>
        <div className="form-field">
          <label>감정번호:</label>
          <input type="text" name="appraisalNumber" value={formData.appraisalNumber} onChange={handleChange} />
        </div>
        {[1, 2, 3, 4, 5].map((num, index) => (
          <div className="form-field" key={index}>
            <label>실물사진{num}:</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(index, e.target.files ? e.target.files[0] : null)}
            />
          </div>
        ))}
        <button type="button" className="form-generate-button" onClick={handleGenerateImage}>
          정품보증서 생성
        </button>
      </form>

      <div style={{ marginTop: '2rem' }}>
        <h3>정품보증서 미리보기 (A4 비율)</h3>
        <div ref={outputRef} className="certificate-preview-a4">
          <div className="certificate-background">
            <div className="certificate-field" style={{ top: '80px', left: '100px' }}>
              상품명: {formData.productName}
            </div>
            <div className="certificate-field" style={{ top: '120px', left: '100px' }}>
              시리얼: {formData.serialNumber}
            </div>
            <div className="certificate-field" style={{ top: '160px', left: '100px' }}>
              특이사항: {formData.notes}
            </div>
            <div className="certificate-field" style={{ top: '200px', left: '100px' }}>
              감정번호: {formData.appraisalNumber}
            </div>
          </div>
        </div>

        {imageURL && (
          <div style={{ marginTop: '1rem' }}>
            <a href={imageURL} download="certificate.jpg" className="form-generate-button">JPG 다운로드</a>
            <div><img src={imageURL} alt="Generated Certificate" style={{ maxWidth: '100%' }} /></div>
          </div>
        )}
      </div>
    </>
  );
};

export default EstimateFormComponent;