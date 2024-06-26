"use client";

import { db } from "@/app/etc";
import { useLiveQuery } from "dexie-react-hooks";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Download, Edit, Trash2 } from "react-feather";
import useImage from "use-image";
import { v4 as uuidv4 } from "uuid";
import FabricCanvas from "@/components/annotation/canvas";
import { initializeFabric } from "@/lib/canvas";
import chroma from "chroma-js";
import { BehaviorSubject, map, tap } from "rxjs";

function generateRandomHexColor() {
  const hue = Math.random() * 360;
  const saturation = 80 + Math.random() * 20; // 80-100%
  const lightness = 40 + Math.random() * 20; // 40-60%
  return chroma(`hsl(${hue}, ${saturation}%, ${lightness}%)`).darken().hex();
}

fabric.TextboxWithPadding = fabric.util.createClass(fabric.Textbox, {
  type: "textboxwithpadding",
  toObject: function () {
    return fabric.util.object.extend(this.callSuper("toObject"), {
      backgroundColor: this.get("backgroundColor"),
      padding: this.get("padding"),
    });
  },

  // _splitTextIntoLines: function (text) {
  //   var lines = text.split(this._reNewline),
  //     newLines = new Array(lines.length),
  //     newLine = ["\n"],
  //     newText = [];
  //   for (var i = 0; i < lines.length; i++) {
  //     newLines[i] = fabric.util.string.graphemeSplit(lines[i]);
  //     newText = newText.concat(newLines[i], newLine);
  //   }
  //   console.log(lines, newLines, newText);
  //   newText.pop();
  //   return {
  //     _unwrappedLines: newLines,
  //     lines: lines,
  //     graphemeText: newText,
  //     graphemeLines: newLines,
  //   };
  // },

  _renderBackground: function (ctx) {
    if (!this.backgroundColor) {
      return;
    }
    var dim = this._getNonTransformedDimensions();
    ctx.fillStyle = this.backgroundColor;

    ctx.fillRect(
      -dim.x / 2 - this.padding,
      -dim.y / 2 - this.padding,
      dim.x + this.padding * 2,
      dim.y + this.padding * 2
    );
    // if there is background color no other shadows
    // should be casted
    this._removeShadow(ctx);
  },
});

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
            const edit = canvas.value
              .getObjects()
              .find((arr) => arr.id === id)
              ?.set({ label: labelValue, done: true });

            const text = new fabric.TextboxWithPadding(`${edit.label}`, {
              top: edit?.top - 25,
              left: edit?.left + 3,
              fontSize: 15,
              id: `${edit.id}`,
              selectable: false,
              type: "label",
              evented: false,
              textAlign: "center",
              backgroundColor: "rgb(0,200,0)",
              padding: 3,
              splitByGrapheme: false,
            });

            // const bg = new fabric.Rect({
            //   top: text.top - 3,
            //   left: text.left,
            //   height: text.height + 3,
            //   width: text.width + 3,
            //   fill: "rgb(0,200,0)",
            // });

            canvas.value.add(text);

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
              const obj = canvas.value
                .getObjects()
                .find((arr) => arr.id === id);
              canvas.value.remove(obj);
              const removeFilter = canvas.value
                .getObjects()
                .find((arr) => arr.type === "filter");
              canvas?.value.remove(removeFilter);
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
  const canvas = useRef(new BehaviorSubject());
  const rects = useRef();

  const [box, setBox] = useState();
  const [editLabel, setEditLabel] = useState();

  useEffect(() => {
    canvas.current.next(
      initializeFabric({
        canvasRef,
        fabricRef,
        dimensions,
        getImage,
        canvasWrapper,
      })
    );

    const imgElement = document.getElementById("bening");
    const img = new fabric.Image(imgElement, {
      hoverCursor: "crosshair",
      selectable: false,
    });

    canvas.current.value.setWidth(dimensions?.width);
    canvas.current.value.setHeight(dimensions?.height);

    img.scaleToHeight(dimensions?.height);
    img.scaleToWidth(dimensions?.width);

    img.bringForward();

    canvas.current.value.centerObject(img);

    canvas.current.value.add(img);

    let rect, startX, startY;

    canvas.current.value.on("mouse:down", function (options) {
      if (options.target !== img || options.target?.type === "rect") {
        return;
      }

      // box.current.subscribe((arr) => console.log(arr));

      startX = options.pointer.x;
      startY = options.pointer.y;

      rect = new fabric.Rect({
        left: startX,
        top: startY,
        width: 0,
        height: 0,
        fill: "transparent",
        evented: false,
        stroke: `${generateRandomHexColor()}`,
        strokeWidth: 2,
      });

      canvas.current.value.add(rect);
    });

    canvas.current.value.on("mouse:move", function (options) {
      if (rect) {
        rect.set({
          width: options.pointer.x - startX,
          height: options.pointer.y - startY,
        });

        canvas.current.value.renderAll();
      }
    });

    canvas.current.value.on("mouse:up", function () {
      if (rect && rect.width > 20 && rect.height > 20) {
        rect.set({ evented: true, id: uuidv4(), type: "rect", done: false });
        const rectId = rect.id;
        setBox(rectId);

        rect = null;
      } else {
        rect = null;
      }
    });

    canvas.current.value.renderAll();
  }, [canvasRef, dimensions, getImage]);

  useEffect(() => {
    canvas.current.value?.on("mouse:move", function (options) {
      if (
        options.target &&
        options.target?.type === "rect" &&
        options.target?.done === true
      ) {
        const movedRect = options.target;
        canvas.current.value
          .getObjects()
          .find((arr) => arr.id === movedRect.id && arr.type === "label")
          ?.set({ top: movedRect?.top - 25, left: movedRect?.left + 3 });
      }
    });
  }, [canvas.current.value]);

  canvas.current
    .pipe(
      map((arr) => arr?.getObjects()),
      tap((arr) => console.log(arr)),
      map((arr) =>
        arr?.filter((rect) => rect.type === "rect" && rect.done === true)
      )
    )
    .subscribe((arr) => {
      rects.current = arr;
    });

  return (
    <div
      className="content d-flex align-content-center m-0"
      style={{
        height: "calc(-60px + 100vh)",
        paddingLeft: 60,
      }}
    >
      <div
        className="col-2 me-3 d-flex flex-column justify-content-between"
        style={{
          boxShadow: "none",
          paddingLeft: 20,
          paddingRight: 20,
          borderRight: "1px solid #97979757",
          paddingTop: 10,
          paddingBottom: 10,
        }}
      >
        <div>
          <div className="d-flex gap-1 my-2 flex-column">
            {rects.current?.map((arr, index) => (
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
                                const obj = canvas?.current.value
                                  .getObjects()
                                  .filter((item) => item.id === arr?.id);
                                canvas?.current.value.remove(obj[0], obj[1]);
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
        <div>
          <button
            onClick={() => {
              const dataURL = canvas.current.value.toDataURL({
                format: "png",
              });

              const link = document.createElement("a");
              link.href = dataURL;
              link.download = `${imageId}.png`;

              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
            disabled={rects.current?.length === 0}
            className="btn btn-primary outline-0 border-0 shadow-none text-smaller float-end"
          >
            <Download
              data-feather="pocket"
              width="14"
              height="14"
              className="me-2"
            />
            Simpan Gambar
          </button>
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
          <div
            style={{
              height: "50%",
              width: "50%",
            }}
          >
            <FabricCanvas
              canvasRef={canvasRef}
              imgSrc={image}
              imgWidth={dimensions?.width}
              imgHeight={dimensions?.height}
            />
          </div>
        </div>
      ) : (
        <p>Gambar tidak ditemukan</p>
      )}
    </div>
  );
}
