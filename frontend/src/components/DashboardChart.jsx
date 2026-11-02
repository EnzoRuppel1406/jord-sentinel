import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Cell } from 'recharts'

const DashboardChart = ({ findings }) => {
    const categories = [
        { name: 'UC', restrictionType: 'cnuc' },
        { name: 'Ibama', restrictionType: 'ibama' },
        { name: 'PRODES', restrictionType: 'prodes' },
        { name: 'Floresta Pública', restrictionType: 'cnfp' },
        { name: 'Indígena', restrictionType: 'funai' },
        { name: 'Quilombola', restrictionType: 'quilombo' },
    ]

    const restrictions = categories.map(({ name, restrictionType }) => {
        const finding = findings.find((item) => item.restrictionType === restrictionType)

        return {
            name,
            total: finding?.total ?? 0,
        }
    })

    const BAR_COLORS = {
        UC: '#0000ff',
        Ibama: '#ff0000',
        PRODES: '#fff',
        'Floresta Pública': '#00aa00',
        Indígena: '#8f33ff',
        Quilombola: '#380e00',
    }

    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart responsive data={restrictions} layout="vertical" className="dashboard-chart">
                <YAxis dataKey="name" type="category" width={'auto'} />
                <XAxis dataKey="total" type="number" />
                <Tooltip
                    content={({ active, payload, label }) => {
                        if (!active || !payload?.length) return null

                        return (
                            <div className="rounded border-2 bg-stone-300 p-3 text-lg font-medium text-(--menu-color) shadow">
                                <p>
                                    <span className="text-xl font-semibold text-black">Tipo:</span>{' '}
                                    {label}
                                </p>
                                <p>
                                    <span className="text-xl font-semibold text-black">
                                        Restrições identificadas:
                                    </span>{' '}
                                    {payload[0].value}
                                </p>
                            </div>
                        )
                    }}
                />
                <Bar type="monotone" dataKey="total" fill="#fff" radius={[0, 10, 10, 0]}>
                    {restrictions.map((entry, index) => {
                        const barColor = BAR_COLORS[entry.name] || '#000'

                        return <Cell key={`cell-${index}`} fill={barColor} />
                    })}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    )
}

export default DashboardChart
