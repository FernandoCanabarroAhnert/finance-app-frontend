import useKeycloak from "@/hooks/use-keycloak.hook";

export default function Test() {
    const { keycloak, authenticated } = useKeycloak();
    return (
        <div>
            <h1>Test Page</h1>
            <p>Authenticated: {authenticated ? 'Yes' : 'No'}</p>
            <p>Username: {authenticated ? keycloak?.tokenParsed?.fullName : 'N/A'}</p>
        </div>
    )
}