import React from 'react';
import html2canvas from 'html2canvas';
import '../EstimateFormComponent.css';

interface EstimateFormComponentProps {
  formData: {
    productName: string;
    serialNumber: string;
    notes: string;
    appraisalNumber: string;
  };
}

const EstimateFormComponent: React.FC<EstimateFormComponentProps> = ({ formData }) => {
  const outputRef = React.useRef<HTMLDivElement>(null);
  const [imageURL, setImageURL] = React.useState<string | null>(null);

  const handleGenerateImage = async () => {
    if (!outputRef.current) return;
    const canvas = await html2canvas(outputRef.current);
    const dataURL = canvas.toDataURL('image/jpeg');
    setImageURL(dataURL);
  };

  return (
    <div>
      <button onClick={handleGenerateImage}>정품보증서 생성</button>

      <div ref={outputRef} className="certificate-preview-a4">
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

      {imageURL && (
        <a href={imageURL} download="certificate.jpg">JPG 다운로드</a>
      )}
    </div>
  );
};

export default EstimateFormComponent;