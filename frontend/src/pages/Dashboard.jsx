import DashboardChart from '../components/DashboardChart'
import Map from '../components/Map'
import Sidebar from '../components/Sidebar'
import { FileChartLine, FileExclamationPoint, LandPlot } from 'lucide-react'

const Dashboard = () => {
    return (
        <>
            <section className="flex min-h-screen w-full justify-center bg-(--main-bg) font-sans">
                <Sidebar />
                <section className="flex w-full flex-col items-center gap-8 p-10 pl-20">
                    <section className="flex h-1/4 w-full items-center justify-between gap-6 rounded-xl">
                        <article className="flex h-full w-1/3 items-center justify-center rounded-2xl border-2 border-(--menu-color)  text-[#37573F]">
                            <span>
                                <FileChartLine size={128} />
                            </span>
                            <p className="flex flex-col gap-2 text-2xl font-medium">
                                <span className="text-4xl font-bold">500</span>Consultas
                            </p>
                        </article>
                        <article className="flex h-full w-1/3 items-center justify-center rounded-2xl border-2 border-(--menu-color)  text-[#37573F]">
                            <span>
                                <FileExclamationPoint size={128} />
                            </span>
                            <p className="flex flex-col gap-2 text-2xl font-medium">
                                <span className="text-4xl font-bold">500</span>Restricoes
                            </p>
                        </article>
                        <article className="flex h-full w-1/3 items-center justify-center rounded-2xl border-2 border-(--menu-color)  text-[#37573F]">
                            <span>
                                <LandPlot size={128} />
                            </span>
                            <p className="flex flex-col gap-2 text-2xl font-medium">
                                <span className="text-4xl font-bold">500</span>Imoveis
                            </p>
                        </article>
                    </section>
                    <section className="flex h-3/4 w-full flex-row items-center gap-6 rounded-xl border-2 border-(--menu-color)  p-6">
                        <section className="flex h-full w-1/2 items-center justify-center border-(--menu-color) p-8">
                            <DashboardChart />
                        </section>
                        <section className="h-full w-1/2 border-2 border-(--menu-color)">
                            <Map />
                        </section>
                    </section>
                </section>
            </section>
        </>
    )
}

export default Dashboard
