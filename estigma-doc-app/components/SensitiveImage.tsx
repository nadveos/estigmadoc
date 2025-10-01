import { useState } from 'react';

interface SensitiveImageProps {
  src: string;
  alt: string;
}

const SensitiveImage = ({ src, alt }: SensitiveImageProps) => {
  const [isBlurred, setIsBlurred] = useState(true);

  const revealImage = () => {
    setIsBlurred(false);
  };

  return (
    <div className="sensitive-image-wrapper" onClick={revealImage}>
      <img
        src={src}
        alt={alt}
        className={`img-fluid rounded ${isBlurred ? 'blur-active' : ''}`}
      />
      <div
        className={`sensitive-image-overlay ${!isBlurred ? 'overlay-hidden' : ''}`}>
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-eye-slash-fill mb-2" viewBox="0 0 16 16">
          <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 0-4.343-4.343L2.83 5.527A3.5 3.5 0 0 0 7.5 12.5c1.227 0 2.31-.59 3.032-1.532L10.79 12.912zM11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
          <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755L4.85 11.48a1.5 1.5 0 0 0 .132-.132l.635-.635 1.95-1.95-.635-.635a1.5 1.5 0 0 0-.132-.132L3.35 5.47z"/>
          <path d="M12.5 8a4.5 4.5 0 0 1-1.355 3.2l.43.43c.63.63 1.445 1.27 2.288 1.855a13.134 13.134 0 0 0 2.03-2.03l.195-.288c-.335-.48-.83-1.12-1.465-1.755L13.358 6.07a1.5 1.5 0 0 0-.132.132l-.635.635-1.95 1.95.635.635c.044.044.084.09.122.138z"/>
          <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z"/>
          <path d="M4.546 1.226 5.454.318l.707.707L4.546 2.64l-.707-.707zm6.212 0 .707-.707 1.623 1.623-.707.707zm-4.14 11.392-.707.707-1.623-1.623.707-.707zm6.212 0-.707.707-1.623-1.623.707-.707z"/>
          <path fill-rule="evenodd" d="M13.646 14.354l-12-12 .708-.708 12 12-.708.708z"/>
        </svg>
        <p className="mb-0">Contenido sensible</p>
        <small>Clic para ver</small>
      </div>
    </div>
  );
};

export default SensitiveImage;
