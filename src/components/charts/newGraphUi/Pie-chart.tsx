import { ResponsivePie } from "@nivo/pie"
import { useTheme } from "next-themes"

const data = [
    {
        id: "North America",
        label: "North America",
        value: 40,
        color: "hsl(var(--primary))",
    },
    {
        id: "Europe",
        label: "Europe",
        value: 30,
        color: "hsl(var(--secondary))",
    },
    {
        id: "Asia",
        label: "Asia",
        value: 20,
        color: "hsl(var(--accent))",
    },
    {
        id: "South America",
        label: "South America",
        value: 7,
        color: "hsl(var(--muted))",
    },
    {
        id: "Africa",
        label: "Africa",
        value: 3,
        color: "hsl(var(--destructive))",
    },
]

export default function PieChart() {
    const { resolvedTheme } = useTheme()
    const isDark = resolvedTheme === "dark"

    const textColor = isDark ? "#f8fafc" : "#334155"

    return (
        <ResponsivePie
            data={data}
            margin={{ top: 20, right: 20, bottom: 80, left: 20 }}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            activeOuterRadiusOffset={8}
            borderWidth={1}
            borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsTextColor={textColor}
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{ from: "color" }}
            arcLabelsSkipAngle={10}
            arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
            defs={[
                {
                    id: "dots",
                    type: "patternDots",
                    background: "inherit",
                    color: "rgba(255, 255, 255, 0.3)",
                    size: 4,
                    padding: 1,
                    stagger: true,
                },
                {
                    id: "lines",
                    type: "patternLines",
                    background: "inherit",
                    color: "rgba(255, 255, 255, 0.3)",
                    rotation: -45,
                    lineWidth: 6,
                    spacing: 10,
                },
            ]}
            fill={[
                { match: { id: "North America" }, id: "dots" },
                { match: { id: "Europe" }, id: "lines" },
            ]}
            theme={{
                text: {
                    fill: textColor,
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
                    anchor: "bottom",
                    direction: "row",
                    justify: false,
                    translateX: 0,
                    translateY: 56,
                    itemsSpacing: 0,
                    itemWidth: 100,
                    itemHeight: 18,
                    itemTextColor: textColor,
                    itemDirection: "left-to-right",
                    itemOpacity: 1,
                    symbolSize: 18,
                    symbolShape: "circle",
                },
            ]}
        />
    )
}
