import React from 'react';

interface BaseButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size: 'small' | 'medium' | 'large';
  color: string;
}

const BaseButton: React.FC<BaseButtonProps> = ({
  size,
  color,
  disabled = false,
  style,
  children,
  ...rest
}) => {
  const sizes = {
    small: '0.5rem 1rem',
    medium: '0.8rem 1.2rem',
    large: '1rem 2rem',
  };

  return (
    <button
      {...rest}
      style={{
        ...style,
        color: color,
        padding: sizes[size],
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
      }}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default BaseButton;
