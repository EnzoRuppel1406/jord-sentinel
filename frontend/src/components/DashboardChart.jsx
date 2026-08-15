import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Cell } from 'recharts'

const DashboardChart = () => {
    const restrictions = [
        { name: 'UC', overlays: 120 },
        { name: 'Ibama', overlays: 230 },
        { name: 'PRODES', overlays: 300 },
        { name: 'Floresta Publica', overlays: 90 },
        { name: 'Indigena', overlays: 278 },
        { name: 'Quilombola', overlays: 10 },
    ]

    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart responsive data={restrictions} layout="vertical">
                <YAxis dataKey="name" type="category" />
                <XAxis type="number" />
                <Tooltip />
                <Bar type="monotone" dataKey="overlays" fill="#fff" radius={[0, 10, 10, 0]}>
                    {restrictions.map((findEntryInArray, index) => {
                        let barColor = '#000'
                        if (findEntryInArray.name === 'UC') {
                            barColor = '#0000ff'
                        }
                        if (findEntryInArray.name === 'Ibama') {
                            barColor = '#ff0000'
                        }
                        if (findEntryInArray.name === 'PRODES') {
                            barColor = '#fff'
                        }
                        if (findEntryInArray.name === 'Floresta Publica') {
                            barColor = '#00ff00'
                        }
                        if (findEntryInArray.name === 'Indigena') {
                            barColor = '#8f33ff'
                        }
                        if (findEntryInArray.name === 'Quilombola') {
                            barColor = '#ff9911'
                        }

                        return <Cell key={`cell-${index}`} fill={barColor} />
                    })}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    )
}

export default DashboardChart
