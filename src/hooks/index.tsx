import React from 'react';

import { AuthProvider } from './auth';
import { ToastProvider } from './toast';

// funciona como uma especie de um proveider global que vai englobar todos os providers
const AppProvider: React.FC = ({ children }) => {
  return (
    <AuthProvider>
      <ToastProvider>{children}</ToastProvider>
    </AuthProvider>
  );
};

export default AppProvider;
