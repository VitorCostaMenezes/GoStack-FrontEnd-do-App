import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

// como ja existea tipagem e não vai ser necessário subscrever
// nenhuma propriedade, pode-se definir apenas a tipagem
// dw ButtonProps como sendo do tipo especificado abaixo
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

// criando um compoenent button e definindo a sua tipagem
// o children refere-se ao conteudo entre as tags do elemento
// ex: enviar, Entrar
// o rest diz respeito ao restante das propriedades recebidas dentro das tags
// ex: name, value, e etc
const Button: React.FC<ButtonProps> = ({ children, ...rest }) => {
  return (
    <Container type="button" {...rest}>
      {children}
    </Container>
  );
};

export default Button;

// se surgir um erro na utilizaçção do spread no container
// acrescentar o script abaixo no eslinrc.json
// "react/jsx-props-no-spreading": "off",
