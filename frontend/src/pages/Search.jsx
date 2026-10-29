import { FileDown, FileUp, MapPin, MonitorX, SearchAlert, X } from 'lucide-react'
import Sidebar from '../components/Sidebar'
import { useEffect, useState } from 'react'
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
    const [requestMessage, setRequestMessage] = useState(null)

    useEffect(() => {
        if (!requestMessage) return

        const timeoutId = setTimeout(() => {
            setRequestMessage(null)
        }, 5000)

        return () => clearTimeout(timeoutId)
    }, [requestMessage])

    const registerSearch = async (carData) => {
        try {
            const restrictions = Object.entries(carData.restrictions ?? {}).flatMap(
                ([source, features]) =>
                    (Array.isArray(features) ? features : [])
                        .filter((feature) => feature.overlaps_property === true)
                        .map((feature) => {
                            const { geometry, ...details } = feature

                            return {
                                type: feature.source ?? source,
                                area: feature.overlap_area,
                                details: {
                                    ...details,
                                    source: feature.source ?? source,
                                },
                            }
                        })
            )

            await api.post('/analyses/create', {
                carCode: carData.property.code,
                status: carData.property.status,
                area: carData.property.area,
                city: carData.property.city,
                state: carData.property.state,
                restrictions: restrictions,
            })
        } catch (error) {
            console.error(error)
            setRequestMessage({
                type: 'warning',
                text: 'O imóvel foi encontrado, mas não foi possível salvar a análise no histórico.',
            })
        }
    }

    const handleSearch = async () => {
        setRequestMessage(null)

        if (!carCode.trim()) {
            setRequestMessage({
                type: 'warning',
                text: 'Por favor insira um codigo CAR para a busca.',
            })
            return
        }

        setIsSearching(true)

        try {
            const foundCar = await api.get(`/geospatial/${carCode}`)
            const carData = foundCar.data

            if (carData) {
                setCar(carData)
                setNotFound(false)
                await registerSearch(carData)
            } else {
                setCar(null)
                setNotFound(true)
                setSearchedCode(carCode)
                setCarCode('')
            }
            setSearchCount((prev) => prev + 1)
        } catch (error) {
            console.error(error)
            setRequestMessage({
                type: 'error',
                text: 'Não foi possível realizar a busca agora. Confira o código CAR e tente novamente.',
            })
        } finally {
            setIsSearching(false)
        }
    }

    const sourceLabels = {
        ibama: 'Embargo Ibama',
        cnuc: 'Unidade de Conservação',
        funai: 'Terra Indígena',
        cnfp: 'Floresta Pública',
        prodes: 'PRODES',
    }

    const allRestrictions = Object.entries(car?.restrictions ?? {}).flatMap(([source, features]) =>
        Array.isArray(features)
            ? features.map((feature) => ({
                  ...feature,
                  source: feature.source ?? source,
                  type: sourceLabels[source] ?? source,
                  classification:
                      feature.class_name ?? feature.main_class ?? feature.tipo ?? feature.fase_ti,
                  description:
                      feature.des_tad ??
                      feature.nome_uc ??
                      feature.terrai_nom ??
                      feature.nome ??
                      [feature.biome, feature.year].filter(Boolean).join(' — '),
              }))
            : []
    )

    const overlappingRestrictions = allRestrictions.filter(
        (restriction) => restriction.overlaps_property === true
    )

    return (
        <section className="flex min-h-screen w-full justify-center bg-(--main-bg) font-sans">
            <Sidebar />
            <section className="min-h-screen w-full p-12 pl-24">
                {requestMessage && (
                    <div
                        role={requestMessage.type === 'error' ? 'alert' : 'status'}
                        className={`fixed top-6 right-6 z-70 flex w-full max-w-sm items-start gap-3 rounded-xl border-2 ${
                            requestMessage.type === 'warning'
                                ? 'border-amber-300 bg-amber-50 text-amber-900 '
                                : 'border-red-300 bg-red-50 text-red-800'
                        } p-4 shadow-2xl`}
                    >
                        {requestMessage.type === 'warning' ? (
                            <SearchAlert className="mt-0.5 shrink-0 text-amber-500" size={24} />
                        ) : (
                            <MonitorX className="mt-0.5 shrink-0 text-red-700" size={24} />
                        )}

                        <div className="flex-1">
                            <p className="font-bold">Ocorreu um erro.</p>
                            <p className="text-sm">{requestMessage.text}</p>
                        </div>

                        <button
                            type="button"
                            aria-label="Fechar mensagem"
                            className="cursor-pointer text-red-800 hover:opacity-60"
                            onClick={() => setRequestMessage(null)}
                        >
                            <X size={20} />
                        </button>
                    </div>
                )}
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
                                    <span className="inline-flex items-center gap-1">
                                        Buscando imovel
                                        <span className="animate-bounce">.</span>
                                        <span className="animate-bounce [animation-delay:200ms]">
                                            .
                                        </span>
                                        <span className="animate-bounce [animation-delay:400ms]">
                                            .
                                        </span>
                                    </span>
                                ) : (
                                    'Buscar'
                                )}
                            </button>
                            {/* <p className="flex w-1/6 cursor-pointer gap-4 rounded-xl border-(--menu-color) bg-(--menu-color) p-2 text-(--main-bg) transition-colors duration-300 ease-in-out hover:border-2 hover:bg-stone-500">
                                <FileUp />
                                Carregar arquivo
                            </p> */}
                        </section>
                    </section>

                    {car ? (
                        <>
                            <section className="flex h-full w-full justify-between gap-3 rounded-xl border">
                                <section className="flex h-full w-1/2 flex-col gap-4 p-2">
                                    <h1 className="flex w-full justify-between p-3">
                                        Imovel Rural
                                        <span className="rounded-1 bg-lime-100 p-1 font-medium text-green-950 uppercase">
                                            {car.property.status === 'AT'
                                                ? 'Ativo'
                                                : car.property.status === 'PE'
                                                  ? 'Pendente'
                                                  : car.property.status === 'CA'
                                                    ? 'Cancelado'
                                                    : ''}
                                        </span>
                                    </h1>
                                    <section className="grid h-fit w-full grid-cols-3 gap-4 border bg-slate-200 text-center whitespace-nowrap">
                                        <h1>CAR</h1>
                                        <h1>Area (ha)</h1>
                                        <h1>Mod. Fiscais</h1>
                                        <p>{car.property.code}</p>
                                        <p>{parseFloat(car.property.area).toFixed(2)}</p>
                                        <p>{parseFloat(car.property.fiscalModules).toFixed(2)}</p>
                                        <h1>Data Criacao</h1>
                                        <h1>Ultima Retificacao</h1>
                                        <h1>Municipio</h1>
                                        <p>{car.property.createdAt}</p>
                                        <p>{car.property.rectifiedAt}</p>
                                        <p>{`${car.property.city} / ${car.property.state}`}</p>
                                    </section>
                                    <section className="flex h-fit w-full flex-col gap-2 overflow-scroll">
                                        <p className="font-semibold tracking-wider uppercase">
                                            Restricoes encontradas
                                        </p>

                                        {overlappingRestrictions.length > 0 ? (
                                            overlappingRestrictions.map((restriction, index) => (
                                                <RestrictionCard
                                                    key={`${restriction.source}-${index}`}
                                                    type={restriction.type}
                                                    area={restriction.overlap_area}
                                                    source={restriction.source}
                                                    classification={restriction.classification}
                                                    description={restriction.description}
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
                                                ? car.evaluation.status
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
                                            {car.property.centroid.latitude},{' '}
                                            {car.property.centroid.longitude}
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
                                lat={car.property.centroid.latitude}
                                long={car.property.centroid.longitude}
                                carGeometry={car.property.geometry.coordinates}
                                restrictionGeometry={
                                    car.restrictions?.geometry?.coordinates ?? null
                                }
                                restrictions={allRestrictions}
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
