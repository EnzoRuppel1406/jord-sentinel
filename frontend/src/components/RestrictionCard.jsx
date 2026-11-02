const RestrictionCard = ({ type, area, source, description, score, riskLevel }) => {
    const translations = {
        high: 'Alto',
        moderate: 'Moderado',
        low: 'Baixo',
    }

    const sources = {
        car_status: 'Cadastro Ambiental Rural',
        ibama: 'Ibama',
        cnuc: 'CNUC',
        funai: 'FUNAI',
        cnfp: 'CNFP - SFB',
        prodes: 'PRODES - INPE',
        quilombo: 'Quilombos - INCRA',
    }

    const restrictionTypes = {
        car_status: 'Cadastro do CAR',
        ibama: 'Embargo Ibama',
        cnuc: 'Unidade de Conservação',
        funai: 'Terra Indígena',
        cnfp: 'Floresta Pública',
        prodes: 'Alerta de Desmatamento PRODES',
        quilombo: 'Terra Quilombola',
    }
    return (
        <article className="flex h-fit w-full justify-between space-y-1 border-l-5 border-red-900 bg-slate-200 p-2 shadow-xl">
            <section className="flex w-1/2 flex-col justify-between text-left">
                <h1 className="flex justify-between font-bold uppercase">
                    {restrictionTypes[type]}
                </h1>
                <p className="flex justify-between">Fonte: {sources[source]}</p>
                <p>{description}</p>
            </section>
            <section className="w-1/2 text-right">
                <p className="font-semibold">
                    {type === 'car_status'
                        ? ''
                        : (area?.toLocaleString('pt-BR') ?? 'Sem informação')}
                    {area != null && ' ha'}
                </p>
                <p>{score} pts</p>
                <p>{translations[riskLevel]}</p>
            </section>
        </article>
    )
}

export default RestrictionCard
