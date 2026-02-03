
import React from 'react';
import ReactDom from 'react-dom';
const MODAL_STYLES = {
  position: 'fixed',
  inset: '20%',  
  backgroundColor: '#0b1220',
  zIndex: 1100,
  borderRadius: '12px',
  padding: '1rem',
  border: '1px solid rgba(255,255,255,0.08)',
  boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
  color: '#fff'
};

const OVERLAY_STYLES = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.65)',
  zIndex: 1090
};

const responsiveStyle = `
  @media (max-width: 768px) {
    .modal-box {
      width: 90% !important;
      height: 80% !important;
    }
  }
`;

export default function Modal({ children, onClose }) {
  return ReactDom.createPortal(
    <>
     
      <style>{responsiveStyle}</style>

      <div 
        style={OVERLAY_STYLES} 
        onClick={onClose} 
        className="overlay-animate animate__animated animate__fadeIn" 
      />
      
      <div 
        style={MODAL_STYLES} 
        className="modal-box modal-animate animate__animated animate__fadeInDown"
      >
       
        {children}
      </div>
    </>,
    document.getElementById('cart-root')
  );
}
