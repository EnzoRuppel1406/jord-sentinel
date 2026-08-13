import { Link } from 'react-router-dom'

const SidebarItem = ({ icon, label, to = '#', active = false }) => {
    return (
        <li className="flex w-full flex-row">
            <Link
                to={to}
                className={`flex h-12 w-full items-center px-4 transition-colors ${active ? ' bg-white/20 text-white' : 'text-white/80 hover:bg-white/10 hover:text-white'}`}
            >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center text-xl">
                    {icon}
                </span>
                <span className="ml-4 whitespace-nowrap opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    {label}
                </span>
            </Link>
        </li>
    )
}

export default SidebarItem
