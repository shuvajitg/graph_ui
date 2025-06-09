import { ResponsiveBar } from "@nivo/bar"
import { useTheme } from "next-themes"

const data = [
    {
        category: "Electronics",
        Q1: 120,
        Q2: 150,
        Q3: 180,
        Q4: 220,
    },
    {
        category: "Clothing",
        Q1: 90,
        Q2: 110,
        Q3: 130,
        Q4: 170,
    },
    {
        category: "Home",
        Q1: 70,
        Q2: 80,
        Q3: 100,
        Q4: 120,
    },
    {
        category: "Beauty",
        Q1: 50,
        Q2: 60,
        Q3: 70,
        Q4: 90,
    },
    {
        category: "Sports",
        Q1: 40,
        Q2: 50,
        Q3: 60,
        Q4: 80,
    },
]

export default function BarChart() {
    const { resolvedTheme } = useTheme()
    const isDark = resolvedTheme === "dark"

    const textColor = isDark ? "#f8fafc" : "#334155"
    const gridColor = isDark ? "#334155" : "#e2e8f0"

    return (
        <ResponsiveBar
            data={data}
            keys={["Q1", "Q2", "Q3", "Q4"]}
            indexBy="category"
            margin={{ top: 20, right: 20, bottom: 50, left: 60 }}
            padding={0.3}
            groupMode="grouped"
            valueScale={{ type: "linear" }}
            indexScale={{ type: "band", round: true }}
            colors={{ scheme: "nivo" }}
            borderRadius={4}
            borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "Category",
                legendPosition: "middle",
                legendOffset: 32,
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "Sales ($K)",
                legendPosition: "middle",
                legendOffset: -40,
            }}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
            animate={true}
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
                    dataFrom: "keys",
                    anchor: "bottom-right",
                    direction: "row",
                    justify: false,
                    translateX: 0,
                    translateY: 50,
                    itemsSpacing: 2,
                    itemWidth: 60,
                    itemHeight: 20,
                    itemDirection: "left-to-right",
                    itemOpacity: 0.85,
                    symbolSize: 20,
                    effects: [
                        {
                            on: "hover",
                            style: {
                                itemOpacity: 1,
                            },
                        },
                    ],
                },
            ]}
        />
    )
}
