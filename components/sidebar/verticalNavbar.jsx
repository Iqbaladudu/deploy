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
import { usePathname, useRouter } from "next/navigation";
import { FaVectorSquare } from "react-icons/fa";
import { FiUploadCloud } from "react-icons/fi";
import { Airplay, User } from "react-feather";

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
  const router = useRouter();
  const pathname = usePathname();
  const collapse = useCollapseStore((state) => state.collapse);

  return (
    <>
      <div className={`sidebar shadow-sm py-3 ${!collapse && "open"}`}>
        <ul class="list-group list-unstyled" style={{ paddingTop: "12px" }}>
          <li
            class="text-smaller mb-2"
            onClick={() => router.push("/dashboard/demo")}
            style={{ cursor: "pointer" }}
          >
            <span
              class={`list-group-item border-0 ${
                pathname == "/dashboard/demo" && "active"
              }`}
            >
              <Airplay width="16" height="16" />
              <span class="ms-2">Demo</span>
            </span>
          </li>
          <li class="text-smaller mb-2">
            <span
              class={`list-group-item border-0 ${
                pathname == "/dashboard/profile" && "active"
              }`}
              onClick={() => router.push("/dashboard/profile")}
              style={{ cursor: "pointer" }}
            >
              <User data-feather="user" width="16" height="16" />
              <span class="ms-2">Akun</span>
            </span>
          </li>
        </ul>
      </div>
    </>
  );
};

export default VerticalNavbar;
