import { ResponsiveCalendar } from "@nivo/calendar"

interface NivoCalendarChartProps {
    data: any[]
    xKey: string
    yKey: string
}

export function NivoCalendarChart({ data, xKey, yKey }: NivoCalendarChartProps) {
    if (!data || data.length === 0) {
        return <div className="flex items-center justify-center h-full text-gray-500">No data available</div>
    }

    try {
        // Transform data for calendar chart
        const calendarData = data
            .filter((item) => item && (item.date || item[xKey] || item[yKey]))
            .map((item, index) => ({
                day: item.date || `2024-01-${String((index % 30) + 1).padStart(2, "0")}`,
                value: typeof item[yKey || xKey] === "number" ? item[yKey || xKey] : Math.random() * 100,
            }))

        if (calendarData.length === 0) {
            return <div className="flex items-center justify-center h-full text-gray-500">No valid calendar data</div>
        }

        return (
            <ResponsiveCalendar
                data={calendarData}
                from="2024-01-01"
                to="2024-12-31"
                emptyColor="#eeeeee"
                colors={["#61cdbb", "#97e3d5", "#e8c1a0", "#f47560"]}
                margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
                yearSpacing={40}
                monthBorderColor="#ffffff"
                dayBorderWidth={2}
                dayBorderColor="#ffffff"
                legends={[
                    {
                        anchor: "bottom-right",
                        direction: "row",
                        translateY: 36,
                        itemCount: 4,
                        itemWidth: 42,
                        itemHeight: 36,
                        itemsSpacing: 14,
                        itemDirection: "right-to-left",
                    },
                ]}
            />
        )
    } catch (error) {
        return <div className="flex items-center justify-center h-full text-red-500">Error rendering calendar chart</div>
    }
}
