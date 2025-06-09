import { ResponsiveLine } from "@nivo/line"
import { useTheme } from "next-themes"

const data = [
    {
        id: "Revenue",
        color: "hsl(var(--primary))",
        data: [
            { x: "Jan", y: 120 },
            { x: "Feb", y: 170 },
            { x: "Mar", y: 160 },
            { x: "Apr", y: 190 },
            { x: "May", y: 220 },
            { x: "Jun", y: 250 },
            { x: "Jul", y: 280 },
            { x: "Aug", y: 260 },
            { x: "Sep", y: 300 },
            { x: "Oct", y: 320 },
            { x: "Nov", y: 290 },
            { x: "Dec", y: 350 },
        ],
    },
    {
        id: "Profit",
        color: "hsl(var(--secondary))",
        data: [
            { x: "Jan", y: 50 },
            { x: "Feb", y: 80 },
            { x: "Mar", y: 70 },
            { x: "Apr", y: 90 },
            { x: "May", y: 100 },
            { x: "Jun", y: 120 },
            { x: "Jul", y: 140 },
            { x: "Aug", y: 130 },
            { x: "Sep", y: 150 },
            { x: "Oct", y: 160 },
            { x: "Nov", y: 140 },
            { x: "Dec", y: 180 },
        ],
    },
]

export default function LineChart() {
    const { resolvedTheme } = useTheme()
    const isDark = resolvedTheme === "dark"

    const textColor = isDark ? "#f8fafc" : "#334155"
    const gridColor = isDark ? "#334155" : "#e2e8f0"

    return (
        <ResponsiveLine
            data={data}
            margin={{ top: 20, right: 20, bottom: 50, left: 60 }}
            xScale={{ type: "point" }}
            yScale={{
                type: "linear",
                min: "auto",
                max: "auto",
                stacked: false,
                reverse: false,
            }}
            curve="cardinal"
            axisTop={null}
            axisRight={null}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "Month",
                legendOffset: 36,
                legendPosition: "middle",
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "Amount ($K)",
                legendOffset: -40,
                legendPosition: "middle",
            }}
            colors={{ scheme: "category10" }}
            lineWidth={3}
            pointSize={8}
            pointColor={{ theme: "background" }}
            pointBorderWidth={2}
            pointBorderColor={{ from: "serieColor" }}
            pointLabelYOffset={-12}
            useMesh={true}
            enableSlices="x"
            theme={{
                axis: {
                    domain: {
                        line: {
                            stroke: textColor,
                        },
                    },
                    ticks: {
                        line: {
                            stroke: textColor,
                        },
                        text: {
                            fill: textColor,
                        },
                    },
                    legend: {
                        text: {
                            fill: textColor,
                        },
                    },
                },
                grid: {
                    line: {
                        stroke: gridColor,
                    },
                },
                legends: {
                    text: {
                        fill: textColor,
                    },
                },
                tooltip: {
                    container: {
                        background: isDark ? "#1e293b" : "#ffffff",
                        color: textColor,
                    },
                },
            }}
            legends={[
                {
                    anchor: "bottom-right",
                    direction: "row",
                    justify: false,
                    translateX: 0,
                    translateY: 50,
                    itemsSpacing: 0,
                    itemDirection: "left-to-right",
                    itemWidth: 80,
                    itemHeight: 20,
                    itemOpacity: 0.75,
                    symbolSize: 12,
                    symbolShape: "circle",
                    symbolBorderColor: "rgba(0, 0, 0, .5)",
                    effects: [
                        {
                            on: "hover",
                            style: {
                                itemBackground: "rgba(0, 0, 0, .03)",
                                itemOpacity: 1,
                            },
                        },
                    ],
                },
            ]}
            motionConfig="stiff"
        />
    )
}
