import React, {
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
// o icon base props refere-se as propriedades que um icone pode ter
import { IconBaseProps } from 'react-icons';

import { FiAlertCircle } from 'react-icons/fi';

import { useField } from '@unform/core';

import { Container, Error } from './styles';

// criando uma interface e extendendo às propriedades que ja existem em um input normal
// essa interface precisa receber um parâmetro d tipagem que ja existe no html
// o HTMLIpuntElements,  essa proprieadde esta global na aplicação
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  // definindo os icones como um ComponentType
  icon?: React.ComponentType<IconBaseProps>;
}

// o recbimento da props icon neste caso deve ser renomeada
// pq o icon se refere a um component, e para ser utilizado como component
// deve-se começar com letra maiuscula
// esse component veio da biblioteca react-icons
const Input: React.FC<InputProps> = ({ name, icon: Icon, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const { fieldName, defaultValue, error, registerField } = useField(name);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputRef.current?.value);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    // o isErrored verifica se tem um erro no container (um boolean)
    <Container isErrored={!!error} isFocused={isFocused} isFilled={isFilled}>
      {/* se Icon existir ele tera o tamanho 20 */}
      {Icon && <Icon size={20} />}
      <input
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        ref={inputRef}
        {...rest}
        // type="text"
      />
      {/* casoexista o erro ele, ele insere o icone de erro importado do react-icons */}
      {error && (
        <Error title={error}>
          <FiAlertCircle color="#c53030" size={20} />
        </Error>
      )}
    </Container>
  );
};

export default Input;
