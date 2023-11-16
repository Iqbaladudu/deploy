"use client";

import DemoContainer from "../demoContainer";
import { useEffect, useState } from "react";
import { ProgressBar, Table, Tooltip } from "react-bootstrap";
import Image from "next/image";
import imageTable from "@/public/imageTable.png";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const Result = () => {
  const [windows, setWindows] = useState(false);
  useEffect(() => {
    setWindows(true);
  }, []);

  return (
    <DemoContainer>
      <div className="d-flex">
        {windows && (
          <AreaChart
            width={550}
            height={300}
            data={data}
            margin={{
              top: 0,
              right: 0,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="uv"
              stroke="#E84D4D"
              fill="#F5D9D9"
            />
          </AreaChart>
        )}
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
