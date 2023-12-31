"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { createTitle } from "@/app/utils";
import { useEffect, useState } from "react";
import { Pocket } from "react-feather";
import useImgArrStore from "@/app/store/useImgArrStore";
import { createLog, getEngine, getUser, predict } from "@/app/service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEngineStore, useLogStore, useResultStore } from "@/app/store";
import { v4 as uuidv4 } from "uuid";

const menu = [
  { label: "Pilih Engine", url: "select-engine", doneTask: false },
  { label: "Import Gambar", url: "select-dataset", doneTask: false },
  { label: "Prediksi", url: "predict", doneTask: false },
  { label: "Laporan Hasil", url: "result", doneTask: false },
];

const titleArr = {
  predict_corrosion: [
    "Corrosion Classification",
    "Manufacture: Corrosion Classification",
  ],
  predict_ppe: ["PPE Detection", "Manufacture: PPE Detection"],
  predict_barcode_detection: ["Barcode Detection", "Retail: Barcode Detection"],
  predict_banana_ripeness: [
    "Banana Ripeness Classification",
    "Retail: Banana Ripeness Classification",
  ],
  predict_garbage_detection: [
    "Garbage Classification",
    "Smart City: Garbage Classification",
  ],
  predict_vehicle_detection: [
    "Counting Vehicle Quantity",
    "Smart City: Counting Vehicle Quantity",
  ],
};

const DemoContainer = ({ children }) => {
  const searchParams = useSearchParams();
  const [currentStep, setCurrentStep] = useState("select-dataset");
  const [currentEngineId, setCurrentEngineId] = useState();
  const [logId, setLogId] = useState();
  const [userId, setUserId] = useState();
  const option = searchParams.get("option");
  const engine = searchParams.get("engine");
  const router = useRouter();
  const title = createTitle(engine);
  const pathname = usePathname();
  const images = useImgArrStore((state) => state.images);
  const addResult = useResultStore((state) => state.addResult);
  const addLog = useLogStore((state) => state.addLog);
  const log = useLogStore((state) => state.log);

  const navigateHome = () => router.push("/dashboard/demo");

  const generatePath = () => {
    if (option && engine) {
      return ` / ${createTitle(engine)} / ${createTitle(option)}`;
    } else {
      const match = pathname.toString().match(/(?<=\/dashboard\/)\w+/);
      return match
        ? `/ ${match[0].charAt(0).toUpperCase() + match[0].slice(1)}`
        : null;
    }
  };

  const { isPending, data } = useQuery({
    queryKey: "user",
    queryFn: getUser,
  });

  useEffect(() => {
    if (!isPending) {
      setUserId(data.data.id);
    }
  }, [isPending, setUserId, data]);

  const startCreateLog = useMutation({
    mutationFn: createLog,
    onSuccess: (data) => {
      addLog(data.data);
      router.push(`/dashboard/demo?engine=${engine}&option=predict`);
      setCurrentStep("predict");
      menu[1].doneTask = true;
    },
  });

  const startPredict = useMutation({
    mutationFn: predict,
    onSuccess: (data) => {
      addResult(data);
      router.push(`/dashboard/demo?engine=${engine}&option=result`);
      setCurrentStep("result");
      menu[2].doneTask = true;
    },
  });

  const engines = useEngineStore((state) => state.engines);

  useEffect(() => {
    if (engine) {
      const currentEngine = engines.filter((arr) => arr.base_url_api == engine);
      setCurrentEngineId(currentEngine[0].id);
    }
  }, [engine, setCurrentEngineId, engines]);

  const handleNextStep = () => {
    if (option === "select-engine") {
      router.push(`/dashboard/demo?engine=${engine}&option=select-dataset`);
      setCurrentStep("predict");
      menu[0].doneTask = true;
    }
    if (option === "select-dataset") {
      startCreateLog.mutate({
        key: uuidv4(),
        last_step: "predict",
        user: userId,
        engine: currentEngineId,
      });
    }
  };

  const onPredict = () => {
    startPredict.mutate({
      engine_id: `${currentEngineId}`,
      log_id: `${log.id}`,
      images: images[0],
    });
  };

  return (
    <div className="content w-100">
      <div className="container-fluid p-4">
        <div className="d-flex align-items-center text-smaller">
          <span
            className="text-decoration-none text-primary"
            onClick={navigateHome}
            style={{ cursor: "pointer" }}
          >
            Daftar Engine
          </span>
          <span className="mx-2 opacity-75"> / {titleArr[engine][1]}</span>
          <p id="page-title" className="mb-0 opacity-75"></p>
        </div>
        <div className="mt-4">
          <p className="fw-bold text-primary fs-2" id="engine-name">
            {titleArr[engine][0]}
          </p>
        </div>
        <div className="row">
          <div className="col-12 col-md-3 mb-4 mb-md-0">
            <div className="card border-0 outline-0 shadow-sm">
              <div className="card-body px-0 pb-1">
                <p className="fw-semibold px-3">Generate</p>
                <ul className="list-unstyled">
                  {menu.map(({ label, url, doneTask }, index) => (
                    <li
                      key={index}
                      className={`py-2 ${
                        option === url
                          ? "bg-soft-primary text-primary"
                          : "opacity-50"
                      } px-3 ${menu[index].doneTask == true && "pointer"}`}
                      onClick={() =>
                        menu[index].doneTask == true &&
                        router.push(
                          `/dashboard/demo?engine=${engine}&option=${url}`
                        )
                      }
                    >
                      <span className={`${doneTask && ""}`}>
                        <i
                          className={`fa ${
                            doneTask
                              ? "fa fa-check-circle text-success"
                              : option == url
                              ? "fa fa-check-circle"
                              : "fa-circle"
                          } me-2`}
                        ></i>
                        {label}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-9">
            <div className="card border-0 outline-0 shadow-sm">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <p className="fw-semibold">
                    {option == "select-dataset" &&
                      "Upload Gambar (jpeg/jpg/png)"}
                    {option == "predict" && "Prediksi"}
                    {option == "result" && "Gambar Hasil Prediksi"}
                    {option == "select-engine" && "Pilih Engine"}
                  </p>
                  {option !== "result" && (
                    <button
                      onClick={option == "predict" ? onPredict : handleNextStep}
                      className="btn btn-primary outline-0 border-0 shadow-none text-smaller"
                      disabled={
                        option == "select-dataset" && images[0]?.length === 0
                      }
                    >
                      <Pocket width="14" height="14" className="me-2" />
                      {option == "select-dataset" && "Simpan & Lanjutkan"}
                      {option == "predict" && "Mulai Prediksi"}
                      {option == "select-engine" && "Pilih"}
                    </button>
                  )}
                </div>
                {startPredict.isPending || startCreateLog.isPending ? (
                  <>
                    <div className="d-flex justify-content-center">
                      <div
                        className="spinner-border spinner-border-sm text-white"
                        role="status"
                      ></div>
                    </div>
                  </>
                ) : (
                  <>
                    {option == "select-engine" || option == "result"
                      ? children[0]
                      : children}
                  </>
                )}
              </div>
            </div>
            {option == "select-engine" && children[1]}
            {option == "result" && children[1]}
            {option == "result" && children[2]}
            {option == "select-engine" && children[2]}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoContainer;
