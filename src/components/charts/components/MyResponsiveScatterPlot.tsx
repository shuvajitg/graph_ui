import { ResponsiveScatterPlot } from '@nivo/scatterplot'
import { MyResponsiveScatterPlot as MyResponsiveScatterPlotData } from '../data/data'
import { customTheme } from '../theme/thime'
import type { ColorSchemeId } from '@nivo/colors'

const MyResponsiveScatterPlot = ({ color }: { color: string | null }) => (
    <div style={{ height: 600 }}>
        <ResponsiveScatterPlot
            data={MyResponsiveScatterPlotData}
            margin={{ top: 60, right: 140, bottom: 70, left: 90 }}
            theme={customTheme}
            xScale={{ type: 'linear', min: 0, max: 'auto' }}
            xFormat=">-.2f"
            yScale={{ type: 'linear', min: 0, max: 'auto' }}
            yFormat=">-.2f"
            blendMode="multiply"
            colors={{ scheme: (color === null ? "nivo" : color as ColorSchemeId) }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'weight',
                legendPosition: 'middle',
                legendOffset: 46,
                truncateTickAt: 0
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'size',
                legendPosition: 'middle',
                legendOffset: -60,
                truncateTickAt: 0
            }}
            legends={[
                {
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: 130,
                    translateY: 0,
                    itemWidth: 100,
                    itemHeight: 12,
                    itemsSpacing: 5,
                    itemDirection: 'left-to-right',
                    symbolSize: 12,
                    symbolShape: 'circle',
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemOpacity: 1
                            }
                        }
                    ]
                }
            ]}
        />
    </div>
)

export default MyResponsiveScatterPlot