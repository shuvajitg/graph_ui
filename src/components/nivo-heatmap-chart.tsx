import { ResponsiveHeatMap } from "@nivo/heatmap"

interface NivoHeatMapChartProps {
    data: any[]
    xKey: string
    yKey: string
}

export function NivoHeatMapChart({ data, xKey, yKey }: NivoHeatMapChartProps) {
    if (!data || data.length === 0 || !xKey || !yKey) {
        return (
            <div className="flex items-center justify-center h-full text-gray-500">No data available or missing axes</div>
        )
    }

    // Transform data for heatmap
    const xValues = [...new Set(data.map((item) => item[xKey]))]
    const yValues = [...new Set(data.map((item) => item[yKey]))]

    const heatmapData = xValues.map((xVal) => {
        const row: any = { id: xVal }
        yValues.forEach((yVal) => {
            const matchingItems = data.filter((item) => item[xKey] === xVal && item[yKey] === yVal)
            row[yVal] =
                matchingItems.length > 0
                    ? matchingItems.reduce((sum, item) => sum + (item.sales || 0), 0) / matchingItems.length
                    : 0
        })
        return row
    })

    return (
        <ResponsiveHeatMap
            data={heatmapData}
            keys={yValues}
            indexBy="id"
            margin={{ top: 60, right: 90, bottom: 60, left: 90 }}
            cellOpacity={1}
            cellBorderColor={{ from: "color", modifiers: [["darker", 0.8]] }}
            labelTextColor={{ from: "color", modifiers: [["darker", 1.8]] }}
            defs={[
                {
                    id: "lines",
                    type: "patternLines",
                    background: "inherit",
                    color: "rgba(0, 0, 0, 0.1)",
                    rotation: -45,
                    lineWidth: 4,
                    spacing: 7,
                },
            ]}
            colors={{
                type: "diverging",
                scheme: "red_yellow_blue",
                divergeAt: 0.5,
                minValue: 0,
                maxValue: 20000,
            }}
            axisTop={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: -90,
                legend: "",
                legendOffset: 36,
            }}
            axisRight={null}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: -90,
                legend: xKey,
                legendPosition: "middle",
                legendOffset: 36,
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: yKey,
                legendPosition: "middle",
                legendOffset: -40,
            }}
        />
    )
}
