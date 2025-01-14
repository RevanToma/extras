import { Badge, BadgeProps, BadgeSizes } from 'flowbite-react';
interface BaseBadgeProps extends BadgeProps {
  color: BadgeProps['color'];
  size: BadgeProps['size'];
  icon: BadgeProps['icon'];
}

const BaseBadge: React.FC<BaseBadgeProps> = ({
  color,
  size,
  icon: Icon,
  children,
  ...rest
}) => {
  return (
    <Badge color={color} size={size} {...rest}>
      <div className='badge-container'>
        {Icon && <Icon />}
        {children}
      </div>
    </Badge>
  );
};

export default BaseBadge;
