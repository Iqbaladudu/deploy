"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import SelectDataset from "./select-dataset";
import bgImage from "@/public/bg-image-corporate.png";
import { FaArchive, FaBuilding, FaIndustry } from "react-icons/fa";
import engineImg from "@/public/engine-vehicle.png";
import banaRipeness from "@/public/engine-banana-ripeness.png";
import enginePPE from "@/public/engine-ppe-detection.png";

const Demo = () => {
  return (
    <div className="content w-100">
      <div className="container-fluid p-4">
        <div
          className="card border-0 outline-0 shadow-sm mb-3"
          style={{
            backgroundImage: `url(${bgImage.src})`,
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
              {renderProjectTypeBadge("Smart City", "fa-building")}
              {renderProjectTypeBadge("Retail", "fa-archive")}
              {renderProjectTypeBadge("Manufacture", "fa-industry")}
            </div>
            <div className="d-md-none d-block">
              <p className="me-2 mb-2">Project Type: </p>
              <div className="row">
                {renderProjectTypeBadgeSmall("Smart City", "fa-building")}
                {renderProjectTypeBadgeSmall("Retail", "fa-archive")}
                {renderProjectTypeBadgeSmall("Manufacture", "fa-industry")}
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-12">
            <p className="text-smaller fw-semibold opacity-50">Pilih engine</p>
          </div>
          {renderEngineCard(
            "Vehicle",
            engineImg,
            "Smart City",
            "Object Detection",
            "Counting Vehicle Quantity",
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, tenetur modi possimus ad officia consequatur itaque voluptatibus perferendis totam sequi pariatur quas id soluta deserunt enim beatae quia, voluptates dolorum!",
            "counting-vehicle-quantity"
          )}
          {renderEngineCard(
            "Banana",
            banaRipeness,
            "Retail",
            "Classification",
            "Banana Ripeness Classification",
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, tenetur modi possimus ad officia consequatur itaque voluptatibus perferendis totam sequi pariatur quas id soluta deserunt enim beatae quia, voluptates dolorum!",
            "banana-ripeness-classification"
          )}
          {renderEngineCard(
            "PPE",
            enginePPE,
            "Manufacture",
            "Object Detection",
            "PPE Detection",
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, tenetur modi possimus ad officia consequatur itaque voluptatibus perferendis totam sequi pariatur quas id soluta deserunt enim beatae quia, voluptates dolorum!",
            "ppe-detection"
          )}
        </div>
      </div>
    </div>
  );
};

const renderProjectTypeBadge = (type, iconClass) => (
  <>
    <div
      style={{ width: "30px", height: "30px" }}
      className="mx-2 d-flex align-items-center justify-content-center rounded-circle bg-black"
    >
      {iconClass == "fa-building" && (
        <FaBuilding className="text-white" style={{ fontSize: "x-small" }} />
      )}
      {iconClass == "fa-archive" && (
        <FaArchive className="text-white" style={{ fontSize: "x-small" }} />
      )}
      {iconClass == "fa-industry" && (
        <FaIndustry className="text-white" style={{ fontSize: "x-small" }} />
      )}
    </div>
    <p className="mb-0 me-3">{type}</p>
  </>
);

const renderProjectTypeBadgeSmall = (type, iconClass) => (
  <div className="col-auto">
    <center>
      <div
        style={{ width: "30px", height: "30px" }}
        className="d-flex align-items-center justify-content-center rounded-circle bg-dark"
      >
        <i
          className={`fa ${iconClass} text-white`}
          style={{ fontSize: "x-small" }}
        ></i>
      </div>
      <p className="mb-0">{type}</p>
    </center>
  </div>
);

const renderEngineCard = (
  title,
  image,
  badgeType,
  badgeText,
  cardTitle,
  cardDescription,
  engineParam
) => (
  <div className="col-12 col-md-6 col-xxl-4 mb-2">
    <div
      className="card border-0 outline-0 shadow-sm mb-3 pointer card-engine"
      onClick={() => handleEngineClick(engineParam)}
    >
      <div className="card-body">
        <div className="row">
          <div className="col-12 col-md-3 mb-2 mb-md-0">
            <div className="w-100 h-100">
              <div
                className="w-100 h-100 rounded-2"
                style={{
                  backgroundImage: `url(${image.src})`,
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
                {badgeType}
              </span>
              <span className="badge bg-secondary rounded-1">{badgeText}</span>
            </div>
            <p className="fw-semibold fs-5 mb-1 card-engine-title">
              {cardTitle}
            </p>
            <p className="text-smaller mb-0">{cardDescription}</p>
            <a
              className="d-none"
              id={`btn-${engineParam}`}
              href={`/upload.html?engine=${engineParam}`}
            >
              Coba
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const handleEngineClick = (engineParam) => {
  document.getElementById(`btn-${engineParam}`).click();
};

export default Demo;
