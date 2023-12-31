"use client";

import { computed, signal } from "@preact/signals-react";
import Link from "next/link";
import { Codepen, MoreVertical, Image as Img, ArrowRight } from "react-feather";

const labelData = signal([
  {
    id: 1,
    status: "unassigned",
    dateUpload: "10/10/2024",
    timeUpload: "10:30",
    imgTotal: "10",
  },
  {
    id: 2,
    status: "unassigned",
    dateUpload: "10/10/2024",
    timeUpload: "10:30",
    imgTotal: "10",
  },
  {
    id: 3,
    status: "unassigned",
    dateUpload: "10/10/2024",
    timeUpload: "10:30",
    imgTotal: "10",
  },
  {
    id: 4,
    status: "labeling",
    dateUpload: "10/10/2024",
    timeUpload: "10:30",
    imgTotal: "10",
  },
  {
    id: 5,
    status: "labeling",
    dateUpload: "10/10/2024",
    timeUpload: "10:30",
    imgTotal: "10",
  },
  {
    id: 6,
    status: "done",
    dateUpload: "10/10/2024",
    timeUpload: "10:30",
    imgTotal: "10",
  },
  {
    id: 7,
    status: "done",
    dateUpload: "10/10/2024",
    timeUpload: "10:30",
    imgTotal: "10",
  },
]);

const unassigned = computed(() =>
  labelData.value.filter((item) => item.status == "unassigned")
);

const labeling = computed(() =>
  labelData.value.filter((item) => item.status == "labeling")
);

const done = computed(() =>
  labelData.value.filter((item) => item.status == "done")
);

const LabelingCard = ({ id, status, dateUpload, timeUpload, imgTotal }) => {
  const removeCard = (id) => {
    const filteredData = labelData.value.filter((item) => item.id !== id);
    labelData.value = filteredData;
  };

  return (
    <div
      className={`card mt-3 ${
        status == "labeling" && "bg-soft-primary border-primary"
      }`}
    >
      <div className="card-body p-2">
        <div className="row">
          <div className="col-10">
            <p className="text-smaller mb-0">Upload on {dateUpload}</p>
            <p className="text-smaller opacity-50 mb-0">at {timeUpload}</p>
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
                    onClick={() => removeCard(id)}
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
              <span className="ms-2">{imgTotal} unassigned images</span>
            </p>
          </div>
          <div className="col-12 mt-1">
            <a
              href="/pages/upload/view.html"
              className="text-decoration-none text-primary text-smaller float-end"
            >
              <span className="me-2">Upload Image</span>
              <ArrowRight data-feather="arrow-right" width="13" height="13" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const Labeling = () => {
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
                    3 batch • 48 images
                  </span>
                </center>
                {/* Card here */}
                {unassigned.value.map((props, index) => (
                  <LabelingCard {...props} key={index} />
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
                    1 batch • 12 images
                  </span>
                </center>
                {/* Card here */}
                {labeling.value.map((props, index) => (
                  <LabelingCard {...props} key={index} />
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
                    2 batch • 18 images
                  </span>
                </center>
                {/* Card Here */}
                {done.value.map((props, index) => (
                  <LabelingCard {...props} key={index} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Labeling;
