/*
Adopted from: https://github.com/adrianhajdin/figma_clone/blob/main/lib/canvas.ts
*/

import { fabric } from "fabric";
import { v4 as uuid4 } from "uuid";

// initialize fabric canvas
export const initializeFabric = ({
  fabricRef,
  canvasRef,
  dimensions,
  getImage,
  canvasWrapper,
}) => {
  const canvas = new fabric.Canvas(canvasRef.current, {
    width: canvasWrapper?.current.clientWidth,
    height: canvasWrapper?.current.clientHeight,
  });

  // const dataUrl = `data:image/<mime-type>;base64, ${getImage}`;

  // fabric.Image.fromURL(dataUrl, function (img) {
  //   if (img.width / img.height > dimensions?.width / dimensions?.height) {
  //     img.scaleToWidth(dimensions?.width);
  //   } else {
  //     img.scaleToHeight(dimensions?.height);
  //   }

  //   img.selectable = true;

  //   canvas.centerObject(img);
  //   canvas.add(img);
  //   canvas.renderAll();
  // });

  // set canvas reference to fabricRef so we can use it later anywhere outside canvas listener
  fabricRef.current = canvas;

  return canvas;
};