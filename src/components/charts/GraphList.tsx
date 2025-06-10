import { useCallback, useEffect, useState } from "react";
import RenderGraph from "./RenderGraph";
import ColorSchemas from "./theme/ColorSchemas";
import type { GraphlistType } from "@/lib/types";
import { colorSchemes } from "@nivo/colors";
import { Aperture, ChartBarDecreasing, ChartLine, ChartPie } from "lucide-react";
import { SiTaichigraphics } from "react-icons/si";
import { MdOutlineCalendarViewMonth } from "react-icons/md";
import { LiaTableSolid } from "react-icons/lia";
import { PiGraphFill, PiTreeStructureDuotone } from "react-icons/pi";
import { VscGraphScatter } from "react-icons/vsc";
import { TbBinaryTreeFilled, TbChartTreemap } from "react-icons/tb";
import { LuTable } from "react-icons/lu";

function GraphList() {
    const [colorSchemesState, setColorSchemesState] = useState<string[]>([]);
    const [graph, setGraph] = useState<string | null>(null);
    const [color, setColr] = useState<string | null>(null)


    const graphList: GraphlistType[] = [
        {
            lable: "Bar",
            name: "bar",
            icon: <ChartBarDecreasing size={35} color="#9ca3af" />,
            colorSchemes: colorSchemesState
        },
        {
            lable: "CirclePacking",
            name: "circlePacking",
            icon: <SiTaichigraphics size={35} color="#9ca3af" />,
            colorSchemes: colorSchemesState
        },
        {
            lable: "Calendar",
            name: "calendar",
            icon: <MdOutlineCalendarViewMonth size={35} color="#9ca3af" />
        },
        {
            lable: "Chord",
            name: "chord",
            icon: <Aperture size={35} color="#9ca3af" />,
            colorSchemes: colorSchemesState
        },
        {
            lable: "HeatMap",
            name: "heatMap",
            icon: <LiaTableSolid size={35} color="#9ca3af" />,
            // colorSchemes: colorSchemesState
        },
        {
            lable: "Line",
            name: "line",
            icon: <ChartLine size={35} color="#9ca3af" />,
            colorSchemes: colorSchemesState
        },
        {
            lable: "Network",
            name: "network",
            icon: <PiGraphFill size={35} color="#9ca3af" />
        },
        {
            lable: "Parallel",
            name: "parallel",
            icon: <PiTreeStructureDuotone size={35} color="#9ca3af" />,
            colorSchemes: colorSchemesState
        },
        {
            lable: "Pie",
            name: "pie",
            icon: <ChartPie size={35} color="#9ca3af" />,
            colorSchemes: colorSchemesState
        },
        {
            lable: "ScatterPlot",
            name: "scatterPlot",
            icon: <VscGraphScatter size={35} color="#9ca3af" />,
            colorSchemes: colorSchemesState
        },
        {
            lable: "SwarmPlot",
            name: "swarmPlot",
            icon: <PiGraphFill size={35} color="#9ca3af" className="rotate-90" />,
            colorSchemes: colorSchemesState
        },
        {
            lable: "Tree",
            name: "tree",
            icon: <TbBinaryTreeFilled size={35} color="#9ca3af" />
        },
        {
            lable: "TreeMap",
            name: "treeMap",
            icon: <TbChartTreemap size={35} color="#9ca3af" />,
            colorSchemes: colorSchemesState
        },
        {
            lable: "Waffle",
            name: "waffle",
            icon: <LuTable size={35} color="#9ca3af" />,
            colorSchemes: colorSchemesState
        },
    ]

    useEffect(() => {
        const schemes = Object.keys(colorSchemes);
        setColorSchemesState(schemes);
    }, [graph]);

    const handleOnClick = useCallback(
        (list: string | null) => {
            setGraph(list);
        },
        [setGraph]
    );

    const selectedGraphItem = graphList.find((item) => item.name === graph);

    return (
        <div className="flex flex-1 overflow-hidden h-full">
            <div className="w-[400px] border overflow-auto hidden lg:block">
                <div className="grid grid-cols-2 gap-px bg-border border-b">
                    {graphList.map((list, index) => (
                        <button
                            key={index}
                            onClick={() => handleOnClick(list.name)}
                            className={`flex flex-col gap-2 items-center bg-background justify-center p-4 hover:bg-muted/50 transition-colors ${graph === list.name ? "bg-muted" : ""}`}
                        >
                            <div className="">{list.icon}</div>
                            <label className="cursor-pointer">{list.lable}</label>
                        </button>
                    ))}
                </div>
                <div>
                    {selectedGraphItem?.colorSchemes ? (
                        <ColorSchemas
                            graphList={[selectedGraphItem]}
                            setColr={setColr}
                        />
                    ) : null}
                </div>
            </div>
            <div className="flex-1 overflow-hidden px-4">
                <RenderGraph graphName={graph} color={color} />
            </div>
        </div>
    );
}

export default GraphList;
