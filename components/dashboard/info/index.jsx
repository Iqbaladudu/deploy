import { getEngine } from "@/app/service";
import { getLog } from "@/app/service/getLog";
import { removeLog } from "@/app/service/removeLog";
import { useMutation, useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";
import { Bookmark, Clock, Filter } from "react-feather";

const LogCard = ({ date_updated, engine, user, id }) => {
  const timestamp = date_updated;
  const dates = new Date(timestamp);
  const date = dates.getDate();
  const month = dates.toLocaleDateString("default", { month: "long" });
  const year = dates.getFullYear();
  const time = `${dates.getHours()}:${dates.getMinutes()}`;

  const engines = useQuery({
    queryKey: "get-engines",
    queryFn: getEngine,
  });

  const thisEngine =
    !engines.isLoading && engines.data.data.filter((arr) => arr.id == engine);

  const deleteLog = useMutation({
    mutationFn: removeLog,
    onSuccess: (data) => {
      console.log(data);
    },
  });

  return (
    <div class="col-12 col-md-4 mb-3">
      <div
        class="card border-0 outline-0 shadow-sm mb-3 pointer card-engine"
        // onClick={() => deleteLog.mutate(id)}
      >
        <div class="card-body">
          <a
            class="d-none"
            id="btn-01"
            href="/pages/demo/detail-info.html?log=2023-08-08-10-20"
          >
            Coba
          </a>
          <p class="text-primary fw-bold">
            {date} {month} {year} {time}
          </p>
          <table>
            <tbody>
              <tr>
                <td class="text-smaller" style={{ width: "80px" }}>
                  Engine
                </td>
                <td class="text-smaller opacity-50">
                  : {engines.isLoading ? "Memuat engine" : thisEngine[0].title}
                </td>
              </tr>
              <tr>
                <td class="text-smaller">Domain</td>
                <td class="text-smaller opacity-50">: Smart City</td>
              </tr>
              <tr>
                <td class="text-smaller">Kategori</td>
                <td class="text-smaller opacity-50">: Object Detection</td>
              </tr>
            </tbody>
          </table>
          <div class="d-flex align-items-center text-smaller mt-4 opacity-50">
            <Clock data-feather="clock" width="13" height="13" class="me-2" />
            <span>2 hours ago</span>
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

  const [selectedValue, setSelectedValue] = useState("10");
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
            Log Demo
          </p>
        </div>
        <div class="mt-4 row">
          <div class="col-6">
            <p class="fs-4 d-flex align-items-center">
              <Bookmark
                data-feather="bookmark"
                width="20"
                height="20"
                class="me-2"
              />
              Log Demo
            </p>
          </div>
          <div class="col-6 d-flex justify-content-end">
            <div class="form-group w-100" style={{ maxWidth: "140px" }}>
              <select
                value={selectedValue}
                onChange={handleChange}
                class="form-select outline-0 shadow-none p-2 text-smaller"
              >
                <option value="10">10 data</option>
                <option value="50">50 data</option>
                <option value="100">100 data</option>
                <option value="500">500 data</option>
              </select>
            </div>
            <div class="dropdown">
              <button
                class="btn d-flex align-items-center justify-content-center outline-0 border-0 shadow-none text-smaller float-end ms-2"
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
              <ul class="dropdown-menu border-0 shadow-sm">
                <li>
                  <a class="dropdown-item" onClick={() => setAscending(true)}>
                    ASC
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" onClick={() => setAscending(false)}>
                    DESC
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="row">
          {isLoading ? (
            "loading"
          ) : (
            <>
              {ascending &&
                asc.map((props, index) => <LogCard {...props} key={index} />)}
              {!ascending &&
                desc.map((props, index) => <LogCard {...props} key={index} />)}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Info;
