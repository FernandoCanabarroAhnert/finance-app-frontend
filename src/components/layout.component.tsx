import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Outlet } from "react-router-dom"
import AppSidebar from "./app-sidebar.component"

export default function Layout() {
    return (
        <SidebarProvider>
            <AppSidebar></AppSidebar>
            <main className="w-full">
                <header className="p-4 md:py-6 w-full bg-primaryColor">
                    <div className="flex md:hidden text-white">
                        <SidebarTrigger />
                    </div>
                </header>
                <div className="p-5">
                    <Outlet />
                </div>
            </main>
        </SidebarProvider>
    )
}