import { ResponsiveWaffle } from '@nivo/waffle'
import { MyResponsiveWaffle as MyResponsiveWaffleData } from '../data/data'
import { customTheme } from '../theme/thime'
import type { ColorSchemeId } from '@nivo/colors'

const MyResponsiveWaffle = ({ color }: { color: string | null }) => (
    <div style={{ height: 600 }}>
        <ResponsiveWaffle
            data={MyResponsiveWaffleData}
            total={100}
            theme={customTheme}
            rows={18}
            columns={14}
            padding={1}
            valueFormat=".2f"
            margin={{ top: 10, right: 10, bottom: 10, left: 120 }}
            colors={{ scheme: (color === null ? "nivo" : color as ColorSchemeId) }}
            borderRadius={3}
            borderColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        0.3
                    ]
                ]
            }}
            motionStagger={2}
            legends={[
                {
                    anchor: 'top-left',
                    direction: 'column',
                    justify: false,
                    translateX: -100,
                    translateY: 0,
                    itemsSpacing: 4,
                    itemWidth: 100,
                    itemHeight: 20,
                    itemDirection: 'left-to-right',
                    itemOpacity: 1,
                    itemTextColor: '#777',
                    symbolSize: 20,
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemTextColor: '#000',
                                itemBackground: '#f7fafb'
                            }
                        }
                    ]
                }
            ]}
        />
    </div>
)

export default MyResponsiveWaffle