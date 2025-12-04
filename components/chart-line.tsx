"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

interface ChartLineProps {
  data: Record<string, any>[]
  dataKeys: { key: string; stroke: string; name: string }[]
  title?: string
}

export function ChartLine({ data, dataKeys, title }: ChartLineProps) {
  return (
    <div className="bg-white rounded-lg p-6 card-shadow">
      {title && <h3 className="font-semibold text-[#0F172A] mb-4">{title}</h3>}
      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid stroke="#E2E8F0" />
            <XAxis stroke="#64748B" />
            <YAxis stroke="#64748B" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0F172A",
                border: "none",
                borderRadius: "8px",
                color: "#fff",
              }}
            />
            <Legend />
            {dataKeys.map(({ key, stroke, name }) => (
              <Line key={key} type="monotone" dataKey={key} stroke={stroke} name={name} strokeWidth={2} dot={false} />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
