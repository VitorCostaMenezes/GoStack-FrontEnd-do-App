import React, { useCallback, useRef } from 'react';
import { FiArrowLeft, FiUser, FiMail, FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
// é necessário instalar o pacote do unform
import { Form } from '@unform/web';
// necessário instalar o pacote yup para efetuar validações no front end
// esta importando tudo em uma variavel chamda yup permitindo acessar todas as validaçoes
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';

import { useToast } from '../../hooks/toast';

import getValidationErrors from '../../utils/getValidationErrors';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/Imput';
import Button from '../../components/Button';

import { Container, Content, AnimationContainer, Background } from './styles';

// definindo a tipagem do cadastro
interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  // o useref da acesso a varias propriedades presentes no elemento
  // o formHandles é uma interface com a tipagem de todas as propriedades
  // que o use ref acessa
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    // recebendo o data  do form contendo as informações contidas no formulário
    async (data: SignUpFormData) => {
      try {
        // começando vazio, pra sempre faezr a validação do zero
        formRef.current?.setErrors({});

        // criando um schema de validação, geralmente é
        // usado quando quer validra um objeto inteiro
        const schema = Yup.object().shape({
          // informando os campos e que tipo d campos são e se são obrigatórios
          name: Yup.string().required('Nome obrigatório'),
          // definindo como do tipo email e obrigatório
          email: Yup.string()
            .email('Digite um e-mail válido')
            .required('E-mail obrigatório'),
          // especificando que deve ter no minimo 6 caracteres
          // se exige no minimo 6 caraceteres logo ele ja é obrigatório
          password: Yup.string().min(6, 'No mínimo 6 dígitos'),
        });

        // aqui ocorre a validação, o schema que é um obejeto de yup
        // recebe o data do form contendo todas as informações dos inputs
        // e valida com base nas regras definidas no schema
        await schema.validate(data, {
          // esse segundo parâmetro  {abortEarly: false,} é opcional
          // o yup por padrão para a execução de validação ja no primeiro erro encontrado
          // o codigo abaixo faz com que a validação retorne todos os erros encontrados
          abortEarly: false,
        });

        // se a validação ocorrer sem erro, a api é acessada via metodo post
        // e os dados colhidos no form são inseridos no back end
        await api.post('/users', data);

        history.push('/');

        addToast({
          type: 'success',
          title: 'Cadastro realizado!',
          description: 'Você já pode fazer seu logon no GoBarber!',
        });
      } catch (err) {
        // se o err que cair no catch for uma instancia da validação do yup acima
        // ele vai entrar no bloco de código
        if (err instanceof Yup.ValidationError) {
          // enviando o err para validaçãono arquivo getValidationErros.ts
          // e armazenando o resultado em erros
          const errors = getValidationErrors(err);
          // atribuindo o valor de erros ao formRef
          // que até então era um objeto vazio
          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro no cadastro',
          description: 'Ocorreu um erro ao fazer cadastro, tente novamente.',
        });
      }
    },
    [addToast, history],
  );

  return (
    <Container>
      <Background />
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="GoBarber" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu cadastro</h1>

            <Input name="name" icon={FiUser} placeholder="Nome" />

            <Input name="email" icon={FiMail} placeholder="E-mail" />

            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Senha"
            />

            <Button type="submit">Cadastrar</Button>
          </Form>

          <Link to="/">
            <FiArrowLeft />
            Voltar para logon
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default SignUp;
