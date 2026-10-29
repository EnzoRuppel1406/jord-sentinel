import { Funnel } from 'lucide-react'
import Sidebar from '../components/Sidebar'
import AnalysisHistoryItem from '../components/AnalysisHistoryItem'
import { useEffect, useState } from 'react'
import { api } from '../services/api'

const History = () => {
    const [analyses, setanalyses] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [appliedSearchTerm, setAppliedSearchTerm] = useState('')
    const [statusFilter, setStatusFilter] = useState('')
    const [showFilters, setShowFilters] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [loadError, setLoadError] = useState('')

    useEffect(() => {
        const loadAnalyses = async () => {
            try {
                const { data } = await api.get('/analyses/list')

                setanalyses(data)
                setLoadError('')
            } catch (error) {
                console.log(`Erro ao buscar dados ${error}`)
                setLoadError('Não foi possível carregar o histórico. Tente novamente mais tarde.')
            } finally {
                setIsLoading(false)
            }
        }

        loadAnalyses()
    }, [])

    const filteredAnalyses = analyses.filter((analysis) => {
        const matchesSearch = analysis.carCode
            .toLowerCase()
            .includes(appliedSearchTerm.toLowerCase())

        const matchStatuses = statusFilter === '' || analysis.status === statusFilter

        return matchesSearch && matchStatuses
    })

    const clearSearch = () => {
        setSearchTerm('')
        setAppliedSearchTerm('')
        setStatusFilter('')
        document.getElementById('searchbar').value = ''
    }

    const hasActiveFilters = Boolean(appliedSearchTerm || statusFilter)

    const emptyMessage =
        analyses.length === 0
            ? 'Você ainda não possui análises registradas.'
            : hasActiveFilters
              ? 'Nenhuma análise encontrada com os filtros selecionados. Tente ajustar ou limpar os filtros.'
              : 'Nenhuma análise encontrada.'

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
                            onChange={(event) => setSearchTerm(event.target.value)}
                        />
                        <button
                            type="button"
                            className="h-1/2 w-2/6 cursor-pointer rounded-xl bg-(--menu-color) text-(--main-bg) transition-colors duration-300 ease-in-out hover:border-2 hover:bg-stone-500"
                            onClick={() => setAppliedSearchTerm(searchTerm.trim())}
                        >
                            Buscar
                        </button>
                        <button
                            type="button"
                            className="h-1/2 w-2/6 cursor-pointer rounded-xl bg-(--menu-color) text-(--main-bg) transition-colors duration-300 ease-in-out hover:border-2 hover:bg-stone-500"
                            onClick={clearSearch}
                        >
                            Limpar
                        </button>
                        <div className="relative h-1/2 w-1/6">
                            <button
                                type="button"
                                className={`flex h-full w-full cursor-pointer items-center justify-center gap-2 bg-(--menu-color) text-(--main-bg) transition-colors hover:bg-stone-500 ${
                                    showFilters ? 'rounded-t-2xl rounded-b-none' : 'rounded-2xl'
                                }`}
                                onClick={() => setShowFilters((visible) => !visible)}
                            >
                                Filtrar
                                <Funnel size={24} />
                            </button>

                            {showFilters && (
                                <div className="absolute top-full left-0 z-20 w-full overflow-hidden rounded-b-2xl border-2 border-t-0 border-(--menu-color) bg-(--menu-color) text-(--main-bg) shadow-lg">
                                    {[
                                        { value: '', label: 'Todos os riscos' },
                                        { value: 'free', label: 'Livre' },
                                        { value: 'conditional', label: 'Condicional' },
                                        { value: 'restricted', label: 'Restrito' },
                                    ].map((option) => (
                                        <button
                                            key={option.value || 'all'}
                                            type="button"
                                            className="block w-full px-3 py-2 text-left hover:bg-stone-500"
                                            onClick={() => {
                                                setStatusFilter(option.value)
                                                setShowFilters(false)
                                            }}
                                        >
                                            {option.label}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </section>
                    {isLoading ? (
                        <section className="flex h-5/6 w-full items-center justify-center rounded-xl border bg-olive-300 text-center">
                            <span className="inline-flex items-center gap-1">
                                Carregando análises
                                <span className="animate-bounce">.</span>
                                <span className="animate-bounce [animation-delay:200ms]">.</span>
                                <span className="animate-bounce [animation-delay:400ms]">.</span>
                            </span>
                        </section>
                    ) : loadError ? (
                        <section className="flex h-5/6 w-full items-center justify-center rounded-xl border bg-olive-300 text-center">
                            <p className="w-full text-center">{loadError}</p>
                        </section>
                    ) : filteredAnalyses.length ? (
                        <section className="flex max-h-5/6 min-h-fit w-full items-center justify-center overflow-y-auto rounded-xl border bg-olive-300 text-center">
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
                                    {filteredAnalyses.map((analysis) => {
                                        const data = { ...analysis }

                                        return <AnalysisHistoryItem key={data.key} data={data} />
                                    })}
                                </tbody>
                            </table>
                        </section>
                    ) : (
                        <section className="flex h-5/6 w-full items-center justify-center rounded-xl border bg-olive-300 text-center">
                            <p className="w-full text-center">{emptyMessage}</p>
                        </section>
                    )}
                </section>
            </section>
        </section>
    )
}

export default History
