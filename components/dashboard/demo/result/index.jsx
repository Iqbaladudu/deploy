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
      <div className="d-flex">
        {windows && <Line options={options} data={data} />}
      </div>
      <div className="row row-cols-1 row-cols-md-2">
        <div className="col-2 fw-bold">Laporan</div>
        <div className="col">
          <Table borderless size="sm">
            <tbody>
              <tr>
                <td className="w-25">Precision</td>
                <td className="w-25">80%</td>
                <td>
                  <ProgressBar now={80} variant="primary" />
                </td>
              </tr>
              <tr>
                <td className="w-25">Recall</td>
                <td className="w-25">80%</td>
                <td>
                  <ProgressBar now={80} variant="primary" />
                </td>
              </tr>
              <tr>
                <td className="w-25">Fi-score</td>
                <td className="w-25">80%</td>
                <td>
                  <ProgressBar now={80} variant="primary" />
                </td>
              </tr>
              <tr>
                <td className="w-25">Accuracy</td>
                <td className="w-25">80%</td>
                <td>
                  <ProgressBar now={80} variant="primary" />
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
      <div className="row row-cols-auto">
        <div className="col-2 fw-bold">Validasi Hasil</div>
        <div className="col">
          <Table responsive size="sm" striped>
            <tbody>
              <tr>
                <th>image_n</th>
                <th>predict</th>
                <th>accuracy</th>
                <th>image_n</th>
                <th>predict</th>
                <th>accuracy</th>
              </tr>
              <tr>
                <td>
                  <Image src={imageTable} alt="" />
                </td>
                <td>3 car</td>
                <td>75%</td>
                <td>
                  <Image src={imageTable} alt="" />
                </td>
                <td>3 car</td>
                <td>75%</td>
              </tr>
              <tr>
                <td>
                  <Image src={imageTable} alt="" />
                </td>
                <td>3 car</td>
                <td>75%</td>
                <td>
                  <Image src={imageTable} alt="" />
                </td>
                <td>3 car</td>
                <td>75%</td>
              </tr>
              <tr>
                <td>
                  <Image src={imageTable} alt="" />
                </td>
                <td>3 car</td>
                <td>75%</td>
                <td>
                  <Image src={imageTable} alt="" />
                </td>
                <td>3 car</td>
                <td>75%</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
      <div className="row row-cols-auto">
        <div className="col-2 fw-bold">Kesimpulan</div>
        <div className="col">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </div>
      </div>
    </DemoContainer>
  );
};

export default Result;
