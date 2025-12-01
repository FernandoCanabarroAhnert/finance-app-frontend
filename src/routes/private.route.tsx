import { useEffect } from "react";
import type { ReactNode } from "react";
import useKeycloak from "@/hooks/use-keycloak.hook";

interface PrivateRouteProps {
  children: ReactNode;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const { keycloak, authenticated } = useKeycloak();

  useEffect(() => {
    if (!authenticated && keycloak) {
      keycloak.login();
    }
  }, [authenticated, keycloak]);

  if (!authenticated) {
    return null;
  }

  return children;
}
