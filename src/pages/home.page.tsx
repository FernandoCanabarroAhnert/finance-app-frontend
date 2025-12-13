import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import useKeycloak from "@/hooks/use-keycloak.hook"
import { FaWallet, FaChartLine, FaFileContract } from "react-icons/fa"

export default function Home() {
    const { keycloak } = useKeycloak();

    const handleLogin = () => {
        keycloak?.login({
            redirectUri: window.location.origin + "/finances/dashboard"
        });
    }

    const handleRegister = () => {
        keycloak?.register({
            redirectUri: window.location.origin + "/finances/dashboard"
        });
    }

    return (
        <div className="bg-[linear-gradient(to_bottom,_#712FB820,_white)] min-h-[100dvh]">
            <div className="container mx-auto px-3 md:px-0">
                <div className="flex flex-col items-center justify-center gap-8 py-10">
                    <h1 className="text-4xl lg:text-5xl font-bold text-primaryColor text-center">Controle suas finanças com facilidade</h1>
                    <p className="md:max-w-[60%] lg:max-w-[45%] font-medium text-gray-500 text-lg text-center">
                        O Finance App ajuda você a gerenciar categorias, relatórios e sua carteira em um só lugar.
                        Organize, acompanhe e alcance suas metas financeiras.
                    </p>
                    <Button onClick={handleLogin} className="bg-secondaryColor text-white hover:bg-secondaryColor hover:text-white" variant="outline">
                        Começar agora
                    </Button>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 py-10">
                    <Card className="rounded-lg h-[300px] text-center px-10 py-14 flex flex-col items-center justify-center gap-3 shadow-md">
                        <FaWallet size={44} className="mx-auto text-4xl text-primaryColor" />
                        <p className="text-lg font-semibold">Carteira unificada</p>
                        <p className="text-gray-500">Veja todos os seus saldos e contas em um só painel simples e organizado.</p>
                    </Card>
                    <Card className="rounded-lg h-[300px] text-center px-10 py-14 flex flex-col items-center justify-center gap-3 shadow-md">
                        <FaChartLine size={44} className="text-4xl text-primaryColor" />
                        <p className="text-lg font-semibold">Relatórios inteligentes</p>
                        <p className="text-gray-500">Descubra para onde vai seu dinheiro com relatórios claros e gráficos intuitivos.</p>
                    </Card>
                    <Card className="rounded-lg h-[300px] text-center px-10 py-14 flex flex-col items-center justify-center gap-3 shadow-md">
                        <FaFileContract size={44} className="mx-auto text-4xl text-primaryColor" />
                        <p className="text-lg font-semibold">Metas financeiras</p>
                        <p className="text-gray-500">Defina objetivos e acompanhe seu progresso rumo à liberdade financeira.</p>
                    </Card>
                </div>
                <div className="flex flex-col items-center justify-center gap-4 py-6">
                    <h1 className="text-3xl font-bold text-primaryColor text-center">Pronto para começar?</h1>
                    <p className="md:max-w-[60%] lg:max-w-[45%] font-medium text-gray-500 text-lg text-center">
                        Cadastre-se agora e organize suas finanças em minutos.
                    </p>
                    <div className="flex items-center gap-6">
                        <Button onClick={handleRegister} className="bg-secondaryColor text-white hover:bg-secondaryColor hover:text-white" variant="outline">
                            Criar conta
                        </Button>
                        <Button onClick={handleLogin} variant="outline">
                            Entrar
                        </Button>
                    </div>
                </div>
            </div>
            <footer className="mt-4 lg:mt-0 border-t-[1px] border-t-gray-300 text-center flex items-center justify-center py-5">
                <p className="text-gray-500">© 2025 Finance App. Todos os direitos reservados.</p>
            </footer>
        </div>
    )
}