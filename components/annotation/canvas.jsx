import Image from "next/image";

export default function FabricCanvas({
  canvasRef,
  imgSrc,
  imgWidth,
  imgHeight,
}) {
  return (
    <>
      <canvas
        ref={canvasRef}
        className="mb-5"
        style={{
          width: "100%",
        }}
      />
      <Image
        src={imgSrc}
        width={imgWidth}
        height={imgHeight}
        alt=""
        id="gambar"
        style={{
          display: "none",
          // border: "1px solid white",
        }}
      />
    </>
  );
}
