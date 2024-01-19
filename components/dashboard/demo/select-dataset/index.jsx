"use client";

import { useEffect, useRef, useState } from "react";
import DemoContainer from "../demoContainer";
import Uppy from "@uppy/core";
import ImageEditor from "@uppy/image-editor";
import DropTarget from "@uppy/drop-target";
import { useRouter, useSearchParams } from "next/navigation";
import { convertToBase64 } from "@/app/utils";
import useImgArrStore from "@/app/store/useImgArrStore";
import DragDrop from "@uppy/drag-drop";
import { Dashboard } from "@uppy/react";
import { useBase64ArrStore } from "@/app/store";

const baseUppy = new Uppy({
  restrictions: {
    allowedFileTypes: [".jpg", ".jpeg", ".png", ".gif"],
  },
});

// if (typeof window === "object") {
//   const dragDrop = baseUppy.use(DropTarget, {
//     target: "#dragImageHere",
//     onDragLeave: (event) => {
//       event.stopPropagation();
//     },
//   });
// }

const uppy = baseUppy.use(ImageEditor);

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
  const removeImage = useImgArrStore((state) => state.removeImage);
  const removeAll = useImgArrStore((state) => state.removeAll);
  const images = useImgArrStore((state) => state.images);
  const base64Img = useBase64ArrStore((state) => state.base64Img);
  const removeBase64Img = useBase64ArrStore((state) => state.removeBase64Img);
  const removeBase64ImgAll = useBase64ArrStore(
    (state) => state.removeBase64ImgAll
  );

  useEffect(() => {
    if (base64Img.length === 0) {
      uppy.cancelAll();
    }
  }, []);

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

  uppy.on("file-added", (file) => {
    setFileArr((prevItem) => Array.from(new Set([...prevItem, file])));
  });

  uppy.on("file-removed", (file, reason) => {
    if (reason === "removed-by-user") {
      removeBase64Img(file.id);
      removeImage(file.id);
    } else if (reason === "cancel-all") {
      removeAll();
      // removeBase64ImgAll();
    }
  });

  uppy.on("files-added", (files) => {
    // for (let i = 0; i < files.length; i++) {
    //   const file = files[i];
    //   convertToBase64(file.data)
    //     .then((base64Image) => {
    //       const regex = /^data:image\/[a-z]+;base64,(.*)$/i;
    //       const dataImg = regex.exec(base64Image)[1];
    //       setFileArr((prevItem) => Array.from(new Set([...prevItem, dataImg])));
    //     })
    //     .catch((error) => {
    //       console.error(error);
    //     });
    // }
    setFileArr((prevItem) => Array.from(new Set([...prevItem, ...files])));
  });

  return (
    <DemoContainer>
      {/* <input type="file" id="dragImageHere" multiple onChange={handleChange} /> */}
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
    </DemoContainer>
  );
};

export default SelectDataset;
