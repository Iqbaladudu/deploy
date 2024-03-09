"use client";

import { BatchStatus } from "@/app/constant";
import { db } from "@/app/etc";
import { useLiveQuery } from "dexie-react-hooks";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Codepen, MoreVertical, Image as Img, ArrowRight } from "react-feather";
import slugify from "slugify";

const LabelingCard = ({ props }) => {
  async function removeCard(id) {
    await db?.upload?.where("id").equals(parseInt(id)).delete();
  }

  const router = useRouter();

  return (
    <div
      className={`card mt-3 ${
        props.status == BatchStatus.LABELLING &&
        "bg-soft-primary border-primary"
      }`}
    >
      <div className="card-body p-2">
        <div className="row">
          <div className="col-10">
            <p className="text-smaller mb-0">{props.batch_name}</p>
            <p className="text-smaller opacity-50 mb-0">{props.time}</p>
          </div>
          <div className="col-2">
            <div className="dropdown ms-4">
              <div
                className="d-flex align-items-center justify-content-end"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <MoreVertical
                  data-feather="more-vertical"
                  className="pointer"
                  width="16"
                  height="16"
                />
              </div>
              <ul className="dropdown-menu border-0 shadow-sm">
                <li>
                  <span
                    className="dropdown-item pointer"
                    onClick={() => removeCard(props.id)}
                  >
                    Hapus
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-12 mt-2">
            <p className="opacity-50 text-smaller d-flex align-items-center mb-0">
              <Img data-feather="image" width="13" height="13" />
              <span className="ms-2">
                {props.data.length}{" "}
                {props.status === BatchStatus.UNASSIGNED
                  ? "unassigned"
                  : "labeling"}{" "}
                images
              </span>
            </p>
          </div>
          <div className="col-12 mt-1">
            <a
              className="text-decoration-none text-primary text-smaller float-end"
              role="button"
              onClick={() => {
                router.push(`/dashboard/batch?id=${props.id}`);
              }}
            >
              <span className="me-2">Lihat Gambar</span>
              <ArrowRight data-feather="arrow-right" width="13" height="13" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const Labeling = () => {
  const batchData = useLiveQuery(() => db?.upload?.toArray());
  const unassigned = batchData?.filter(
    (arr) => arr.status === BatchStatus.UNASSIGNED
  );
  const labelling = batchData?.filter(
    (arr) => arr.status === BatchStatus.LABELLING
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
          <p id="page-title" className="mb-0 opacity-75">
            Labeling
          </p>
        </div>
        <div className="mt-4 row">
          <div className="col-12">
            <p className="fs-4 d-flex align-items-center">
              <Codepen
                data-feather="codepen"
                width="20"
                height="20"
                className="me-2"
              />
              Labeling
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-4 mb-3 order-2 order-md-0">
            <div className="card border-0 outline-0 shadow-sm">
              <div className="card-body">
                <center>
                  <p className="mb-0 fs-6 fw-semibold">Unassigned</p>
                  <span className="opacity-50 text-smaller">
                    {unassigned?.length} batch •{" "}
                    {unassigned?.length === 0
                      ? "0"
                      : unassigned
                          ?.map((arr) => [...arr.data])
                          .map((arr) => arr.length)
                          .reduce((total, num) => total + num)}{" "}
                    images
                  </span>
                </center>
                {/* Card here */}
                {unassigned?.map((props, index) => (
                  <LabelingCard props={props} key={index} />
                ))}
              </div>
            </div>
          </div>
          <div className="col-12 col-md-4 mb-3 order-0 order-md-1">
            <div className="card border-0 outline-0 shadow-sm">
              <div className="card-body">
                <center>
                  <p className="mb-0 fs-6 fw-semibold">Labeling</p>
                  <span className="opacity-50 text-smaller">
                    {labelling?.length} batch •{" "}
                    {labelling?.length === 0
                      ? "0"
                      : labelling
                          ?.map((arr) => [...arr.data])
                          .map((arr) => arr.length)
                          .reduce((total, num) => total + num)}{" "}
                    images
                  </span>
                </center>
                {/* Card here */}
                {labelling?.map((props, index) => (
                  <LabelingCard props={props} key={index} />
                ))}
              </div>
            </div>
          </div>
          <div className="col-12 col-md-4 mb-3 order-1 order-md-2">
            <div className="card border-0 outline-0 shadow-sm">
              <div className="card-body">
                <center>
                  <p className="mb-0 fs-6 fw-semibold">Hasil</p>
                  <span className="opacity-50 text-smaller">
                    0 batch • 0 images
                  </span>
                </center>
                {/* Card Here */}
                {/* {done.value.map((props, index) => (
                  <LabelingCard {...props} key={index} />
                ))} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Labeling;
