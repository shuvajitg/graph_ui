import { ResponsiveSwarmPlot } from '@nivo/swarmplot'
import { MyResponsiveSwarmPlot as MyResponsiveSwarmPlotData } from '../data/data'
import { customTheme } from '../theme/thime'
import type { ColorSchemeId } from '@nivo/colors'


const MyResponsiveSwarmPlot = ({ color }: { color: string | null }) => (
    <div style={{ height: 600 }}>
        <ResponsiveSwarmPlot
            data={MyResponsiveSwarmPlotData}
            groups={['group A', 'group B', 'group C']}
            theme={customTheme}
            value="price"
            colors={{ scheme: (color === null ? "nivo" : color as ColorSchemeId) }}

            valueFormat="$.2f"
            valueScale={{ type: 'linear', min: 0, max: 500, reverse: false }}
            size={{
                key: 'volume',
                values: [
                    4,
                    20
                ],
                sizes: [
                    6,
                    20
                ]
            }}
            forceStrength={4}
            simulationIterations={100}
            borderColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        0.6
                    ],
                    [
                        'opacity',
                        0.5
                    ]
                ]
            }}
            margin={{ top: 80, right: 100, bottom: 80, left: 100 }}
            axisTop={{
                tickSize: 10,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'group if vertical, price if horizontal',
                legendPosition: 'middle',
                legendOffset: -46,
                truncateTickAt: 0
            }}
            axisRight={{
                tickSize: 10,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'price if vertical, group if horizontal',
                legendPosition: 'middle',
                legendOffset: 76,
                truncateTickAt: 0
            }}
            axisBottom={{
                tickSize: 10,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'group if vertical, price if horizontal',
                legendPosition: 'middle',
                legendOffset: 46,
                truncateTickAt: 0
            }}
            axisLeft={{
                tickSize: 10,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'price if vertical, group if horizontal',
                legendPosition: 'middle',
                legendOffset: -76,
                truncateTickAt: 0
            }}
        />
    </div>
)

export default MyResponsiveSwarmPlot