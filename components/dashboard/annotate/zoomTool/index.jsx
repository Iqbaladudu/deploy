import { Mode } from "@/app/constant";

export default function ZoomTool({ canvas, mode }) {
  return (
    <div
      className="position-absolute bg-primary rounded-3 d-flex justify-content-center align-items-center"
      style={{
        gap: 5,
        left: "25vw",
        bottom: "3vh",
        paddingLeft: 10,
        paddingRight: 10,
        zIndex: 100,
      }}
    >
      <div
        className="my-auto"
        onClick={() => {
          if (canvas.current.value.getZoom() <= 2) {
            canvas.current.value.setZoom(canvas.current.value.getZoom() + 0.1);
            mode.current.next(Mode.DRAG);
          }
        }}
        style={{
          fontSize: 15,
          cursor: "pointer",
        }}
      >
        +
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
        className="my-auto"
        onClick={() => {
          canvas.current.value.setZoom(canvas.current.value.getZoom() - 0.1);
          mode.current.next(Mode.DRAG);
        }}
        style={{
          fontSize: 15,
          cursor: "pointer",
        }}
      >
        -
      </div>
      <div
        className="my-auto"
        onClick={() => {
          canvas.current.value.setZoom(1);
          const img = canvas.current.value.getObjects().find(function (o) {
            return o.type === "image";
          });
          const group = canvas.current.value.getObjects().find(function (o) {
            return o.type === "group";
          });

          if (img) {
            canvas.current.value.centerObject(img);
          } else if (group) {
            canvas.current.value.centerObject(group);
          }

          mode.current.next(Mode.DRAG);
        }}
        style={{
          fontSize: 10,
          cursor: "pointer",
        }}
      >
        Reset
      </div>
    </div>
  );
}
