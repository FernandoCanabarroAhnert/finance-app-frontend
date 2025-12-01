import { useContext } from 'react';
import { KeycloakContext } from '../contexts/keycloak.context';

const useKeycloak = () => {
  const context = useContext(KeycloakContext);
  if (!context) {
    throw new Error('useKeycloak must be used within a KeycloakProvider');
  }

  return context;
};

export default useKeycloak;