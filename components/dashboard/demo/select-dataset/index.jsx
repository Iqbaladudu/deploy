"use client";

import { useEffect, useRef, useState } from "react";
import ModalAlert from "@/components/modalAlert";
import { FiUploadCloud } from "react-icons/fi";
import DemoContainer from "../demoContainer";
import Uppy from "@uppy/core";
import ImageEditor from "@uppy/image-editor";
import { Dashboard } from "@uppy/react";
import DropTarget from "@uppy/drop-target";

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

const SelectDataset = () => {
  const [selectedPosition, setSelectedPosition] = useState(true);
  const [done, setDone] = useState(true);
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
    <DemoContainer>
      <ModalAlert variants="success">
        <div>
          Pilih beberapa gambar yang akan dijadikan sebagai{" "}
          <span className="fw-bold">data test</span>
        </div>
      </ModalAlert>
      <ModalAlert variants="success">
        <div>
          Tidak punya gambar?{" "}
          <span className="fw-bold" style={{ cursor: "pointer" }}>
            Klik di sini
          </span>{" "}
          untuk menggunakan data test kami!
        </div>
      </ModalAlert>
      <div
        id="dragImageHere"
        className="p-3 bg-white rounded-3 d-flex flex-column flex-md-row gap-0 row-gap-3 row-gap-md-0 justify-content-between align-items-center border mb-3"
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
        <div className="d-flex flex-row gap-0 column-gap-1">
          <label
            htmlFor="fileInput"
            className="fs-normal bg-primary-light text-primary rounded-2 py-1 px-2"
            style={{ cursor: "pointer" }}
          >
            Pilih file
          </label>
          <label
            htmlFor="fileInputDir"
            className="fs-normal bg-primary-light text-primary rounded-2 py-1 px-2"
            style={{ cursor: "pointer" }}
          >
            Pilih folder
          </label>
        </div>
      </div>
      <div>
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
    </DemoContainer>
  );
};

export default SelectDataset;
