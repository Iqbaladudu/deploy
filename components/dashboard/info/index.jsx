import { getEngine } from "@/app/service";
import { getLog } from "@/app/service/getLog";
import { removeLog } from "@/app/service/removeLog";
import { useEngineStore } from "@/app/store";
import { useMutation, useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";
import { Bookmark, Clock, Filter } from "react-feather";

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

  return (
    <div className="col-12 col-md-4 mb-3">
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
          <p id="page-title" className="mb-0 opacity-75">
            Log Demo
          </p>
        </div>
        <div className="mt-4 row">
          <div className="col-6">
            <p className="fs-4 d-flex align-items-center">
              <Bookmark
                data-feather="bookmark"
                width="20"
                height="20"
                className="me-2"
              />
              Log Demo
            </p>
          </div>
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
        </div>
        <div className="row p-0">
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
