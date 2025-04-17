// PieChart.tsx
import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register required chart elements
ChartJS.register(ArcElement, Tooltip, Legend);

interface Props {
  labels: string[];
  data: number[];
}

const PieChart: React.FC<Props> = ({ ...graphData }) => {
  const chartData = {
    labels: graphData.labels,
    datasets: [
      {
        label: "Votes",
        data: graphData.data,
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div id="graph-wrapper" className="mt-16 max-w-3xl mx-auto">
      <Pie data={chartData} />
    </div>
  );
};

export default PieChart;
