"use client";

import { db } from "@/app/etc";
import { useLiveQuery } from "dexie-react-hooks";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Delete, Edit, Trash, Trash2, X } from "react-feather";
import {
  Group,
  Image,
  Label,
  Layer,
  Rect,
  Stage,
  Tag,
  Text,
  Transformer,
} from "react-konva";
import useImage from "use-image";
import { v4 as uuidv4 } from "uuid";

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
  const [drawMode, setDrawMode] = useState(false);
  const getImage = useLiveQuery(() => db.upload.toArray())
    ?.filter((arr) => arr.id == batch)[0]
    .data.filter((arr) => arr.id == imageId)[0].base64;

  const [isDrawing, setIsDrawing] = useState(false);
  const [box, setBox] = useState([]);
  const [savedBox, setSavedBox] = useState([]);
  const layerRef = useRef(null);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [hoverObject, setHoverObject] = useState(false);
  const [boundingBox, setBoundingBox] = useState([]);
  const [editLabel, setEditLabel] = useState();
  const [selectedShape, setSelectedShape] = useState(null);
  const [selectedOverTransformer, setSelectedOverTransformer] = useState();

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

    if (!hoverObject && !selectedOverTransformer && !selectedShape) {
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
      setShowSaveModal(true);
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

  useEffect(() => {
    if (image) {
      setDimensions({
        width: image?.naturalWidth * 0.2,
        height: image.naturalHeight * 0.2,
      });
    }
  }, [image, setDimensions]);

  const divRef = useRef(null);

  // useEffect(() => {
  //   if (divRef.current?.offsetHeight && divRef.current?.offsetWidth) {
  //     setDimensions({
  //       width: divRef.current.offsetWidth,
  //       height: divRef.current.offsetHeight,
  //     });
  //   }
  // }, []);

  const [labelWidth, setLabelWidth] = useState();

  useEffect(() => {
    if (
      textLabelRefs.current?.offsetHeight &&
      textLabelRefs.current?.offsetWidth
    ) {
      setLabelWidth(textLabelRefs.current.offsetWidth);
    }
  }, []);

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

  return (
    <div className="content w-100 gap-3 d-flex align-content-center">
      <div className="col-2">
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
            height: dimensions?.height,
          }}
          className="mx-auto my-auto col-10"
        >
          <div
            ref={divRef}
            style={{
              maxWidth: "50%",
              height: "50%",
            }}
            className="my-auto"
          >
            <Stage
              width={dimensions?.width}
              height={dimensions?.height}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onTouchStart={checkDeselect}
              onClick={() => setDrawMode(false)}
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
              <Layer>
                <Image
                  image={image}
                  height={dimensions.height}
                  width={dimensions.width}
                />
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
