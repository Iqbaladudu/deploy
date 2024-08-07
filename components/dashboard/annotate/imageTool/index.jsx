import { Mode } from "@/app/constant";
import { useEffect, useRef, useState } from "react";
import { Move, Square } from "react-feather";

export default function ImageTool({ canvas, mode }) {
  const [imgMode, setImgMode] = useState();

  useEffect(() => {
    mode.current.subscribe((arr) => setImgMode(arr));
  }, [mode, mode.current.value]);

  return (
    <div
      className="position-absolute bg-primary rounded-3 d-flex justify-content-center align-items-center flex-column px-2"
      style={{
        top: "50%",
        right: "1%" /* for horizontal centering */,
        paddingLeft: 3,
        paddingRight: 3,
        paddingTop: 10,
        paddingBottom: 10,
        zIndex: 100,
        transform: "translateY(-50%)",
      }}
    >
      <div
        className="my-auto"
        onClick={() => {
          mode.current.next(Mode.DRAG);
        }}
        style={{
          cursor: "pointer",
        }}
      >
        <Move
          size={10}
          className={`${
            imgMode === Mode.DRAG && "bg-white text-primary"
          } rounded-3`}
          style={{
            padding: 3,
            boxSizing: "content-box",
          }}
        />
      </div>
      <div>
        <p
          className="my-auto"
          style={{
            fontSize: 15,
          }}
        ></p>
      </div>
      <div
        onClick={() => {
          mode.current.next(Mode.RECT);
        }}
        style={{
          cursor: "pointer",
        }}
      >
        <Square
          size={10}
          className={`${
            imgMode === Mode.RECT && "bg-white text-primary"
          } rounded-3`}
          style={{
            padding: 3,
            boxSizing: "content-box",
          }}
        />
      </div>
    </div>
  );
}
