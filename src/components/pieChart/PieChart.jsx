import React from 'react'
import {Pie} from "react-chartjs-2";
import {Chart as ChartJS} from "chart.js/auto"
import "./pieChart.css";

export default function PieChart({chartData,options}) {
  return (
    <>
         <Pie data={chartData} options={options} className="calorieBreakdownChart"/>   
    </>
  )
}
