import React from 'react';

import { Container } from './styles';

// para permitir que o toltip receba uma estilização de um elemento superiro
// é necessário que sua interface receba o className
interface TooltipProps {
  title: string;
  className?: string;
}

const Tooltip: React.FC<TooltipProps> = ({
  title,
  className = '',
  children,
}) => {
  return (
    <Container className={className}>
      {children}
      <span>{title}</span>
    </Container>
  );
};

export default Tooltip;
