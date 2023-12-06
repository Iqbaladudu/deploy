"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { createTitle } from "@/app/utils";
import { engineData } from "@/app/constant";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Pocket } from "react-feather";

const menu = [
  { label: "Import Gambar", url: "select-dataset", doneTask: true },
  { label: "Prediksi", url: "predict", doneTask: false },
  { label: "Laporan Hasil", url: "result", doneTask: true },
];

const DemoContainer = ({ children }) => {
  const searchParams = useSearchParams();
  const [currentStep, setCurrentStep] = useState("select-dataset");
  const option = searchParams.get("option");
  const engine = searchParams.get("engine");
  const router = useRouter();
  const title = createTitle(engine);
  const pathname = usePathname();

  const navigateHome = () => router.push("/dashboard/home");

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
    <div class="content w-100">
      <div class="container-fluid p-4">
        <div class="d-flex align-items-center text-smaller">
          <span
            class="text-decoration-none text-primary"
            onClick={navigateHome}
            style={{ cursor: "pointer" }}
          >
            Daftar Engine
          </span>
          <span class="mx-2 opacity-75"> {generatePath()}</span>
          <p id="page-title" class="mb-0 opacity-75"></p>
        </div>
        <div class="mt-4">
          <p
            class="fw-bold text-primary"
            style={{ fontSize: "calc(1.275rem + .3vw)!important" }}
            id="engine-name"
          >
            {title}
          </p>
        </div>
        <div class="row">
          <div class="col-12 col-md-3 mb-4 mb-md-0">
            <div class="card border-0 outline-0 shadow-sm">
              <div class="card-body px-0 pb-1">
                <p class="fw-semibold px-3">Generate</p>
                <ul class="list-unstyled">
                  <li class="py-2 opacity-50 px-3">
                    <span class="text-decoration-none text-dark">
                      <i class="fa fa-check-circle me-2"></i>Pilih engine
                    </span>
                  </li>
                  {menu.map(({ label, url, doneTask }, index) => (
                    <li
                      key={index}
                      className={`py-2 ${
                        option === url
                          ? "bg-soft-primary text-primary"
                          : "opacity-50"
                      } px-3`}
                    >
                      <span class={`${doneTask && ""}`}>
                        <i
                          className={`fa ${
                            doneTask ? "fa fa-check-circle" : "fa-circle"
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
          <div class="col-12 col-md-9">
            <div class="card border-0 outline-0 shadow-sm">
              <div class="card-body">
                <div class="d-flex justify-content-between align-items-center mb-4">
                  <p class="fw-semibold">Upload Gambar (jpeg/jpg/png)</p>
                  <button
                    onClick={handleNextStep}
                    class="btn btn-primary outline-0 border-0 shadow-none text-smaller"
                  >
                    <Pocket width="14" height="14" className="me-2" />
                    {option == "select-dataset" && "Simpan & Lanjutkan"}
                    {option == "predict" && "Mulai Prediksi"}
                  </button>
                </div>
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoContainer;
