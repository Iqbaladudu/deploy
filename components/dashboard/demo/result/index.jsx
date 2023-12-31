"use client";

import DemoContainer from "../demoContainer";
import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip as Tltp,
  Legend,
  BarElement,
} from "chart.js";
import { useResultStore } from "@/app/store";
import { useRouter, useSearchParams } from "next/navigation";
import { Bar } from "react-chartjs-2";
import { Upload } from "react-feather";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tltp, Legend);

export const options = {
  indexAxis: "y",
  animation: false,
  scales: {
    x: {
      display: false,
      ticks: {
        // callback: function(value, index, values) { return value },
      },
    },
    y: {
      display: true,
      title: { display: false },
      grid: { display: false },
      ticks: {
        // callback: function(value, index, values) { return value },
      },
    },
  },
};

const engineArr = {
  predict_corrosion: [
    "Corrosion Classification",
    "Manufacture: Corrosion Classification",
    "YOLOv8 Classification",
  ],
  predict_ppe: [
    "PPE Detection",
    "Manufacture: PPE Detection",
    "YOLOv8 Detection",
  ],
  predict_barcode_detection: ["Barcode Detection", "Retail: Barcode Detection"],
  predict_banana_ripeness: [
    "Banana Ripeness Classification",
    "Retail: Banana Ripeness Classification",
    "YOLOv8 Classification",
  ],
  predict_garbage_detection: [
    "Garbage Classification",
    "Smart City: Garbage Classification",
    "YOLOv8 Detection",
  ],
  predict_vehicle_detection: [
    "Counting Vehicle Quantity",
    "Smart City: Counting Vehicle Quantity",
    "YOLOv8 Detection",
  ],
};

const Result = () => {
  const [windows, setWindows] = useState(false);
  useEffect(() => {
    setWindows(true);
  }, []);
  const param = useSearchParams();
  const engine = param.get("engine");

  const result = useResultStore((state) => state.result);
  console.log(result);

  return (
    <DemoContainer>
      <ResultImg result={result} />
      <Detail result={result} />
      <UploadAgainBtn />
    </DemoContainer>
  );
};

const UploadAgainBtn = () => {
  const param = useSearchParams();
  const engine = param.get("engine");

  const router = useRouter();

  return (
    <a
      id="btn-reupload"
      onClick={() =>
        router.push(`/dashboard/demo?engine=${engine}&option=select-dataset`)
      }
      class="btn btn-primary outline-0 border-0 shadow-none text-smaller my-4"
    >
      <Upload data-feather="upload" width="14" height="14" class="me-2 mb-1" />
      Upload Ulang Gambar
    </a>
  );
};

const ResultImg = ({ result }) => {
  const param = useSearchParams();
  const engine = param.get("engine");

  const [labels, setLabels] = useState([]);

  return (
    <>
      <div class="row mb-4 justify-content-between"></div>
      <div class="row" id="previewImage">
        {result.data?.map((arr, index) => (
          <div
            className="col-3 col-md-2 col-xxl-2 mb-2 mb-md-3 text-center"
            key={index}
          >
            <div className="image-container" key={index}>
              <Image
                src={`data:image/<mime-type>;base64, ${arr.image}`}
                alt=""
                className="w-100 rounded-1"
                height={100}
                width={100}
              />
            </div>
          </div>
        ))}
      </div>
      <hr class="opacity-25" />
      <div class="row justify-content-between">
        <div class="col-4">
          <p class="mb-0">Perhitungan Waktu</p>
        </div>
        <div class="col-8">
          <p class="mb-0" id="time_estimation"></p>
        </div>
      </div>
      <hr class="opacity-25" />
      <div class="row justify-content-between" id="log_uji">
        <div class="col-4">
          <p class="mb-0">Model</p>
        </div>
        <div class="col-8">
          <p class="mb-0">{engineArr[engine][2]}</p>
        </div>
        <div class="col-12">
          <hr class="opacity-25" />
        </div>
        <div class="col-4">
          <p class="mb-0">Engine</p>
        </div>
        <div class="col-8">
          <p class="mb-0">{engineArr[engine][0]}</p>
        </div>
        <div class="col-12">
          <hr class="opacity-25" />
        </div>
        <div class="col-4">
          <p class="mb-0">Timestamp</p>
        </div>
        <div class="col-8">
          <p class="mb-0">Time</p>
        </div>
      </div>
    </>
  );
};

const Detail = ({ result }) => {
  const params = useSearchParams();
  const engine = params.get("engine");

  console.log(result);

  const data_count =
    engine == "predict_corrosion" || engine == "predict_banana_ripeness"
      ? null
      : Object.fromEntries(
          result.data[0].bounding_boxes.map((value) => [
            value.class_name,
            result.data[0].bounding_boxes.filter(
              (v) => v.class_name === value.class_name
            ).length,
          ])
        );

  const probability_data =
    engine == "predict_corrosion" || engine == "predict_banana_ripeness"
      ? result.data[0]
      : null;

  return (
    <>
      <p class="mb-4 mt-4 fw-semibold" id="detail-title">
        Detail Informasi
      </p>
      <div class="row align-items-strech" id="detail-object-detection">
        {result.data.map((arr, index) => (
          <>
            <div class="col-12 col-md-4 col -xxl-3 mb-3">
              <div class="card border-0 outline-0 shadow-sm h-100">
                <div class="card-body">
                  <div class="row">
                    {console.log(arr, "jha")}
                    <div class="col-12 col-md-12 mb-2">
                      <div
                        class="w-100 h-100 rounded-2"
                        style={{
                          aspectRatio: "2/1",
                          backgroundImage: `url("data:image/<mime-type>;base64, ${arr.image}")`,
                          backgroundPosition: "top left",
                          backgroundSize: "cover",
                          backgroundRepeat: "no-repeat",
                        }}
                      ></div>
                    </div>
                    <div class="col-12 col-md-12">
                      <p class="text-smaller opacity-75 mb-0 mt-3">
                        Grafik Batang
                        {console.log(data_count)}
                      </p>
                      <Bar
                        options={options}
                        data={{
                          labels:
                            engine == "predict_corrosion" ||
                            engine == "predict_banana_ripeness"
                              ? [probability_data.class_name]
                              : Array.from(
                                  new Set(
                                    arr.bounding_boxes.map(
                                      (val) => val.class_name
                                    )
                                  )
                                ),
                          datasets: [
                            {
                              label: [""],
                              data:
                                engine == "predict_corrosion" ||
                                engine == "predict_banana_ripeness"
                                  ? [probability_data.probabilities.toFixed(2)]
                                  : Array.from(
                                      new Set(
                                        arr.bounding_boxes.map(
                                          (val) => val.class_name
                                        )
                                      )
                                    ).map((value) => {
                                      return Object.fromEntries(
                                        arr.bounding_boxes.map((value) => [
                                          value.class_name,
                                          arr.bounding_boxes.filter(
                                            (v) =>
                                              v.class_name === value.class_name
                                          ).length,
                                        ])
                                      )[value];
                                    }),

                              backgroundColor: [
                                "rgba(255, 159, 64, 0.4)",
                                "rgba(75, 192, 192, 0.4)",
                                "rgba(54, 162, 235, 0.4)",
                                "rgba(255, 99, 132, 0.4)",
                                "rgba(153, 102, 255, 0.4)",
                                "rgba(255, 205, 86, 0.4)",
                                "rgba(201, 203, 207, 0.4)",
                              ],
                              borderColor: [
                                "rgb(255, 159, 64)",
                                "rgb(75, 192, 192)",
                                "rgb(54, 162, 235)",
                                "rgb(255, 99, 132)",
                                "rgb(153, 102, 255)",
                                "rgb(255, 205, 86)",
                                "rgb(201, 203, 207)",
                              ],
                              fill: true,
                              lineTension: 0.1,
                              borderCapStyle: "butt",
                              borderDash: [],
                              borderDashOffset: 0.0,
                              borderJoinStyle: "miter",
                              pointBorderWidth: 1,
                              pointHoverRadius: 3,
                              pointHoverBorderWidth: 8,
                              pointRadius: 2,
                              pointHitRadius: 8,
                              barThickness: 20,
                            },
                          ],
                        }}
                      />
                      <table class="table table-bordered text-smaller">
                        <thead>
                          <tr>
                            <th
                              style={{ width: "40px" }}
                              class="opacity-75 text-center p-1 bg-transparent"
                            >
                              No
                            </th>
                            <th class="opacity-75 bg-transparent p-1">Label</th>
                            <th class="opacity-75 bg-transparent p-1">Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {engine == "predict_corrosion" ||
                          engine == "predict_banana_ripeness" ? (
                            <>
                              <tr>
                                <td class="text-center p-1 bg-transparent">
                                  1
                                </td>
                                <td class="p-1 bg-transparent">
                                  {probability_data.class_name}
                                </td>
                                <td class="p-1 bg-transparent">
                                  {probability_data.probabilities.toFixed(2)}
                                </td>
                              </tr>
                            </>
                          ) : (
                            <>
                              {Array.from(
                                new Set(
                                  arr.bounding_boxes.map(
                                    (val) => val.class_name
                                  )
                                )
                              ).map((val, index) => (
                                <tr key={index}>
                                  <td class="text-center p-1 bg-transparent">
                                    {index + 1}
                                  </td>
                                  <td class="p-1 bg-transparent">{val}</td>
                                  <td class="p-1 bg-transparent">
                                    {
                                      Object.fromEntries(
                                        arr.bounding_boxes.map((value) => [
                                          value.class_name,
                                          arr.bounding_boxes.filter(
                                            (v) =>
                                              v.class_name === value.class_name
                                          ).length,
                                        ])
                                      )[val]
                                    }
                                  </td>
                                </tr>
                              ))}
                            </>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ))}
      </div>
    </>
  );
};

export default Result;
