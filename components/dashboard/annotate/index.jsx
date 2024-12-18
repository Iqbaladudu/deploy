"use client";

import { db } from "@/app/etc";
import { useLiveQuery } from "dexie-react-hooks";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import useImage from "use-image";
import { v4 as uuidv4 } from "uuid";
import FabricCanvas from "@/components/annotation/canvas";
import { initializeFabric } from "@/lib/canvas";
import chroma from "chroma-js";
import { BehaviorSubject, map, tap } from "rxjs";
import ZoomTool from "./zoomTool";
import AnnotationLabel from "./annotationLabel";
import ImageTool from "./imageTool";
import { Mode } from "@/app/constant";

function generateRandomHexColor() {
  const hue = Math.random() * 360;
  const saturation = 80 + Math.random() * 20; // 80-100%
  const lightness = 40 + Math.random() * 20; // 40-60%
  return chroma(`hsl(${hue}, ${saturation}%, ${lightness}%)`).darken().hex();
}

function keepFirstGroup(canvas) {
  let firstGroupFound = false;

  canvas.getObjects().forEach((obj, index) => {
    if (obj.type === "group") {
      if (!firstGroupFound) {
        firstGroupFound = true;
      } else {
        canvas.remove(obj);
      }
    }
  });

  canvas.renderAll();
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

  const mode = useRef(new BehaviorSubject(Mode.RECT));

  useEffect(() => {
    if (image) {
      const originalWidth = image.width;
      const originalHeight = image.height;
      const desiredPercentage = 40;
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight; // Get screen height
      const maxAllowedHeight = screenHeight; // Allow some margin

      console.log(originalHeight, originalWidth, "lala");

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
  const rects = useRef([]);

  const box = useRef(new BehaviorSubject());
  const [boxId, setBoxId] = useState();
  const [editLabel, setEditLabel] = useState();
  const [imgSize, setImgSize] = useState();

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

    const imgElement = document.getElementById("gambar");
    const img = new fabric.Image(imgElement, {
      hoverCursor: "move",
      selectable: true,
      type: "image",
      lockScalingX: true,
      lockScalingY: true,
    });

    img.scaleToHeight(dimensions?.height);
    img.scaleToWidth(dimensions?.width);

    img.sendToBack();

    canvas.current.value.centerObject(img);

    canvas.current.value.add(img);
    console.log(img.top, img.left);
    console.log(img.width, img.height);

    if (img) {
      setImgSize({
        height: img.getScaledHeight(),
        width: img.getScaledWidth(),
        top: img.top,
        left: img.left,
      });
    }

    let rect, startX, startY;

    function getAdjustedPosition(x, y) {
      var zoom = canvas.current.value.getZoom();
      var vpX = canvas.current.value.viewportTransform[4]; // X offset
      var vpY = canvas.current.value.viewportTransform[5]; // Y offset
      return {
        x: (x - vpX) / zoom,
        y: (y - vpY) / zoom,
      };
    }

    canvas.current.value.on("mouse:down", function (options) {
      if (options.target !== img || options.target?.type === "rect") {
        return;
      }

      if (options.target === null) {
        return;
      }

      if (options.target === img) {
        canvas.current.value.moveTo(img, 0);
      }

      if (!box.current.value && img.selectable === false) {
        const point = getAdjustedPosition(options.pointer.x, options.pointer.y);

        startX = point.x;
        startY = point.y;

        rect = new fabric.Rect({
          left: startX,
          top: startY,
          width: 0,
          height: 0,
          fill: "transparent",
          evented: false,
          stroke: `${generateRandomHexColor()}`,
          strokeWidth: 2,
          strokeUniform: true,
          selectable: true,
        });

        rect.bringToFront();
        rect.setControlsVisibility({
          mtr: false,
        });

        canvas.current.value.add(rect);
        canvas.current.value.renderAll();
      } else if (box && options.target?.id !== box) {
        return;
      } else return;
    });

    canvas.current.value.on("mouse:move", function (options) {
      if (rect && img.selectable === false) {
        const point = getAdjustedPosition(options.pointer.x, options.pointer.y);

        const isInsideImage = img.containsPoint({ x: point.x, y: point.y });

        let widthRect = point.x - startX;
        let heightRect = point.y - startY;

        if (isInsideImage) {
          rect.set({
            width: widthRect,
            height: heightRect,
          });

          canvas.current.value.renderAll();
        } else {
          canvas.current.value.remove(rect);
          return;
        }
      }
    });

    canvas.current.value.on("mouse:up", function (options) {
      if (
        (rect?.width > 20 || rect?.width < -20) &&
        (rect?.height > 20 || rect?.height < -20) &&
        rect &&
        img.selectable === false
      ) {
        const point = getAdjustedPosition(options.pointer.x, options.pointer.y);
        const isInsideImage = img.containsPoint({ x: point.x, y: point.y });

        if (isInsideImage) {
          rect.set({
            evented: true,
            id: uuidv4(),
            type: "rect",
            done: false,
            selectable: true,
          });
          rect.bringToFront();
          const rectId = rect.id;
          box.current.next(rectId);
          rect = null;
          canvas.current.value.renderAll();
        }
      } else {
        canvas.current.value.remove(rect);
      }
    });

    canvas.current.value.renderAll();
  }, [box, canvasRef, dimensions, getImage]);

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
          ?.set({ top: movedRect?.top - 20, left: movedRect?.left + 3 });
      } else if (options.target?.type === "image") {
      }
    });

    canvas.current.value.on("selection:created", (e) => {
      canvas.current.value.selection = false;
      if (e.selected.length > 1 || box.current.value) {
        canvas.current?.value?.discardActiveObject();
      }
    });
    canvas.current.value.on("selection:updated", (e) => {
      canvas.current.value.selection = false;
      if (e.selected.length > 1) {
        canvas.current?.value?.discardActiveObject();
      }
    });
    canvas.current.value.on("selection:cleared", (e) => {
      canvas.current.value.selection = true;
    });

    // canvas.current.value.on("object:scaling", (e) => {
    //   let o = e.target;
    //   if (o.type === "rect") {
    //     if (!o.strokeWidthUnscaled && o.strokeWidth) {
    //       o.strokeWidthUnscaled = o.strokeWidth;
    //     }
    //     if (o.strokeWidthUnscaled) {
    //       o.strokeWidth = o.strokeWidthUnscaled / o.scaleX;
    //     }
    //   }
    // });
  }, [canvas.current.value]);

  canvas.current
    .pipe(
      map((arr) => arr?.getObjects()),
      map((arr) =>
        arr?.filter((rect) => rect.type === "rect" && rect.done === true)
      )
    )
    .subscribe((arr) => {
      if (arr) {
        rects.current = arr;
      } else {
        rects.current = [];
      }
    });

  const [forceUpdate, setForceUpdate] = useState(false);

  const handleUpdate = () => {
    // Force re-render
    setForceUpdate((prev) => !prev);
  };

  useEffect(() => {
    box.current.subscribe((id) => {
      if (id) {
        setBoxId(id);
        canvas.current.value.selection = false;
      } else {
        setBoxId();
        canvas.current.value.selection = true;
      }
    });
  }, []);

  const labelbarRef = useRef();
  const [labelbarWidth, setLabelbarWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (labelbarRef.current) {
        setLabelbarWidth(labelbarRef.current.offsetWidth);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize); // Clean up
    };
  }, []);

  useEffect(() => {
    mode.current.subscribe((arr) => {
      if (arr === Mode.DRAG) {
        const objects = canvas.current.value._objects;

        const getGroups = objects.filter((arr) => arr.type === "group");

        if (
          getGroups.length < 1 &&
          imgSize?.top &&
          imgSize?.left &&
          imgSize?.height &&
          imgSize?.width
        ) {
          const group = new fabric.Group([...objects], {
            height: imgSize.height,
            width: imgSize.width,
            top: imgSize.top,
            left: imgSize.left,
            originX: "left",
            originY: "top",
            type: "group",
            absolutePositioned: true,
            hasRotatingPoint: false,
            lockRotation: true,
          });

          group.hasControls = false;
          group.hoverCursor = "move";
          group.selectable = true;

          canvas.current.value.add(group);
          canvas.current.value.renderAll();
        }
      } else if (arr === Mode.RECT) {
        const getObj = canvas.current.value.getObjects();
        const group = getObj.find((arr) => arr.type === "group");

        function unpackGroup(group, canvas) {
          const objects = group.destroy().getObjects();

          // Remove the group from the canvas
          canvas.remove(group);

          // Add each object to the canvas, checking for duplicates
          objects.forEach((obj) => {
            // Check if an object with the same ID already exists
            const existingObject = canvas
              .getObjects()
              .find((o) => o.id === obj.id && o.type === obj.type);
            if (!existingObject) {
              canvas.add(obj);
            }
          });

          canvas.renderAll();
        }

        if (group) {
          unpackGroup(group, canvas.current.value);
        }

        const img = canvas.current?.value?.getObjects().find(function (o) {
          return o.type === "image";
        });

        img.hoverCursor = "crosshair";
        img.selectable = false;
        canvas.current.value.discardActiveObject();
        canvas.current.value.requestRenderAll();
      }
    });
  }, [mode.current.value, imgSize]);

  return (
    <div
      className="content d-flex align-content-center m-0"
      style={{
        height: "calc(-60px + 100vh)",
        paddingLeft: 60,
      }}
    >
      <ZoomTool canvas={canvas} mode={mode} />
      <ImageTool canvas={canvas} mode={mode} />
      <AnnotationLabel
        labelbarRef={labelbarRef}
        rects={rects}
        editLabel={editLabel}
        box={box}
        canvas={canvas}
        setEditLabel={setEditLabel}
        handleUpdate={handleUpdate}
        boxId={boxId}
        imageId={imageId}
      />

      {imageId && batch ? (
        <div
          style={{
            height: "calc(-60px + 100vh)",
            overflow: "hidden",
            width: "80%",
          }}
          ref={canvasWrapper}
          className="col-8"
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
