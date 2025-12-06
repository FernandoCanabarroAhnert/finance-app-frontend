import { NavLink } from "react-router-dom";

interface MenuItemProps {
    icon: React.ReactNode;
    label: string;
    open: boolean;
    path: string;
}

export default function MenuItem({ icon, label, open, path }: MenuItemProps) {
    return (
        <NavLink to={path}
            className={({ isActive }) => (
                isActive ? "flex items-center gap-3 p-3 cursor-pointer rounded-md bg-white text-primaryColor mb-2"
                    : "flex items-center gap-3 p-3 cursor-pointer hover:bg-white/10 rounded-md mb-2"
            )}
        >
            <span className="w-6 h-6 flex items-center justify-center">
                {icon}
            </span>
            {open && (
                <span className="font-medium">
                    {label}
                </span>
            )}
        </NavLink>
    )
}