"use client";

import { db } from "@/app/etc";
import { useLiveQuery } from "dexie-react-hooks";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Edit, Trash2 } from "react-feather";
import useImage from "use-image";
import { v4 as uuidv4 } from "uuid";
import FabricCanvas from "@/components/annotation/canvas";
import { Annotation, initializeFabric } from "@/lib/canvas";
import chroma from "chroma-js";

function generateRandomHexColor() {
  const hue = Math.random() * 360;
  const saturation = 80 + Math.random() * 20; // 80-100%
  const lightness = 40 + Math.random() * 20; // 40-60%
  return chroma(`hsl(${hue}, ${saturation}%, ${lightness}%)`).darken().hex();
}

function EditLabel({
  type,
  value = "",
  setBox = false,
  id,
  canvas,
  setEditLabel,
}) {
  const [labelValue, setLabelValue] = useState();
  useEffect(() => setLabelValue(value), [value]);

  return (
    <div>
      <input
        type="text"
        name="label"
        value={labelValue}
        placeholder="Label"
        onChange={(e) => setLabelValue(e.target.value)}
        className="form-control outline-none shadow-none py-1 rounded-2"
      />
      <div className="w-100 d-flex justify-content-center">
        <button
          className="btn"
          onClick={() => {
            canvas
              .getObjects()
              .find((arr) => arr.id === id)
              ?.set({ label: labelValue, done: true });
            setBox();

            if (type === "EDIT") {
              setEditLabel();
            }
          }}
        >
          Save
        </button>
        <button
          className="btn"
          onClick={() => {
            if (type === "SAVE") {
              const obj = canvas.getObjects().find((arr) => arr.id === id);
              canvas?.remove(obj);
              const removeFilter = canvas
                .getObjects()
                .find((arr) => arr.type === "filter");
              canvas?.remove(removeFilter);
              setBox();
            } else {
              setBox();
              setEditLabel(null);
            }
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default function Annotate() {
  const searchParams = useSearchParams();
  const imageId = searchParams.get("img");
  const batch = searchParams.get("batch");
  const getImage = useLiveQuery(() => db.upload.toArray())
    ?.filter((arr) => arr.id == batch)[0]
    .data.filter((arr) => arr.id == imageId)[0].base64;

  const [dimensions, setDimensions] = useState();
  const [image] = useImage(`data:image/<mime-type>;base64, ${getImage}`);

  useEffect(() => {
    if (image) {
      const originalWidth = image.width;
      const originalHeight = image.height;
      const desiredPercentage = 40;
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight; // Get screen height
      const maxAllowedHeight = screenHeight * 0.8; // Allow some margin

      // Calculate potential new width and height
      const potentialNewWidth = (screenWidth * desiredPercentage) / 100;
      const potentialNewHeight =
        (potentialNewWidth * originalHeight) / originalWidth;

      let newWidth, newHeight;

      // Check if potential height exceeds the max allowed
      if (potentialNewHeight > maxAllowedHeight) {
        newHeight = maxAllowedHeight; // Cap the height
        newWidth = (newHeight * originalWidth) / originalHeight; // Adjust width accordingly
      } else {
        newWidth = potentialNewWidth;
        newHeight = potentialNewHeight;
      }
      setDimensions({
        width: newWidth,
        height: newHeight,
      });
    }
  }, [image]);

  const canvasRef = useRef(null);
  const canvasWrapper = useRef(null);
  const fabricRef = useRef(null);
  const canvas = useRef(null);
  const [selected, setSelected] = useState(null);

  const [box, setBox] = useState();
  const [editLabel, setEditLabel] = useState();

  useEffect(() => {
    const annotation = new Annotation({
      canvasRef: canvasRef,
      fabricRef: fabricRef,
      dimensions: dimensions,
      canvasWrapper: canvasWrapper,
    });

    // canvas.current = initializeFabric({
    //   canvasRef,
    //   fabricRef,
    //   canvasWrapper,
    // });

    // const imgElement = document.getElementById("bening");
    // const img = new fabric.Image(imgElement, {
    //   hoverCursor: "crosshair",
    //   selectable: false,
    // });

    // img.scaleToHeight(dimensions?.height);
    // img.scaleToWidth(dimensions?.width);

    // img.bringForward();

    // canvas.current.centerObject(img);

    // canvas.current.add(img);

    // let rect, darkeningRect, startX, startY, group, highlight;

    // darkeningRect = new fabric.Rect({
    //   absolutePositioned: true,
    //   left: img.left,
    //   top: img.top,
    //   width: img.width * img.scaleX,
    //   height: img.height * img.scaleY,
    //   fill: "rgba(0, 0, 0, 0.5)",
    //   selectable: false,
    //   evented: false,
    //   type: "filter",
    // });

    // if (
    //   canvas.current.getObjects().filter((arr) => arr.type == "rect").length > 0
    // ) {
    //   canvas.current.add(darkeningRect);
    // } else {
    //   canvas.current.remove(darkeningRect);
    // }

    // canvas.current.on("mouse:down", function (options) {
    //   if (options.target !== img || options.target?.type === "rect") {
    //     setSelected(options.target?.id);
    //     return;
    //   }

    //   setSelected(null);

    //   startX = options.pointer.x;
    //   startY = options.pointer.y;

    //   rect = new fabric.Rect({
    //     left: startX,
    //     top: startY,
    //     width: 0,
    //     height: 0,
    //     fill: "transparent",
    //     evented: false,
    //     globalCompositeOperation: "destination-out",
    //   });
    //   canvas.current.add(rect);
    //   canvas.current.bringToFront(darkeningRect);
    // });

    // canvas.current.on("mouse:move", function (options) {
    //   if (rect) {
    //     rect.set({
    //       width: options.pointer.x - startX,
    //       height: options.pointer.y - startY,
    //     });

    //     const layer = new fabric.Rect({
    //       width: img.width,
    //       height: img.height,
    //       left: img.left,
    //       top: img.top,
    //       absolutePositioned: true,
    //     });

    //     highlight = new fabric.Rect({
    //       width: rect.width,
    //       height: rect.height,
    //       left: rect.left,
    //       top: rect.top,
    //       absolutePositioned: true,
    //       globalCompositeOperation: "destination-out",
    //     });

    //     group = new fabric.Group([layer, highlight], {
    //       absolutePositioned: true,
    //     });

    //     darkeningRect.clipPath = group;

    //     canvas.current.renderAll();
    //   }
    // });

    // canvas.current.on("mouse:up", function () {
    //   if (rect && rect.width > 20 && rect.height > 20) {
    //     rect.set({ evented: true, id: uuidv4(), type: "rect", done: false });

    //     highlight?.set({
    //       id: rect.id,
    //     });
    //     const rectId = rect.id;

    //     console.log(group._objects);

    //     setBox(rectId);

    //     highlight = null;
    //     rect = null;
    //   } else {
    //     rect = null;
    //   }
    // });

    // canvas.current.renderAll();
  }, [canvasRef, dimensions]);

  useEffect(() => {
    canvas.current?.on("object:modified", function (options) {
      if (options.target && options.target?.type === "rect") {
        const movedRect = options.target;
        console.log(
          "Rectangle moved to:",
          movedRect.left,
          movedRect.top,
          movedRect.id,
          selected
        );
      }
    });
  }, [selected]);

  return (
    <div
      className="content d-flex align-content-center m-0"
      style={{
        height: "calc(-60px + 100vh)",
        paddingLeft: 60,
      }}
    >
      <div
        className="col-2 me-3"
        style={{
          boxShadow: "none",
          paddingLeft: 20,
          paddingRight: 20,
          borderRight: "1px solid #97979757",
        }}
      >
        <div className="d-flex gap-1 my-2 flex-column">
          {canvas?.current
            ?.getObjects()
            .filter((obj) => obj.type === "rect")
            .map((arr, index) => (
              <div key={index} className="d-flex flex-row gap-1 w-full">
                {editLabel === arr?.id ? (
                  <EditLabel
                    type="EDIT"
                    value={arr?.label}
                    setBox={setBox}
                    id={arr?.id}
                    canvas={canvas.current}
                    setEditLabel={setEditLabel}
                  />
                ) : (
                  <>
                    {arr?.done && (
                      <div
                        className={`d-flex flex-row gap-1 justify-content-between w-full`}
                        style={{
                          width: "100%",
                        }}
                      >
                        <div>
                          <p
                            class="fw-semibold my-auto"
                            style={{
                              fontSize: 15,
                            }}
                          >
                            {arr?.label}
                          </p>
                        </div>
                        <div className="d-flex flex-row gap-2">
                          <div
                            className="pointer"
                            onClick={() => setEditLabel(arr?.id)}
                          >
                            <Edit height={10} width={10} />
                          </div>
                          <div
                            className="pointer"
                            onClick={() => {
                              if (
                                confirm(
                                  "Apakah kamu yakin akan menghapus bounding box ini?"
                                ) === true
                              ) {
                                const obj = canvas?.current
                                  .getObjects()
                                  .find((item) => item.id === arr?.id);
                                canvas?.current.remove(obj);
                                setEditLabel(1);
                              } else return;
                            }}
                          >
                            <Trash2 height={10} width={10} />
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
        </div>
        <div className="d-flex gap-1 my-2 flex-column">
          {box && (
            <EditLabel
              type="SAVE"
              id={box}
              setBox={setBox}
              canvas={canvas.current}
            />
          )}
        </div>
      </div>
      {imageId && batch ? (
        <div
          style={{
            height: "calc(-60px + 100vh)",
            overflow: "hidden",
          }}
          ref={canvasWrapper}
          className="col-8 d-flex justify-content-center align-items-center"
        >
          <FabricCanvas
            canvasRef={canvasRef}
            imgSrc={image}
            imgWidth={dimensions?.width}
            imgHeight={dimensions?.height}
          />
        </div>
      ) : (
        <p>Gambar tidak ditemukan</p>
      )}
    </div>
  );
}
