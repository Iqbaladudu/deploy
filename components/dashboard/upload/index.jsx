"use client";

import React, { useEffect, useRef, useState } from "react";
import Uppy from "@uppy/core";
import ImageEditor from "@uppy/image-editor";
import { Dashboard } from "@uppy/react";
import DropTarget from "@uppy/drop-target";
import { convertToBase64 } from "@/app/utils";
import Link from "next/link";
import { Pocket, UploadCloud } from "react-feather";
import { useSearchParams } from "next/navigation";
import useImgArrStore from "@/app/store/useImgArrStore";

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

const Upload = () => {
  const [fileNumber, setFileNumber] = useState(0);
  const [fileName, setFileName] = useState("Uploaded on 10/23/23 at 12:05 pm");
  const directoryRef = useRef(null);
  const searchParams = useSearchParams();
  const option = searchParams.get("option");
  const [fileArr, setFileArr] = useState([]);
  const images = useImgArrStore((state) => state.images);
  const addImage = useImgArrStore((state) => state.addImage);
  const removeAll = useImgArrStore((state) => state.removeAll);

  useEffect(() => {
    addImage(fileArr);
  }, [fileArr, addImage]);

  useEffect(() => {
    if (images[0]?.length === 0) {
      uppy.cancelAll();
    }
  }, [images]);

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

  uppy.on("file-removed", (file, reason) => {
    if (reason === "removed-by-user") {
      setFileArr(fileArr.filter((arr) => arr.id !== file.id));
      // removeBase64Img(file.id);
    } else if (reason === "cancel-all") {
      removeAll();
      setFileArr([]);
    }
  });

  uppy.on("file-added", (file) => {
    convertToBase64(file.data).then((base64Img) => {
      const regex = /^data:image\/[a-z]+;base64,(.*)$/i;
      file.base64 = regex.exec(base64Img)[1];
    });
    setFileArr((prevItem) => Array.from(new Set([...prevItem, file])));
  });

  uppy.on("files-added", (files) => {
    const regex = /^data:image\/[a-z]+;base64,(.*)$/i;
    for (let i = 0; i < files.length; i++) {
      convertToBase64(files[i].data).then((base64Img) => {
        files[i].base64 = regex.exec(base64Img)[1];
        setFileArr((prevItem) => Array.from(new Set([...prevItem, files[i]])));
      });
    }
  });

  return (
    <div className="content w-100">
      <div className="container-fluid p-4">
        <div className="d-flex align-items-center text-smaller">
          <Link
            className="text-decoration-none text-primary pointer"
            href="/dashboard"
          >
            Beranda
          </Link>
          <span className="mx-2 opacity-75">/</span>
          <p id="page-title" className="mb-0 opacity-75">
            Upload
          </p>
        </div>
        <div className="mt-4 row">
          <div className="col-6">
            <p className="fs-4 d-flex align-items-center">
              <UploadCloud
                data-feather="upload-cloud"
                width="20"
                height="20"
                className="me-2"
              />
              Upload
            </p>
          </div>
          <div className="col-6">
            <button
              onclick="submit()"
              className="btn btn-primary outline-0 border-0 shadow-none text-smaller float-end"
            >
              <Pocket
                data-feather="pocket"
                width="14"
                height="14"
                className="me-2"
              />
              Simpan & Lanjutkan
            </button>
          </div>
        </div>
        <div className="row mb-3 d-flex align-items-center">
          <div className="col-12 col-md-auto">
            <label for="batch_name">Nama Batch</label>
          </div>
          <div className="col-12 col-md-4">
            <input
              type="text"
              id="batch_name"
              placeholder="nama batch"
              value={fileName}
              className="form-control outline-none shadow-none py-2 rounded-2"
              onChange={(e) => setFileName(e.currentTarget.value)}
              autofocus
            />
          </div>
        </div>
        <div className="card border-0 outline-0 shadow-sm">
          <div className="card-body">
            <div
              style={{
                border: "1px dashed #E84D4D",
              }}
            >
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
