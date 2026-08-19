import { Funnel } from 'lucide-react'
import Sidebar from '../components/Sidebar'

const History = () => {
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
                                </tr>
                            </thead>
                            <tbody className="">
                                <tr className="group cursor-pointer">
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        PR-4104303-58C3F908698B4755999CE7D2B4F23D8E
                                    </td>
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        Campo Mourao / PR
                                    </td>
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        242,468 ha
                                    </td>
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        Irrestrito
                                    </td>
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        16/08/2026
                                    </td>
                                </tr>
                                <tr className="group cursor-pointer">
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        PR-4104303-58C3F908698B4755999CE7D2B4F23D8E
                                    </td>
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        Campo Mourao / PR
                                    </td>
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        242,468 ha
                                    </td>
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        Irrestrito
                                    </td>
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        16/08/2026
                                    </td>
                                </tr>
                                <tr className="group cursor-pointer">
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        PR-4104303-58C3F908698B4755999CE7D2B4F23D8E
                                    </td>
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        Campo Mourao / PR
                                    </td>
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        242,468 ha
                                    </td>
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        Irrestrito
                                    </td>
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        16/08/2026
                                    </td>
                                </tr>
                                <tr className="group cursor-pointer">
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        PR-4104303-58C3F908698B4755999CE7D2B4F23D8E
                                    </td>
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        Campo Mourao / PR
                                    </td>
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        242,468 ha
                                    </td>
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        Irrestrito
                                    </td>
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        16/08/2026
                                    </td>
                                </tr>
                                <tr className="group cursor-pointer">
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        PR-4104303-58C3F908698B4755999CE7D2B4F23D8E
                                    </td>
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        Campo Mourao / PR
                                    </td>
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        242,468 ha
                                    </td>
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        Irrestrito
                                    </td>
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        16/08/2026
                                    </td>
                                </tr>
                                <tr className="group cursor-pointer">
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        PR-4104303-58C3F908698B4755999CE7D2B4F23D8E
                                    </td>
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        Campo Mourao / PR
                                    </td>
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        242,468 ha
                                    </td>
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        Irrestrito
                                    </td>
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        16/08/2026
                                    </td>
                                </tr>
                                <tr className="group cursor-pointer">
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        PR-4104303-58C3F908698B4755999CE7D2B4F23D8E
                                    </td>
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        Campo Mourao / PR
                                    </td>
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        242,468 ha
                                    </td>
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        Irrestrito
                                    </td>
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        16/08/2026
                                    </td>
                                </tr>
                                <tr className="group cursor-pointer">
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        PR-4104303-58C3F908698B4755999CE7D2B4F23D8E
                                    </td>
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        Campo Mourao / PR
                                    </td>
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        242,468 ha
                                    </td>
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        Irrestrito
                                    </td>
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        16/08/2026
                                    </td>
                                </tr>
                                <tr className="group cursor-pointer">
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        PR-4104303-58C3F908698B4755999CE7D2B4F23D8E
                                    </td>
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        Campo Mourao / PR
                                    </td>
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        242,468 ha
                                    </td>
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        Irrestrito
                                    </td>
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        16/08/2026
                                    </td>
                                </tr>
                                <tr className="group cursor-pointer">
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        PR-4104303-58C3F908698B4755999CE7D2B4F23D8E
                                    </td>
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        Campo Mourao / PR
                                    </td>
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        242,468 ha
                                    </td>
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        Irrestrito
                                    </td>
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        16/08/2026
                                    </td>
                                </tr>
                                <tr className="group cursor-pointer">
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        PR-4104303-58C3F908698B4755999CE7D2B4F23D8E
                                    </td>
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        Campo Mourao / PR
                                    </td>
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        242,468 ha
                                    </td>
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        Irrestrito
                                    </td>
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        16/08/2026
                                    </td>
                                </tr>
                                <tr className="group cursor-pointer">
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        PR-4104303-58C3F908698B4755999CE7D2B4F23D8E
                                    </td>
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        Campo Mourao / PR
                                    </td>
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        242,468 ha
                                    </td>
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        Irrestrito
                                    </td>
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        16/08/2026
                                    </td>
                                </tr>
                                <tr className="group cursor-pointer">
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        PR-4104303-58C3F908698B4755999CE7D2B4F23D8E
                                    </td>
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        Campo Mourao / PR
                                    </td>
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        242,468 ha
                                    </td>
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        Irrestrito
                                    </td>
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        16/08/2026
                                    </td>
                                </tr>
                                <tr className="group cursor-pointer">
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        PR-4104303-58C3F908698B4755999CE7D2B4F23D8E
                                    </td>
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        Campo Mourao / PR
                                    </td>
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        242,468 ha
                                    </td>
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        Irrestrito
                                    </td>
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        16/08/2026
                                    </td>
                                </tr>
                                <tr className="group cursor-pointer">
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        PR-4104303-58C3F908698B4755999CE7D2B4F23D8E
                                    </td>
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        Campo Mourao / PR
                                    </td>
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        242,468 ha
                                    </td>
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        Irrestrito
                                    </td>
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        16/08/2026
                                    </td>
                                </tr>
                                <tr className="group cursor-pointer">
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        PR-4104303-58C3F908698B4755999CE7D2B4F23D8E
                                    </td>
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        Campo Mourao / PR
                                    </td>
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        242,468 ha
                                    </td>
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        Irrestrito
                                    </td>
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        16/08/2026
                                    </td>
                                </tr>
                                <tr className="group cursor-pointer">
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        PR-4104303-58C3F908698B4755999CE7D2B4F23D8E
                                    </td>
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        Campo Mourao / PR
                                    </td>
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        242,468 ha
                                    </td>
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        Irrestrito
                                    </td>
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        16/08/2026
                                    </td>
                                </tr>
                                <tr className="group cursor-pointer">
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        PR-4104303-58C3F908698B4755999CE7D2B4F23D8E
                                    </td>
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        Campo Mourao / PR
                                    </td>
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        242,468 ha
                                    </td>
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        Irrestrito
                                    </td>
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        16/08/2026
                                    </td>
                                </tr>
                                <tr className="group cursor-pointer">
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        PR-4104303-58C3F908698B4755999CE7D2B4F23D8E
                                    </td>
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        Campo Mourao / PR
                                    </td>
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        242,468 ha
                                    </td>
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        Irrestrito
                                    </td>
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        16/08/2026
                                    </td>
                                </tr>
                                <tr className="group cursor-pointer">
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        PR-4104303-58C3F908698B4755999CE7D2B4F23D8E
                                    </td>
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        Campo Mourao / PR
                                    </td>
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        242,468 ha
                                    </td>
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        Irrestrito
                                    </td>
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        16/08/2026
                                    </td>
                                </tr>
                                <tr className="group cursor-pointer">
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        PR-4104303-58C3F908698B4755999CE7D2B4F23D8E
                                    </td>
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        Campo Mourao / PR
                                    </td>
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        242,468 ha
                                    </td>
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        Irrestrito
                                    </td>
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        16/08/2026
                                    </td>
                                </tr>
                                <tr className="group cursor-pointer">
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        PR-4104303-58C3F908698B4755999CE7D2B4F23D8E
                                    </td>
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        Campo Mourao / PR
                                    </td>
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        242,468 ha
                                    </td>
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        Irrestrito
                                    </td>
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        16/08/2026
                                    </td>
                                </tr>
                                <tr className="group cursor-pointer">
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        PR-4104303-58C3F908698B4755999CE7D2B4F23D8E
                                    </td>
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        Campo Mourao / PR
                                    </td>
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        242,468 ha
                                    </td>
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        Irrestrito
                                    </td>
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        16/08/2026
                                    </td>
                                </tr>
                                <tr className="group cursor-pointer">
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        PR-4104303-58C3F908698B4755999CE7D2B4F23D8E
                                    </td>
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        Campo Mourao / PR
                                    </td>
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        242,468 ha
                                    </td>
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        Irrestrito
                                    </td>
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        16/08/2026
                                    </td>
                                </tr>
                                <tr className="group cursor-pointer">
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        PR-4104303-58C3F908698B4755999CE7D2B4F23D8E
                                    </td>
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        Campo Mourao / PR
                                    </td>
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        242,468 ha
                                    </td>
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        Irrestrito
                                    </td>
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        16/08/2026
                                    </td>
                                </tr>
                                <tr className="group cursor-pointer">
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        PR-4104303-58C3F908698B4755999CE7D2B4F23D8E
                                    </td>
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        Campo Mourao / PR
                                    </td>
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        242,468 ha
                                    </td>
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        Irrestrito
                                    </td>
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        16/08/2026
                                    </td>
                                </tr>
                                <tr className="group cursor-pointer">
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        PR-4104303-58C3F908698B4755999CE7D2B4F23D8E
                                    </td>
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        Campo Mourao / PR
                                    </td>
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        242,468 ha
                                    </td>
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        Irrestrito
                                    </td>
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        16/08/2026
                                    </td>
                                </tr>
                                <tr className="group cursor-pointer">
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        PR-4104303-58C3F908698B4755999CE7D2B4F23D8E
                                    </td>
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        Campo Mourao / PR
                                    </td>
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        242,468 ha
                                    </td>
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        Irrestrito
                                    </td>
                                    <td className="border-b p-4 group-hover:bg-slate-300">
                                        16/08/2026
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </section>
                </section>
            </section>
        </section>
    )
}

export default History
