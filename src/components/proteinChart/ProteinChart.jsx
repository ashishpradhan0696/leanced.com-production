import React from 'react'
import { Bar } from 'react-chartjs-2'
import {Chart as ChartJS} from "chart.js/auto"
import "./proteinChart.css"

export default function ProteinChart({chartData,options}) {
  return (
    <>
        <Bar data={chartData} options={options} className="proteinChart"/>
    </>
  )
}
