"use client";

import { useEffect, useRef, useState } from "react";
import ModalAlert from "@/components/modalAlert";
import { FiUploadCloud } from "react-icons/fi";
import DemoContainer from "../demoContainer";
import Uppy from "@uppy/core";
import ImageEditor from "@uppy/image-editor";
import { Dashboard } from "@uppy/react";
import DropTarget from "@uppy/drop-target";
import { useRouter, useSearchParams } from "next/navigation";

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
  const [currentStep, setCurrentStep] = useState("select-dataset");
  const [done, setDone] = useState(true);
  const [fileNumber, setFileNumber] = useState(0);
  const directoryRef = useRef(null);
  const imgFileRef = useRef(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const engine = searchParams.get("engine");

  const handleNextStep = () => {
    if (currentStep === "select-dataset") {
      router.push(`/dashboard/demo?engine=${engine}&option=predict`);
      setCurrentStep("predict");
      menu[0].doneTask = true;
    } else if (currentStep === "predict") {
      router.push(`/dashboard/demo?engine=${engine}&option=result`);
      setCurrentStep("result");
      menu[1].doneTask = true;
    }
  };

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
      <input type="file" id="fileInput" multiple />
    </DemoContainer>
  );
};

export default SelectDataset;
