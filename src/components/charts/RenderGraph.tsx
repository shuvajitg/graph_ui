import MyBarChart from './components/MyBarChart';
import MyResponsiveCalendar from './components/MyResponsiveCalendar';
import MyResponsiveChord from './components/MyResponsiveChord';
import MyResponsiveCirclePacking from './components/MyResponsiveCirclePacking';
import MyResponsiveHeatMap from './components/MyResponsiveHeatMap';
import MyResponsiveLine from './components/MyResponsiveLine';
import MyResponsiveNetwork from './components/MyResponsiveNetwork';
import MyResponsiveParallelCoordinates from './components/MyResponsiveParallelCoordinates';
import MyResponsivePie from './components/MyResponsivePie';
import MyResponsiveScatterPlot from './components/MyResponsiveScatterPlot';
import MyResponsiveSwarmPlot from './components/MyResponsiveSwarmPlot';
import MyResponsiveTree from './components/MyResponsiveTree';
import MyResponsiveTreeMap from './components/MyResponsiveTreeMap';
import MyResponsiveWaffle from './components/MyResponsiveWaffle';
import { Zoom } from '@visx/zoom';
import { localPoint } from '@visx/event';
import { Copy, DownloadIcon, MinusCircleIcon, PlusCircle, RotateCw } from 'lucide-react';
import { toBlob, toJpeg } from 'html-to-image';
import { useEffect, useState } from 'react';
import { LuCopyCheck } from "react-icons/lu";

function RenderGraph({
    graphName,
    color,
}: {
    graphName: string | null;
    color: string | null;
}) {
    const [dimensions, setDimensions] = useState({
        width: window.innerWidth >= 1024 ? window.innerWidth - 728 : window.innerWidth - 32,
        height: window.innerHeight,
    });
    const [copyMessage, setCopyMessage] = useState<string | null>(null);

    useEffect(() => {
        const handleResize = () => {
            setDimensions({
                width: window.innerWidth >= 1024 ? window.innerWidth - 728 : window.innerWidth - 32,
                height: window.innerHeight,
            });
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const chart = [
        {
            name: 'bar',
            graphComponent: <MyBarChart color={color} />,
        },
        {
            name: 'circlePacking',
            graphComponent: <MyResponsiveCirclePacking color={color} />,
        },
        {
            name: 'calendar',
            graphComponent: <MyResponsiveCalendar />,
        },
        {
            name: 'chord',
            graphComponent: <MyResponsiveChord color={color} />,
        },
        {
            name: 'heatMap',
            graphComponent: <MyResponsiveHeatMap />,
        },
        {
            name: 'line',
            graphComponent: <MyResponsiveLine color={color} />,
        },
        {
            name: 'network',
            graphComponent: <MyResponsiveNetwork />,
        },
        {
            name: 'parallel',
            graphComponent: <MyResponsiveParallelCoordinates color={color} />,
        },
        {
            name: 'pie',
            graphComponent: <MyResponsivePie color={color} />,
        },
        {
            name: 'scatterPlot',
            graphComponent: <MyResponsiveScatterPlot color={color} />,
        },
        {
            name: 'swarmPlot',
            graphComponent: <MyResponsiveSwarmPlot color={color} />,
        },
        {
            name: 'tree',
            graphComponent: <MyResponsiveTree />,
        },
        {
            name: 'treeMap',
            graphComponent: <MyResponsiveTreeMap color={color} />,
        },
        {
            name: 'waffle',
            graphComponent: <MyResponsiveWaffle color={color} />,
        },
    ];

    const downloadJPEG = () => {
        const node = document.getElementById('chart-container');
        if (!node) return;
        toJpeg(node, { quality: 0.95 })
            .then((dataUrl) => {
                const link = document.createElement('a');
                link.download = 'chart.jpg';
                link.href = dataUrl;
                link.click();
            })
            .catch((error) => {
                console.error('JPEG download failed:', error);
            });
    };

    const copyToClipboard = () => {
        const node = document.getElementById('chart-container');
        if (!node) return;
        toBlob(node)
            .then((blob) => {
                if (!blob) {
                    console.error('Failed to generate blob for clipboard copy');
                    return;
                }
                const item = new ClipboardItem({ 'image/png': blob });
                navigator.clipboard.write([item]).then(
                    () => {
                        setCopyMessage('Copied!');
                        setTimeout(() => setCopyMessage(null), 2000);
                    },
                    (error) => {
                        console.error('Failed to copy graph to clipboard:', error);
                    }
                );
            })
            .catch((error) => {
                console.error('Failed to copy graph to clipboard:', error);
            });
    };

    const selectedGraph = chart.find((graph) => graph.name === (graphName || 'bar'));

    return (
        <div>
            <div
                key={selectedGraph?.name}
                className="h-[75vh] w-full border rounded-lg overflow-hidden"
            >
                <Zoom<SVGSVGElement>
                    width={dimensions.width}
                    height={dimensions.height}
                    scaleXMin={0.2}
                    scaleXMax={5}
                    scaleYMin={0.2}
                    scaleYMax={5}
                >
                    {(zoom) => (
                        <div className="relative">
                            <div className="absolute top-2 right-4 z-10 flex gap-2 bg-white/80 p-1 rounded-md shadow-sm">
                                <button
                                    onClick={() => zoom.scale({ scaleX: 1.2, scaleY: 1.2 })}
                                    className="p-1 hover:bg-gray-100 rounded-md transition-colors"
                                    aria-label="Zoom in"
                                >
                                    <PlusCircle size={20} />
                                </button>
                                <button
                                    onClick={() => zoom.scale({ scaleX: 0.8, scaleY: 0.8 })}
                                    className="p-1 hover:bg-gray-100 rounded-md transition-colors"
                                    aria-label="Zoom out"
                                >
                                    <MinusCircleIcon size={20} />
                                </button>
                                <button
                                    onClick={zoom.reset}
                                    className="p-1 hover:bg-gray-100 rounded-md transition-colors"
                                    aria-label="Reset zoom"
                                >
                                    <RotateCw size={20} />
                                </button>
                                <button
                                    onClick={downloadJPEG}
                                    className="p-1 hover:bg-gray-100 rounded-md transition-colors"
                                    aria-label="Download graph"
                                >
                                    <DownloadIcon size={20} />
                                </button>
                                <button
                                    onClick={copyToClipboard}
                                    className="relative p-1 hover:bg-gray-100 rounded-md transition-colors"
                                    aria-label="Copy graph"
                                >
                                    {
                                        copyMessage ? (
                                            <LuCopyCheck size={20} className="text-green-500" />
                                        ) : (
                                            <Copy size={20} />
                                        )
                                    }
                                    {/* {copyMessage && (
                                        <div className="absolute top-9 -right-6 bg-green-500 text-white px-4 py-2 rounded-md shadow-md">
                                            {copyMessage}
                                        </div>
                                    )} */}
                                </button>
                                <div className="flex items-center ml-1 text-xs font-medium">
                                    {Math.round(zoom.transformMatrix.scaleX * 100)}%
                                </div>
                            </div>
                            <svg
                                width={dimensions.width}
                                height={dimensions.height}
                                ref={zoom.containerRef}
                                id="chart-container"
                                style={{ touchAction: 'none' }}
                                onWheel={(event) => {
                                    const point = localPoint(event) || { x: 0, y: 0 };
                                    const scaleFactor = event.deltaY < 0 ? 1.1 : 0.9;
                                    zoom.scale({ scaleX: scaleFactor, scaleY: scaleFactor, point });
                                    event.preventDefault();
                                }}
                                onDoubleClick={(event) => {
                                    const point = localPoint(event) || { x: 0, y: 0 };
                                    zoom.scale({ scaleX: 1.5, scaleY: 1.5, point });
                                    event.preventDefault();
                                }}
                            >
                                <g transform={zoom.toString()}>
                                    <foreignObject
                                        height={dimensions.height}
                                        width={dimensions.width}
                                    >
                                        <div className='mt-10'>
                                            {selectedGraph?.graphComponent}
                                        </div>
                                    </foreignObject>
                                </g>
                            </svg>
                        </div>
                    )}
                </Zoom>
            </div>
        </div>
    );
}

export default RenderGraph;