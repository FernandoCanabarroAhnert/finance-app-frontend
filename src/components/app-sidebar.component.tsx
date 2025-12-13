import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarTrigger,
    useSidebar,
} from "@/components/ui/sidebar"
import Logo from '../assets/Vector-White.png'
import MenuItem from "./menu-item.component";
import { FaHome, FaWallet, FaExchangeAlt, FaIcons, FaUser } from "react-icons/fa";

export default function AppSidebar() {
    const { open } = useSidebar();
    const keycloakUrl = import.meta.env.VITE_KEYCLOAK_URL;

    return (
        <>
            <div className="flex md:hidden">
                <Sidebar collapsible="icon" variant="floating" className="p-0 m-0">
                    <SidebarContent className="bg-primaryColor text-white">
                        <SidebarHeader className="flex flex-row items-center justify-between p-4">
                            <div className="flex items-center gap-4">
                                <p className="text-lg font-bold">Finanças</p>
                                <img src={Logo} alt="Finance App Logo" className="w-6 h-6" />
                            </div>
                            <SidebarTrigger />
                        </SidebarHeader>
                        <SidebarGroup />
                        <MenuItem icon={<FaHome />} label="Dashboard" open={open} path="dashboard" />
                        <MenuItem icon={<FaWallet />} label="Carteiras" open={open} path="wallets" />
                        <MenuItem icon={<FaExchangeAlt />} label="Transações" open={open} path="transactions" />
                        <MenuItem icon={<FaIcons />} label="Categorias" open={open} path="categories" />
                        <SidebarGroup />
                    </SidebarContent>
                    <SidebarFooter className="bg-primaryColor text-white">
                        <MenuItem icon={<FaUser />} label="Configurações" open={open} path="http://localhost:8180/realms/finance-app/account" />
                    </SidebarFooter>
                </Sidebar>
            </div>
            <div className="hidden md:flex">
                <Sidebar collapsible="icon" style={{
                        "--sidebar-width-icon": "4rem",
                    } as React.CSSProperties}
                >
                    <SidebarContent className="bg-primaryColor text-white">
                        <SidebarHeader className="flex flex-row items-center justify-between p-4">
                            {
                                open && (
                                    <div className="flex items-center gap-4">
                                        <p className="text-lg font-bold">Finanças</p>
                                        <img src={Logo} alt="Finance App Logo" className="w-6 h-6" />
                                    </div>
                                )
                            }
                            <SidebarTrigger />
                        </SidebarHeader>
                        <SidebarGroup>
                            <MenuItem icon={<FaHome />} label="Dashboard" open={open} path="dashboard" />
                            <MenuItem icon={<FaWallet />} label="Carteiras" open={open} path="wallets" />
                            <MenuItem icon={<FaExchangeAlt />} label="Transações" open={open} path="transactions" />
                            <MenuItem icon={<FaIcons />} label="Categorias" open={open} path="categories" />
                        </SidebarGroup>
                    </SidebarContent>
                    <SidebarFooter className="bg-primaryColor text-white">
                        <MenuItem icon={<FaUser />} label="Configurações" open={open} path={`${keycloakUrl}/realms/finance-app/account`} />
                    </SidebarFooter>
                </Sidebar>
            </div>
        </>
    )
}