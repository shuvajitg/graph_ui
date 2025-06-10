"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import LineChart from "./charts/newGraphUi/Line-chart"
import BarChart from "./charts/newGraphUi/Barchart"
import PieChart from "./charts/newGraphUi/Pie-chart"
import RadarChart from "./charts/newGraphUi/Rader-chart"
import { BarChart3, LineChartIcon, PieChartIcon, RadioTowerIcon } from "lucide-react"
// import { ThemeToggle } from "./theme-toggle"

export default function Index() {
    const [activeTab, setActiveTab] = useState("all")

    console.log(activeTab);


    return (
        <div className="container mx-auto p-4 space-y-4">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
                {/* <ThemeToggle /> */}
            </div>

            <Tabs defaultValue="all" className="space-y-4" onValueChange={setActiveTab}>
                <TabsList>
                    <TabsTrigger value="all">All Charts</TabsTrigger>
                    <TabsTrigger value="line">Line</TabsTrigger>
                    <TabsTrigger value="bar">Bar</TabsTrigger>
                    <TabsTrigger value="pie">Pie</TabsTrigger>
                    <TabsTrigger value="radar">Radar</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card className="">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2"><LineChartIcon />Monthly Revenue</CardTitle>
                                <CardDescription>Revenue trends over the past 12 months</CardDescription>
                            </CardHeader>
                            <CardContent className="h-[300px]">
                                <LineChart />
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader >
                                <CardTitle className="flex items-center gap-2"> <BarChart3 />Product Sales</CardTitle>
                                <CardDescription>Sales by product category</CardDescription>
                            </CardHeader>
                            <CardContent className="h-[300px]">
                                <BarChart />
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2"><PieChartIcon />Market Share</CardTitle>
                                <CardDescription>Distribution across market segments</CardDescription>
                            </CardHeader>
                            <CardContent className="h-[300px]">
                                <PieChart />
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2"><RadioTowerIcon />Performance Metrics</CardTitle>
                                <CardDescription>Key performance indicators</CardDescription>
                            </CardHeader>
                            <CardContent className="h-[300px]">
                                <RadarChart />
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="line">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><LineChartIcon />Monthly Revenue</CardTitle>
                            <CardDescription>Revenue trends over the past 12 months</CardDescription>
                        </CardHeader>
                        <CardContent className="h-[500px]">
                            <LineChart />
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="bar">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><BarChart3 />Product Sales</CardTitle>
                            <CardDescription>Sales by product category</CardDescription>
                        </CardHeader>
                        <CardContent className="h-[500px]">
                            <BarChart />
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="pie">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><RadioTowerIcon />Market Share</CardTitle>
                            <CardDescription>Distribution across market segments</CardDescription>
                        </CardHeader>
                        <CardContent className="h-[500px]">
                            <PieChart />
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="radar">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><RadioTowerIcon />Performance Metrics</CardTitle>
                            <CardDescription>Key performance indicators</CardDescription>
                        </CardHeader>
                        <CardContent className="h-[500px]">
                            <RadarChart />
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
