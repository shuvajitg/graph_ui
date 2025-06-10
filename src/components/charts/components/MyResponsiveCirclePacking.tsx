import { ResponsiveCirclePacking } from '@nivo/circle-packing'
import { MyResponsiveCirclePacking as MyResponsiveCirclePackingData } from '../data/data'
import { customTheme } from '../theme/thime'
import type { ColorSchemeId } from '@nivo/colors'

const MyResponsiveCirclePacking = ({ color }: { color: string | null }) => (
    <div style={{ height: 600 }}>
        <ResponsiveCirclePacking
            data={MyResponsiveCirclePackingData}
            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
            theme={customTheme}
            id="name"
            value="loc"
            colors={{ scheme: (color === null ? "nivo" : color as ColorSchemeId) }}
            childColor={{
                from: 'color',
                modifiers: [
                    [
                        'brighter',
                        0.4
                    ]
                ]
            }}
            padding={4}
            enableLabels={true}
            labelsFilter={n => 2 === n.node.depth}
            labelsSkipRadius={10}
            labelTextColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        2
                    ]
                ]
            }}
            borderWidth={1}
            borderColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        0.5
                    ]
                ]
            }}
            defs={[
                {
                    id: 'lines',
                    type: 'patternLines',
                    background: 'none',
                    color: 'inherit',
                    rotation: -45,
                    lineWidth: 5,
                    spacing: 8
                }
            ]}
            fill={[
                {
                    match: {
                        depth: 1
                    },
                    id: 'lines'
                }
            ]}
        />
    </div>

)

export default MyResponsiveCirclePacking