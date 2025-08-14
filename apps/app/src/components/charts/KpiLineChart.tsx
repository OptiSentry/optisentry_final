import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts'
import { dataLogins } from './data'

export default function KpiLineChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={dataLogins} margin={{ left: 12, right: 12 }}>
        <XAxis dataKey="day" tickLine={false} axisLine={false} className="text-xs" />
        <YAxis tickLine={false} axisLine={false} className="text-xs" />
        <Tooltip cursor={{ fill: 'hsl(var(--muted))' }} />
        <Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  )
}
