import Image from "next/image";
import { Edit, Pocket, Upload, XCircle } from "react-feather";
import Zoom from "react-medium-image-zoom";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/app/etc";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BatchStatus } from "@/app/constant";

const BatchDetail = ({ id }) => {
  const [batchName, setBatchName] = useState();
  const [edit, setEdit] = useState(false);
  const batchData = useLiveQuery(() => db.upload.toArray());
  const trueBatchData = batchData?.filter((arr) => arr.id == id)[0];

  async function changeBatchName({ id, batch_name }) {
    await db.upload
      .where("id")
      .equals(parseInt(id))
      .modify({ batch_name: batch_name });
  }

  async function assignBatch({ id, status }) {
    await db.upload.where("id").equals(parseInt(id)).modify({ status });
  }

  useEffect(
    () => setBatchName(trueBatchData?.batch_name),
    [trueBatchData?.batch_name]
  );

  return (
    <div className="content w-100">
      <div className="container-fluid p-4">
        <div className="d-flex align-items-center text-smaller">
          <Link
            className="text-decoration-none text-primary pointer"
            href="/dashboard"
          >
            Beranda
          </Link>
          <span className="mx-2 opacity-75">/</span>

          <Link
            className="text-decoration-none text-primary pointer"
            href={"/dashboard/upload"}
          >
            Upload
          </Link>
          <span className="mx-2 opacity-75">/</span>
          <p id="page-title" className="mb-0 opacity-75">
            {trueBatchData?.batch_name}
          </p>
        </div>
        <div className="card border-0 outline-0 shadow-sm mt-4">
          <div className="card-body p-2">
            <div className="row mt-3 mx-2" id="content">
              <span className="d-flex flex-row gap-1 mb-4 align-items-center justify-content-between">
                {edit ? (
                  <>
                    <div className="col-12 col-md-4">
                      <input
                        type="text"
                        id="batch_name"
                        placeholder="nama batch"
                        value={batchName}
                        className="form-control outline-none shadow-none rounded-2"
                        onChange={(e) => setBatchName(e.target.value)}
                        autofocus
                      />
                    </div>
                    <button
                      onClick={() => {
                        changeBatchName({
                          id,
                          batch_name: batchName,
                        }).then(() => setEdit(false));
                      }}
                      className="btn btn-primary outline-0 border-0 shadow-none text-smaller float-end"
                    >
                      <Pocket
                        data-feather="pocket"
                        width="14"
                        height="14"
                        className="me-2"
                      />
                      Simpan
                    </button>
                    <button
                      onClick={() => setEdit(false)}
                      className="btn btn-secondary outline-0 border-0 shadow-none text-smaller float-end"
                    >
                      <XCircle
                        data-feather="pocket"
                        width="14"
                        height="14"
                        className="me-2"
                      />
                      Batal
                    </button>
                  </>
                ) : (
                  <span className="d-flex flex-row gap-1">
                    <p class="fw-semibold my-auto">
                      {trueBatchData?.batch_name}
                    </p>
                    <div className="pointer" onClick={() => setEdit(true)}>
                      <Edit height={10} width={10} />
                    </div>
                  </span>
                )}
                <button
                  onClick={() => {
                    assignBatch({ id, status: BatchStatus.LABELLING }).then(
                      () => setEdit(false)
                    );
                  }}
                  className="btn btn-primary outline-0 border-0 shadow-none text-smaller float-end"
                >
                  Assign Gambar
                </button>
              </span>

              {!trueBatchData ? (
                <div>
                  <p>Kamu belum memiliki gambar untuk ditampilkan</p>
                  <div>
                    <a
                      id="btn-reupload"
                      // onClick={() =>
                      //   router.push(
                      //     `/dashboard/demo?engine=${engine}&option=select-dataset`
                      //   )
                      // }
                      className="btn btn-primary outline-0 border-0 shadow-none text-smaller my-4"
                    >
                      <Upload
                        data-feather="upload"
                        width="14"
                        height="14"
                        className="me-2 mb-1"
                      />
                      Mulai prediksi sekarang
                    </a>
                  </div>
                </div>
              ) : (
                <>
                  {trueBatchData?.data?.map((arr, index) => (
                    <div
                      class="col-4 col-md-2 col-xxl-1 mb-2 mb-md-3"
                      key={index}
                    >
                      <div class="p-2 rounded-2 img-result">
                        <center>
                          <div className="image-container" key={index}>
                            <Zoom>
                              <Image
                                src={`data:image/<mime-type>;base64, ${arr.base64}`}
                                alt=""
                                className="rounded-1"
                                style={{
                                  width: "100%",
                                }}
                                width={100}
                                height={100}
                              />
                            </Zoom>
                          </div>
                          <p class="text-smaller opacity-50 mb-0">
                            filename.jpg
                          </p>
                        </center>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BatchDetail;
