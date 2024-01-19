import { getEngine } from "@/app/service";
import { getLog } from "@/app/service/getLog";
import { removeLog } from "@/app/service/removeLog";
import { useEngineStore } from "@/app/store";
import { useMutation, useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Bookmark, Clock, Filter, Grid, List } from "react-feather";

const LogCard = ({ date_updated, engine, user, id }) => {
  function addZero(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }

  const timestamp = date_updated;
  const dates = new Date(timestamp);
  const date = dates.getDate();
  const month = dates.toLocaleDateString("id-ID", { month: "long" });
  const year = dates.getFullYear();
  const time = `Terakhir diperbarui pada ${date} ${month} ${year} pukul ${addZero(
    dates.getHours()
  )}:${addZero(dates.getMinutes())}`;

  const enginesQuery = useQuery({
    queryKey: "get-engines",
    queryFn: getEngine,
  });

  const engines = useEngineStore((state) => state.engines);

  const thisEngine =
    engines.length == 0
      ? enginesQuery.data.data.filter((arr) => arr.id == engine)
      : engines.filter((arr) => arr.id == engine);

  const deleteLog = useMutation({
    mutationFn: removeLog,
    onSuccess: (data) => {
      console.log(data);
    },
  });

  const router = useRouter();

  return (
    <div
      className="col-12 col-md-4 mb-3"
      onClick={() => router.push(`/dashboard/info?id=${id}`)}
    >
      <div
        className="card border-0 outline-0 shadow-sm mb-3 pointer card-engine"
        // onClick={() => deleteLog.mutate(id)}
      >
        <div className="card-body">
          <a
            className="d-none"
            id="btn-01"
            href="/pages/demo/detail-info.html?log=2023-08-08-10-20"
          >
            Coba
          </a>
          <p className="text-primary fw-bold">
            {date} {month} {year}
          </p>
          <table>
            <tbody>
              <tr>
                <td className="text-smaller" style={{ width: "80px" }}>
                  Engine
                </td>
                <td className="text-smaller opacity-50">
                  {/* : {engines.isLoading ? "Memuat engine" : thisEngine[0].title} */}
                  : {thisEngine[0].title}
                </td>
              </tr>
              <tr>
                <td className="text-smaller">Domain</td>
                <td className="text-smaller opacity-50">
                  : {thisEngine[0].category_data.name}
                </td>
              </tr>
              <tr>
                <td className="text-smaller">Kategori</td>
                <td className="text-smaller opacity-50">
                  : {thisEngine[0].type_data.name}
                </td>
              </tr>
            </tbody>
          </table>
          <div className="d-flex align-items-center text-smaller mt-4 opacity-50">
            <Clock
              data-feather="clock"
              width="13"
              height="13"
              className="me-2"
            />
            <span>{time}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const Info = () => {
  const { data, isLoading } = useQuery({
    queryKey: "get-log",
    queryFn: getLog,
  });

  const [detail, setDetail] = useState(false);
  const searchParams = useSearchParams();
  const log = searchParams.get("id");

  const router = useRouter();

  const [selectedValue, setSelectedValue] = useState("10");
  const [detailView, setDetailView] = useState("GRID");
  const [ascending, setAscending] = useState(true);

  function handleChange(event) {
    setSelectedValue(event.target.value);
  }

  const asc =
    !isLoading &&
    data.data
      .slice(0, parseInt(selectedValue))
      .sort((a, b) => new Date(a.date_updated) + new Date(b.date_updated));

  const desc =
    !isLoading &&
    data.data
      .slice(0, parseInt(selectedValue))
      .sort((a, b) => new Date(a.date_updated) - new Date(b.date_updated));

  return (
    <div className="content w-100 p-0">
      <div className="container-fluid p-4">
        <div className="d-flex align-items-center text-smaller">
          <Link
            className="text-decoration-none text-primary pointer"
            href="/dashboard"
          >
            Beranda
          </Link>
          <span className="mx-2 opacity-75">/</span>
          {log ? (
            <>
              <Link
                className="text-decoration-none text-primary pointer"
                href={"/dashboard/info"}
              >
                Log Demo
              </Link>
              <span className="mx-2 opacity-75">/</span>
              <p id="page-title" className="mb-0 opacity-75">
                Detail
              </p>
            </>
          ) : (
            <p id="page-title" className="mb-0 opacity-75">
              Log Demo
            </p>
          )}
        </div>
        <div className="mt-4 row mb-4">
          <div className="col-6">
            <p className="fs-4 d-flex align-items-center m-0">
              {!log && (
                <Bookmark
                  data-feather="bookmark"
                  width="20"
                  height="20"
                  className="me-2"
                />
              )}
              Log Demo
            </p>
          </div>
          {log ? (
            <div class="col-6 d-flex justify-content-end">
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
                  value="LIST"
                  checked={detailView == "LIST"}
                />
                <label
                  onClick={() => setDetailView("LIST")}
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
                  value="GRID"
                  onChange={(e) => setDetailView("GRID")}
                  checked={detailView == "GRID"}
                />
                <label
                  onClick={() => setDetailView("GRID")}
                  class="btn btn-outline-primary outline-none shadow-none d-flex align-items-center justify-content-center"
                  style={{ padding: "10px" }}
                  for="btnradio2"
                >
                  <Grid data-feather="grid" width={16} height={16} />
                </label>
              </div>
            </div>
          ) : (
            <div className="col-6 d-flex justify-content-end">
              <div className="form-group w-100" style={{ maxWidth: "140px" }}>
                <select
                  value={selectedValue}
                  onChange={handleChange}
                  className="form-select outline-0 shadow-none p-2 text-smaller"
                >
                  <option value="10">10 data</option>
                  <option value="50">50 data</option>
                  <option value="100">100 data</option>
                  <option value="500">500 data</option>
                </select>
              </div>
              <div className="dropdown">
                <button
                  className="btn d-flex align-items-center justify-content-center outline-0 border-0 shadow-none text-smaller float-end ms-2"
                  style={{
                    backgroundColor: "rgba(128, 128, 128, 0.123)",
                    width: "40px",
                    height: "37px",
                  }}
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <Filter data-feather="filter" width="14" height="14" />
                </button>
                <ul className="dropdown-menu border-0 shadow-sm">
                  <li>
                    <a
                      className="dropdown-item"
                      onClick={() => setAscending(true)}
                    >
                      ASC
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      onClick={() => setAscending(false)}
                    >
                      DESC
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
        <div className="row p-0">
          {log ? (
            <InfoDetail view={detailView} />
          ) : (
            <>
              {isLoading ? (
                <div className="d-flex justify-content-center">
                  <div
                    className="spinner-border text-white spinner-border-sm"
                    role="status"
                  ></div>
                </div>
              ) : (
                <>
                  {ascending &&
                    asc.map((props, index) => (
                      <LogCard {...props} key={index} />
                    ))}
                  {!ascending &&
                    desc.map((props, index) => (
                      <LogCard {...props} key={index} />
                    ))}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const InfoDetail = ({ view }) => {
  return (
    <div className="card border-0 outline-0 shadow-sm mt-4">
      <div className="card-body p-2">
        <div className="row mt-3" id="content">
          {view === "GRID" ? (
            <>
              <div class="col-4 col-md-2 col-xxl-1 mb-2 mb-md-3">
                <div class="p-2 rounded-2 img-result">
                  <center>
                    <img
                      src="https://th.bing.com/th/id/OIP.YYZJNNin-9pT6aKNmpqVtQHaGl?rs=1&pid=ImgDetMain"
                      class="w-75 mb-2 rounded-2"
                      alt=""
                    />
                    <p class="text-smaller opacity-50 mb-0">filename.jpg</p>
                  </center>
                </div>
              </div>
              <div class="col-4 col-md-2 col-xxl-1 mb-2 mb-md-3">
                <div class="p-2 rounded-2 img-result">
                  <center>
                    <img
                      src="https://th.bing.com/th/id/OIP.YYZJNNin-9pT6aKNmpqVtQHaGl?rs=1&pid=ImgDetMain"
                      class="w-75 mb-2 rounded-2"
                      alt=""
                    />
                    <p class="text-smaller opacity-50 mb-0">filename.jpg</p>
                  </center>
                </div>
              </div>
            </>
          ) : (
            <>
              <div class="col-12 col-md-4 col-xxl-3 mb-2 mb-md-3">
                <div class="p-2 rounded-2 img-result">
                  <div class="row">
                    <div class="col-3">
                      <img
                        src="https://th.bing.com/th/id/OIP.YYZJNNin-9pT6aKNmpqVtQHaGl?rs=1&pid=ImgDetMain"
                        class="w-100 rounded-2"
                        alt=""
                      />
                    </div>
                    <div class="col-9 d-flex align-items-center">
                      <div>
                        <p class="text-smaller opacity-100 mb-0">
                          filename:{" "}
                          <span class="opacity-50">filename.jpg </span>
                        </p>
                        <p class="text-smaller opacity-100 mb-0">
                          split: <span class="opacity-50">valid</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-12 col-md-4 col-xxl-3 mb-2 mb-md-3">
                <div class="p-2 rounded-2 img-result">
                  <div class="row">
                    <div class="col-3">
                      <img
                        src="https://th.bing.com/th/id/OIP.YYZJNNin-9pT6aKNmpqVtQHaGl?rs=1&pid=ImgDetMain"
                        class="w-100 rounded-2"
                        alt=""
                      />
                    </div>
                    <div class="col-9 d-flex align-items-center">
                      <div>
                        <p class="text-smaller opacity-100 mb-0">
                          filename:{" "}
                          <span class="opacity-50">filename.jpg </span>
                        </p>
                        <p class="text-smaller opacity-100 mb-0">
                          split: <span class="opacity-50">valid</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default Info;
