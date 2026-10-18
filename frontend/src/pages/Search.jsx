import { FileDown, FileUp, MapPin } from 'lucide-react'
import Sidebar from '../components/Sidebar'
import { useState } from 'react'
import RestrictionCard from '../components/RestrictionCard'
import AnalisysMap from '../components/AnalysisMap'
import Map from '../components/Map'
import { api } from '../services/api'

const Search = () => {
    const [carCode, setCarCode] = useState('')
    const [car, setCar] = useState(null)
    const [searchCount, setSearchCount] = useState(0)
    const [notFound, setNotFound] = useState(false)
    const [searchedCode, setSearchedCode] = useState('')
    const [isSearching, setIsSearching] = useState(false)

    const registerSearch = async (carData) => {
        try {
            await api.post('/analyses', {
                carCode: carData.code,
                status: carData.status,
                restrictions: carData.restrictions ?? [],
            })
        } catch (error) {
            console.error('Status:', error.response?.status)
            console.error('Resposta do backend:', error.response?.data)
            console.error('Erro completo:', error)
        }
    }

    const handleSearch = async () => {
        if (isSearching || !carCode.trim()) return

        setIsSearching(true)

        try {
            const foundCar = await api.get(`/geospatial/${carCode}`)
            const carData = foundCar.data

            if (carData) {
                setCar(carData)
                setNotFound(false)
                registerSearch(carData)
            } else {
                setCar(null)
                setNotFound(true)
                setSearchedCode(carCode)
                setCarCode('')
            }
            setSearchCount((prev) => prev + 1)
        } finally {
            setIsSearching(false)
        }
    }

    return (
        <section className="flex min-h-screen w-full justify-center bg-(--main-bg) font-sans">
            <Sidebar />
            <section className="h-screen w-full p-12 pl-24">
                <section className="flex h-full w-full flex-col gap-5 p-4">
                    <section className="h-fit w-full rounded-xl border border-(--menu-color) p-6">
                        <p className="font-bold tracking-wider text-(--menu-color) uppercase">
                            Consulta Cadastro Ambiental Rural
                        </p>
                        <section className="flex gap-4">
                            <input
                                type="text"
                                name="searchbar"
                                id="searchbar"
                                value={carCode}
                                placeholder="Insira o coodigo CAR"
                                onChange={(event) => setCarCode(event.target.value)}
                                className={`w-2/3 rounded-xl border-2 bg-slate-100 text-center outline-0 focus:border-emerald-600 ${car ? 'border-(--menu-color)' : 'border-red-500'}`}
                            />
                            <button
                                type="submit"
                                onClick={handleSearch}
                                disabled={isSearching}
                                className="w-1/6 cursor-pointer rounded-xl border-(--menu-color) bg-(--menu-color) p-2 text-(--main-bg) transition-colors duration-300 ease-in-out hover:border-2 hover:bg-stone-500"
                            >
                                {isSearching ? (
                                    <span className="inline-flex items-center justify-center gap-2">
                                        <span
                                            className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
                                            aria-hidden="true"
                                        ></span>
                                    </span>
                                ) : (
                                    'Buscar'
                                )}
                            </button>
                            <p className="flex w-1/6 cursor-pointer gap-4 rounded-xl border-(--menu-color) bg-(--menu-color) p-2 text-(--main-bg) transition-colors duration-300 ease-in-out hover:border-2 hover:bg-stone-500">
                                <FileUp />
                                Carregar arquivo
                            </p>
                        </section>
                    </section>

                    {car ? (
                        <>
                            <section className="flex h-full w-full justify-between gap-3 rounded-xl border">
                                <section className="flex h-full w-1/2 flex-col gap-4 p-2">
                                    <h1 className="flex w-full justify-between p-3">
                                        Imovel Rural
                                        <span className="rounded-1 bg-lime-100 p-1 font-medium text-green-950 uppercase">
                                            {car.status === 'AT'
                                                ? 'Ativo'
                                                : car.status === 'PE'
                                                  ? 'Pendente'
                                                  : car.status === 'CA'
                                                    ? 'Cancelado'
                                                    : ''}
                                        </span>
                                    </h1>
                                    <section className="grid h-fit w-full grid-cols-3 gap-4 border bg-slate-200 text-center whitespace-nowrap">
                                        <h1>CAR</h1>
                                        <h1>Area (ha)</h1>
                                        <h1>Mod. Fiscais</h1>
                                        <p>{car.code}</p>
                                        <p>{parseInt(car.area)}</p>
                                        <p>{parseInt(car.fiscalModules)}</p>
                                        <h1>Data Criacao</h1>
                                        <h1>Ultima Retificacao</h1>
                                        <h1>Municipio</h1>
                                        <p>{car.createdAt}</p>
                                        <p>{car.rectifiedAt}</p>
                                        <p>{`${car.city} / ${car.state}`}</p>
                                    </section>
                                    <section className="flex h-fit w-full flex-col gap-2">
                                        <p className="font-semibold tracking-wider uppercase">
                                            Restricoes encontradas
                                        </p>

                                        {Array.isArray(car.restrictions) &&
                                        car.restrictions.length > 0 ? (
                                            car.restrictions.map((restriction, index) => (
                                                <RestrictionCard
                                                    key={`${restriction.type}-${index}`}
                                                    type={restriction.type}
                                                    area={restriction.area}
                                                    source={restriction.source}
                                                    classification={
                                                        restriction.details?.classification
                                                    }
                                                    description={restriction.details?.description}
                                                />
                                            ))
                                        ) : (
                                            <p className="rounded-lg bg-slate-100 p-4 text-sm text-slate-600">
                                                Nenhuma restrição encontrada para este imóvel.
                                            </p>
                                        )}
                                    </section>
                                </section>
                                <section className="flex h-full w-1/2 flex-col gap-4 p-4">
                                    <section className="h-fit w-1/2 bg-[#7fc588] p-2">
                                        <h2 className="font-light uppercase">
                                            Parecer consolidado
                                        </h2>
                                        <h1 className="font-bold tracking-widest text-amber-700 uppercase">
                                            {car?.evaluation?.status
                                                ? car.evalutaion.status
                                                : 'Inconclusivo'}
                                        </h1>
                                        <p>
                                            {car?.evaluation?.description
                                                ? car.evaluation.description
                                                : 'Sem informacao'}
                                        </p>
                                        <p className="w-fit border border-amber-600 bg-orange-200 p-1 font-medium tracking-wide">
                                            {car?.evaluation?.reference
                                                ? car.evaluation.reference
                                                : 'Consulte o MCR para saber mais'}
                                        </p>
                                    </section>
                                    <section className="flex w-1/2 flex-col bg-[#7fc588] p-2">
                                        <p className="flex">
                                            <span>
                                                <MapPin />
                                            </span>
                                            Coordenadas do centroide
                                        </p>
                                        <p className="font-semibold">
                                            {car.centroid.latitude}, {car.centroid.longitude}
                                        </p>
                                    </section>
                                    <section className="flex w-1/2 cursor-pointer flex-col border-slate-950 bg-[#7fc588] p-2 hover:border-2 hover:bg-slate-200">
                                        <h1 className="flex font-semibold">
                                            <span>
                                                <FileDown />
                                            </span>
                                            Gerar laudo em pdf
                                        </h1>
                                        <p className="text-xs font-light uppercase">
                                            Documento consolidado apresentando os resultados da
                                            consulta
                                        </p>
                                    </section>
                                </section>
                            </section>
                        </>
                    ) : notFound ? (
                        <section className="flex h-40 w-full items-center justify-center rounded-xl border border-red-200 bg-red-50 p-6 text-center text-red-700">
                            <div>
                                <p className="text-lg font-bold">CAR não encontrado</p>
                                <p className="text-sm">
                                    Nenhum registro localizado para o código:
                                    <strong>{searchedCode}</strong>
                                </p>
                            </div>
                        </section>
                    ) : (
                        <section className="flex h-40 w-full items-center justify-center rounded-xl border border-dashed border-stone-300 p-6 text-stone-500">
                            <p>Insira um código no campo acima e clique em "Buscar".</p>
                        </section>
                    )}
                    <section className="h-full w-full border-2">
                        {car ? (
                            <AnalisysMap
                                lat={car.centroid.latitude}
                                long={car.centroid.longitude}
                                carGeometry={car.geometry.coordinates}
                                restrictionGeometry={
                                    car.restrictions?.[0]?.geometry?.coordinates ?? null
                                }
                                restrictions={
                                    Array.isArray(car.restrictions) ? car.restrictions : []
                                }
                                searchTrigger={searchCount}
                            />
                        ) : (
                            <Map />
                        )}
                    </section>
                </section>
            </section>
        </section>
    )
}

export default Search
