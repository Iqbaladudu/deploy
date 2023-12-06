"use client";

import DemoContainer from "../demoContainer";
import predictImgExample from "@/public/predictSample1.png";
import Image from "next/image";

const Predict = () => {
  return (
    <DemoContainer>
      <div class="row mb-4 justify-content-between">
        <div class="col-12">
          <p class="mb-0" id="total-image"></p>
        </div>
      </div>
      <div class="row mb-4" id="previewImage"></div>
      <hr class="opacity-25" />
      <div class="row mb-4 justify-content-between">
        <div class="col-4">
          <p class="mb-0">Use Case</p>
        </div>
        <div class="col-8">
          <p class="mb-0" id="usecase-name"></p>
        </div>
      </div>
      <hr class="opacity-25" />
      <div class="row justify-content-between">
        <div class="col-4">
          <p class="mb-0">Model</p>
        </div>
        <div class="col-8">
          <p class="mb-0">YOLOv8</p>
        </div>
      </div>
    </DemoContainer>
  );
};

export default Predict;
