import React from 'react'
import { PolarArea } from 'react-chartjs-2'
import {Chart as ChartJS} from "chart.js/auto"   //needed-Imp
import "./aminoAcidChart.css"

export default function AminoAcidChart({chartData,options}) {
  return (
    <>
        <PolarArea data={chartData} options = {options} className="aminoAcidChart"/>
    </>
  )
}
