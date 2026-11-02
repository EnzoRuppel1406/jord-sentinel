import { useEffect, useState } from 'react'
import DashboardChart from '../components/DashboardChart'
import Map from '../components/Map'
import Sidebar from '../components/Sidebar'
import { FileChartLine, FileExclamationPoint, LandPlot, MonitorX, X } from 'lucide-react'
import { api } from '../services/api'

const Dashboard = () => {
    const [summary, setSummary] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [errorMessage, setErrorMessage] = useState('')
    const [loadError, setLoadError] = useState(false)

    useEffect(() => {
        const summarizeAnalyses = async () => {
            try {
                const { data } = await api.get('/analyses/summary')

                setSummary(data)
            } catch (error) {
                console.log(`Deu algum erro: ${error}`)
                setLoadError(true)
                setErrorMessage(
                    error?.response?.data?.message ??
                        'Não foi possível carregar os dados da dashboard. Tente novamente.'
                )
            } finally {
                setIsLoading(false)
            }
        }

        summarizeAnalyses()
    }, [])

    return (
        <>
            <section className="flex min-h-screen w-full justify-center bg-(--main-bg) font-sans">
                {errorMessage && (
                    <div
                        className={
                            'fixed top-6 right-6 z-70 flex w-full max-w-sm items-start gap-3 rounded-xl border-2 border-red-300 bg-red-50 p-4 text-red-800 shadow-2xl'
                        }
                    >
                        <MonitorX className="mt-0.5 shrink-0 text-red-700" size={24} />

                        <div className="flex-1">
                            <p className="font-bold">Ocorreu um erro.</p>
                            <p className="text-sm">{errorMessage}</p>
                        </div>

                        <button
                            type="button"
                            aria-label="Fechar mensagem"
                            className="cursor-pointer text-red-800 hover:opacity-60"
                            onClick={() => setErrorMessage(null)}
                        >
                            <X size={20} />
                        </button>
                    </div>
                )}
                <Sidebar />
                <section className="flex w-full flex-col items-center gap-8 p-10 pl-20">
                    <section className="flex h-1/4 w-full items-center justify-between gap-6 rounded-xl">
                        <article className="flex h-full w-1/3 items-center justify-center rounded-2xl border-2 border-(--menu-color) text-[#37573F]">
                            {isLoading ? (
                                <span className="inline-flex items-center justify-center gap-2">
                                    <span
                                        className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
                                        aria-hidden="true"
                                    ></span>
                                </span>
                            ) : loadError ? (
                                <p className="text-2xl font-semibold text-(--menu-color)">
                                    Indisponível
                                </p>
                            ) : (
                                <>
                                    <span>
                                        <FileChartLine size={128} />
                                    </span>
                                    <p className="flex flex-col gap-2 text-2xl font-medium">
                                        {summary?.totalAnalyses != null ? (
                                            <>
                                                <span className="text-4xl font-bold">
                                                    {summary.totalAnalyses}
                                                </span>
                                                Consultas
                                            </>
                                        ) : (
                                            <span className="text-2xl font-semibold">
                                                Sem informação
                                            </span>
                                        )}
                                    </p>
                                </>
                            )}
                        </article>
                        <article className="flex h-full w-1/3 items-center justify-center rounded-2xl border-2 border-(--menu-color) text-[#37573F]">
                            {isLoading ? (
                                <span className="inline-flex items-center justify-center gap-2">
                                    <span
                                        className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
                                        aria-hidden="true"
                                    ></span>
                                </span>
                            ) : loadError ? (
                                <p className="text-2xl font-semibold text-(--menu-color)">
                                    Indisponível
                                </p>
                            ) : (
                                <>
                                    <span>
                                        <FileExclamationPoint size={128} />
                                    </span>
                                    <p className="flex flex-col gap-2 text-2xl font-medium">
                                        {summary?.totalFindings != null ? (
                                            <>
                                                <span className="text-4xl font-bold">
                                                    {summary.totalFindings}
                                                </span>
                                                Ocorrências de restrições
                                            </>
                                        ) : (
                                            <span className="text-2xl font-semibold">
                                                Sem informação
                                            </span>
                                        )}
                                    </p>
                                </>
                            )}
                        </article>
                        <article className="flex h-full w-1/3 items-center justify-center rounded-2xl border-2 border-(--menu-color) text-[#37573F]">
                            {isLoading ? (
                                <span className="inline-flex items-center justify-center gap-2">
                                    <span
                                        className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
                                        aria-hidden="true"
                                    ></span>
                                </span>
                            ) : loadError ? (
                                <p className="text-2xl font-semibold text-(--menu-color)">
                                    Indisponível
                                </p>
                            ) : (
                                <>
                                    <span>
                                        <LandPlot size={128} />
                                    </span>
                                    <p className="flex flex-col gap-2 text-2xl font-medium">
                                        {summary?.totalProperties != null ? (
                                            <>
                                                <span className="text-4xl font-bold">
                                                    {summary.totalProperties}
                                                </span>
                                                Imoveis
                                            </>
                                        ) : (
                                            <span className="text-2xl font-semibold">
                                                Sem informação
                                            </span>
                                        )}
                                    </p>
                                </>
                            )}
                        </article>
                    </section>
                    <section className="flex h-3/4 w-full flex-row items-center gap-6 rounded-xl border-2 border-(--menu-color) p-6">
                        <section className="flex h-full w-1/2 items-center justify-center border-(--menu-color) p-8">
                            {isLoading ? (
                                <span className="inline-flex items-center justify-center gap-2">
                                    <span
                                        className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
                                        aria-hidden="true"
                                    ></span>
                                </span>
                            ) : loadError ? (
                                <p className="text-2xl font-semibold text-(--menu-color)">
                                    Não foi possível carregar os dados do gráfico.
                                </p>
                            ) : (
                                <DashboardChart findings={summary?.findingsByRestriction ?? []} />
                            )}
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
