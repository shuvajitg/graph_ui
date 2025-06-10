import { ResponsiveHeatMap } from '@nivo/heatmap'
import { MyResponsiveHeatMap as MyResponsiveHeatMapData } from '../data/data'
import { customTheme } from '../theme/thime'

const MyResponsiveHeatMap = () => (
    <div style={{ height: 600 }} >
        <ResponsiveHeatMap
            data={MyResponsiveHeatMapData}
            margin={{ top: 60, right: 90, bottom: 60, left: 90 }}
            valueFormat=">-.2s"
            theme={customTheme}
            axisTop={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: -90,
                legend: '',
                legendOffset: 46,
                truncateTickAt: 0
            }}
            axisRight={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'country',
                legendPosition: 'middle',
                legendOffset: 70,
                truncateTickAt: 0
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'country',
                legendPosition: 'middle',
                legendOffset: -72,
                truncateTickAt: 0
            }}
            colors={{
                type: 'diverging',
                scheme: 'red_yellow_blue',
                divergeAt: 0.5,
                minValue: -100000,
                maxValue: 100000
            }}
            emptyColor="#555555"
            legends={[
                {
                    anchor: 'bottom',
                    translateX: 0,
                    translateY: 30,
                    length: 400,
                    thickness: 8,
                    direction: 'row',
                    tickPosition: 'after',
                    tickSize: 3,
                    tickSpacing: 4,
                    tickOverlap: false,
                    tickFormat: '>-.2s',
                    title: 'Value →',
                    titleAlign: 'start',
                    titleOffset: 4
                }
            ]}
        />
    </div>
)

export default MyResponsiveHeatMap