import { ResponsiveRadar } from "@nivo/radar"
import { useTheme } from "next-themes"

const data = [
    {
        metric: "Speed",
        "Product A": 80,
        "Product B": 90,
        "Product C": 70,
    },
    {
        metric: "Reliability",
        "Product A": 90,
        "Product B": 70,
        "Product C": 85,
    },
    {
        metric: "Comfort",
        "Product A": 70,
        "Product B": 85,
        "Product C": 90,
    },
    {
        metric: "Price",
        "Product A": 60,
        "Product B": 80,
        "Product C": 70,
    },
    {
        metric: "Efficiency",
        "Product A": 85,
        "Product B": 75,
        "Product C": 80,
    },
]

export default function RadarChart() {
    const { resolvedTheme } = useTheme()
    const isDark = resolvedTheme === "dark"

    const textColor = isDark ? "#f8fafc" : "#334155"
    const gridColor = isDark ? "#334155" : "#e2e8f0"

    return (
        <ResponsiveRadar
            data={data}
            keys={["Product A", "Product B", "Product C"]}
            indexBy="metric"
            valueFormat=">-.2f"
            margin={{ top: 20, right: 20, bottom: 40, left: 20 }}
            borderColor={{ from: "color" }}
            gridLabelOffset={36}
            dotSize={10}
            dotColor={{ theme: "background" }}
            dotBorderWidth={2}
            dotBorderColor={{ from: "color" }}
            enableDotLabel={true}
            dotLabel="value"
            dotLabelYOffset={-12}
            colors={{ scheme: "category10" }}
            blendMode="multiply"
            motionConfig="wobbly"
            theme={{
                text: {
                    fill: textColor,
                },
                grid: {
                    line: {
                        stroke: gridColor,
                    },
                },
                dots: {
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
                    anchor: "bottom",
                    direction: "row",
                    translateX: 0,
                    translateY: 40,
                    itemWidth: 80,
                    itemHeight: 20,
                    itemTextColor: textColor,
                    symbolSize: 12,
                    symbolShape: "circle",
                    effects: [
                        {
                            on: "hover",
                            style: {
                                itemTextColor: isDark ? "#f8fafc" : "#334155",
                            },
                        },
                    ],
                },
            ]}
        />
    )
}
