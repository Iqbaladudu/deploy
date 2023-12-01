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
      <div class="sidebar shadow-sm py-3">
        <ul class="list-group list-unstyled" style={{ paddingTop: "12px" }}>
          <li class="text-smaller mb-2">
            <a href="/demo.html" class="list-group-item border-0 active">
              <Airplay width="16" height="16" />
              <span class="ms-2">Demo</span>
            </a>
          </li>
          <li class="text-smaller mb-2">
            <a href="/profile.html" class="list-group-item border-0">
              <User data-feather="user" width="16" height="16" />
              <span class="ms-2">Akun</span>
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default VerticalNavbar;
