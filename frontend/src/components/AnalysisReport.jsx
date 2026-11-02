import jordLogo from '../assets/jord_sentinel_logo.svg'

const AnalysisReport = ({ car }) => {
    const restrictionLabels = {
        ibama: 'Embargo Ibama',
        cnuc: 'Unidade de Conservação',
        funai: 'Terra Indígena',
        cnfp: 'Floresta Pública',
        prodes: 'PRODES',
        quilombo: 'Quilombos',
    }

    const statusLabels = {
        AT: 'Ativo',
        PE: 'Pendente',
        CA: 'Cancelado',
        SU: 'Suspenso',
    }

    const riskLabels = {
        low: 'Baixo',
        moderate: 'Moderado',
        high: 'Alto',
    }

    const riskStyles = {
        low: 'border-emerald-700 bg-emerald-50 text-emerald-950',
        moderate: 'border-amber-600 bg-amber-50 text-amber-950',
        high: 'border-red-700 bg-red-50 text-red-950',
    }

    const levelStyles = {
        low: 'bg-emerald-100 text-emerald-900',
        moderate: 'bg-amber-100 text-amber-900',
        high: 'bg-red-100 text-red-900',
    }

    const formatNumber = (value, decimals = 2) => {
        if (value == null || value === '') return 'Sem informação'

        const number = Number(value)
        if (Number.isNaN(number)) return 'Sem informação'

        return number.toLocaleString('pt-BR', {
            minimumFractionDigits: 0,
            maximumFractionDigits: decimals,
        })
    }

    const formatArea = (value) => (value == null ? 'Sem informação' : `${formatNumber(value)} ha`)

    const formatDate = (value) => {
        if (!value) return 'Sem informação'

        const text = String(value)
        const dateOnly = text.match(/^(\d{4})-(\d{2})-(\d{2})$/)

        if (dateOnly) {
            return `${dateOnly[3]}/${dateOnly[2]}/${dateOnly[1]}`
        }

        const date = new Date(value)
        return Number.isNaN(date.getTime()) ? text : date.toLocaleDateString('pt-BR')
    }

    if (!car?.property) return null

    const { property, risk } = car
    const assessments = risk?.assessments ?? []

    const restrictionAssessments = assessments.filter(
        (item) => item.restrictionType !== 'car_status'
    )

    const carStatusAssessment = assessments.find((item) => item.restrictionType === 'car_status')

    const riskStyle = riskStyles[risk?.riskLevel] ?? 'border-slate-500 bg-slate-50 text-slate-900'

    return (
        <article className="mx-auto hidden w-full max-w-[210mm] bg-white p-10 font-sans text-slate-800 print:mx-0 print:block print:w-full print:max-w-none print:p-0 print:text-[11px]">
            <header className="flex items-start justify-between border-b-4 border-emerald-950 pb-5">
                <div className="flex items-center justify-start gap-4">
                    <div className="flex h-full w-40 shrink-0 items-center justify-center rounded-2xl bg-(--menu-color) p-2">
                        <img
                            src={jordLogo}
                            alt="Jörð Sentinel"
                            className="h-full w-full rounded-2xl object-contain"
                        />
                    </div>

                    <div>
                        <p className="text-xs font-bold tracking-[0.2em] text-emerald-900 uppercase">
                            Jörð Sentinel · Análise territorial
                        </p>

                        <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">
                            Laudo socioambiental
                        </h1>

                        <p className="mt-1 text-sm text-slate-500">
                            Análise indicativa de imóvel rural
                        </p>
                    </div>
                </div>

                <div className="mt-5 mr-2 rounded-lg border border-(--menu-color) p-2 text-left text-sm text-slate-500">
                    <p>Emitido em</p>
                    <p className="mt-1 font-semibold text-slate-800">
                        {new Date().toLocaleString('pt-BR')}
                    </p>
                </div>
            </header>

            <section className={`mt-6 rounded-xl border-l-8 p-5 ${riskStyle}`}>
                <p className="text-xs font-bold tracking-widest uppercase">
                    Nível indicativo de risco
                </p>

                <div className="mt-2 flex items-end justify-between gap-4">
                    <h2 className="text-3xl font-bold">
                        {riskLabels[risk?.riskLevel] ?? 'Inconclusivo'}
                    </h2>

                    <p className="text-sm">
                        Pontuação:{' '}
                        <strong className="text-xl">{risk?.score ?? 'Sem informação'}</strong>
                    </p>
                </div>

                <p className="mt-2 text-xs">
                    A pontuação é um indicador do sistema, não um percentual de aprovação.
                </p>
            </section>

            <section className="mt-8">
                <h2 className="border-b border-emerald-950 pb-2 text-sm font-bold tracking-widest text-emerald-950 uppercase">
                    Identificação do imóvel
                </h2>

                <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="rounded-lg border border-(--menu-color) p-3">
                        <p className="text-xs text-slate-500 uppercase">Código CAR</p>
                        <p className="mt-1 font-semibold break-all">{property.code}</p>
                    </div>

                    <div className="rounded-lg border border-(--menu-color) p-3">
                        <p className="text-xs text-slate-500 uppercase">Situação cadastral</p>
                        <p className="mt-1 font-semibold">
                            {statusLabels[property.status] ?? property.status ?? 'Sem informação'}
                        </p>
                    </div>

                    <div className="rounded-lg border border-(--menu-color) p-3">
                        <p className="text-xs text-slate-500 uppercase">Área declarada</p>
                        <p className="mt-1 font-semibold">{formatArea(property.area)}</p>
                    </div>

                    <div className="rounded-lg border border-(--menu-color) p-3">
                        <p className="text-xs text-slate-500 uppercase">Município / UF</p>
                        <p className="mt-1 font-semibold">
                            {property.city || 'Sem informação'} / {property.state || '—'}
                        </p>
                    </div>

                    <div className="rounded-lg border border-(--menu-color) p-3">
                        <p className="text-xs text-slate-500 uppercase">Módulos fiscais</p>
                        <p className="mt-1 font-semibold">{formatNumber(property.fiscalModules)}</p>
                    </div>

                    <div className="rounded-lg border border-(--menu-color) p-3">
                        <p className="text-xs text-slate-500 uppercase">Cadastro criado</p>
                        <p className="mt-1 font-semibold">{formatDate(property.createdAt)}</p>
                    </div>

                    <div className="rounded-lg border border-(--menu-color) p-3">
                        <p className="text-xs text-slate-500 uppercase">Última retificação</p>
                        <p className="mt-1 font-semibold">{formatDate(property.rectifiedAt)}</p>
                    </div>

                    <div className="rounded-lg border border-(--menu-color) p-3">
                        <p className="text-xs text-slate-500 uppercase">Centroide</p>
                        <p className="mt-1 font-semibold">
                            {property.centroid
                                ? `${formatNumber(property.centroid.latitude, 6)}, ${formatNumber(property.centroid.longitude, 6)}`
                                : 'Sem informação'}
                        </p>
                    </div>
                </div>
            </section>

            {carStatusAssessment && (
                <section className="mt-8 rounded-lg border border-(--menu-color) p-4 print:break-inside-avoid">
                    <h2 className="text-sm font-bold tracking-widest text-emerald-950 uppercase">
                        Situação cadastral considerada
                    </h2>
                    <p className="mt-2 leading-relaxed">{carStatusAssessment.description}</p>
                    <p className="mt-2 text-xs text-slate-500">
                        Referência: {carStatusAssessment.legalReference}
                    </p>
                </section>
            )}

            <section className="mt-8">
                <div className="flex items-end justify-between border-b border-emerald-950 pb-2">
                    <h2 className="text-sm font-bold tracking-widest text-emerald-950 uppercase">
                        Restrições sobrepostas
                    </h2>
                    <p className="text-xs text-slate-500">
                        {restrictionAssessments.length}{' '}
                        {restrictionAssessments.length === 1 ? 'ocorrência' : 'ocorrências'}
                    </p>
                </div>

                {restrictionAssessments.length > 0 ? (
                    <div className="mt-4 space-y-3">
                        {restrictionAssessments.map((item, index) => (
                            <article
                                className="rounded-lg border border-(--menu-color) p-4 print:break-inside-avoid"
                                key={`${item.restrictionType}-${index}`}
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
                                            {restrictionLabels[item.restrictionType] ??
                                                item.restrictionType}
                                        </p>
                                        <h3 className="mt-1 text-base font-bold text-slate-950">
                                            {item.description}
                                        </h3>
                                    </div>

                                    <span
                                        className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold uppercase ${
                                            levelStyles[item.level] ?? 'bg-slate-100 text-slate-800'
                                        }`}
                                    >
                                        {riskLabels[item.level] ?? item.level ?? 'Sem nível'}
                                    </span>
                                </div>

                                <div className="mt-4 grid grid-cols-2 gap-3 border-t border-(--menu-color) pt-3">
                                    <div>
                                        <p className="text-xs text-slate-500 uppercase">
                                            Área sobreposta
                                        </p>
                                        <p className="mt-1 font-semibold">
                                            {formatArea(item.overlapArea)}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xs text-slate-500 uppercase">
                                            Pontuação atribuída
                                        </p>
                                        <p className="mt-1 font-semibold">
                                            {item.score ?? 'Sem informação'}
                                        </p>
                                    </div>

                                    <div className="col-span-2">
                                        <p className="text-xs text-slate-500 uppercase">
                                            Referência considerada
                                        </p>
                                        <p className="mt-1 font-semibold">
                                            {item.legalReference ?? 'Sem informação'}
                                        </p>
                                    </div>

                                    {item.imageDate && (
                                        <div className="col-span-2">
                                            <p className="text-xs text-slate-500 uppercase">
                                                Data da imagem
                                            </p>
                                            <p className="mt-1 font-semibold">
                                                {formatDate(item.imageDate)}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </article>
                        ))}
                    </div>
                ) : (
                    <p className="mt-4 rounded-lg border border-(--menu-color) p-4 text-slate-600">
                        Nenhuma sobreposição foi identificada nas bases consultadas para este
                        imóvel.
                        {carStatusAssessment &&
                            ' A situação cadastral descrita acima foi considerada separadamente na avaliação.'}
                    </p>
                )}
            </section>

            <section className="mt-8 print:break-inside-avoid">
                <h2 className="border-b border-emerald-950 pb-2 text-sm font-bold tracking-widest text-emerald-950 uppercase">
                    Bases consultadas
                </h2>

                <div className="mt-3 flex flex-wrap gap-2">
                    {Object.values(restrictionLabels).map((source) => (
                        <span
                            className="rounded-full border border-emerald-950 px-3 py-1 text-xs font-medium"
                            key={source}
                        >
                            {source}
                        </span>
                    ))}
                </div>
                <p className="mt-3 text-xs text-slate-500">
                    Raio de busca de ocorrências próximas: 10 km.
                </p>
            </section>

            <section className="mt-8 rounded-lg bg-slate-50 p-4 print:break-inside-avoid">
                <h2 className="text-sm font-bold tracking-widest text-emerald-950 uppercase">
                    Limitações da análise
                </h2>
                <p className="mt-2 leading-relaxed text-slate-700">
                    Este relatório apresenta uma triagem indicativa baseada nos dados disponíveis
                    nas bases consultadas na data da análise. A ausência de ocorrência não comprova
                    a inexistência de restrições. O resultado não substitui a conferência dos
                    documentos do imóvel, análise técnica ou jurídica, e não representa decisão de
                    concessão de crédito.
                </p>
            </section>

            <footer className="mt-10 border-t border-emerald-950 pt-3 text-xs text-slate-500">
                <p>
                    Documento gerado pelo Jörð Sentinel a partir das informações retornadas pela
                    consulta do CAR.
                </p>
            </footer>
        </article>
    )
}

export default AnalysisReport
