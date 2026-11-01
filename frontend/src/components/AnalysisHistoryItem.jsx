const AnalysisHistoryItem = ({ data }) => {
    const { carCode, city, state, area, propertyStatus, riskScore, riskLevel, date, consultedBy } =
        data

    const translations = {
        active: 'Ativo',
        pending: 'Pendente',
        cancelled: 'Cancelado',
        suspended: 'Suspenso',
        low: 'Baixo',
        moderate: 'Moderado',
        high: 'Alto',
    }

    return (
        <tr className="group cursor-pointer">
            <td className="border-b p-4 group-hover:bg-slate-300">{carCode}</td>
            <td className="border-b p-4 group-hover:bg-slate-300">
                {translations[propertyStatus]}
            </td>
            <td className="border-b p-4 group-hover:bg-slate-300">
                {city} / {state}
            </td>
            <td className="border-b p-4 group-hover:bg-slate-300">{area} ha</td>
            <td className="border-b p-4 group-hover:bg-slate-300">
                {riskScore != null && riskLevel
                    ? `${riskScore} | ${translations[riskLevel] ?? riskLevel}`
                    : 'Sem informação'}
            </td>
            <td className="border-b p-4 group-hover:bg-slate-300">{date}</td>
            <td className="border-b p-4 group-hover:bg-slate-300">{consultedBy}</td>
        </tr>
    )
}

export default AnalysisHistoryItem
