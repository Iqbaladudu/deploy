"use client";

import {
  BsHouseDoor,
  BsPerson,
  BsFillImageFill,
  BsInfoCircle,
  BsHeadset,
} from "react-icons/bs";

import { useCollapseStore } from "@/app/store";
import bananaImg from "@/public/banana.png";
import roadImg from "@/public/road.png";
import { usePathname, useRouter } from "next/navigation";
import { FaVectorSquare } from "react-icons/fa";
import { FiUploadCloud } from "react-icons/fi";
import {
  Airplay,
  Bookmark,
  Codepen,
  Home,
  UploadCloud,
  User,
  Image as ImgIcn,
  Info,
  Headphones,
} from "react-feather";
import Image from "next/image";
import imgDummy from "@/public/image-dummy.png";

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
          <li class="mb-4">
            <div
              class="card border-0 outline-0"
              style={{ backgroundColor: "#c4c4c42a" }}
            >
              <div class="card-body py-2">
                <div class="dropdown">
                  <div
                    class="d-flex align-items-center justify-content-center"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <Image
                      src={imgDummy}
                      class="rounded-1"
                      width="30"
                      height="30"
                      alt=""
                    />
                    <div class="text-dropdown text-dark text-smaller ms-2 mb-0 text-start">
                      <p class="mb-0" style={{ lineHeight: "10px" }}>
                        Car Detection
                      </p>
                      <small class="opacity-50">Workspace</small>
                    </div>
                    <i
                      class="ms-auto"
                      data-feather="chevron-down"
                      width="16"
                      height="16"
                    ></i>
                  </div>
                  <ul
                    class="dropdown-menu border-0 shadow-sm"
                    style={{ width: "200px" }}
                  >
                    <li class="px-3 py-1">
                      <p class="text-smaller mb-2 opacity-50">Daftar project</p>
                    </li>
                    <li class="">
                      <a
                        href="beranda.html"
                        class="dropdown-item px-3 py-2 d-flex align-items-center justify-content-center"
                      >
                        <Image
                          src={imgDummy}
                          class="rounded-1 me-2"
                          width="20"
                          height="20"
                          alt=""
                        />
                        <p class="mb-0 text-smaller">Banana Classification</p>
                      </a>
                    </li>
                    <li class="">
                      <a
                        class="dropdown-item px-3 py-2 text-primary text-center text-smaller"
                        href="/beranda.html"
                      >
                        Lebih Banyak
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </li>
          <li class="text-smaller mb-2 px-2">
            <small class="gap opacity-50">AI Engine</small>
          </li>
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
          <li
            class="text-smaller mb-0"
            onClick={() => router.push("info")}
            style={{ cursor: "pointer" }}
          >
            <span
              class={`list-group-item border-0 ${
                pathname == "/dashboard/info" && "active"
              }`}
            >
              <Bookmark width={16} height={16} />
              <span class="ms-2">Log Demo</span>
            </span>
          </li>
          <li class="text-smaller mb-2 px-2">
            <small class="gap opacity-50">Annotation Tool</small>
            <small class="dot text-center opacity-50">•</small>
          </li>
          <li
            class="text-smaller mb-0"
            onClick={() => router.push("home")}
            style={{ cursor: "pointer" }}
          >
            <span
              class={`list-group-item border-0 ${
                pathname == "/dashboard/home" && "active"
              }`}
            >
              <Home width="16" height="16" />
              <span class="ms-2">Beranda</span>
            </span>
          </li>
          <li
            class="text-smaller mb-0"
            onClick={() => router.push("upload")}
            style={{ cursor: "pointer" }}
          >
            <span
              class={`list-group-item border-0 ${
                pathname == "/dashboard/upload" && "active"
              }`}
            >
              <UploadCloud width="16" height="16" />
              <span class="ms-2">Upload</span>
            </span>
          </li>
          <li
            class="text-smaller mb-0"
            onClick={() => router.push("labeling")}
            style={{ cursor: "pointer" }}
          >
            <span
              class={`list-group-item border-0 ${
                pathname == "/dashboard/labeling" && "active"
              }`}
            >
              <Codepen width="16" height="16" />
              <span class="ms-2">Labeling</span>
            </span>
          </li>
          <li
            class="text-smaller mb-0"
            onClick={() => router.push("result")}
            style={{ cursor: "pointer" }}
          >
            <span
              class={`list-group-item border-0 ${
                pathname == "/dashboard/result" && "active"
              }`}
            >
              <ImgIcn width="16" height="16" />
              <span class="ms-2">Hasil</span>
            </span>
          </li>
          <li class="text-smaller mb-2 px-2">
            <small class="gap opacity-50">Information</small>
            <small class="dot text-center opacity-50">•</small>
          </li>
          <li
            class="text-smaller mb-0"
            onClick={() => router.push("tutorial")}
            style={{ cursor: "pointer" }}
          >
            <span
              class={`list-group-item border-0 ${
                pathname == "/dashboard/tutorial" && "active"
              }`}
            >
              <Info width="16" height="16" />
              <span class="ms-2">Tutorial</span>
            </span>
          </li>
          <li
            class="text-smaller mb-0"
            onClick={() => router.push("help")}
            style={{ cursor: "pointer" }}
          >
            <span
              class={`list-group-item border-0 ${
                pathname == "/dashboard/help" && "active"
              }`}
            >
              <Headphones width="16" height="16" />
              <span class="ms-2">Help & Support</span>
            </span>
          </li>
        </ul>
      </div>
    </>
  );
};

export default VerticalNavbar;
