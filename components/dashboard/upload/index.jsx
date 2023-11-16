"use client";

import Button from "@/components/variants/button";
import { usePathname } from "next/navigation";
import { FiUploadCloud } from "react-icons/fi";

import React, { useEffect, useRef, useState } from "react";
import Uppy from "@uppy/core";
import ImageEditor from "@uppy/image-editor";
import { Dashboard } from "@uppy/react";
import DropTarget from "@uppy/drop-target";
import { useRouter } from "next/navigation";
import { createRoot } from "react-dom/client";
import { ProgressBar, Spinner } from "react-bootstrap";
import Loading from "@/app/loading";
import DashboardContentWrapper from "../dashboardContentWrapper";

const baseUppy = new Uppy({
  restrictions: {
    allowedFileTypes: [".jpg", ".jpeg", ".png", ".gif"],
  },
});

if (typeof window === "object") {
  const dragDrop = baseUppy.use(DropTarget, {
    target: "#dragImageHere",
    onDragLeave: (event) => {
      event.stopPropagation();
    },
  });
}

const uppy = baseUppy.use(ImageEditor);
console.log(uppy.getFiles());

const DashboardButton = () => {
  return (
    <>
      <FiUploadCloud
        className="bg-primary-light text-primary rounded-circle p-3 mb-4"
        style={{ fontSize: "100px" }}
      />
      <p className="fs-title text-primary fw-bold">
        Seret dan lepas untuk upload gambar
      </p>
      <p className="fs-label">atau</p>
      <div className="d-flex flex-row gap-0 column-gap-2 justify-content-center">
        <label
          htmlFor="fileInput"
          className="fs-normal bg-primary-light text-primary py-2 rounded-2 px-4"
          style={{ cursor: "pointer" }}
        >
          Pilih file
        </label>
        <label
          htmlFor="fileInputDir"
          className="fs-normal bg-primary-light text-primary py-2 rounded-2 px-4"
          style={{ cursor: "pointer" }}
        >
          Pilih folder
        </label>
      </div>
      <p className="fs-label pt-2">ekstensi file* : .jpg, .jpeg, .png</p>
    </>
  );
};

const ProgressUploadDisplay = () => {
  return (
    <div>
      <p className="fs-title fw-bold text-primary mb-5">Upload gambar</p>
      <ProgressBar now={60} variant="primary" />
    </div>
  );
};

const Upload = () => {
  const [fileNumber, setFileNumber] = useState(0);
  const directoryRef = useRef(null);
  const imgFileRef = useRef(null);

  uppy.on("file-added", () => {
    setFileNumber(uppy.getFiles().length);
  });
  uppy.on("files-added", () => {
    setFileNumber(uppy.getFiles().length);
  });

  useEffect(() => {
    if (directoryRef.current !== null) {
      directoryRef.current.setAttribute("directory", "");
      directoryRef.current.setAttribute("webkitdirectory", "");
    }
  }, []);

  // useEffect(() => {
  //   const dashboardButtonNode = document.createElement("div");
  //   dashboardButtonNode.className = "w-25";
  //   const dashboard = createRoot(dashboardButtonNode);
  //   dashboard.render(<DashboardButton />);
  //   // dashboard.render(<ProgressUploadDisplay />);
  //   document
  //     .querySelector(
  //       "body > div > div > div > div.row.d-flex.flex-column.gap-0.row-gap-5.justify-content-start.m-0.bg-grayp-5.col > div > div:nth-child(5) > div > div > div > div.uppy-Dashboard-inner > div > div.uppy-Dashboard-AddFiles"
  //     )
  //     .appendChild(dashboardButtonNode);
  // }, []);

  // useEffect(() => {
  //   const imageUploadWithPreviewNode = document.createElement("div");
  //   imageUploadWithPreviewNode.className = "";
  //   const imgUpload = createRoot(imageUploadWithPreviewNode);
  //   imgUpload.render(<ProgressUploadDisplay />);
  //   document
  //     .querySelector(
  //       "body > div > div > div > div.row.d-flex.flex-column.gap-0.row-gap-5.justify-content-start.m-0.bg-grayp-5.col > div > div:nth-child(5) > div > div > div > div.uppy-Dashboard-inner > div > div.uppy-Dashboard-files > div"
  //     )
  //     ?.appendChild(imageUploadWithPreviewNode);
  // }, []);

  const handleFileUploadDirChange = (files) => {
    for (let i = 0; i < files.length; i++) {
      let file = files[i];
      uppy.addFile({
        name: file.name,
        type: file.type,
        data: file,
        meta: {
          // optional, store the directory path of a file so Uppy can tell identical files in different directories apart.
          relativePath: window.FileSystemDirectoryEntry,
        },
        source: "Local",
        isRemote: false,
      });
    }
  };

  const handleFileUploadChange = (files) => {
    for (let i = 0; i < files.length; i++) {
      let file = files[i];
      uppy.addFile({
        name: file.name,
        type: file.type,
        data: file,
        source: "Local",
        isRemote: false,
      });
    }
  };

  return (
    <DashboardContentWrapper>
      <div className="d-flex flex-row justify-content-between align-items-center">
        <div className="fs-title">
          <FiUploadCloud /> <span>Upload</span>
        </div>
        <div>
          <Button>Simpan & Lanjutkan</Button>
        </div>
      </div>
      <div className="fs-normal d-flex flex-row gap-0 column-gap-2 align-items-center">
        <div>Nama Batch</div>
        <div className="px-4 py-2 rounded-2 border border-primary bg-white">
          <p className="m-0 p-0">Uploaded on 10/23/23 at 12:05 pm</p>
        </div>
      </div>
      <div
        id="dragImageHere"
        className="p-3 bg-white rounded-3 d-flex flex-column flex-md-row gap-0 row-gap-3 row-gap-md-0 justify-content-between align-items-center border"
      >
        <div className="d-flex flex-row gap-0 column-gap-2">
          <div>
            <FiUploadCloud
              className="bg-primary-light text-primary rounded-circle p-3"
              style={{ fontSize: "49px" }}
            />
          </div>
          <div>
            <div className="fw-medium text-primary">
              Seret dan lepas untuk upload gambar
            </div>
            <div>ekstensi file* : .jpg, .jpeg, .png</div>
          </div>
        </div>
        <div className="d-flex flex-row gap-0 column-gap-2">
          <label
            htmlFor="fileInput"
            className="fs-normal bg-primary-light text-primary py-2 rounded-2 px-2 py-md-4"
            style={{ cursor: "pointer" }}
          >
            Pilih file
          </label>
          <label
            htmlFor="fileInputDir"
            className="fs-normal bg-primary-light text-primary py-2 rounded-2 px-2 py-md-4"
            style={{ cursor: "pointer" }}
          >
            Pilih folder
          </label>
        </div>
      </div>
      <div>
        <input
          accept="image/jpeg"
          multiple
          type="file"
          ref={directoryRef}
          onChange={(e) => {
            handleFileUploadDirChange(e.currentTarget.files);
          }}
          id="fileInputDir"
          hidden
        />
        <input
          accept="image/jpeg"
          multiple
          type="file"
          ref={imgFileRef}
          onChange={(e) => {
            handleFileUploadChange(e.currentTarget.files);
          }}
          id="fileInput"
          hidden
        />
        <Dashboard
          uppy={uppy}
          plugins={["ImageEditor"]}
          hideUploadButton={true}
          width={"100%"}
          locale={{
            strings: {
              poweredBy: "Indonesia AI",
            },
          }}
        />
      </div>
    </DashboardContentWrapper>
  );
};

export default Upload;
