import React from 'react';

interface ContactButtonProps {
  label?: string;
  onClick?: () => void;
  className?: string;
}

export const ContactButton: React.FC<ContactButtonProps> = ({
  label = 'Falar Comigo',
  onClick,
  className = ''
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      const phone = '5548999999999';
      const message = encodeURIComponent('Olá Emanuel! Vi seu portfólio e gostaria de um orçamento para um site.');
      window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
    }
  };

  return (
    <button
      onClick={handleClick}
      type="button"
      className={`relative inline-flex items-center justify-center rounded-full font-medium uppercase tracking-widest text-white transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer shadow-lg hover:shadow-purple-500/25 ${className}`}
      style={{
        background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
        boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), inset 4px 4px 12px #7721B1',
        outline: '2px solid #FFFFFF',
        outlineOffset: '-3px',
      }}
    >
      <span className="px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base whitespace-nowrap">
        {label}
      </span>
    </button>
  );
};
