"use client";

import { useEffect, useState } from "react";
import {
  BsHouseDoor,
  BsPerson,
  BsFillImageFill,
  BsInfoCircle,
  BsHeadset,
  BsChevronDown,
} from "react-icons/bs";

import styles from "./verticalNavbar.module.css";
import { useCollapseStore } from "@/app/store";
import { useMediaQuery } from "react-responsive";

import carImg from "@/public/car.png";
import bananaImg from "@/public/banana.png";
import roadImg from "@/public/road.png";
import Image from "next/image";
import { Dropdown, DropdownHeader } from "react-bootstrap";
import { useRouter } from "next/navigation";
import { FaVectorSquare } from "react-icons/fa";
import { FiUploadCloud } from "react-icons/fi";

const menu = [
  {
    nama: "Beranda",
    icon: <BsHouseDoor className={`styles.h16w16`} />,
    url: "home",
  },
  {
    nama: "Upload",
    icon: <FiUploadCloud className={`styles.h16w16`} />,
    url: "upload",
  },
  {
    nama: "Labeling",
    icon: <FaVectorSquare className={`styles.h16w16`} />,
    url: "labeling",
  },
  {
    nama: "Hasil",
    icon: <BsFillImageFill className={`styles.h16w16`} />,
    url: "result",
  },
  {
    nama: "Profil Akun",
    icon: <BsPerson className={`styles.h16w16`} />,
    url: "profile",
  },
];

const information = [
  {
    nama: "Tutorial",
    icon: <BsInfoCircle className={`styles.h16w16`} />,
    url: "tutorial",
  },
  {
    nama: "Help & Support",
    icon: <BsHeadset className={`styles.h16w16`} />,
    url: "help",
  },
];

const engine = [
  {
    nama: "Demo",
    icon: <BsInfoCircle className={`styles.h16w16`} />,
    url: "demo",
  },
  {
    nama: "Lihat Info",
    icon: <BsHeadset className={`styles.h16w16`} />,
    url: "info",
  },
];

const projectList = [
  { label: "Second Project", icon: bananaImg },
  { label: "Three Project", icon: roadImg },
];

function getWindowDimensions() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  return {
    width,
    height,
  };
}

const VerticalNavbar = () => {
  const [menuList, setMenuList] = useState("Beranda");
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const [toggle, collapse, collapseMobile] = useCollapseStore((state) => [
    state.toggle,
    state.collapse,
    state.collapseMobile,
  ]);

  const [show, setShow] = useState(false);
  const router = useRouter();

  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );
  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div
        className={`bg-light d-flex flex-column justify-content-start pt-3 gap-0 ${
          windowDimensions.width <= 768
            ? collapse
              ? "d-none"
              : `${styles.fullWidthSidebar} ${styles.absolute}`
            : collapse
            ? `${styles.collapse}`
            : `${styles.fullWidthSidebar}`
        } ${styles.transition}`}
      >
        <div
          className={`d-flex flex-column gap-0 row-gap-4 ${
            collapse && "align-items-center"
          }`}
        >
          <Dropdown drop="center">
            <div
              style={{ cursor: "pointer" }}
              className={`d-flex flex-row rounded-3 align-items-center gap-0 column-gap-3 p-2 ${
                !collapse && "bg-gray"
              }`}
              onClick={() => setShow(!show)}
            >
              <div
                style={{ width: "42px", height: "42px", cursor: "pointer" }}
                className={`${
                  collapse ? "rounded-circle overflow-hidden" : "rounded-3"
                }`}
              >
                <Image src={carImg} alt="project" />
              </div>
              <div
                className={`d-flex flex-row gap-0 column-gap-3 align-items-center ${
                  collapse && "d-none"
                }`}
                style={{ cursor: "pointer" }}
              >
                <div className="d-flex flex-column">
                  <p className="m-0 text-primary fw-bold fs-normal">
                    Car Detection
                  </p>
                  <p className="m-0 fs-label">Indo AI Workspaces</p>
                </div>
                <div className="fw-bold">
                  <BsChevronDown />
                </div>
              </div>
            </div>
            <Dropdown.Menu
              className="border border-0 shadow-lg px-2"
              align="start"
              as="div"
              show={show}
            >
              <DropdownHeader as="p">Daftar Project</DropdownHeader>
              {projectList.map(({ label, icon }, index) => (
                <Dropdown.Item
                  className={`d-flex flex-row px-2 py-2 rounded align-items-center gap-0 column-gap-2`}
                  key={index}
                  style={{ cursor: "pointer" }}
                  href="#"
                >
                  <div
                    style={{ height: "28px", width: "28px" }}
                    className="bg-primary rounded-2"
                  >
                    <Image src={icon} alt="project-icon" />
                  </div>
                  <p className="my-auto fs-normal">{label}</p>
                </Dropdown.Item>
              ))}
              <div
                style={{ fontSize: "12px", cursor: "pointer" }}
                className="text-center text-primary"
              >
                Lebih banyak
              </div>
            </Dropdown.Menu>
          </Dropdown>
          <div className="d-flex flex-column gap-0 row-gap-2 text-gray-dark">
            <p
              className={`m-0 fw-light px-4 fw-bold fs-label text-uppercase text-gray-dark ${
                collapse || isMobile ? "d-none" : ""
              }`}
            >
              AI Engine
            </p>
            <div className="d-flex flex-column gap-0 row-gap-2">
              {engine.map(({ nama, icon, url }, index) => (
                <div key={index}>
                  <div
                    className={`text-start w-100 rounded-5 d-flex flex-row align-items-center gap-0 column-gap-3 ${
                      menuList === nama && "bg-primary-light text-primary"
                    } ${collapse ? "p-2" : "px-4 py-2"}`}
                    key={index}
                    onClick={() => {
                      toggle(true);
                      setMenuList(nama);
                      router.push(`/dashboard/${url}`);
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    {icon}{" "}
                    <span className={`${collapse ? "d-none" : ""} fs-normal`}>
                      {nama}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="d-flex flex-column gap-0 row-gap-2 text-gray-dark">
            <p
              className={`m-0 fw-light px-4 fw-bold fs-label text-gray-dark text-uppercase ${
                collapse ? "d-none" : ""
              }`}
            >
              Annotation Tool
            </p>
            <div className="d-flex flex-column gap-0 row-gap-2">
              {menu.map(({ nama, icon, url }, index) => (
                <div key={index}>
                  <div
                    className={`text-start w-100 rounded-5 d-flex flex-row align-items-center gap-0 column-gap-3 ${
                      menuList === nama && "bg-primary-light text-primary"
                    } ${collapse ? "p-2" : "px-4 py-2"}`}
                    key={index}
                    onClick={() => {
                      toggle(true);
                      setMenuList(nama);
                      router.push(`/dashboard/${url}`);
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    {icon}{" "}
                    <span className={`${collapse ? "d-none" : ""} fs-normal`}>
                      {nama}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="d-flex flex-column gap-0 row-gap-2 text-gray-dark">
            <p
              className={`m-0 fw-light px-4 fw-bold fs-label text-gray-dark text-uppercase ${
                collapse && "d-none"
              }`}
            >
              Information
            </p>
            <div className="d-flex flex-column gap-0 row-gap-2">
              {information.map(({ nama, icon, url }, index) => (
                <div key={index}>
                  <div
                    className={`text-start w-100 rounded-5 d-flex flex-row align-items-center gap-0 column-gap-3 ${
                      menuList === nama && "bg-primary-light text-primary"
                    } ${collapse ? "p-2" : "px-4 py-2"}`}
                    key={index}
                    onClick={() => {
                      toggle(true);
                      setMenuList(nama);
                      router.push(`/dashboard/${url}`);
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    {icon}{" "}
                    <span className={`ms-1 fs-normal ${collapse && "d-none"}`}>
                      {nama}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VerticalNavbar;
