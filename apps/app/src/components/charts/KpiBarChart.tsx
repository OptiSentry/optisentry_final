import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts'
import { dataDsar } from './data'

export default function KpiBarChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={dataDsar} margin={{ left: 12, right: 12 }}>
        <XAxis dataKey="type" tickLine={false} axisLine={false} className="text-xs" />
        <YAxis tickLine={false} axisLine={false} className="text-xs" />
        <Tooltip cursor={{ fill: 'hsl(var(--muted))' }} />
        <Bar dataKey="days" fill="hsl(var(--primary))" radius={4} />
      </BarChart>
    </ResponsiveContainer>
  )
}
