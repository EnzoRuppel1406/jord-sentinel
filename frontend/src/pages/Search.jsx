import { FileDown, FileUp, MapPin } from 'lucide-react'
import Sidebar from '../components/Sidebar'
import DashboardMap from '../components/DashboardMap'

const Search = () => {
    return (
        <section className="flex min-h-screen w-full justify-center bg-(--main-bg) font-sans">
            <Sidebar />
            <section className="h-screen w-full p-12 pl-24">
                <section className="flex h-full w-full flex-col gap-5 bg-slate-500 p-4">
                    <section className="h-fit w-full rounded-xl border border-white p-6">
                        <p className="font-bold tracking-wider text-white uppercase">
                            Consulta Cadastro Ambiental Rural
                        </p>
                        <section className="flex gap-4">
                            <input
                                type="text"
                                name="searchbar"
                                id="searchbar"
                                placeholder="Insira o coodigo CAR"
                                className="w-2/3 rounded-xl border border-(--menu-color) bg-slate-100 text-center"
                            />
                            <button
                                type="submit"
                                className="w-1/6 cursor-pointer rounded-xl border-(--menu-color) bg-(--menu-color) p-2 text-(--main-bg) transition-colors duration-300 ease-in-out hover:border-2 hover:bg-stone-500"
                            >
                                Buscar
                            </button>
                            <p className="flex w-1/6 cursor-pointer gap-4 rounded-xl border-(--menu-color) bg-(--menu-color) p-2 text-(--main-bg) transition-colors duration-300 ease-in-out hover:border-2 hover:bg-stone-500">
                                <FileUp />
                                Carregar arquivo
                            </p>
                        </section>
                    </section>
                    <section className="flex h-full w-full justify-between gap-3 border">
                        <section className="flex h-full w-1/2 flex-col gap-4 bg-white p-2">
                            <h1 className="flex w-full justify-between p-3">
                                Imovel Rural
                                <span className="rounded-1 bg-lime-100 p-1 font-medium text-green-950 uppercase">
                                    Sem Restricoes
                                </span>
                            </h1>
                            <section className="grid h-fit w-full grid-cols-3 gap-4 border text-center whitespace-nowrap">
                                <h1>CAR</h1>
                                <h1>Area (ha)</h1>
                                <h1>Mod. Fiscais</h1>
                                <p>PR-4104303-58C3F908698B4755999CE7D2B4F23D8E</p>
                                <p>242,47</p>
                                <p>13,47</p>
                                <h1>Data Criacao</h1>
                                <h1>Ultima Retificacao</h1>
                                <h1>Municipio</h1>
                                <p>22/10/2015</p>
                                <p>07/05/2024</p>
                                <p>Campo Mourão (PR)</p>
                            </section>
                            <section className="h-fit w-full">
                                <p className="font-semibold tracking-wider uppercase">
                                    Restricoes encontradas
                                </p>
                                <article className="h-full w-full space-y-1 border-l-5 border-red-900 bg-slate-200 p-2 shadow-xl">
                                    <h1 className="flex justify-between font-bold uppercase">
                                        Unidade de Conservacao
                                        <span>123,47 ha</span>
                                    </h1>
                                    <p className="flex justify-between">
                                        Fonte: CNUC/ICMBIO <span>Impeditivo</span>
                                    </p>
                                    <p>Sobreposicao de 48,7% com APA</p>
                                </article>
                            </section>
                        </section>
                        <section className="flex h-full w-1/2 flex-col gap-4 bg-black p-4">
                            <section className="h-fit w-1/2 bg-slate-600 p-2">
                                <h2 className="font-light uppercase">Parecer consolidado</h2>
                                <h1 className="font-bold tracking-widest text-amber-700 uppercase">
                                    Impedido
                                </h1>
                                <p>
                                    A contratação de crédito rural fica vedada nos termos do MCR até
                                    saneamento das restrições identificadas.
                                </p>
                                <p className="w-fit border border-amber-600 bg-amber-400 p-1 tracking-wide">
                                    Ref. MCR 2.6.2
                                </p>
                            </section>
                            <section className="flex w-1/2 flex-col bg-slate-600 p-2">
                                <p className="flex">
                                    <span>
                                        <MapPin />
                                    </span>
                                    Coordenadas do centroide
                                </p>
                                <p className="font-semibold">-24.1419444444, -52.3730555556</p>
                            </section>
                            <section className="flex w-1/2 cursor-pointer flex-col border-slate-950 bg-slate-600 p-2 hover:border-2 hover:bg-slate-200">
                                <h1 className="flex font-semibold">
                                    <span>
                                        <FileDown />
                                    </span>
                                    Gerar laudo em pdf
                                </h1>
                                <p className="text-xs font-light uppercase">
                                    Documento consolidado apresentando os resultados da consulta
                                </p>
                            </section>
                        </section>
                    </section>
                    <section className="h-full w-full border-2">
                        <DashboardMap />
                    </section>
                </section>
            </section>
        </section>
    )
}

export default Search
