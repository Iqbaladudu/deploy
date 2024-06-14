/*
Adopted from: https://github.com/adrianhajdin/figma_clone/blob/main/lib/canvas.ts
*/

import { fabric } from "fabric";
import { v4 as uuidv4 } from "uuid";
import { BehaviorSubject, distinctUntilChanged } from "rxjs";

// initialize fabric canvas
export const initializeFabric = ({ fabricRef, canvasRef, canvasWrapper }) => {
  const canvas = new fabric.Canvas(canvasRef.current, {
    width: canvasWrapper?.current.clientWidth,
    height: canvasWrapper?.current.clientHeight,
  });

  fabricRef.current = canvas;

  return canvas;
};

export class Annotation {
  constructor({ canvasRef, fabricRef, dimensions, canvasWrapper }) {
    this.canvasRef = canvasRef;
    this.fabric = fabricRef;
    this.dimensions = dimensions;
    this.canvasWrapper = canvasWrapper;
    this.isCanvasUpdated;

    // Run init directly
    this.#createCanvas();
    this.#annotate();
  }

  // Private vars
  #rect;
  #rects = new BehaviorSubject();
  #box = new BehaviorSubject();
  #darkFilter = new fabric.Rect({
    absolutePositioned: true,
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    fill: "rgba(0, 0, 0, 0.5)",
    selectable: false,
    evented: false,
    type: "filter",
  });
  #startX;
  #startY;
  #group;

  #highlight = new fabric.Rect({
    width: 0,
    height: 0,
    left: 0,
    top: 0,
    absolutePositioned: true,
    globalCompositeOperation: "destination-out",
    stroke: "black",
  });

  #selected;
  #layer;
  #darkFilterApplied = false;

  /**
   * @param {any} args
   */
  set #updateCanvas(args) {
    this.canvas.next(this.canvas.value.add(args));
    this.#rects.next(
      this.canvas.value.getObjects().filter((arr) => arr.type === "rect")
    );
  }

  /**
   * @param {string} id
   */
  set updateRect(id) {
    this.canvas.value.getObjects().find((arr) => arr.id == id).done = true;
  }

  get getCanvasObject$() {
    return this.canvas;
  }

  #createCanvas() {
    this.canvas = new BehaviorSubject(
      new fabric.Canvas(this.canvasRef.current, {
        width: this.canvasWrapper.current.clientWidth,
        height: this.canvasWrapper.current.clientHeight,
      })
    );

    this.fabric.current = this.canvas.value;
  }

  #addImage() {
    this.imgElement = document.getElementById("bening");
    this.img = new fabric.Image(this.imgElement, {
      hoverCursor: "crosshair",
      selectable: false,
    });

    this.img.scaleToHeight(this.dimensions?.height);
    this.img.scaleToWidth(this.dimensions?.width);
    this.canvas.value.centerObject(this.img);
    this.img.bringForward();
    this.canvas.value.add(this.img);
  }

  #annotate() {
    this.#addImage();
    this.#mouseDown();
    this.#mouseMove();
    this.#mouseUp();
    this.#objectModified();

    this.canvas.value.renderAll();
  }

  #addOrRemoveFilter() {
    this.#darkFilter.set({
      left: this.img.left,
      top: this.img.top,
      width: this.img.width * this.img.scaleX,
      height: this.img.height * this.img.scaleY,
    });

    this.canvas.value.add(this.#darkFilter);
  }

  #mouseDown() {
    this.canvas.value.on("mouse:down", (options) => {
      if (options.target !== this.img) {
        return;
      }

      this.#selected = null;
      this.#startX = options.pointer.x;
      this.#startY = options.pointer.y;

      this.#rect = new fabric.Rect({
        left: this.#startX,
        top: this.#startY,
        width: 0,
        height: 0,
        fill: "transparent",
        evented: false,
        globalCompositeOperation: "destination-out",
      });

      if (!this.#darkFilterApplied) {
        this.#addOrRemoveFilter();
        this.#darkFilterApplied = true;
        this.canvas.value.bringToFront(this.#darkFilter);
      }

      this.#updateCanvas = this.#rect;
    });
  }

  #mouseMove() {
    this.canvas.value.on("mouse:move", (options) => {
      if (this.#rect) {
        this.#rect.set({
          width: options.pointer.x - this.#startX,
          height: options.pointer.y - this.#startY,
        });

        this.#layer = new fabric.Rect({
          width: this.img.width,
          height: this.img.height,
          left: this.img.left,
          top: this.img.top,
          absolutePositioned: true,
        });

        this.#group = new fabric.Group([this.#layer], {
          absolutePositioned: true,
        });

        this.#highlight.set({
          width: this.#rect.width,
          height: this.#rect.height,
          left: this.#rect.left,
          top: this.#rect.top,
        });

        this.#group.add(this.#highlight);

        this.#darkFilter.set({
          clipPath: this.#group,
        });

        this.canvas.value.renderAll();
      }
    });
  }

  #mouseUp() {
    this.canvas.value.on("mouse:up", (options) => {
      if (this.#rect && this.#rect > 20 && this.#rect > 20) {
        this.#rect.set({
          evented: true,
          id: uuidv4(),
          type: "rect",
          done: false,
          selectable: true,
        });

        this.#highlight.set({
          id: this.#rect.id,
        });
        this.box = this.#rect.id;
        this.#rect = null;
      } else {
        this.#rect = null;
      }
    });
  }

  #objectModified() {
    this.canvas.value.on("object:modified", (options) => {
      if (options.target && options.target?.type === "rect") {
        const movedRect = options.target;
      }
    });
  }
}
