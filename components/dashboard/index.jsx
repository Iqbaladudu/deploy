import carImg from "@/public/carImg.png";
import Image from "next/image";
import workspaceImg from "@/public/workspace.png";
import projectImg from "@/public/projects.png";
import { useMediaQuery } from "react-responsive";
import {
  Briefcase,
  Clock,
  File,
  MoreVertical,
  Plus,
  Image as Img,
  Check,
  ArrowRight,
} from "react-feather";
import sampleAnnotate from "@/public/sample-anotate.png";
import logoIcon from "@/public/logo-iai-icon.png";
import banana from "@/public/engine-banana-ripeness.png";
import ppe from "@/public/engine-ppe-detection.png";
import vehicle from "@/public/engine-vehicle.png";
import imgCorporate from "@/public/bg-image-corporate2.png";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { db } from "@/app/etc";
import { useLiveQuery } from "dexie-react-hooks";

const MySwal = withReactContent(Swal);

const OperationTypes = {
  AddWorkspace: "AddWorkspace",
  UpdateWorkspace: "UpdateWorkspace",
  RemoveWorkspace: "RemoveWorkspace",
  AddProject: "AddProject",
  UpdateProject: "UpdateProject",
  RemoveProject: "RemoveProject",
};

const Dashboard = () => {
  const projects = useLiveQuery(() => db.project.toArray());
  const workspace = useLiveQuery(() => db.workspace.toArray());

  return (
    <div className="content w-100">
      <div className="container-fluid p-4 pb-5">
        <div className="alert alert-info text-smaller">
          🔥&nbsp; Kamu bisa mencoba AI Engine yang kami sediakan dalam bentuk
          demo.
          <a
            href="/pages/demo/demo.html"
            className="text-decoration-none text-info fw-semibold"
          >
            Coba sekarang!
          </a>
        </div>
        <div className="row">
          <div className="col-12 col-md-7 col-xxl-8 order-1 order-md-0">
            <div
              className="card border-0 outline-0 mb-3"
              style={{
                backgroundImage: `url(${imgCorporate.src})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundColor: "#b93434",
              }}
            >
              <div className="card-body p-4">
                <div className="row">
                  <div className="col-12 col-md-8 col-xxl-9 text-white">
                    <p className="mb-0 text-smaller opacity-75">
                      Halo selamat datang,
                    </p>
                    <p className="fs-5 fw-semibold mb-3">
                      Nama Lengkap Pengguna!
                    </p>
                    <div className="row d-flex align-items-center">
                      <div className="col-7 col-md-12">
                        <div className="d-flex align-items-center mb-2">
                          <div
                            className="d-flex align-items-center justify-content-center rounded-3"
                            style={{
                              width: "30px",
                              height: "30px",
                              backgroundColor: "rgba(240, 248, 255, 0.2)",
                            }}
                          >
                            <Briefcase width="13" height="13" />
                          </div>
                          <p className="mb-0 fs-6 ms-3">3 Workspace</p>
                        </div>
                        <div className="d-flex align-items-center">
                          <div
                            className="d-flex align-items-center justify-content-center rounded-3"
                            style={{
                              width: "30px",
                              height: "30px",
                              backgroundColor: "rgba(240, 248, 255, 0.2)",
                            }}
                          >
                            <File width="13" height="13" />
                          </div>
                          <p className="mb-0 fs-6 ms-3">3 Projects</p>
                        </div>
                      </div>
                      <div className="col-5 col-md-12 d-block d-md-none">
                        <Image
                          src={sampleAnnotate}
                          className="w-100 h-100"
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-4 col-xxl-3 d-none d-md-block">
                    <Image
                      src={sampleAnnotate}
                      className="h-100 w-100"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-2 d-flex justify-content-between align-items-center">
              <p className="mb-0 fs-6">Worskspace</p>
              <Modal
                id={OperationTypes.AddWorkspace}
                title={"Buat workspace baru"}
              />
              <button
                className="btn text-white bg-primary outline-0 border-0 shadow-none text-smaller d-flex justify-content-center align-items-center p-0"
                style={{ width: "30px", height: "30px" }}
                data-bs-toggle="modal"
                data-bs-target={`#${OperationTypes.AddWorkspace}`}
              >
                <Plus data-feather="plus" width="12" height="12" />
              </button>
            </div>
            <div className="row">
              {workspace?.length === 0 ? (
                <div className="p-4">
                  <p className="text-center">Kamu belum memiliki project</p>
                </div>
              ) : (
                workspace?.map((props, index) => (
                  <WorkspaceCard
                    id={props.id}
                    title={props.name}
                    projectCount={props.project_count}
                    lastModified={props.time}
                    key={props.id}
                  />
                ))
              )}
            </div>
            <div className="mb-2 mt-4 d-flex justify-content-between align-items-center">
              <p className="mb-0">Projects</p>
              <Modal
                id={OperationTypes.AddProject}
                title={"Buat project baru"}
              />
              <button
                className="btn text-white bg-primary outline-0 border-0 shadow-none text-smaller d-flex justify-content-center align-items-center p-0"
                style={{ width: "30px", height: "30px" }}
                data-bs-toggle="modal"
                data-bs-target={`#${OperationTypes.AddProject}`}
              >
                <Plus data-feather="plus" width="12" height="12" />
              </button>
            </div>
            <div className="row">
              {projects?.length === 0 ? (
                <div className="p-4">
                  <p className="text-center">Kamu belum memiliki project</p>
                </div>
              ) : (
                projects?.map((props, index) => (
                  <ProjectCard
                    title={props.name}
                    category={props.category}
                    imgCount={props.img_count}
                    lastEdited={props.time}
                    id={props.id}
                    key={props.id}
                  />
                ))
              )}
            </div>
          </div>
          <div className="col-12 col-md-5 col-xxl-4 order-0 order-md-1 mb-3">
            <div className="card border-0 outline-0 mb-3 shadow-sm">
              <div className="card-body p-4">
                <p>
                  Berikut adalah beberapa tips dan panduan untuk membantu kamu
                  memulai. 🚀
                </p>
                <ul className="list-unstyled mb-0">
                  <li className="text-smaller mt-3">
                    <a
                      href=""
                      className="d-flex justify-content-between align-items-center text-decoration-none text-dark"
                    >
                      <div className="d-flex align-items-center ">
                        <div
                          className="bg-primary rounded-circle d-flex justify-content-center align-items-center p-0"
                          style={{ width: "20px", height: "20px" }}
                        >
                          <Check
                            data-feather="check"
                            className="text-white"
                            width="12"
                            height="12"
                          />
                        </div>
                        <span className="opacity-50 ms-2">Coba demo model</span>
                      </div>
                      <i
                        className="opacity-50"
                        data-feather="arrow-right"
                        width="16"
                        height="16"
                      ></i>
                    </a>
                  </li>
                  <li className="text-smaller mt-3">
                    <a
                      href=""
                      className="d-flex justify-content-between align-items-center text-decoration-none text-dark"
                    >
                      <div className="d-flex align-items-center ">
                        <div
                          className="bg-primary rounded-circle d-flex justify-content-center align-items-center p-0"
                          style={{ width: "20px", height: "20px" }}
                        >
                          <Check
                            data-feather="check"
                            className="text-white"
                            width="12"
                            height="12"
                          />
                        </div>
                        <span className="opacity-50 ms-2">Unggah gambar</span>
                      </div>
                      <i
                        className="opacity-50"
                        data-feather="arrow-right"
                        width="16"
                        height="16"
                      ></i>
                    </a>
                  </li>
                  <li className="text-smaller mt-3">
                    <a
                      href=""
                      className="d-flex justify-content-between align-items-center text-decoration-none text-dark"
                    >
                      <div className="d-flex align-items-center ">
                        <div
                          className="bg-dark opacity-50 rounded-circle d-flex justify-content-center align-items-center p-0"
                          style={{ width: "20px", height: "20px" }}
                        >
                          <Check
                            data-feather="check"
                            className="text-white"
                            width="12"
                            height="12"
                          />
                        </div>
                        <span className="opacity-50 ms-2">Labeling</span>
                      </div>
                      <i
                        className="opacity-50"
                        data-feather="arrow-right"
                        width="16"
                        height="16"
                      ></i>
                    </a>
                  </li>
                  <li className="text-smaller mt-3">
                    <a
                      href=""
                      className="d-flex justify-content-between align-items-center text-decoration-none text-dark"
                    >
                      <div className="d-flex align-items-center ">
                        <div
                          className="bg-dark opacity-50 rounded-circle d-flex justify-content-center align-items-center p-0"
                          style={{ width: "20px", height: "20px" }}
                        >
                          <Check
                            data-feather="check"
                            className="text-white"
                            width="12"
                            height="12"
                          />
                        </div>
                        <span className="opacity-50 ms-2">Download hasil</span>
                      </div>
                      <ArrowRight
                        className="opacity-50"
                        data-feather="arrow-right"
                        width="16"
                        height="16"
                      />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="card border-0 outline-0 mb-3 shadow-sm">
              <div className="card-body p-4"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function WorkspaceCard({ id, title, projectCount, lastModified }) {
  const workspace = useLiveQuery(() => db.workspace.toArray());
  const thisWorkspace = workspace?.filter((arr) => arr.id == id)[0];

  async function removeWorkspace({ id }) {
    await db.workspace.where("id").equals(parseInt(id)).delete();
  }

  return (
    <div className="col-12 col-md-6 mb-3">
      <div className="card border-0 outline-0 border" id="card_2">
        <div className="card-body p-2">
          <div className="row">
            <div className="col-2 d-flex align-items-center">
              <div>
                <Image
                  src={logoIcon}
                  style={{ aspectRatio: "1/1" }}
                  className="h-100 w-100"
                  alt=""
                />
              </div>
            </div>
            <div className="col-8 ps-0 d-flex align-items-center">
              <p className="mb-0 fs-6">{title}</p>
            </div>
            <div className="col-2 d-flex align-items-center justify-content-end">
              <Modal
                id={OperationTypes.UpdateWorkspace}
                title={"Edit workspace"}
                prepopulated_data={thisWorkspace}
              />
              <div className="dropdown">
                <div
                  className="d-flex align-items-center justify-content-end"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <MoreVertical
                    data-feather="more-vertical"
                    className="pointer"
                    width="14"
                    height="14"
                  />
                </div>
                <ul className="dropdown-menu border-0 shadow-sm">
                  <li>
                    <a
                      className="dropdown-item pointer btn"
                      data-bs-toggle="modal"
                      data-bs-target={`#${OperationTypes.UpdateWorkspace}`}
                    >
                      Edit
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item pointer"
                      onClick={() => removeWorkspace({ id: id })}
                    >
                      Hapus
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-2"></div>
            <div className="col-10 ps-0 pt-2">
              <div className="text-smaller opacity-50 d-flex align-items-center">
                <div className="d-flex align-items-center me-4">
                  <File
                    data-feather="file"
                    width="13"
                    height="13"
                    className="me-2"
                  />
                  <span>{projectCount}</span>
                </div>
                <div className="d-flex align-items-center">
                  <Clock
                    data-feather="clock"
                    width="13"
                    height="13"
                    className="me-2"
                  />
                  <span>{lastModified}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const ProjectCard = ({ id, title, category, lastEdited, imgCount }) => {
  async function removeProject({ id }) {
    await db.project.where("id").equals(parseInt(id)).delete();
  }

  const project = useLiveQuery(() => db.project.toArray());
  const thisProject = project?.filter((arr) => arr.id == id)[0];

  return (
    <div className="col-12 col-md-6 mb-3">
      <div className="card border-0 outline-0" id="card_3">
        <div className="card-body p-2">
          <div className="row">
            <div className="col-2 d-flex align-items-center">
              <div>
                <Image
                  src={vehicle}
                  style={{ aspectRatio: "1/1" }}
                  className="h-100 w-100"
                  alt=""
                />
              </div>
            </div>
            <div className="col-8 ps-0 d-flex align-items-center">
              <p className="mb-0">{title}</p>
            </div>
            <Modal
              id={OperationTypes.UpdateProject}
              title={"Edit project"}
              prepopulated_data={thisProject}
            />
            <div className="col-2 d-flex align-items-center justify-content-end">
              <div className="dropdown">
                <div
                  className="d-flex align-items-center justify-content-end"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <MoreVertical
                    data-feather="more-vertical"
                    className="pointer"
                    width="14"
                    height="14"
                  />
                </div>
                <ul className="dropdown-menu border-0 shadow-sm">
                  <li>
                    <span
                      className="dropdown-item pointer btn"
                      data-bs-toggle="modal"
                      data-bs-target={`#${OperationTypes.UpdateProject}`}
                    >
                      Edit
                    </span>
                  </li>
                  <li>
                    <span
                      className="dropdown-item pointer"
                      onClick={() => removeProject({ id })}
                    >
                      Hapus
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-2"></div>
            <div className="col-10 ps-0">
              <div className="text-smaller mb-2 opacity-50 d-flex align-items-center">
                <div className="d-flex align-items-center me-2">
                  <span>{category}</span>
                  <span className="mx-2">•</span>
                  <span>{lastEdited}</span>
                </div>
              </div>
              <div className="text-smaller opacity-50 d-flex align-items-center">
                <div className="d-flex align-items-center me-4">
                  <Img
                    data-feather="image"
                    width="13"
                    height="13"
                    className="me-2"
                  />
                  <span>{imgCount}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

function Modal({ id, title, prepopulated_data = null }) {
  const [projectData, setProjectData] = useState({
    name: "",
    category: "",
  });

  const [inputValue, setInputValue] = useState({
    name: "",
    category: "",
  });

  const [workspaceData, setWorkspaceData] = useState([
    {
      title: "",
    },
  ]);

  async function updateProject({ id, name, category }) {
    const data = await db.project
      .where("id")
      .equals(parseInt(id))
      .modify({ name, category });
  }

  async function updateWorkspace({ id, name }) {
    const data = await db.workspace
      .where("id")
      .equals(parseInt(id))
      .modify({ name });
  }

  async function addData(database, { name, category = null }) {
    if (database === "workspace") {
      await db.workspace.add({
        name: name,
        project_count: 4,
        time: "1 Jam yang lalu",
      });
    } else if (database === "project") {
      await db.project.add({
        name: name,
        category: category,
        img_count: 6,
        time: "Hari ini",
      });
    }
  }

  const project = useLiveQuery(() => db.project.toArray());
  const workspace = useLiveQuery(() => db.workspace.toArray());

  const placeHolders = {
    AddProject: "Nama project",
    addWorkspace: "Nama workspace",
  };

  useEffect(() => {
    if (prepopulated_data) {
      setInputValue((prevState) => ({
        ...prevState,
        name: prepopulated_data.name,
        category: prepopulated_data.category,
      }));
    }
  }, [prepopulated_data]);

  const action = {
    AddWorkspace: () => {
      addData("workspace", {
        name: inputValue.name,
      });
      setInputValue((prevState) => ({ ...prevState, name: "" }));
    },
    AddProject: () => {
      addData("project", {
        name: inputValue.name,
        category: inputValue.category,
      });
      setInputValue({ name: "", category: "" });
    },

    UpdateWorkspace: () => {
      updateWorkspace({
        name: inputValue.name,
        id: prepopulated_data.id,
      });
    },
    UpdateProject: () => {
      updateProject({
        id: prepopulated_data.id,
        name: inputValue.name,
        category: inputValue.category,
      });
    },
  };

  return (
    <div
      class="modal fade"
      id={id}
      tabindex="-1"
      aria-labelledby="workspaceModal"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id={id}>
              {title}
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <input
              class="form-control"
              type="text"
              value={inputValue.name}
              onChange={(event) =>
                setInputValue((prevState) => ({
                  ...prevState,
                  name: event.target.value,
                }))
              }
              placeholder={
                id === OperationTypes.AddProject
                  ? placeHolders["AddProject"]
                  : placeHolders["addWorkspace"]
              }
            />
            {(id === OperationTypes.AddProject) |
            (id === OperationTypes.UpdateProject) ? (
              <select
                class="form-select mt-2"
                value={inputValue.category}
                onChange={(e) => {
                  setInputValue((prevState) => ({
                    ...prevState,
                    category: e.target.value,
                  }));
                }}
              >
                <option selected>Pilih kategori</option>
                <option value="Automation">Automation</option>
                <option value="Image Recognition">Image Recognition</option>
                <option value="Image Classification">
                  Image Classification
                </option>
              </select>
            ) : null}
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              batal
            </button>
            <button
              type="button"
              class="btn btn-primary"
              data-bs-dismiss="modal"
              onClick={action[`${id}`]}
            >
              Simpan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
