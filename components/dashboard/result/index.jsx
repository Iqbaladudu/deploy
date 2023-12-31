import Link from "next/link";
import { Grid, List, Search, Image as Img } from "react-feather";

const Result = () => {
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
            Hasil
          </p>
        </div>
        <div className="mt-4 row">
          <div className="col-12">
            <p className="fs-4 d-flex align-items-center">
              <Img
                data-feather="image"
                width="20"
                height="20"
                className="me-2"
              />
              Hasil
            </p>
          </div>
        </div>
        <div className="d-flex mb-3">
          <div className="input-icon position-relative w-100 pe-2">
            <Search
              data-feather="search"
              width="14"
              height="14"
              className="position-absolute"
              style={{ left: "15px", top: "14px" }}
            />
            <input
              type="text"
              name="search"
              placeholder="cari gambar"
              className="form-control outline-none shadow-none py-2 ps-3 rounded-2 ps-5"
              autofocus
            />
          </div>
          <a
            href="#"
            className="btn btn-primary outline-0 border-0 shadow-none p-0 d-flex align-items-center justify-content-center"
            style={{ width: "44px", height: "41px" }}
          >
            <Search data-feather="search" width="14" height="14" />
          </a>
        </div>
        <div className="row mb-3 justify-content-between">
          <div className="col-4 col-md-2 col-xxl-1">
            <div className="form-group w-100">
              <select className="form-select outline-0 shadow-none p-2 text-smaller">
                <option value="">10 gambar</option>
                <option value="">50 gambar</option>
                <option value="">100 gambar</option>
                <option value="">500 gambar</option>
              </select>
            </div>
          </div>
          <div className="col-6 col-md-2 col-xxl-2 d-flex justify-content-end">
            <div
              className="btn-group"
              role="group"
              aria-label="Basic radio toggle button group"
            >
              <input
                type="radio"
                className="btn-check"
                name="btnradio"
                id="btnradio1"
                autocomplete="off"
              />
              <label
                onclick=" $('#content').html(image['list'])"
                className="btn btn-outline-primary outline-none shadow-none d-flex align-items-center justify-content-center"
                style={{ padding: "10px" }}
                for="btnradio1"
              >
                <List data-feather="list" width="16" height="16" />
              </label>
              <input
                type="radio"
                className="btn-check"
                name="btnradio"
                id="btnradio2"
                autocomplete="off"
              />
              <label
                onclick=" $('#content').html(image['thumbnail'])"
                className="btn btn-outline-primary outline-none shadow-none d-flex align-items-center justify-content-center"
                style={{ padding: "10px" }}
                for="btnradio2"
              >
                <Grid data-feather="grid" width="16" height="16" />
              </label>
            </div>
          </div>
        </div>
        <div className="row mt-4" id="content"></div>
      </div>
    </div>
  );
};

export default Result;
