const AnalysisHistoryItem = ({ data }) => {
    const { carCode, city, state, area, status, date, consultedBy } = data

    return (
        <tr className="group cursor-pointer">
            <td className="border-b p-4 group-hover:bg-slate-300">{carCode}</td>
            <td className="border-b p-4 group-hover:bg-slate-300">
                {city} / {state}
            </td>
            <td className="border-b p-4 group-hover:bg-slate-300">
                {area.toLocaleString('pt-BR')} ha
            </td>
            <td className="border-b p-4 group-hover:bg-slate-300">{status}</td>
            <td className="border-b p-4 group-hover:bg-slate-300">{date}</td>
            <td className="border-b p-4 group-hover:bg-slate-300">{consultedBy}</td>
        </tr>
    )
}

export default AnalysisHistoryItem
