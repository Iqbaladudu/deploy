import { fabric } from "fabric";
import { useEffect, useState } from "react";
import { Download, Edit, Trash2 } from "react-feather";

fabric.TextboxWithPadding = fabric.util.createClass(fabric.Textbox, {
  type: "textboxwithpadding",
  toObject: function () {
    return fabric.util.object.extend(this.callSuper("toObject"), {
      backgroundColor: this.get("backgroundColor"),
      padding: this.get("padding"),
    });
  },

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

export default function AnnotationLabel({
  labelbarRef,
  rects,
  editLabel,
  box,
  canvas,
  setEditLabel,
  handleUpdate,
  boxId,
  imageId,
}) {
  return (
    <div
      ref={labelbarRef}
      className="col-2 me-3 d-flex flex-column justify-content-between"
      style={{
        boxShadow: "none",
        paddingLeft: 20,
        paddingRight: 20,
        borderRight: "1px solid #97979757",
        paddingTop: 10,
        paddingBottom: 10,
        width: "18%",
      }}
    >
      <div>
        <div className="d-flex gap-1 my-2 flex-column">
          {rects.current?.length > 0
            ? rects.current?.map((arr, index) => (
                <div key={index} className="d-flex flex-row gap-1 w-full">
                  {editLabel === arr?.id ? (
                    <EditLabel
                      type="EDIT"
                      value={arr?.label}
                      box={box.current}
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
                              onClick={async () => {
                                if (
                                  confirm(
                                    "Apakah kamu yakin akan menghapus bounding box ini?"
                                  ) === true
                                ) {
                                  const obj = await canvas?.current.value
                                    .getObjects()
                                    .filter((item) => item.id === arr?.id);

                                  await canvas?.current.value.remove(
                                    obj[0],
                                    obj[1]
                                  );

                                  handleUpdate();

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
              ))
            : null}
        </div>

        <div className="d-flex gap-1 my-2 flex-column">
          {boxId && (
            <EditLabel
              type="SAVE"
              id={box.current.value}
              box={box.current}
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
  );
}

function EditLabel({
  type,
  value = "",
  box = false,
  id,
  canvas,
  setEditLabel,
}) {
  const [labelValue, setLabelValue] = useState();
  useEffect(() => setLabelValue(value), [value]);
  const [refresh, setRefresh] = useState(0);

  const handleBasicRerender = () => {
    setRefresh((prev) => prev + 1);
  };

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
          disabled={labelValue?.length < 1}
          onClick={() => {
            const edit = canvas.value
              .getObjects()
              .find((arr) => arr.id === id)
              ?.set({ label: labelValue, done: true });

            console.log(edit);

            if (type === "SAVE") {
              const text = new fabric.TextboxWithPadding(`${edit?.label}`, {
                top: edit.top - 20,
                left: edit.left + 3,
                fontSize: 15,
                id: `${edit.id}`,
                selectable: false,
                type: "label",
                evented: false,
                textAlign: "center",
                backgroundColor: `${edit?.stroke}`,
                padding: 3,
                splitByGrapheme: false,
                fill: "white",
              });

              text.set({ width: edit?.label.length * 7 });

              canvas.value.add(text);
              canvas.value.discardActiveObject();

              handleBasicRerender();

              box.next();
            }

            if (type === "EDIT") {
              canvas.value
                .getObjects()
                .find((arr) => arr.id === id && arr.type === "label")
                .set({ text: edit?.label });
              canvas.value.renderAll();
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
              box.next();
            } else {
              box.next();
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
