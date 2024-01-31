"use client";

import { useRouter, useSearchParams } from "next/navigation";
import SelectDataset from "./select-dataset";
import Predict from "./predict";
import Result from "./result";

import bgImageCorporate from "@/public/bg-image-corporate.png";
import { getEngine } from "@/app/service";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useEngineStore } from "@/app/store";
import EngineDetail from "./engine-detail";

const Card = ({
  title,
  image,
  base_url_api,
  desc,
  category_data,
  type_data,
}) => {
  const router = useRouter();
  return (
    <div className="col-12 col-md-6 col-xxl-4 mb-2">
      <div
        className="card border-0 outline-0 shadow-sm mb-3 pointer card-engine"
        onClick={() => {
          router.push(
            `/dashboard/demo?engine=${base_url_api}&option=select-engine`
          );
        }}
      >
        <div className="card-body">
          <div className="row">
            <div className="col-12 col-md-3 mb-2 mb-md-0">
              <div className="w-100 h-100">
                <div
                  className="w-100 h-100 rounded-2"
                  style={{
                    backgroundImage: `url("https://annotation.aiforindonesia.com${image}")`,
                    minHeight: "150px",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                  }}
                ></div>
              </div>
            </div>
            <div className="col-12 col-md-9">
              <div className="d-flex mb-2">
                <span className="badge bg-secondary rounded-1 me-2">
                  {category_data.name}
                </span>
                <span className="badge bg-secondary rounded-1">
                  {type_data.name}
                </span>
              </div>
              <p className="fw-semibold fs-5 mb-1 card-engine-title">{title}</p>
              <p className="text-smaller mb-0">{desc}</p>
              {/* <a
                className="d-none"
                id="btn-vehicle"
                href="/upload.html?engine=counting-vehicle-quantity"
              >
                Coba
              </a> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SelectEngine = () => {
  const { isPending, isSuccess, data } = useQuery({
    queryKey: ["engine"],
    queryFn: getEngine,
  });

  const addData = useEngineStore((state) => state.addData);

  useEffect(() => {
    if (!isPending) {
      addData(data.data);
    }
  }, [addData, data, isPending]);

  return (
    <div className="content w-100 p-0">
      <div className="container-fluid p-4">
        <div
          className="card border-0 outline-0 shadow-sm mb-3"
          style={{
            backgroundImage: `url(${bgImageCorporate.src})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="card-body px-4">
            <p className="fs-3 fw-bold text-primary mb-0">Axioma API Demo</p>
            <p>
              A user-friendly and specialized AI Engine designed for your AI
              solution in various industries, developed by Indonesia AI (PT.
              Teknologi Artifisial Indonesia).
            </p>

            <div className="d-none d-md-flex align-items-center">
              <p className="mb-0 me-2">Domain Option: </p>
              <div
                style={{ width: "30px", height: "30px" }}
                className="mx-2 d-flex align-items-center justify-content-center rounded-circle bg-dark"
              >
                <i
                  className="fa fa-building text-white"
                  style={{ fontSize: "x-small" }}
                ></i>
              </div>
              <p className="mb-0 me-3">Smart City</p>
              <div
                style={{ width: "30px", height: "30px" }}
                className="mx-2 d-flex align-items-center justify-content-center rounded-circle bg-dark"
              >
                <i
                  className="fa fa-archive text-white"
                  style={{ fontSize: "x-small" }}
                ></i>
              </div>
              <p className="mb-0 me-3">Retail</p>
              <div
                style={{ width: "30px", height: "30px" }}
                className="mx-2 d-flex align-items-center justify-content-center rounded-circle bg-dark"
              >
                <i
                  className="fa fa-industry text-white"
                  style={{ fontSize: "x-small" }}
                ></i>
              </div>
              <p className="mb-0 me-3">Manufacture</p>
            </div>

            <div className="d-md-none d-block">
              <p className="me-2 mb-2">Project Type: </p>
              <div className="row">
                <div className="col-auto">
                  <center>
                    <div
                      style={{ width: "30px", height: "30px" }}
                      className="d-flex align-items-center justify-content-center rounded-circle bg-dark"
                    >
                      <i
                        className="fa fa-building text-white"
                        style={{ fontSize: "x-small" }}
                      ></i>
                    </div>
                    <p className="mb-0">Smart City</p>
                  </center>
                </div>
                <div className="col-auto">
                  <center>
                    <div
                      style={{ width: "30px", height: "30px" }}
                      className="d-flex align-items-center justify-content-center rounded-circle bg-dark"
                    >
                      <i
                        className="fa fa-archive text-white"
                        style={{ fontSize: "x-small" }}
                      ></i>
                    </div>
                    <p className="mb-0">Retail</p>
                  </center>
                </div>
                <div className="col-auto">
                  <center>
                    <div
                      style={{ width: "30px", height: "30px" }}
                      className="d-flex align-items-center justify-content-center rounded-circle bg-dark"
                    >
                      <i
                        className="fa fa-industry text-white"
                        style={{ fontSize: "x-small" }}
                      ></i>
                    </div>
                    <p className="mb-0">Manufacture</p>
                  </center>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-12">
            <p className="text-smaller fw-semibold opacity-50">Daftar engine</p>
          </div>
          {!isPending && isSuccess && (
            <>
              {data?.data.map((props) => (
                <Card key={props.id} {...props} />
              ))}
            </>
          )}
          <div className="d-flex justify-content-center">
            {isPending && (
              <div
                className="spinner-border text-white spinner-border-sm"
                role="status"
              ></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Option = () => {
  const searchParams = useSearchParams();
  const option = searchParams.get("option");
  const engine = searchParams.get("engine");

  const components = {
    "select-engine": <EngineDetail />,
    "select-dataset": <SelectDataset />,
    predict: <Predict />,
    result: <Result />,
  };

  return components[option] || <div>Not Found</div>;
};

// Refactor Demo
const Demo = () => {
  const searchParams = useSearchParams();
  const option = searchParams.get("option");
  const engine = searchParams.get("engine");

  return option && engine ? <Option /> : <SelectEngine />;
};

export default Demo;
