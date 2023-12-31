"use client";

import React, { useEffect, useRef, useState } from "react";
import Uppy from "@uppy/core";
import ImageEditor from "@uppy/image-editor";
import { Dashboard } from "@uppy/react";
import DropTarget from "@uppy/drop-target";
import { convertToBase64 } from "@/app/utils";
import Link from "next/link";

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
      convertToBase64(file)
        .then((base64Image) => {
          console.log("Base64 image:", base64Image);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

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

  return (
    <div class="content w-100">
      <div class="container-fluid p-4">
        <div class="d-flex align-items-center text-smaller">
          <Link
            class="text-decoration-none text-primary pointer"
            href="/dashboard"
          >
            Beranda
          </Link>
          <span class="mx-2 opacity-75">/</span>
          <p id="page-title" class="mb-0 opacity-75">
            Upload
          </p>
        </div>
        <div class="mt-4 row">
          <div class="col-6">
            <p class="fs-4 d-flex align-items-center">
              <i
                data-feather="upload-cloud"
                width="20"
                height="20"
                class="me-2"
              ></i>
              Upload
            </p>
          </div>
          <div class="col-6">
            <button
              onclick="submit()"
              class="btn btn-primary outline-0 border-0 shadow-none text-smaller float-end"
            >
              <i data-feather="pocket" width="14" height="14" class="me-2"></i>
              Simpan & Lanjutkan
            </button>
          </div>
        </div>
        <div class="row mb-3">
          <div class="col-12 col-md-auto">
            <label for="batch_name">Nama Batch</label>
          </div>
          <div class="col-12 col-md-4">
            <input
              type="text"
              id="batch_name"
              placeholder="nama batch"
              value="Uploaded on 10/23/23 at 12:05 pm"
              class="form-control outline-none shadow-none py-2 rounded-2"
              autofocus
            />
          </div>
        </div>
        <div class="card border-0 outline-0 shadow-sm">
          <div class="card-body">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
