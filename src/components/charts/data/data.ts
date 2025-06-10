export const MyBarChartData = [
    {
        "country": "AD",
        "hot dog": 80,
        "burger": 142,
        "sandwich": 113,
        "kebab": 13,
        "fries": 163,
        "donut": 60,
    },
    {
        "country": "AE",
        "hot dog": 59,
        "burger": 113,
        "sandwich": 30,
        "kebab": 170,
        "fries": 5,
        "donut": 179,
    },
    {
        "country": "AF",
        "hot dog": 85,
        "burger": 3,
        "sandwich": 189,
        "kebab": 71,
        "fries": 117,
        "donut": 64,
    },
    {
        "country": "AG",
        "hot dog": 169,
        "burger": 180,
        "sandwich": 49,
        "kebab": 119,
        "fries": 34,
        "donut": 113,
    },
    {
        "country": "AI",
        "hot dog": 70,
        "burger": 191,
        "sandwich": 11,
        "kebab": 60,
        "fries": 2,
        "donut": 151,
    },
    {
        "country": "AL",
        "hot dog": 117,
        "burger": 169,
        "sandwich": 141,
        "kebab": 43,
        "fries": 32,
        "donut": 12,
    },
    {
        "country": "AM",
        "hot dog": 77,
        "burger": 54,
        "sandwich": 5,
        "kebab": 67,
        "fries": 84,
        "donut": 86,
    }
]

// This is a sample data for the Line chart

export const excludeKey = Object.keys(MyBarChartData[0]).find(key => typeof MyBarChartData[0][key as keyof typeof MyBarChartData[0]] === 'string');
export const keys = Object.keys(MyBarChartData[0]).filter(key => key !== excludeKey);

export const MyResponsiveLine = keys.map(key => ({
    id: key,
    data: MyBarChartData.map(entry => ({
        x: entry.country,
        y: entry[key as keyof typeof entry] as number,
    })),
}));

// This is a sample data for the Pie chart

const foodTotals: Record<string, number> = {};

MyBarChartData.forEach(entry => {
    Object.entries(entry).forEach(([key, value]) => {
        if (key !== "country") {
            foodTotals[key] = (foodTotals[key] || 0) + (value as number);
        }
    });
});

export const MyResponsivePie = Object.entries(foodTotals).map(([key, value]) => ({
    id: key,
    label: key,
    value,
}));

// this is a sample data for the Scatter plot

export const MyResponsiveScatterPlot = keys.map((food) => ({
    id: food,
    data: MyBarChartData.map((entry) => ({
        x: entry.kebab,
        y: entry[food as keyof typeof entry] as number,
    })),
}));
// console.log(MyResponsiveScatterPlot);

// This is a sample data for the Tree map

export const MyResponsiveCirclePacking = {
    name: "Root",
    children: keys.map(food => ({
        name: food,
        children: [
            {
                name: `${food}-group`,
                children: MyBarChartData.map(country => ({
                    name: country.country,
                    children: [
                        {
                            name: food,
                            loc: country[food as keyof typeof country],
                        },
                    ],
                })),
            },
        ],
    })),
};


// This is a sample data for the Waffle chart

const startDate = new Date("2015-01-01");

const MyResponsiveCalendar = [];

let dayCounter = 0;

for (const entry of MyBarChartData) {
    const { country, ...foods } = entry;

    for (const [food, value] of Object.entries(foods)) {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + dayCounter);
        const isoDate = date.toISOString().split("T")[0]; // format: YYYY-MM-DD

        MyResponsiveCalendar.push({
            value,
            day: isoDate,
        });

        dayCounter++;
    }
}
export { MyResponsiveCalendar };

type NonNumericKeys = {
    [K in keyof typeof MyBarChartData[0]]: typeof MyBarChartData[0][K] extends number ? never : K
}[keyof typeof MyBarChartData[0]];

type FoodKey = Exclude<keyof typeof MyBarChartData[0], NonNumericKeys>;

export const MyResponsiveChord = keys.map((fromKey) =>
    keys.map((toKey) => {
        return MyBarChartData.reduce(
            (sum, row) =>
                sum +
                (row[fromKey as FoodKey] as number) *
                (row[toKey as FoodKey] as number),
            0
        );
    })
);

//  This is a sample data for the Heat map

export const MyResponsiveHeatMap = MyBarChartData.map(({ country, ...rest }) => ({
    id: country,
    data: Object.entries(rest).map(([x, y]) => ({
        x,
        y: Number(y),
    })),
}));


// This is a sample data for the Network chart


type NodeType = { id: string; height: number; size: number; color: string };
type LinkType = { source: string; target: string; distance: number | string };
const nodes: NodeType[] = [];
const links: LinkType[] = [];
const colorMap: Record<string, string> = {};
const foodColors = ["#f47560", "#e8c1a0", "#61cdbb", "#97e3d5", "#f1e15b", "#e8a838"];
const countryColor = "#4682b4";

// Add food type nodes
keys.forEach((food, i) => {
    colorMap[food] = foodColors[i];
    nodes.push({
        id: food,
        height: 1,
        size: 30,
        color: foodColors[i],
    });
});

// Add country nodes and links
MyBarChartData.forEach(entry => {
    const country = entry.country;
    nodes.push({
        id: country,
        height: 1,
        size: 20,
        color: countryColor,
    });

    keys.forEach(food => {
        const distance = entry[food as keyof typeof entry];
        links.push({
            source: country,
            target: food,
            distance: distance,
        });
    });
});

export const MyResponsiveNetwork = { nodes, links };


// This is a sample data for the Parallel coordinates chart
export const MyResponsiveParallelCoordinates = MyBarChartData.map(item => ({
    temp: item["hot dog"],
    cost: item.burger,
    weight: item.sandwich,
    volume: item.kebab,
    id: item.country
}));


export const MyResponsiveSwarmPlot = MyBarChartData.flatMap(entry =>
    Object.entries(entry)
        .filter(([key]) => key !== "country")
        .map(([key, value]) => ({
            id: key,
            group: entry.country,
            price: value,
            volume: value / 2 // or Math.random() * 100 for different visuals
        }))
);

export const MyResponsiveTree = {
    "name": "nivo",
    "color": "hsl(219, 70%, 50%)",
    "children": [
        {
            "name": "viz",
            "color": "hsl(329, 70%, 50%)",
            "children": [
                {
                    "name": "stack",
                    "color": "hsl(158, 70%, 50%)",
                    "children": [
                        {
                            "name": "cchart",
                            "color": "hsl(26, 70%, 50%)",
                            "loc": 59674
                        },
                        {
                            "name": "xAxis",
                            "color": "hsl(190, 70%, 50%)",
                            "loc": 61409
                        },
                        {
                            "name": "yAxis",
                            "color": "hsl(325, 70%, 50%)",
                            "loc": 128815
                        },
                        {
                            "name": "layers",
                            "color": "hsl(334, 70%, 50%)",
                            "loc": 79080
                        }
                    ]
                },
                {
                    "name": "ppie",
                    "color": "hsl(108, 70%, 50%)",
                    "children": [
                        {
                            "name": "chart",
                            "color": "hsl(342, 70%, 50%)",
                            "children": [
                                {
                                    "name": "pie",
                                    "color": "hsl(359, 70%, 50%)",
                                    "children": [
                                        {
                                            "name": "outline",
                                            "color": "hsl(112, 70%, 50%)",
                                            "loc": 196567
                                        },
                                        {
                                            "name": "slices",
                                            "color": "hsl(220, 70%, 50%)",
                                            "loc": 198477
                                        },
                                        {
                                            "name": "bbox",
                                            "color": "hsl(160, 70%, 50%)",
                                            "loc": 188808
                                        }
                                    ]
                                },
                                {
                                    "name": "donut",
                                    "color": "hsl(200, 70%, 50%)",
                                    "loc": 113779
                                },
                                {
                                    "name": "gauge",
                                    "color": "hsl(198, 70%, 50%)",
                                    "loc": 67463
                                }
                            ]
                        },
                        {
                            "name": "legends",
                            "color": "hsl(269, 70%, 50%)",
                            "loc": 7313
                        }
                    ]
                }
            ]
        },
        {
            "name": "colors",
            "color": "hsl(173, 70%, 50%)",
            "children": [
                {
                    "name": "rgb",
                    "color": "hsl(323, 70%, 50%)",
                    "loc": 85539
                },
                {
                    "name": "hsl",
                    "color": "hsl(207, 70%, 50%)",
                    "loc": 45652
                }
            ]
        },
        {
            "name": "utils",
            "color": "hsl(224, 70%, 50%)",
            "children": [
                {
                    "name": "randomize",
                    "color": "hsl(211, 70%, 50%)",
                    "loc": 179877
                },
                {
                    "name": "resetClock",
                    "color": "hsl(117, 70%, 50%)",
                    "loc": 114706
                },
                {
                    "name": "noop",
                    "color": "hsl(63, 70%, 50%)",
                    "loc": 122237
                },
                {
                    "name": "tick",
                    "color": "hsl(27, 70%, 50%)",
                    "loc": 63149
                },
                {
                    "name": "forceGC",
                    "color": "hsl(287, 70%, 50%)",
                    "loc": 160901
                },
                {
                    "name": "stackTrace",
                    "color": "hsl(353, 70%, 50%)",
                    "loc": 35942
                },
                {
                    "name": "dbg",
                    "color": "hsl(188, 70%, 50%)",
                    "loc": 106728
                }
            ]
        },
        {
            "name": "generators",
            "color": "hsl(117, 70%, 50%)",
            "children": [
                {
                    "name": "address",
                    "color": "hsl(126, 70%, 50%)",
                    "loc": 104250
                },
                {
                    "name": "city",
                    "color": "hsl(178, 70%, 50%)",
                    "loc": 153258
                },
                {
                    "name": "animal",
                    "color": "hsl(214, 70%, 50%)",
                    "loc": 6129
                },
                {
                    "name": "movie",
                    "color": "hsl(275, 70%, 50%)",
                    "loc": 77067
                },
                {
                    "name": "user",
                    "color": "hsl(330, 70%, 50%)",
                    "loc": 81752
                }
            ]
        },
        {
            "name": "set",
            "color": "hsl(150, 70%, 50%)",
            "children": [
                {
                    "name": "clone",
                    "color": "hsl(240, 70%, 50%)",
                    "loc": 177288
                },
                {
                    "name": "intersect",
                    "color": "hsl(6, 70%, 50%)",
                    "loc": 148860
                },
                {
                    "name": "merge",
                    "color": "hsl(180, 70%, 50%)",
                    "loc": 97960
                },
                {
                    "name": "reverse",
                    "color": "hsl(245, 70%, 50%)",
                    "loc": 132847
                },
                {
                    "name": "toArray",
                    "color": "hsl(329, 70%, 50%)",
                    "loc": 124010
                },
                {
                    "name": "toObject",
                    "color": "hsl(124, 70%, 50%)",
                    "loc": 98700
                },
                {
                    "name": "fromCSV",
                    "color": "hsl(254, 70%, 50%)",
                    "loc": 152839
                },
                {
                    "name": "slice",
                    "color": "hsl(266, 70%, 50%)",
                    "loc": 118035
                },
                {
                    "name": "append",
                    "color": "hsl(74, 70%, 50%)",
                    "loc": 76377
                },
                {
                    "name": "prepend",
                    "color": "hsl(199, 70%, 50%)",
                    "loc": 157430
                },
                {
                    "name": "shuffle",
                    "color": "hsl(162, 70%, 50%)",
                    "loc": 137536
                },
                {
                    "name": "pick",
                    "color": "hsl(223, 70%, 50%)",
                    "loc": 36960
                },
                {
                    "name": "plouc",
                    "color": "hsl(255, 70%, 50%)",
                    "loc": 109305
                }
            ]
        },
        {
            "name": "text",
            "color": "hsl(153, 70%, 50%)",
            "children": [
                {
                    "name": "trim",
                    "color": "hsl(86, 70%, 50%)",
                    "loc": 171712
                },
                {
                    "name": "slugify",
                    "color": "hsl(358, 70%, 50%)",
                    "loc": 187392
                },
                {
                    "name": "snakeCase",
                    "color": "hsl(47, 70%, 50%)",
                    "loc": 74078
                },
                {
                    "name": "camelCase",
                    "color": "hsl(148, 70%, 50%)",
                    "loc": 111966
                },
                {
                    "name": "repeat",
                    "color": "hsl(129, 70%, 50%)",
                    "loc": 47424
                },
                {
                    "name": "padLeft",
                    "color": "hsl(42, 70%, 50%)",
                    "loc": 81638
                },
                {
                    "name": "padRight",
                    "color": "hsl(284, 70%, 50%)",
                    "loc": 177578
                },
                {
                    "name": "sanitize",
                    "color": "hsl(229, 70%, 50%)",
                    "loc": 27667
                },
                {
                    "name": "ploucify",
                    "color": "hsl(278, 70%, 50%)",
                    "loc": 89384
                }
            ]
        },
        {
            "name": "misc",
            "color": "hsl(82, 70%, 50%)",
            "children": [
                {
                    "name": "greetings",
                    "color": "hsl(113, 70%, 50%)",
                    "children": [
                        {
                            "name": "hey",
                            "color": "hsl(209, 70%, 50%)",
                            "loc": 106889
                        },
                        {
                            "name": "HOWDY",
                            "color": "hsl(145, 70%, 50%)",
                            "loc": 88310
                        },
                        {
                            "name": "aloha",
                            "color": "hsl(274, 70%, 50%)",
                            "loc": 148345
                        },
                        {
                            "name": "AHOY",
                            "color": "hsl(179, 70%, 50%)",
                            "loc": 41162
                        }
                    ]
                },
                {
                    "name": "other",
                    "color": "hsl(313, 70%, 50%)",
                    "loc": 129299
                },
                {
                    "name": "path",
                    "color": "hsl(104, 70%, 50%)",
                    "children": [
                        {
                            "name": "pathA",
                            "color": "hsl(155, 70%, 50%)",
                            "loc": 122411
                        },
                        {
                            "name": "pathB",
                            "color": "hsl(61, 70%, 50%)",
                            "children": [
                                {
                                    "name": "pathB1",
                                    "color": "hsl(321, 70%, 50%)",
                                    "loc": 25118
                                },
                                {
                                    "name": "pathB2",
                                    "color": "hsl(67, 70%, 50%)",
                                    "loc": 133132
                                },
                                {
                                    "name": "pathB3",
                                    "color": "hsl(183, 70%, 50%)",
                                    "loc": 6728
                                },
                                {
                                    "name": "pathB4",
                                    "color": "hsl(306, 70%, 50%)",
                                    "loc": 192000
                                }
                            ]
                        },
                        {
                            "name": "pathC",
                            "color": "hsl(341, 70%, 50%)",
                            "children": [
                                {
                                    "name": "pathC1",
                                    "color": "hsl(163, 70%, 50%)",
                                    "loc": 52908
                                },
                                {
                                    "name": "pathC2",
                                    "color": "hsl(319, 70%, 50%)",
                                    "loc": 74971
                                },
                                {
                                    "name": "pathC3",
                                    "color": "hsl(170, 70%, 50%)",
                                    "loc": 195036
                                },
                                {
                                    "name": "pathC4",
                                    "color": "hsl(61, 70%, 50%)",
                                    "loc": 111450
                                },
                                {
                                    "name": "pathC5",
                                    "color": "hsl(229, 70%, 50%)",
                                    "loc": 44707
                                },
                                {
                                    "name": "pathC6",
                                    "color": "hsl(331, 70%, 50%)",
                                    "loc": 104186
                                },
                                {
                                    "name": "pathC7",
                                    "color": "hsl(134, 70%, 50%)",
                                    "loc": 188438
                                },
                                {
                                    "name": "pathC8",
                                    "color": "hsl(278, 70%, 50%)",
                                    "loc": 92527
                                },
                                {
                                    "name": "pathC9",
                                    "color": "hsl(8, 70%, 50%)",
                                    "loc": 29448
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
}

export const MyResponsiveTreeMap = {
    "name": "nivo",
    "color": "hsl(10, 70%, 50%)",
    "children": [
        {
            "name": "viz",
            "color": "hsl(43, 70%, 50%)",
            "children": [
                {
                    "name": "stack",
                    "color": "hsl(224, 70%, 50%)",
                    "children": [
                        {
                            "name": "cchart",
                            "color": "hsl(273, 70%, 50%)",
                            "loc": 118441
                        },
                        {
                            "name": "xAxis",
                            "color": "hsl(138, 70%, 50%)",
                            "loc": 140158
                        },
                        {
                            "name": "yAxis",
                            "color": "hsl(326, 70%, 50%)",
                            "loc": 177788
                        },
                        {
                            "name": "layers",
                            "color": "hsl(236, 70%, 50%)",
                            "loc": 78771
                        }
                    ]
                },
                {
                    "name": "ppie",
                    "color": "hsl(192, 70%, 50%)",
                    "children": [
                        {
                            "name": "chart",
                            "color": "hsl(271, 70%, 50%)",
                            "children": [
                                {
                                    "name": "pie",
                                    "color": "hsl(260, 70%, 50%)",
                                    "children": [
                                        {
                                            "name": "outline",
                                            "color": "hsl(100, 70%, 50%)",
                                            "loc": 157778
                                        },
                                        {
                                            "name": "slices",
                                            "color": "hsl(53, 70%, 50%)",
                                            "loc": 19985
                                        },
                                        {
                                            "name": "bbox",
                                            "color": "hsl(269, 70%, 50%)",
                                            "loc": 181074
                                        }
                                    ]
                                },
                                {
                                    "name": "donut",
                                    "color": "hsl(228, 70%, 50%)",
                                    "loc": 184877
                                },
                                {
                                    "name": "gauge",
                                    "color": "hsl(5, 70%, 50%)",
                                    "loc": 20228
                                }
                            ]
                        },
                        {
                            "name": "legends",
                            "color": "hsl(46, 70%, 50%)",
                            "loc": 71310
                        }
                    ]
                }
            ]
        },
        {
            "name": "colors",
            "color": "hsl(183, 70%, 50%)",
            "children": [
                {
                    "name": "rgb",
                    "color": "hsl(61, 70%, 50%)",
                    "loc": 191850
                },
                {
                    "name": "hsl",
                    "color": "hsl(62, 70%, 50%)",
                    "loc": 160082
                }
            ]
        },
        {
            "name": "utils",
            "color": "hsl(352, 70%, 50%)",
            "children": [
                {
                    "name": "randomize",
                    "color": "hsl(19, 70%, 50%)",
                    "loc": 60379
                },
                {
                    "name": "resetClock",
                    "color": "hsl(67, 70%, 50%)",
                    "loc": 163442
                },
                {
                    "name": "noop",
                    "color": "hsl(336, 70%, 50%)",
                    "loc": 180281
                },
                {
                    "name": "tick",
                    "color": "hsl(196, 70%, 50%)",
                    "loc": 197558
                },
                {
                    "name": "forceGC",
                    "color": "hsl(119, 70%, 50%)",
                    "loc": 101872
                },
                {
                    "name": "stackTrace",
                    "color": "hsl(329, 70%, 50%)",
                    "loc": 120489
                },
                {
                    "name": "dbg",
                    "color": "hsl(239, 70%, 50%)",
                    "loc": 49001
                }
            ]
        },
        {
            "name": "generators",
            "color": "hsl(344, 70%, 50%)",
            "children": [
                {
                    "name": "address",
                    "color": "hsl(113, 70%, 50%)",
                    "loc": 45057
                },
                {
                    "name": "city",
                    "color": "hsl(37, 70%, 50%)",
                    "loc": 164375
                },
                {
                    "name": "animal",
                    "color": "hsl(141, 70%, 50%)",
                    "loc": 107154
                },
                {
                    "name": "movie",
                    "color": "hsl(275, 70%, 50%)",
                    "loc": 140413
                },
                {
                    "name": "user",
                    "color": "hsl(154, 70%, 50%)",
                    "loc": 51627
                }
            ]
        },
        {
            "name": "set",
            "color": "hsl(98, 70%, 50%)",
            "children": [
                {
                    "name": "clone",
                    "color": "hsl(261, 70%, 50%)",
                    "loc": 187795
                },
                {
                    "name": "intersect",
                    "color": "hsl(299, 70%, 50%)",
                    "loc": 47458
                },
                {
                    "name": "merge",
                    "color": "hsl(192, 70%, 50%)",
                    "loc": 136275
                },
                {
                    "name": "reverse",
                    "color": "hsl(172, 70%, 50%)",
                    "loc": 176343
                },
                {
                    "name": "toArray",
                    "color": "hsl(272, 70%, 50%)",
                    "loc": 137880
                },
                {
                    "name": "toObject",
                    "color": "hsl(194, 70%, 50%)",
                    "loc": 19862
                },
                {
                    "name": "fromCSV",
                    "color": "hsl(235, 70%, 50%)",
                    "loc": 92433
                },
                {
                    "name": "slice",
                    "color": "hsl(202, 70%, 50%)",
                    "loc": 18366
                },
                {
                    "name": "append",
                    "color": "hsl(27, 70%, 50%)",
                    "loc": 28519
                },
                {
                    "name": "prepend",
                    "color": "hsl(103, 70%, 50%)",
                    "loc": 99369
                },
                {
                    "name": "shuffle",
                    "color": "hsl(64, 70%, 50%)",
                    "loc": 120114
                },
                {
                    "name": "pick",
                    "color": "hsl(354, 70%, 50%)",
                    "loc": 47567
                },
                {
                    "name": "plouc",
                    "color": "hsl(228, 70%, 50%)",
                    "loc": 120121
                }
            ]
        },
        {
            "name": "text",
            "color": "hsl(348, 70%, 50%)",
            "children": [
                {
                    "name": "trim",
                    "color": "hsl(221, 70%, 50%)",
                    "loc": 172194
                },
                {
                    "name": "slugify",
                    "color": "hsl(322, 70%, 50%)",
                    "loc": 7105
                },
                {
                    "name": "snakeCase",
                    "color": "hsl(347, 70%, 50%)",
                    "loc": 191126
                },
                {
                    "name": "camelCase",
                    "color": "hsl(14, 70%, 50%)",
                    "loc": 156528
                },
                {
                    "name": "repeat",
                    "color": "hsl(35, 70%, 50%)",
                    "loc": 70677
                },
                {
                    "name": "padLeft",
                    "color": "hsl(224, 70%, 50%)",
                    "loc": 141217
                },
                {
                    "name": "padRight",
                    "color": "hsl(247, 70%, 50%)",
                    "loc": 83821
                },
                {
                    "name": "sanitize",
                    "color": "hsl(175, 70%, 50%)",
                    "loc": 125044
                },
                {
                    "name": "ploucify",
                    "color": "hsl(314, 70%, 50%)",
                    "loc": 163825
                }
            ]
        },
        {
            "name": "misc",
            "color": "hsl(289, 70%, 50%)",
            "children": [
                {
                    "name": "greetings",
                    "color": "hsl(149, 70%, 50%)",
                    "children": [
                        {
                            "name": "hey",
                            "color": "hsl(208, 70%, 50%)",
                            "loc": 52927
                        },
                        {
                            "name": "HOWDY",
                            "color": "hsl(252, 70%, 50%)",
                            "loc": 126260
                        },
                        {
                            "name": "aloha",
                            "color": "hsl(214, 70%, 50%)",
                            "loc": 54919
                        },
                        {
                            "name": "AHOY",
                            "color": "hsl(162, 70%, 50%)",
                            "loc": 29942
                        }
                    ]
                },
                {
                    "name": "other",
                    "color": "hsl(191, 70%, 50%)",
                    "loc": 103242
                },
                {
                    "name": "path",
                    "color": "hsl(96, 70%, 50%)",
                    "children": [
                        {
                            "name": "pathA",
                            "color": "hsl(62, 70%, 50%)",
                            "loc": 77185
                        },
                        {
                            "name": "pathB",
                            "color": "hsl(258, 70%, 50%)",
                            "children": [
                                {
                                    "name": "pathB1",
                                    "color": "hsl(245, 70%, 50%)",
                                    "loc": 196396
                                },
                                {
                                    "name": "pathB2",
                                    "color": "hsl(203, 70%, 50%)",
                                    "loc": 168905
                                },
                                {
                                    "name": "pathB3",
                                    "color": "hsl(142, 70%, 50%)",
                                    "loc": 7090
                                },
                                {
                                    "name": "pathB4",
                                    "color": "hsl(75, 70%, 50%)",
                                    "loc": 80141
                                }
                            ]
                        },
                        {
                            "name": "pathC",
                            "color": "hsl(39, 70%, 50%)",
                            "children": [
                                {
                                    "name": "pathC1",
                                    "color": "hsl(232, 70%, 50%)",
                                    "loc": 56105
                                },
                                {
                                    "name": "pathC2",
                                    "color": "hsl(220, 70%, 50%)",
                                    "loc": 67943
                                },
                                {
                                    "name": "pathC3",
                                    "color": "hsl(134, 70%, 50%)",
                                    "loc": 147465
                                },
                                {
                                    "name": "pathC4",
                                    "color": "hsl(37, 70%, 50%)",
                                    "loc": 54186
                                },
                                {
                                    "name": "pathC5",
                                    "color": "hsl(312, 70%, 50%)",
                                    "loc": 19246
                                },
                                {
                                    "name": "pathC6",
                                    "color": "hsl(310, 70%, 50%)",
                                    "loc": 65683
                                },
                                {
                                    "name": "pathC7",
                                    "color": "hsl(300, 70%, 50%)",
                                    "loc": 102863
                                },
                                {
                                    "name": "pathC8",
                                    "color": "hsl(201, 70%, 50%)",
                                    "loc": 45480
                                },
                                {
                                    "name": "pathC9",
                                    "color": "hsl(258, 70%, 50%)",
                                    "loc": 148842
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
}

export const MyResponsiveWaffle = [
    {
        "id": "cats",
        "label": "Cats",
        "value": 13.619592860333638
    },
    {
        "id": "dogs",
        "label": "Dogs",
        "value": 15.78634999814815
    },
    {
        "id": "rabbits",
        "label": "Rabits",
        "value": 2.278419348994339
    }
]




