"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { BarChart3, PieChart, LineChart, AreaChart, ScatterChart, TrendingUp } from "lucide-react"
import { NivoBarChart } from "./components/nivo-bar-chart"
import { NivoPieChart } from "./components/nivo-pie-chart"
import { NivoLineChart } from "./components/nivo-line-chart"
import { NivoAreaChart } from "./components/nivo-area-chart"
import { NivoScatterChart } from "./components/nivo-scatter-chart"

// Sample data - you can replace this with your actual data
const sampleData = [
  { id: 1, category: "Electronics", sales: 12000, profit: 3000, month: "Jan", region: "North" },
  { id: 2, category: "Clothing", sales: 8000, profit: 2000, month: "Jan", region: "South" },
  { id: 3, category: "Books", sales: 5000, profit: 1500, month: "Jan", region: "East" },
  { id: 4, category: "Electronics", sales: 15000, profit: 4000, month: "Feb", region: "North" },
  { id: 5, category: "Clothing", sales: 9000, profit: 2500, month: "Feb", region: "South" },
  { id: 6, category: "Books", sales: 5500, profit: 1800, month: "Feb", region: "East" },
  { id: 7, category: "Electronics", sales: 18000, profit: 5000, month: "Mar", region: "North" },
  { id: 8, category: "Clothing", sales: 11000, profit: 3000, month: "Mar", region: "South" },
  { id: 9, category: "Books", sales: 6000, profit: 2000, month: "Mar", region: "East" },
]

type ChartType = "bar" | "pie" | "line" | "area" | "scatter"

const chartTypes = [
  { id: "bar", name: "Bar Chart", icon: BarChart3 },
  { id: "pie", name: "Pie Chart", icon: PieChart },
  { id: "line", name: "Line Chart", icon: LineChart },
  { id: "area", name: "Area Chart", icon: AreaChart },
  { id: "scatter", name: "Scatter Plot", icon: ScatterChart },
]

export default function App() {
  const [selectedChartType, setSelectedChartType] = useState<ChartType>("bar")
  const [xAxis, setXAxis] = useState<string>("")
  const [yAxis, setYAxis] = useState<string>("")
  const [draggedColumn, setDraggedColumn] = useState<string>("")

  // Get column names from the data
  const columns = Object.keys(sampleData[0]).filter((key) => key !== "id")

  const handleDragStart = (column: string) => {
    setDraggedColumn(column)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDropOnXAxis = (e: React.DragEvent) => {
    e.preventDefault()
    if (draggedColumn) {
      setXAxis(draggedColumn)
      setDraggedColumn("")
    }
  }

  const handleDropOnYAxis = (e: React.DragEvent) => {
    e.preventDefault()
    if (draggedColumn) {
      setYAxis(draggedColumn)
      setDraggedColumn("")
    }
  }

  const renderChart = () => {
    if (!xAxis || !yAxis) {
      return (
        <div className="flex items-center justify-center h-96 text-muted-foreground">
          <div className="text-center">
            <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Drag columns to X and Y axes to generate a chart</p>
          </div>
        </div>
      )
    }

    const chartProps = {
      data: sampleData,
      xKey: xAxis,
      yKey: yAxis,
    }

    switch (selectedChartType) {
      case "bar":
        return <NivoBarChart {...chartProps} />
      case "pie":
        return <NivoPieChart {...chartProps} />
      case "line":
        return <NivoLineChart {...chartProps} />
      case "area":
        return <NivoAreaChart {...chartProps} />
      case "scatter":
        return <NivoScatterChart {...chartProps} />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Data Visualization Dashboard</h1>
          <p className="text-gray-600">Drag and drop columns to create interactive charts</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Data Columns */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Data Columns</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {columns.map((column) => (
                  <div
                    key={column}
                    draggable
                    onDragStart={() => handleDragStart(column)}
                    className="p-3 bg-blue-50 border border-blue-200 rounded-lg cursor-move hover:bg-blue-100 transition-colors"
                  >
                    <span className="font-medium text-blue-800">{column}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Axis Configuration */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Chart Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* X-Axis Drop Zone */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">X-Axis</label>
                <div
                  onDragOver={handleDragOver}
                  onDrop={handleDropOnXAxis}
                  className={`p-4 border-2 border-dashed rounded-lg min-h-[60px] flex items-center justify-center transition-colors ${xAxis ? "border-green-300 bg-green-50" : "border-gray-300 bg-gray-50 hover:border-gray-400"
                    }`}
                >
                  {xAxis ? (
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      {xAxis}
                    </Badge>
                  ) : (
                    <span className="text-gray-500 text-sm">Drop column here</span>
                  )}
                </div>
              </div>

              {/* Y-Axis Drop Zone */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Y-Axis</label>
                <div
                  onDragOver={handleDragOver}
                  onDrop={handleDropOnYAxis}
                  className={`p-4 border-2 border-dashed rounded-lg min-h-[60px] flex items-center justify-center transition-colors ${yAxis ? "border-green-300 bg-green-50" : "border-gray-300 bg-gray-50 hover:border-gray-400"
                    }`}
                >
                  {yAxis ? (
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      {yAxis}
                    </Badge>
                  ) : (
                    <span className="text-gray-500 text-sm">Drop column here</span>
                  )}
                </div>
              </div>

              <Button
                onClick={() => {
                  setXAxis("")
                  setYAxis("")
                }}
                variant="outline"
                className="w-full"
              >
                Clear Selection
              </Button>
            </CardContent>
          </Card>

          {/* Chart Types */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Chart Types</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {chartTypes.map((chart) => {
                  const Icon = chart.icon
                  return (
                    <Button
                      key={chart.id}
                      onClick={() => setSelectedChartType(chart.id as ChartType)}
                      variant={selectedChartType === chart.id ? "default" : "outline"}
                      className="w-full justify-start"
                    >
                      <Icon className="h-4 w-4 mr-2" />
                      {chart.name}
                    </Button>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Data Preview */}
          {/* <Card>
            <CardHeader>
              <CardTitle className="text-lg">Data Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="max-h-96 overflow-auto">
                <div className="space-y-2">
                  {sampleData.slice(0, 5).map((row, index) => (
                    <div key={index} className="p-2 bg-gray-50 rounded text-xs">
                      {Object.entries(row)
                        .filter(([key]) => key !== "id")
                        .map(([key, value]) => (
                          <div key={key} className="flex justify-between">
                            <span className="font-medium">{key}:</span>
                            <span>{value}</span>
                          </div>
                        ))}
                      <Separator className="my-1" />
                    </div>
                  ))}
                  <p className="text-xs text-gray-500 text-center">Showing 5 of {sampleData.length} rows</p>
                </div>
              </div>
            </CardContent>
          </Card> */}
        </div>

        {/* Chart Display */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">
              {selectedChartType.charAt(0).toUpperCase() + selectedChartType.slice(1)} Chart
              {xAxis && yAxis && (
                <span className="text-sm font-normal text-gray-600 ml-2">
                  ({xAxis} vs {yAxis})
                </span>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-96">{renderChart()}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
