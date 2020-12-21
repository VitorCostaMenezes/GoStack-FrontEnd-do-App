import React, { useCallback, useRef } from 'react';
// para usar o react icons é necessário instalar o pacote
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';

// importando o contexto
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationErrors';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/Imput';
import Button from '../../components/Button';

import { Container, Content, AnimationContainer, Background } from './styles';

// criando uma interface para especificar quais dados vão ser recebidos pelo formulário
interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { signIn } = useAuth();
  const { addToast } = useToast();

  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});

        // criando um schema de validação dos dados
        const schema = Yup.object().shape({
          email: Yup.string()
            .email('Digite um e-mail válido')
            .required('E-mail obrigatório'),
          password: Yup.string().required('Senha obrigatória'),
        });

        // faz a validação com base nas propriedades recebidas no data do Form
        // e compara com o schema de validação criado
        await schema.validate(data, {
          abortEarly: false,
        });

        // se passar na validação anterior executa este bloco
        // enviando o email e o password que estão contidos em data
        // o data do handle submit puxou do Form todas as informações necessárias
        await signIn({
          email: data.email,
          password: data.password,
        });

        history.push('/dashboard');
      } catch (err) {
        //  verifica se o erro é uma instancia de yup,
        // ou seja, se esta relacionado a verificação acima
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        // disparando o toast
        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description: 'Ocorreu um erro ao fazer login, cheque as credenciais.',
        });
      }
    },
    [signIn, addToast, history],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="GoBarber" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu logon</h1>

            <Input name="email" icon={FiMail} placeholder="E-mail" />

            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Senha"
            />

            <Button type="submit">Entrar</Button>

            <a href="forgot">Esqueci minha senha</a>
          </Form>

          <Link to="/signup">
            <FiLogIn />
            Criar conta
          </Link>
        </AnimationContainer>
      </Content>

      <Background />
    </Container>
  );
};
export default SignIn;
