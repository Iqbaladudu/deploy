"use client";

import React from "react";
import { ProgressBar } from "react-bootstrap";
import DashboardContentWrapper from "../dashboardContentWrapper";
import { FaVectorSquare, FaImage } from "react-icons/fa";
import { BiRadioCircleMarked, BiRadioCircle } from "react-icons/bi";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useRouter } from "next/navigation";

const UnassignedSection = () => {
  const router = useRouter();
  return (
    <div className="border rounded-3 p-2 mb-3">
      <div className="mb-2">
        <div className="fw-bold text-black">Upload on 10/23/2023</div>
        <div className="text-gray-dark">at 10:03 WIB</div>
      </div>
      <div className="d-flex flex-row align-items-center gap-0 column-gap-1 mb-2">
        <FaImage />
        <span className="text-gray-dark">22 unassigned images</span>
      </div>
      <div>
        <div
          className="text-primary text-end"
          onClick={() => router.push("/dashboard/upload")}
          style={{ cursor: "pointer" }}
        >
          <span className="mx-2">Upload</span>
          <AiOutlineArrowRight />
        </div>
      </div>
    </div>
  );
};

const LabelingSection = () => (
  <div className="border border-primary rounded-3 p-2 mb-3 bg-primary-light">
    <div className="mb-2">
      <div className="fw-medium text-black">Upload on 10/23/2023</div>
      <div className="text-gray-dark">at 10:03 WIB</div>
    </div>
    <div className="mb-2">
      <ProgressBar variant="primary" now={60} />
    </div>
    <div className="mb-2">
      <div className="text-black fw-bold">12 images</div>
    </div>
    <div className="d-flex flex-row justify-content-start mb-2 text-black">
      <div>
        <BiRadioCircleMarked className="text-primary" />
        <span>5 Labeling</span>
      </div>
      <div className="mx-4">
        <BiRadioCircle className="text-black" />
        <span>7 Unlabeling</span>
      </div>
    </div>
    <div>
      <div className="text-primary text-end" style={{ cursor: "pointer" }}>
        <span className="mx-2">Start labeling</span>
        <AiOutlineArrowRight />
      </div>
    </div>
  </div>
);

const DatasetSection = () => (
  <div className="border rounded-3 p-2 mb-3">
    <div className="mb-2">
      <div className="fw-bold text-black">Upload on 10/23/2023</div>
      <div className="text-gray-dark">at 10:03 WIB</div>
    </div>
    <div className="d-flex flex-row align-items-center gap-0 column-gap-1">
      <FaImage />
      <span className="text-gray-dark">22 unassigned images</span>
    </div>
  </div>
);

const Labeling = () => (
  <DashboardContentWrapper>
    <div className="d-flex flex-row d-flex gap-0 column-gap-2 fs-title align-items-center">
      <FaVectorSquare style={{ fontSize: "22px" }} />
      <span className="fw-bold">Labeling</span>
    </div>
    <div className="d-flex flex-column flex-sm-row justify-content-around gap-0 column-gap-3 row-gap-3">
      <div className="flex-grow-1 bg-white p-3 rounded-3">
        <div className="d-flex flex-column align-items-center my-4 justify-contents-center">
          <div className="fw-bold text-black">Unassigned</div>
          <div className="text-gray-light">3 batch 48 images</div>
        </div>
        <UnassignedSection />
        <UnassignedSection />
        <UnassignedSection />
      </div>
      <div className="flex-grow-1 bg-white p-3 rounded-3">
        <div className="d-flex flex-column align-items-center my-4 justify-contents-center">
          <div className="fw-bold text-black">Labeling</div>
          <div className="text-gray-light">3 batch 48 images</div>
        </div>
        <LabelingSection />
      </div>
      <div className="flex-grow-1 bg-white p-3 rounded-3">
        <div className="d-flex flex-column align-items-center my-4 justify-contents-center">
          <div className="fw-bold text-black">Dataset</div>
          <div className="text-gray-light">3 batch 48 images</div>
        </div>
        <DatasetSection />
        <DatasetSection />
        <DatasetSection />
      </div>
    </div>
  </DashboardContentWrapper>
);

export default Labeling;
