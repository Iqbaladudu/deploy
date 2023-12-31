"use client";

import { useEffect, useRef, useState } from "react";
import DemoContainer from "../demoContainer";
import Uppy from "@uppy/core";
import ImageEditor from "@uppy/image-editor";
import DropTarget from "@uppy/drop-target";
import { useRouter, useSearchParams } from "next/navigation";
import { convertToBase64 } from "@/app/utils";
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
  const [fileArr, setFileArr] = useState([]);
  const addImage = useImgArrStore((state) => state.addImage);
  const images = useImgArrStore((state) => state.images);

  useEffect(() => {
    addImage(fileArr);
  }, [fileArr, addImage]);

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

  const handleChange = (event) => {
    const files = [...event.target.files];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      convertToBase64(file)
        .then((base64Image) => {
          const regex = /^data:image\/[a-z]+;base64,(.*)$/i;
          const dataImg = regex.exec(base64Image)[1];
          setFileArr((prevItem) => [...prevItem, dataImg]);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <DemoContainer>
      <input type="file" id="fileInput" multiple onChange={handleChange} />
    </DemoContainer>
  );
};

export default SelectDataset;
