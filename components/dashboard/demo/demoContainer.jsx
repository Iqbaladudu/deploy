"use client";

import DashboardContentWrapper from "../dashboardContentWrapper";
import { FaCircle, FaCheckCircle } from "react-icons/fa";
import { TbSquareRoundedChevronDown } from "react-icons/tb";
import { useRouter, useSearchParams } from "next/navigation";
import { createTitle } from "@/app/utils";
import { engineData } from "@/app/constant";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";

const menu = [
  { label: "Import Gambar", url: "select-dataset", doneTask: false },
  { label: "Prediksi", url: "predict", doneTask: false },
  { label: "Laporan Hasil", url: "result", doneTask: false },
];

const DemoContainer = ({ children }) => {
  const [currentStep, setCurrentStep] = useState("select-dataset");
  const searchParams = useSearchParams();
  const option = searchParams.get("option");
  const engine = searchParams.get("engine");
  const router = useRouter();
  const title = createTitle(engine);
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const description = engineData.find(
    (item) => item.title === title
  ).description;

  const handleStepClick = (url) => {
    setCurrentStep(url);
    if (url === "predict") {
      menu[0].doneTask = true;
    } else if (url === "result") {
      menu[1].doneTask = true;
    }
  };

  const handleNextStep = () => {
    if (currentStep === "select-dataset") {
      router.push(`/dashboard/demo?engine=${engine}&option=predict`);
      setCurrentStep("predict");
      menu[0].doneTask = true;
    } else if (currentStep === "predict") {
      router.push(`/dashboard/demo?engine=${engine}&option=result`);
      setCurrentStep("result");
      menu[1].doneTask = true;
    }
  };

  return (
    <DashboardContentWrapper>
      <div className="container">
        <div
          className={`row gap-0 column-gap-3 ${isMobile ? "row-cols-1" : ""}`}
        >
          <div className="col mb-5 col-lg-4 p-0">
            <div className="text-primary fs-title fw-bold mb-3">{title}</div>
            <div className="text-label mb-3">{description}</div>
            <div className="flex flex-row bg-white rounded-3 py-0 px-0">
              <div className="fw-bold text-black py-2 px-3">Generate</div>
              <div className="text-gray-dark py-2 px-3">
                <FaCheckCircle /> <span>Pilih engine</span>
              </div>
              {menu.map(({ label, url, doneTask }, index) => (
                <div
                  className={`${
                    option === url ? "text-white bg-primary" : "text-gray-dark"
                  } py-2 px-3`}
                  key={index}
                >
                  {" "}
                  {doneTask ? <FaCheckCircle /> : <FaCircle />}{" "}
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="col bg-white rounded-3 p-4">
            <div className="d-flex flex-row justify-content-between align-items-center mb-3">
              <div className="text-black fw-bold">Import Gambar</div>
              <div
                className="bg-primary text-white py-1 px-2 rounded-3 d-flex flex-row justify-content-center align-items-center gap-0 column-gap-1"
                style={{ cursor: "pointer" }}
                onClick={handleNextStep}
              >
                <TbSquareRoundedChevronDown />
                <span>Simpan & Lanjutkan</span>
              </div>
            </div>
            <div className="border border-gray mb-3"></div>
            <div className="d-flex flex-column">{children}</div>
          </div>
        </div>
      </div>
    </DashboardContentWrapper>
  );
};

export default DemoContainer;
