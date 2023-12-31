import Link from "next/link";
import { Grid, List, Search, Image as Img } from "react-feather";

const Result = () => {
  return (
    <div class="content w-100">
      <div class="container-fluid p-4">
        <div class="d-flex align-items-center text-smaller">
          <Link
            class="text-decoration-none text-primary pointer"
            href="/dashboard"
          >
            Beranda
          </Link>
          <span class="mx-2 opacity-75">/</span>
          <p id="page-title" class="mb-0 opacity-75">
            Hasil
          </p>
        </div>
        <div class="mt-4 row">
          <div class="col-12">
            <p class="fs-4 d-flex align-items-center">
              <Img data-feather="image" width="20" height="20" class="me-2" />
              Hasil
            </p>
          </div>
        </div>
        <div class="d-flex mb-3">
          <div class="input-icon position-relative w-100 pe-2">
            <Search
              data-feather="search"
              width="14"
              height="14"
              class="position-absolute"
              style={{ left: "15px", top: "14px" }}
            />
            <input
              type="text"
              name="search"
              placeholder="cari gambar"
              class="form-control outline-none shadow-none py-2 ps-3 rounded-2 ps-5"
              autofocus
            />
          </div>
          <a
            href="#"
            class="btn btn-primary outline-0 border-0 shadow-none p-0 d-flex align-items-center justify-content-center"
            style={{ width: "44px", height: "41px" }}
          >
            <Search data-feather="search" width="14" height="14" />
          </a>
        </div>
        <div class="row mb-3 justify-content-between">
          <div class="col-4 col-md-2 col-xxl-1">
            <div class="form-group w-100">
              <select class="form-select outline-0 shadow-none p-2 text-smaller">
                <option value="">10 gambar</option>
                <option value="">50 gambar</option>
                <option value="">100 gambar</option>
                <option value="">500 gambar</option>
              </select>
            </div>
          </div>
          <div class="col-6 col-md-2 col-xxl-2 d-flex justify-content-end">
            <div
              class="btn-group"
              role="group"
              aria-label="Basic radio toggle button group"
            >
              <input
                type="radio"
                class="btn-check"
                name="btnradio"
                id="btnradio1"
                autocomplete="off"
              />
              <label
                onclick=" $('#content').html(image['list'])"
                class="btn btn-outline-primary outline-none shadow-none d-flex align-items-center justify-content-center"
                style={{ padding: "10px" }}
                for="btnradio1"
              >
                <List data-feather="list" width="16" height="16" />
              </label>
              <input
                type="radio"
                class="btn-check"
                name="btnradio"
                id="btnradio2"
                autocomplete="off"
              />
              <label
                onclick=" $('#content').html(image['thumbnail'])"
                class="btn btn-outline-primary outline-none shadow-none d-flex align-items-center justify-content-center"
                style={{ padding: "10px" }}
                for="btnradio2"
              >
                <Grid data-feather="grid" width="16" height="16" />
              </label>
            </div>
          </div>
        </div>
        <div class="row mt-4" id="content"></div>
      </div>
    </div>
  );
};

export default Result;
