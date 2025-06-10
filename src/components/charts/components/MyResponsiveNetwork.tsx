import { ResponsiveNetwork } from '@nivo/network'
import { MyResponsiveNetwork as MyResponsiveNetworkData } from '../data/data'
import { customTheme } from '../theme/thime'

const MyResponsiveNetwork = () => (
    <div style={{ height: 600 }}>
        <ResponsiveNetwork
            data={MyResponsiveNetworkData}
            margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
            theme={customTheme}
            linkDistance={e => typeof e.distance === 'number' ? e.distance : Number(e.distance)}
            centeringStrength={0.3}
            repulsivity={6}
            nodeSize={n => n.size}
            activeNodeSize={n => 1.5 * n.size}
            nodeColor={e => e.color}
            nodeBorderWidth={1}
            nodeBorderColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        0.8
                    ]
                ]
            }}
            linkThickness={n => 2 + 2 * n.target.data.height}
            linkBlendMode="multiply"
            motionConfig="wobbly"
        />
    </div>
)

export default MyResponsiveNetwork