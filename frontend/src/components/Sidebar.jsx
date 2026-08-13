import SidebarItem from './SidebarItem'
import { FileChartLine, LayoutDashboard, FolderClock, UserRoundCog } from 'lucide-react'

const Sidebar = () => {
    return (
        <aside className="group fixed top-0 left-0 z-50 flex h-full w-16 items-center overflow-hidden bg-(--menu-color) text-(--main-bg) shadow-lg transition-all duration-300 ease-in-out hover:w-72">
            <nav className="h-full w-full content-center py-4 text-2xl">
                <ul className="flex w-full flex-col gap-10">
                    <SidebarItem
                        icon={<LayoutDashboard size={32} absoluteStrokeWidth={true} />}
                        to={'/dashboard'}
                        label={'Home'}
                        active={true}
                    />
                    <SidebarItem icon={<FileChartLine size={32} />} to={''} label={'Consultar'} />
                    <SidebarItem icon={<FolderClock size={32} />} to={''} label={'Historico'} />
                    <SidebarItem
                        icon={<UserRoundCog size={32} />}
                        to={''}
                        label={'Gestao de Usuarios'}
                    />
                </ul>
            </nav>
        </aside>
    )
}

export default Sidebar
