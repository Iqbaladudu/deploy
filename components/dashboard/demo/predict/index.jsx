"use client";

import DemoContainer from "../demoContainer";
import predictImgExample from "@/public/predictSample1.png";
import Image from "next/image";

const Predict = () => {
  return (
    <DemoContainer>
      <div className="d-flex flex-column gap-0 row-gap-3">
        <div className="d-flex flex-row justify-content-between">
          <p>6 Total data gambar</p>
          <p className="text-primary">Lihat semua gambar</p>
        </div>
        <div className="d-flex flex-row gap-0 column-gap-2 flex-wrap">
          <Image src={predictImgExample} className="h-50 w-50" alt="" />
          <Image src={predictImgExample} className="h-50 w-50" alt="" />
          <Image src={predictImgExample} className="h-50 w-50" alt="" />
          <Image src={predictImgExample} className="h-50 w-50" alt="" />
          <Image src={predictImgExample} className="h-50 w-50" alt="" />
          <Image src={predictImgExample} className="h-50 w-50" alt="" />
        </div>
        <div className="row row-cols-auto">
          <div className="col-4 fw-bold">Preprocessing</div>
          <div className="col">
            <div className="w-75">Auto-Orient: Applied</div>
            <div className="w-75">Resize: Stretch to 640x640</div>
          </div>
        </div>
        <div className="border border-gray mb-3"></div>
        <div className="row row-cols-auto">
          <div className="col-4 fw-bold">Augmentations</div>
          <div className="col">
            <div className="w-75">No augmentations were applied.</div>
          </div>
        </div>
        <div className="border border-gray mb-3"></div>
        <div className="row row-cols-auto">
          <div className="col-4 fw-bold">Use Case</div>
          <div className="col">
            <div className="w-75">Counting Vehicle Quantity</div>
          </div>
        </div>
        <div className="border border-gray mb-3"></div>
        <div className="row row-cols-auto">
          <div className="col-4 fw-bold">Model</div>
          <div className="col">
            <div className="w-75">YOLOv8</div>
          </div>
        </div>
      </div>
    </DemoContainer>
  );
};

export default Predict;
