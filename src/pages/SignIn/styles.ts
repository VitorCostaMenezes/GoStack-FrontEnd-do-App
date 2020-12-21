import styled, { keyframes } from 'styled-components';
// necessário instalar o pacote polished pára manipulaçãod e cores
import { shade } from 'polished';

import signInBackground from '../../assets/sign-in-background.png';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  //estica os elementos para o tamanyho total da  vh
  align-items: stretch;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 700px;
`;

const appearFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  animation: ${appearFromLeft} 1s;
  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;
    h1 {
      margin-bottom: 24px;
    }
  }
  a {
    color: #f4ede8;
    display: block;
    margin-top: 24px;
    text-decoration: none;
    transition: color 0.2s;
    &:hover {
      //neste exemplo ele escurece 20% da cor informada
      color: ${shade(0.2, '#f4ede8')};
    }
  }

  // o > garante que a estilização ocoraa apenas em filhos diretos do elemento
  // caso não fosse utilizado a formatação abaixo poderia impactar na formatação
  // da tag a   acima
  > a {
    color: #ff9000;
    display: block;
    margin-top: 24px;
    text-decoration: none;
    transition: color 0.2s;
    display: flex;
    align-items: center;
    svg {
      margin-right: 16px;
    }
    &:hover {
      //neste exemplo ele escurece 20% da cor informada
      color: ${shade(0.2, '#ff9000')};
    }
  }
`;

export const Background = styled.div`
  // ocupa todo o espaço disponivel
  flex: 1;
  background: url(${signInBackground}) no-repeat center;
  // o cover garante que ocupe todo o espaço
  background-size: cover;
`;
