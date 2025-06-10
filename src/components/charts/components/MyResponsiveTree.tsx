import { ResponsiveTree } from '@nivo/tree'
import { MyResponsiveTree as MyResponsiveTreeData } from '../data/data'
import { customTheme } from '../theme/thime'

type MyNode = {
    name: string
    color: string
    children?: MyNode[]
}

const MyResponsiveTree = () => (
    <div style={{ height: 600 }}>
        <ResponsiveTree<MyNode>
            data={MyResponsiveTreeData}
            theme={customTheme}
            identity="name"
            activeNodeSize={24}
            inactiveNodeSize={12}
            nodeColor={{ scheme: 'tableau10' }}
            fixNodeColorAtDepth={1}
            linkThickness={2}
            activeLinkThickness={8}
            inactiveLinkThickness={2}
            linkColor={{
                from: 'target.color',
                modifiers: [['opacity', 0.4]],
            }}
            margin={{ top: 90, right: 90, bottom: 90, left: 90 }}
            motionConfig="stiff"
            meshDetectionRadius={80}
            // TypeScript-required handlers
            onLinkMouseEnter={() => { }}
            onLinkMouseMove={() => { }}
            onLinkMouseLeave={() => { }}
            onLinkClick={() => { }}
            onNodeClick={() => { }}
            onNodeMouseEnter={() => { }}
            onNodeMouseLeave={() => { }}
            linkTooltip={() => null}
            linkTooltipAnchor="top" // ✅ fixed: valid value
        />
    </div>
)

export default MyResponsiveTree
