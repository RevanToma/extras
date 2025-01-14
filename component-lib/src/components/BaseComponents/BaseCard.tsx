import React from 'react';
import { Card } from 'flowbite-react';

interface BaseCardProps {
  href: string;
  imgAlt: string;
  imgSrc: string;
  children?: React.ReactNode;
}

const BaseCard: React.FC<BaseCardProps> = ({
  href,
  imgAlt,
  imgSrc,
  children,
}) => {
  return (
    <Card
      href={href}
      renderImage={() => (
        <img
          src={imgSrc}
          alt={imgAlt}
          style={{ width: '100%', height: '300px' }}
        />
      )}
    >
      {children}
    </Card>
  );
};

export default BaseCard;
