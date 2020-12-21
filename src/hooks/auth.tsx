import React, { createContext, useCallback, useContext, useState } from 'react';
import { isObjectLiteralExpression } from 'typescript';

import api from '../services/api';

interface AuthState {
  token: string;
  user: object;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: object;
  // quando é metodo utiliza um async é necessário tipar como Promise
  // no metodo abaixo fala que recebe uma credentials e o seu formato
  // o formato é definido na criçã da interface acima
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

// criando uma variavel de contexto
// na criação dessa variavel não pode ser incializada vazia,
// porém existe o hack abaixo que é inserir o {} as nomedaInterface
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

// criando um component
const AuthProvider: React.FC = ({ children }) => {
  // inicializando o state com uma função
  const [data, setData] = useState<AuthState>(() => {
    // pegando os valores do localStorage e armazenando nas variaveis
    const token = localStorage.getItem('@GoBarber:token');
    const user = localStorage.getItem('@GoBarber:user');

    // se token e uiser existirem, ele converte o user de string de volta para objeto
    // e retorna os valores de token e de user em formato de objeto
    if (token && user) {
      return { token, user: JSON.parse(user) };
    }

    // se não passar pelo if a acima ele retorna o valor como
    // um objeto vazio do tipo AuthState
    return {} as AuthState;
  });

  // acessa a a rota sessions enviando o email e password para validar a sessão
  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', {
      email,
      password,
    });

    // recebendo o token e o user do response.data
    const { token, user } = response.data;

    // salvando os arquivos em localStorage
    // como o user é um isObjectLiteralExpression, é necessário converter para
    // string para salvar no local stroage
    localStorage.setItem('@GoBarber:token', token);
    localStorage.setItem('@GoBarber:user', JSON.stringify(user));

    // salvando o valor do stado data, passando o token e o user
    // é necessário salvar eesse dados em um estado para poder passsar
    // para outras partes do codigo via contexto
    setData({ token, user });
  }, []);

  // ao ser executado remove os itens especificados do local storage
  const signOut = useCallback(() => {
    localStorage.removeItem('@GoBarber:token');
    localStorage.removeItem('@GoBarber:user');

    // setando o arquivo como vazio após a remoção das informações
    setData({} as AuthState);
  }, []);

  // passa por contexto os dados do usuário, a função signIn e a signOut
  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  // utilizando o contexto global passando AuthCntext como parâmetro
  const context = useContext(AuthContext);

  // s eo contexto não existir  entra no erro
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
