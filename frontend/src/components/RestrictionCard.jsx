const RestrictionCard = ({ type, area, source, classification, description }) => {
    return (
        <article className="h-full w-full space-y-1 border-l-5 border-red-900 bg-slate-200 p-2 shadow-xl">
            <h1 className="flex justify-between font-bold uppercase">
                {type}
                <span>{area.toLocaleString('pt-BR')} ha</span>
            </h1>
            <p className="flex justify-between">
                Fonte: {source} <span>{classification}</span>
            </p>
            <p>{description}</p>
        </article>
    )
}

export default RestrictionCard
