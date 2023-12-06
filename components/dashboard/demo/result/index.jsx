"use client";

import DemoContainer from "../demoContainer";
import { useEffect, useState } from "react";
import { ProgressBar, Table, Tooltip } from "react-bootstrap";
import Image from "next/image";
import imageTable from "@/public/imageTable.png";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip as ToolTip,
  Filler,
  Legend,
  elements,
} from "chart.js";
import { Line } from "react-chartjs-2";
// import {
//   Area,
//   AreaChart,
//   CartesianGrid,
//   ResponsiveContainer,
//   XAxis,
//   YAxis,
// } from "recharts";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  ToolTip,
  Filler,
  Legend
);

export const options = {
  maintainAspectRatio: true,
  aspectRation: 2 | 3,
  responsive: true,
  plugins: {
    legend: {
      position: "bottom",
    },
    title: {
      display: true,
      text: "Perkembangan Data",
    },
  },
  elements: {
    line: {
      tension: 0.4,
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June"];

const data = {
  labels: labels,
  datasets: [
    {
      label: "My First dataset",
      backgroundColor: "#E84D4D",
      borderColor: "#E84D4D",
      data: [0, 10, 40, 34, 20, 30, 45],
      fill: "start",
      smooth: true,
    },
  ],
};

const Result = () => {
  const [windows, setWindows] = useState(false);
  useEffect(() => {
    setWindows(true);
  }, []);

  return (
    <DemoContainer>
      <div class="row mb-4 justify-content-between"></div>
      <div class="row" id="previewImage"></div>
      <hr class="opacity-25 d-none" id="hr-object-detection" />
      <p class="mb-4 d-none" id="detail-title">
        Detail Informasi
      </p>
      <div
        class="row justify-content-between d-none"
        id="detail-object-detection"
      ></div>
    </DemoContainer>
  );
};

export default Result;
