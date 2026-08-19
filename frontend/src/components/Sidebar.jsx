import SidebarItem from './SidebarItem'
import { FileChartLine, LayoutDashboard, FolderClock, UserRoundCog } from 'lucide-react'
import profile from '../assets/profile.jpg'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'

const Sidebar = () => {
    const { user } = useContext(AuthContext)
    return (
        <aside className="group fixed top-0 left-0 z-50 flex h-full w-16 flex-col items-center overflow-hidden bg-(--menu-color) text-(--main-bg) shadow-lg transition-all duration-300 ease-in-out hover:w-72">
            <nav className="w-full flex-1 content-center py-4 text-2xl">
                <ul className="flex w-full flex-col gap-10">
                    <SidebarItem
                        icon={<LayoutDashboard size={32} absoluteStrokeWidth={true} />}
                        to={'/dashboard'}
                        label={'Dashboard'}
                        active={true}
                    />
                    <SidebarItem
                        icon={<FileChartLine size={32} />}
                        to={'/search'}
                        label={'Consultar'}
                    />
                    <SidebarItem
                        icon={<FolderClock size={32} />}
                        to={'/history'}
                        label={'Historico'}
                    />
                    <SidebarItem
                        icon={<UserRoundCog size={32} />}
                        to={'/admin'}
                        label={'Gestao de Usuarios'}
                    />
                </ul>
            </nav>
            <section className="flex h-[12%] w-full flex-col items-center justify-between gap-3 border-t-2 p-2 pt-4">
                <section className="flex h-fit w-full justify-between p-2 text-xl">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center text-xl">
                        <img src={profile} alt="Foto de perfil" className="rounded-2xl" />
                    </span>
                    <span className="ml-4 whitespace-nowrap opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                        {user.name}
                    </span>
                </section>
                <Link
                    className="mb-3 w-2/3 cursor-pointer border p-4 text-xl whitespace-nowrap opacity-0 transition-opacity duration-300 group-hover:opacity-100 hover:bg-white/10 hover:text-white"
                    to={'/login'}
                >
                    Encerrar sessao
                </Link>
            </section>
        </aside>
    )
}

export default Sidebar
