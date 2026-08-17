import Sidebar from './Sidebar'
import inDevelopmentImage from '../assets/in_development.png'

const InDevelopment = () => {
    return (
        <section className="flex min-h-screen w-full items-center justify-center bg-(--main-bg) p-20 font-sans">
            <Sidebar />
            <section className="h-1/2 w-2/3">
                <img src={inDevelopmentImage} className="h-full w-full" />
                <h1 className="w-full text-center text-4xl font-extrabold text-(--menu-color)">
                    Nossas ideias estão ganhando raízes. Quase pronto!
                </h1>
            </section>
        </section>
    )
}

export default InDevelopment
