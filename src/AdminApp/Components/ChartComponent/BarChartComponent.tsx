// BarChart.tsx
import React from "react";
import { Chart, registerables } from "chart.js";
import { Bar } from "react-chartjs-2";

Chart.register(...registerables);

interface BarChartProps {
  label: string;
  chartData: {
    labels: string[];
    data: number[];
  };
}

const BarChartComponent: React.FC<BarChartProps> = ({ label, chartData }) => {
  const data = {
    labels: chartData.labels,
    datasets: [
      {
        label: label,
        data: chartData.data,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default BarChartComponent;
