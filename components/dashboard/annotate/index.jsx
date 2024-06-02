"use client";

import { db } from "@/app/etc";
import { useLiveQuery } from "dexie-react-hooks";
import Konva from "konva";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Edit, Trash2 } from "react-feather";
import {
  Group,
  Image,
  Layer,
  Rect,
  Stage,
  Text,
  Transformer,
} from "react-konva";
import useImage from "use-image";
import { v4 as uuidv4 } from "uuid";
import ShadertoyReact from "shadertoy-react";

const fragmentShader = `
  void main(void) {
     vec2 uv = gl_FragCoord.xy/iResolution.xy;
     vec3 col = 0.5 + 0.5*cos(iTime+uv.xyx+vec3(0,2,4));
     gl_FragColor = vec4(col ,1.0);
  }
`;

function generateRandomHexColor() {
  // Create a hexadecimal color code with the '#' symbol
  let color = "#";

  // Loop to generate 6 random hexadecimal digits (0-F)
  for (let i = 0; i < 6; i++) {
    // Generate a random number between 0 and 15 (inclusive)
    const random = Math.floor(Math.random() * 16);

    // Convert the number to hexadecimal string representation
    color += random.toString(16);
  }

  return color;
}

function EditLabel({
  type,
  value,
  id,
  setSavedBox,
  savedBox,
  boundingBox,
  setBoundingBox,
  setEditLabel = false,
  editLabel = false,
}) {
  const [labelValue, setLabelValue] = useState();
  useEffect(() => setLabelValue(value), []);

  const filteredData =
    type === "SAVE" && savedBox.filter((arr) => arr.key === id)[0];

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
            if (type === "SAVE") {
              setSavedBox((prevItem) =>
                prevItem.map((item) =>
                  item.key === id
                    ? { ...item, label: labelValue, done: true }
                    : item
                )
              );
              setBoundingBox((state) => [
                ...state,
                {
                  x: filteredData.initialX,
                  y: filteredData.initialY,
                  width: filteredData.lastX - filteredData.initialX,
                  height: filteredData.lastY - filteredData.initialY,
                  color: filteredData.color,
                  label: labelValue,
                  key: filteredData.key,
                },
              ]);
            } else {
              setBoundingBox((state) =>
                state.map((arr) =>
                  arr.key === editLabel ? { ...arr, label: labelValue } : arr
                )
              );
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
              setSavedBox((prevItem) =>
                prevItem.filter((arr) => arr.key !== id)
              );
            } else {
              setEditLabel();
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

  const [isDrawing, setIsDrawing] = useState(false);
  const [box, setBox] = useState([]);
  const [savedBox, setSavedBox] = useState([]);
  const [hoverImage, setHoverImage] = useState(false);
  const [hoverObject, setHoverObject] = useState(false);
  const [boundingBox, setBoundingBox] = useState([]);
  const [editLabel, setEditLabel] = useState();
  const [selectedShape, setSelectedShape] = useState(null);
  const [selectedOverTransformer, setSelectedOverTransformer] = useState();
  const imageRef = useRef(null);
  const stageRef = useRef(null);

  const getColor = generateRandomHexColor();

  const checkDeselect = (e) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      setSelectedShape(null);
    }
  };

  const textLabelRefs = useRef();

  function handleMouseDown(e) {
    if (selectedOverTransformer !== selectedShape && hoverObject === null) {
      setSelectedShape(null);
    }

    const stage = e.target.getStage();

    if (
      !hoverObject &&
      !selectedOverTransformer &&
      !selectedShape &&
      hoverImage
    ) {
      setIsDrawing(true);
      setBox((prevState) => [
        ...prevState,
        {
          x: stage.getPointerPosition().x,
          y: stage.getPointerPosition().y,
        },
      ]);
    }
  }

  function handleMouseUp() {
    setIsDrawing(false);
    setHoverObject(false);
    if (hoverObject === false && box[box?.length - 1]?.x - box[0]?.x > 10) {
      setSavedBox([
        {
          initialX: box[0]?.x,
          initialY: box[0]?.y,
          lastX: box[box?.length - 1]?.x,
          lastY: box[box?.length - 1]?.y,
          color: getColor,
          key: uuidv4(),
          label: "",
          done: false,
        },
      ]);
      setBox([]);
    }
  }

  const [image] = useImage(`data:image/<mime-type>;base64, ${getImage}`);

  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });

  const divRef = useRef(null);

  useEffect(() => {
    if (!boundingBox) {
      setBoundingBox([]);
    }
  }, [boundingBox, setBoundingBox]);

  function deleteBox(key) {
    const result = confirm("Apakah kamu yakin untuk menghapus box ini?");
    if (result) {
      setBoundingBox((arr) => arr.filter((dt) => dt.key !== key));
    } else null;
  }

  useEffect(() => {
    if (image) {
      const originalWidth = image.width;
      const originalHeight = image.height;
      const desiredPercentage = 50;
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

  const [konvaImage, setKonvaImage] = useState();

  useEffect(() => {
    const stage = stageRef.current;
    const layer = stage.findOne(Layer);
    const canvas = layer.getCanvas()._canvas;
    const ctx = canvas.getContext("2d");

    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.src = `data:image/<mime-type>;base64, ${getImage}`;

    img.onload = () => {
      if (img) {
        const originalWidth = img.width;
        const originalHeight = img.height;
        const desiredPercentage = 50;
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
        img.width = newWidth;
        img.height = newHeight;
        canvas.width = newWidth;
        canvas.height = newHeight;
      }
      ctx.drawImage(img, 0, 0);
      applyFilter();
    };

    const applyFilter = () => {
      img.addEventListener("loadeddata", () => {
        ctx.drawImage(img, 0, 0); //
        const imageData = ctx.getImageData(
          0,
          0,
          dimensions.width,
          dimensions.height
        );
        const data = imageData.data;

        if (boundingBox.length > 0) {
          for (let i = 0; i < data.length; i += 4) {
            const x = (i / 4) % canvas.width;
            const y = Math.floor(i / 4 / canvas.width);

            const isInBbox = boundingBox.some(
              (bbox) =>
                x >= bbox.x &&
                x <= bbox.x + bbox.width &&
                y >= bbox.y &&
                y <= bbox.y + bbox.height
            );

            if (!isInBbox) {
              data[i] *= 0.5; // Red
              data[i + 1] *= 0.5; // Green
              data[i + 2] *= 0.5; // Blue
            }
          }

          ctx.putImageData(imageData, 0, 0);
        }
      });
    };

    applyFilter();
  }, [boundingBox, dimensions, getImage]);

  return (
    <div
      className="content d-flex align-content-center m-0"
      style={{
        height: "calc(-60px + 100vh)",
        paddingLeft: 60,
      }}
    >
      <div
        className="col-3 me-3"
        style={{
          paddingLeft: 20,
          paddingRight: 20,
          borderRight: "1px solid #97979757",
          boxShadow: "none",
        }}
      >
        <div className="d-flex gap-1 my-2 flex-column">
          {savedBox.length > 0 &&
            savedBox
              ?.filter((arr) => arr.done === false)
              .map((arr, index) => (
                <EditLabel
                  type="SAVE"
                  key={index}
                  value={arr?.label}
                  id={arr?.key}
                  setSavedBox={setSavedBox}
                  savedBox={savedBox}
                  boundingBox={boundingBox}
                  setBoundingBox={setBoundingBox}
                />
              ))}
        </div>
        <div className="d-flex gap-1 my-2 flex-column">
          {boundingBox?.map((arr, index) => (
            <div key={index} className="d-flex flex-row gap-1">
              {editLabel === arr?.key ? (
                <EditLabel
                  type="EDIT"
                  value={arr?.label}
                  id={arr?.key}
                  setSavedBox={setSavedBox}
                  savedBox={savedBox}
                  boundingBox={boundingBox}
                  setBoundingBox={setBoundingBox}
                  setEditLabel={setEditLabel}
                  editLabel={editLabel}
                />
              ) : (
                <div
                  className={`d-flex flex-row gap-1 ${
                    arr.key === selectedShape && "border"
                  }`}
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
                  <div
                    className="pointer"
                    onClick={() => setEditLabel(arr?.key)}
                  >
                    <Edit height={10} width={10} />
                  </div>
                  <div className="pointer" onClick={() => deleteBox(arr?.key)}>
                    <Trash2 height={10} width={10} />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {imageId && batch ? (
        <div
          style={{
            height: "calc(-60px + 100vh)",
            overflow: "hidden",
          }}
          ref={divRef}
          className="col-8 d-flex justify-content-center align-items-center"
        >
          <Stage
            width={dimensions.width}
            height={dimensions.height}
            ref={stageRef}
            // draggable={!hoverImage}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onTouchStart={checkDeselect}
            onMouseMove={(e) => {
              if (isDrawing) {
                const stage = e.target.getStage();
                setBox([
                  ...box,
                  {
                    x: stage.getPointerPosition().x,
                    y: stage.getPointerPosition().y,
                  },
                ]);
              }
            }}
          >
            <Layer id="imgLayer">
              {/* <Image
                image={image}
                ref={imageRef}
                height={dimensions.height}
                width={dimensions.width}
                alt=""
                onMouseOver={() => setHoverImage(true)}
                onMouseOut={() => setHoverImage(false)}
                // onClick={darkenImage}
              /> */}
              {isDrawing && (
                <Rect
                  x={box[0].x}
                  y={box[0].y}
                  draggable
                  width={box[box.length - 1].x - box[0].x}
                  height={box[box.length - 1].y - box[0].y}
                  stroke={"green"}
                  strokeWidth={1}
                />
              )}

              {savedBox
                ?.filter((arr) => arr.done === false)
                .map((arr, index) => (
                  <Rect
                    key={index}
                    x={arr?.initialX}
                    y={arr?.initialY}
                    width={arr?.lastX - arr?.initialX}
                    height={arr?.lastY - arr?.initialY}
                    stroke={"green"}
                    strokeWidth={1}
                  />
                ))}

              {boundingBox?.map((arr, index) => (
                <RectComponent
                  key={index}
                  index={index}
                  setHoverObject={setHoverObject}
                  hoverObject={hoverObject}
                  arr={arr}
                  setBoundingBox={setBoundingBox}
                  textLabelRefs={textLabelRefs}
                  isSelected={arr?.key === selectedShape}
                  onSelect={() => {
                    setSelectedShape(arr?.key);
                  }}
                  selectedShape={selectedShape}
                  setSelectedOverTransformer={setSelectedOverTransformer}
                />
              ))}
            </Layer>
          </Stage>
        </div>
      ) : (
        <p>Gambar tidak ditemukan</p>
      )}
    </div>
  );
}

function RectComponent({
  index,
  setHoverObject,
  hoverObject,
  arr,
  setBoundingBox,
  textLabelRefs,
  isSelected,
  onSelect,
  setSelectedOverTransformer,
  selectedShape,
}) {
  const trRef = useRef();
  const rectRef = useRef();

  useEffect(() => {
    if (isSelected) {
      trRef.current.nodes([rectRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected, rectRef]);

  return (
    <>
      <Group draggable={arr?.key === selectedShape} ref={rectRef}>
        <div>
          <Rect
            // onDragEnd={(e) => {
            //   console.log(e.target.position());
            // }}
            onTransformEnd={(e) => {
              setBoundingBox((prevState) =>
                prevState.map((item) =>
                  item.key === arr?.key
                    ? {
                        ...item,
                        x: e.target.x(),
                        y: e.target.y(),
                        width: e.target.getAbsoluteScale().x * arr?.width,
                        height: e.target.getAbsoluteScale().y * arr?.height,
                      }
                    : item
                )
              );
            }}
            onClick={onSelect}
            onMouseOver={() => {
              setHoverObject(arr?.key);
            }}
            onMouseLeave={() => {
              setHoverObject(null);
            }}
            x={arr?.x}
            y={arr?.y}
            width={arr?.width}
            height={arr?.height}
            stroke={`${arr.color}`}
            strokeWidth={1}
          />
          <Text
            ref={textLabelRefs}
            x={arr?.x + 3}
            y={arr?.y - 20}
            text={arr?.label}
            fontSize={20}
            fill="black"
          />
        </div>
      </Group>
      {isSelected && (
        <Transformer
          ref={trRef}
          x={arr?.x}
          y={arr?.y}
          onMouseOver={() => setSelectedOverTransformer(arr?.key)}
          onMouseLeave={() => setSelectedOverTransformer(null)}
          boundBoxFunc={(oldBox, newBox) => {
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </>
  );
}
