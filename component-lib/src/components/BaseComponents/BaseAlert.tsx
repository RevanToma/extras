import React from 'react';
import { Alert } from 'flowbite-react';

interface CustomAlertProps {
  color: 'info' | 'success' | 'failure' | 'warning';
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  children: React.ReactNode;
}

const CustomAlert: React.FC<CustomAlertProps> = ({
  color,
  icon: Icon,
  children,
}) => {
  return (
    <Alert color={color} icon={Icon}>
      {children}
    </Alert>
  );
};

export default CustomAlert;
