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
import { useState } from "react";

const Dashboard = () => {
  const [projectData, setProjectData] = useState([
    {
      id: 1,
      title: "Card Recognition",
      category: "Image Recognition",
      lastEdited: "2 Days Ago",
      imgCount: "15 images",
    },
    {
      id: 2,
      title: "Face Detection",
      category: "Biometrics",
      lastEdited: "Yesterday",
      imgCount: "8 images",
    },
    {
      id: 3,
      title: "Document Scanning",
      category: "Automation",
      lastEdited: "Today",
      imgCount: "20 images",
    },
    {
      id: 4,
      title: "Anomaly Detection",
      category: "AI",
      lastEdited: "Just Now",
      imgCount: "5 images",
    },
  ]);

  const [workspaceData, setWorkspaceData] = useState([
    {
      id: 1,
      title: "IAI Workspaces",
      projectCount: "3 Projects",
      lastModified: "2 hours ago",
    },
    {
      id: 2,
      title: "Indonesia AI Workspaces",
      projectCount: "4 Projects",
      lastModified: "1 hours ago",
    },
    {
      id: 3,
      title: "Iqbal Workspace",
      projectCount: "1 Projects",
      lastModified: "4 hours ago",
    },
    {
      id: 4,
      title: "Mr Luhut Workspace",
      projectCount: "400 Projects",
      lastModified: "Just now",
    },
  ]);

  const removeProject = (idToRemove) => {
    const filteredData = projectData.filter((item) => item.id !== idToRemove);
    setProjectData(filteredData);
  };

  const removeWorkspace = (idToRemove) => {
    const filteredData = workspaceData.filter((item) => item.id !== idToRemove);
    setWorkspaceData(filteredData);
  };

  const ProjectCard = ({ id, title, category, lastEdited, imgCount }) => {
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
                      <a className="dropdown-item" href="#">
                        Edit
                      </a>
                    </li>
                    <li>
                      <span
                        className="dropdown-item pointer"
                        onClick={() => removeProject(id)}
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
              <button
                className="btn text-white bg-primary outline-0 border-0 shadow-none text-smaller d-flex justify-content-center align-items-center p-0"
                style={{ width: "30px", height: "30px" }}
              >
                <Plus data-feather="plus" width="12" height="12" />
              </button>
            </div>
            <div className="row">
              {workspaceData.map((props, index) => (
                <WorkspaceCard {...props} key={index} />
              ))}
            </div>
            <div className="mb-2 mt-4 d-flex justify-content-between align-items-center">
              <p className="mb-0">Projects</p>
              <button
                className="btn text-white bg-primary outline-0 border-0 shadow-none text-smaller d-flex justify-content-center align-items-center p-0"
                style={{ width: "30px", height: "30px" }}
              >
                <Plus data-feather="plus" width="12" height="12" />
              </button>
            </div>
            <div className="row">
              {projectData.map((props, index) => (
                <ProjectCard {...props} key={index} />
              ))}
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

  function WorkspaceCard({ id, title, projectCount, lastModified }) {
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
                      <a className="dropdown-item pointer">Edit</a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item pointer"
                        onClick={() => removeWorkspace(id)}
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
};

export default Dashboard;
