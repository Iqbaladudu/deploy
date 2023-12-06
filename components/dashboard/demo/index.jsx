"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import SelectDataset from "./select-dataset";
import Predict from "./predict";
import Result from "./result";

import demoHeroImg from "@/public/demoHeroImg.png";
import imgMenu from "@/public/demoImgIconMenu.png";
import { createSlug } from "@/app/utils";
import { engineData } from "@/app/constant";
import bgImageCorporate from "@/public/bg-image-corporate.png";
import engineVehicle from "@/public/engine-vehicle.png";
import banana from "@/public/engine-banana-ripeness.png";
import ppe from "@/public/engine-ppe-detection.png";

const SelectEngine = () => {
  const router = useRouter();
  return (
    <div className="content w-100">
      <div className="container-fluid p-4">
        <div className="row mt-4">
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
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad,
                fugiat rem iusto alias necessitatibus quod voluptas dicta? Cum a
                corrupti placeat. Vero ducimus unde, eaque nulla consequuntur
                maxime maiores perspiciatis.
              </p>

              <div className="d-none d-md-flex align-items-center">
                <p className="mb-0 me-2">Project Type: </p>
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
          <div class="col-12">
            <p class="text-smaller fw-semibold opacity-50">Pilih engine</p>
          </div>
          <div className="col-12 col-md-6 col-xxl-4 mb-2">
            <div
              className="card border-0 outline-0 shadow-sm mb-3 pointer card-engine"
              onClick={() => {
                router.push(
                  `/dashboard/demo?engine=banana-ripeness&option=select-dataset`
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
                          backgroundImage: `url(${engineVehicle.src})`,
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
                        Smart City
                      </span>
                      <span className="badge bg-secondary rounded-1">
                        Object Detection
                      </span>
                    </div>
                    <p className="fw-semibold fs-5 mb-1 card-engine-title">
                      Counting Vehicle Quantity
                    </p>
                    <p className="text-smaller mb-0">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Laboriosam, tenetur modi possimus ad officia consequatur
                      itaque voluptatibus perferendis totam sequi pariatur quas
                      id soluta deserunt enim beatae quia, voluptates dolorum!
                    </p>
                    <a
                      className="d-none"
                      id="btn-vehicle"
                      href="/upload.html?engine=counting-vehicle-quantity"
                    >
                      Coba
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-xxl-4 mb-2">
            <div
              className="card border-0 outline-0 shadow-sm mb-3 pointer card-engine"
              onClick={() => {
                router.push(
                  `/dashboard/demo?engine=counting-vehicle-quantity&option=select-dataset`
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
                          backgroundImage: `url(${ppe.src})`,
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
                        Manufacture
                      </span>
                      <span className="badge bg-secondary rounded-1">
                        Object Detection
                      </span>
                    </div>
                    <p className="fw-semibold fs-5 mb-1 card-engine-title">
                      PPE Detection
                    </p>
                    <p className="text-smaller mb-0">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Laboriosam, tenetur modi possimus ad officia consequatur
                      itaque voluptatibus perferendis totam sequi pariatur quas
                      id soluta deserunt enim beatae quia, voluptates dolorum!
                    </p>
                    <a
                      className="d-none"
                      id="btn-vehicle"
                      href="/upload.html?engine=counting-vehicle-quantity"
                    >
                      Coba
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-xxl-4 mb-2">
            <div
              className="card border-0 outline-0 shadow-sm mb-3 pointer card-engine"
              onClick={() => {
                router.push(
                  `/dashboard/demo?engine=banana-ripeness&option=select-dataset`
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
                          backgroundImage: `url(${banana.src})`,
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
                        Retail
                      </span>
                      <span className="badge bg-secondary rounded-1">
                        Classification
                      </span>
                    </div>
                    <p className="fw-semibold fs-5 mb-1 card-engine-title">
                      Banana Ripeness Classification
                    </p>
                    <p className="text-smaller mb-0">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Laboriosam, tenetur modi possimus ad officia consequatur
                      itaque voluptatibus perferendis totam sequi pariatur quas
                      id soluta deserunt enim beatae quia, voluptates dolorum!
                    </p>
                    <a
                      className="d-none"
                      id="btn-vehicle"
                      href="/upload.html?engine=counting-vehicle-quantity"
                    >
                      Coba
                    </a>
                  </div>
                </div>
              </div>
            </div>
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
