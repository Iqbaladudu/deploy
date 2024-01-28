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
  const [fileNumber, setFileNumber] = useState(0);
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
