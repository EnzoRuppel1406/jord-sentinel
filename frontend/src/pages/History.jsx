import { Funnel } from 'lucide-react'
import Sidebar from '../components/Sidebar'
import AnalysisHistoryItem from '../components/AnalysisHistoryItem'
import { useEffect, useState } from 'react'
import { api } from '../services/api'
import cars from '../data/carMock'

const History = () => {
    const [analyses, setanalyses] = useState([])

    useEffect(() => {
        const loadAnalyses = async () => {
            try {
                const { data } = await api.get('/analyses/list')

                setanalyses(data)
            } catch (error) {
                console.log(`Erro ao buscar dados ${error}`)
            }
        }

        loadAnalyses()
    }, [])

    return (
        <section className="flex min-h-screen w-full justify-center bg-(--main-bg) font-sans">
            <Sidebar />
            <section className="flex h-screen w-full items-center justify-center p-30 text-2xl">
                <section className="h-full w-full rounded-xl border-2 border-(--menu-color) p-8">
                    <section className="flex h-1/6 w-full items-center gap-2 p-4">
                        <input
                            type="text"
                            name="searchbar"
                            id="searchbar"
                            placeholder="Insira o codigo CAR aqui"
                            className="h-1/2 w-2/3 rounded-r-2xl border-2 border-(--menu-color) bg-white text-center"
                        />
                        <button
                            type="submit"
                            className="h-1/2 w-2/6 cursor-pointer rounded-xl bg-(--menu-color) text-(--main-bg) transition-colors duration-300 ease-in-out hover:border-2 hover:bg-stone-500"
                        >
                            Buscar
                        </button>
                        <p className="roundedxl flex h-1/2 w-1/6 cursor-pointer items-center justify-center rounded-2xl bg-(--menu-color) text-center text-(--main-bg) transition-colors duration-300 ease-in-out hover:border-2 hover:bg-stone-500">
                            Filtrar
                            <span>
                                <Funnel size={32} />
                            </span>
                        </p>
                    </section>
                    <section className="flex h-fit max-h-5/6 w-full items-start overflow-y-auto rounded-xl border bg-olive-300 text-center">
                        <table className="w-full table-fixed border-collapse border-spacing-x-4 border-spacing-y-2">
                            <thead>
                                <tr>
                                    <th className="sticky top-0 z-10 w-2/6 bg-olive-300 py-2">
                                        <div className="rounded-2xl border-2 border-stone-400 bg-white py-2 shadow-md">
                                            CAR
                                        </div>
                                    </th>
                                    <th className="sticky top-0 z-10 bg-olive-300 px-4">
                                        <div className="rounded-2xl border-2 border-stone-400 bg-white py-2 shadow-md">
                                            Municipio
                                        </div>
                                    </th>
                                    <th className="sticky top-0 z-10 bg-olive-300 px-4">
                                        <div className="rounded-2xl border-2 border-stone-400 bg-white py-2 shadow-md">
                                            Area
                                        </div>
                                    </th>
                                    <th className="sticky top-0 z-10 bg-olive-300 px-4">
                                        <div className="rounded-2xl border-2 border-stone-400 bg-white py-2 shadow-md">
                                            Risco
                                        </div>
                                    </th>
                                    <th className="sticky top-0 z-10 bg-olive-300 px-4">
                                        <div className="rounded-2xl border-2 border-stone-400 bg-white py-2 shadow-md">
                                            Data
                                        </div>
                                    </th>
                                    <th className="sticky top-0 z-10 bg-olive-300 px-4">
                                        <div className="rounded-2xl border-2 border-stone-400 bg-white py-2 shadow-md">
                                            Consultado Por
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {analyses.map((analysis) => {
                                    const [car] = cars.filter(
                                        (car) => car.code === analysis.carCode
                                    )

                                    const { area, city, state } = car.property

                                    const data = { ...analysis, area, city, state }

                                    return <AnalysisHistoryItem key={data.key} data={data} />
                                })}
                            </tbody>
                        </table>
                    </section>
                </section>
            </section>
        </section>
    )
}

export default History
