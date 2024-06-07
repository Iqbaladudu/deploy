import Image from "next/image";

export default function FabricCanvas({
  canvasRef,
  imgSrc,
  imgWidth,
  imgHeight,
}) {
  return (
    <>
      <canvas ref={canvasRef} className="mb-5" />
      <Image
        src={imgSrc}
        width={imgWidth}
        height={imgHeight}
        alt=""
        id="bening"
        style={{
          display: "none",
        }}
      />
    </>
  );
}
