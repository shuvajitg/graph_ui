import { ResponsiveTreeMap } from '@nivo/treemap'
import { MyResponsiveTreeMap as MyResponsiveTreeMapData } from '../data/data'
import { customTheme } from '../theme/thime'
import type { ColorSchemeId } from '@nivo/colors'

const MyResponsiveTreeMap = ({ color }: { color: string | null }) => (
    <div style={{ height: 600 }}>
        <ResponsiveTreeMap
            data={MyResponsiveTreeMapData}
            theme={customTheme}
            identity="name"
            colors={{ scheme: (color === null ? "nivo" : color as ColorSchemeId) }}
            value="loc"
            valueFormat=".02s"
            margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
            labelSkipSize={12}
            labelTextColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        1.2
                    ]
                ]
            }}
            parentLabelPosition="left"
            parentLabelTextColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        2
                    ]
                ]
            }}
            borderColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        0.1
                    ]
                ]
            }}
        />
    </div>
)

export default MyResponsiveTreeMap