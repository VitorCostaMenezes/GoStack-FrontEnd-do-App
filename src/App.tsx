import React from 'react';
// importando o react router dom e renomeando
import { BrowserRouter as Router } from 'react-router-dom';

// importando os estilos globais para o documento
import GlobalStyle from './styles/globals';

// importa-se a o contexto e envolve nos components que deseja que tenham acesso ao
// contexto de autenticação
import AppProvider from './hooks';

import Routes from './routes';

const App: React.FC = () => {
  return (
    <Router>
      {/* envolvendo os components no contexto de autenticação */}
      <AppProvider>
        <Routes />
      </AppProvider>

      <GlobalStyle />
    </Router>
  );
};

export default App;
