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
    small: '8px 16px',
    medium: '12px 24px',
    large: '16px 32px',
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
