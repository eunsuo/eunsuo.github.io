import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import '../css/EstimateWriteComponent.css';

const EstimateWriteComponent: React.FC = () => {
  const [formData, setFormData] = useState({
    productName: '',
    serialNumber: '',
    notes: '',
    appraisalNumber: '',
  });

  const captureRef = useRef<HTMLDivElement>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCapture = async () => {
    if (captureRef.current) {
      const canvas = await html2canvas(captureRef.current);
      const image = canvas.toDataURL('image/jpeg');
      setImageUrl(image);
    }
  };

  return (
    <div className="estimate-write-wrapper">
      <form className="estimate-form">
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
      </form>

      <button className="generate-button" onClick={handleCapture}>정품보증서 생성</button>

      <div className="output-capture" ref={captureRef}>
        <div className="a4-image"> {/* A4 배경 시뮬레이션 */}
          <div className="positioned-text product-name">{formData.productName}</div>
          <div className="positioned-text serial-number">{formData.serialNumber}</div>
          <div className="positioned-text notes">{formData.notes}</div>
          <div className="positioned-text appraisal-number">{formData.appraisalNumber}</div>
        </div>
      </div>

      {imageUrl && (
        <div className="download-section">
          <a href={imageUrl} download="certificate.jpg">다운로드</a>
        </div>
      )}
    </div>
  );
};

export default EstimateWriteComponent;