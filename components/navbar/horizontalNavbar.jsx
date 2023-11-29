"use client";

import React, { useState } from "react";
import {
  Navbar as BaseNavbar,
  Container,
  Dropdown,
  DropdownHeader,
} from "react-bootstrap";
import { BsList, BsBell, BsMoon, BsChevronDown } from "react-icons/bs";
import axioma from "@/public/axioma.svg";
import Image from "next/image";
import styles from "./horizontalNavbar.module.css";
import { useCollapseStore } from "@/app/store";
import profileImg from "@/public/avatar.png";
import { useMediaQuery } from "react-responsive";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { destroyCookie } from "nookies";
const MySwal = withReactContent(Swal);

const LogoutAlert = () => {
  MySwal.fire({
    title: "Apakah anda yakin?",
    icon: "warning",
    showCancelButton: true,
    cancelButtonText: "Tidak",
    confirmButtonText: "Ya",
    customClass: {
      confirmButton: "btn btn-primary btn-lg",
      cancelButton: "btn btn-secondary btn-lg",
    },
  }).then((result) => {
    if (result.isConfirmed) {
      destroyCookie(null, "iaiaccess");
    }
  });
};

const profileMenu = [
  {
    nama: "Profile Akun",
    icon: "",
    action: "",
  },
  {
    nama: "Notifikasi",
    icon: "",
    action: "showNotif",
  },
  {
    nama: "Tutorial",
    icon: "",
    action: "",
  },
  {
    nama: "Help & Support",
    icon: "",
    action: "",
  },
  {
    nama: "Keluar",
    icon: "",
    action: LogoutAlert,
  },
];

const NavbarBrand = () => {
  const [toggle, collapse] = useCollapseStore((state) => [
    state.toggle,
    state.collapse,
  ]);

  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  return (
    <>
      <div className="d-flex flex-row gap-0 column-gap-4 align-items-center">
        <div className="">
          <BsList
            style={{ fontSize: "30px", cursor: "pointer" }}
            onClick={() => toggle()}
            className={`${collapse && styles.rotate90} ${
              styles.transition
            } text-gray-dark`}
          />
        </div>
        <div
          className={`${
            isMobile ? "d-none" : "d-flex"
          } gap-0 column-gap-3 align-items-center`}
        >
          <Image src={axioma} alt="" />
          <span className="fw-bold">Axioma</span>
        </div>
      </div>
    </>
  );
};

function ProfileModal({ show }) {
  const [menuList, setMenuList] = useState();

  return (
    <div
      className={`card ${
        styles.modal
      } my-component d-flex p-3 border-0 shadow-lg ${!show && "invisible"}`}
      style={{
        zIndex: 100,
      }}
    >
      <div className="d-flex p-2 rounded-2 flex-row gap-0 align-items-center column-gap-4">
        <div
          className="rounded-circle bg-primary overflow-hidden"
          style={{
            height: "60px",
            width: "60px",
          }}
        >
          <Image src={profileImg} alt="" />
        </div>
        <div className="d-flex flex-row gap-0 align-items-center column-gap-3">
          <div>
            <p
              className="fw-bold text-black m-0"
              style={{
                fontSize: "17px",
              }}
            >
              Fullname User
            </p>
            <p
              className="fw-regular m-0 text-gray-dark"
              style={{
                fontSize: "12px",
              }}
            >
              Nick Name User
            </p>
          </div>
        </div>
      </div>
      <div className="d-flex flex-column gap-0 row-gap-2">
        {profileMenu.map(({ nama, icon, action }, index) => (
          <div key={index}>
            <div
              className={`text-gray-dark text-start w-100 rounded-5 px-4 d-flex flex-row align-items-center gap-0 c olumn-gap-1 px-4 py-2 ${
                menuList === nama && "bg-primary-light text-primary"
              }
              `}
              style={{ fontSize: "14px", cursor: "pointer" }}
              onClick={() => {
                setMenuList(nama);
                action();
              }}
              key={index}
            >
              {icon} {nama}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function NotifModal({ show }) {
  const [selected, setSelected] = useState(false);
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  return (
    <div
      className={`card ${styles.notifModal} ${
        !isMobile ? styles.notifModalRegPos : styles.notifModalMobilePos
      } my-component d-flex p-3 border-0 shadow-lg ${!show && "invisible"}`}
      style={{
        zIndex: 100,
      }}
    >
      <div
        style={{ fontSize: "16px" }}
        className="d-flex justify-content-between"
      >
        <p>Notifikasi</p>
        <p className="text-primary" style={{ cursor: "pointer" }}>
          Lebih banyak
        </p>
      </div>
      <div className="d-flex flex-column gap-0 row-gap-1">
        {[1, 2, 3].map((val, index) => (
          <div
            key={index}
            style={{ fontSize: "16px", cursor: "pointer" }}
            className={`px-3 py-2 d-flex flex-column justify-content-center align-items-start ${
              val === 1 ? "bg-blue text-font-darkblue" : "bg-gray"
            } rounded-4`}
          >
            <div className="">Halo! kamu bisa mencoba demo s...</div>
            <div className="">1 menit yang lalu</div>
          </div>
        ))}
      </div>
      <div
        className="py-3 text-primary text-center"
        style={{ fontSize: "12px", cursor: "pointer" }}
      >
        Tandai sudah dibaca
      </div>
    </div>
  );
}

const NavbarRightIcons = () => {
  const [showProfile, setShowProfile] = useState(false);
  const [showNotifModal, setShowNotifModal] = useState(false);
  const [menuList, setMenuList] = useState();

  return (
    <div
      className="d-flex text-gray-dark gap-0 align-items-center column-gap-4"
      style={{ fontSize: "25px" }}
    >
      <div className="d-flex flex-row align-items-center gap-0 column-gap-2">
        <BsBell
          className={`${styles.h16w16} me-4`}
          style={{ cursor: "pointer" }}
        />
        <BsMoon
          className={`${styles.h16w16} me-4`}
          style={{ cursor: "pointer" }}
        />
      </div>
      <NotifModal show={showNotifModal} />
      <Dropdown as="div" drop="down">
        <div
          className="d-flex flex-row align-items-center gap-0 column-gap-2"
          onClick={() => setShowProfile(!showProfile)}
          style={{ cursor: "pointer" }}
        >
          <div className="rounded-circe overflow-hidden">
            <Image
              src={profileImg}
              alt="profile"
              style={{ height: "42px", width: "42px" }}
            />
          </div>
          <BsChevronDown
            className={`${showProfile && styles.rotate180} ${
              styles.transition
            } ${styles.h16w16}`}
          />
        </div>
        <Dropdown.Menu
          align="end"
          as="div"
          show={showProfile}
          className="border border-0 shadow-lg"
        >
          <DropdownHeader>
            <div className="d-flex p-2 rounded-2 flex-row gap-0 align-items-center column-gap-4">
              <div
                className="rounded-circle bg-primary overflow-hidden"
                style={{
                  height: "60px",
                  width: "60px",
                }}
              >
                <Image src={profileImg} alt="" />
              </div>
              <div className="d-flex flex-row gap-0 align-items-center column-gap-3">
                <div>
                  <p
                    className="fw-bold text-black m-0"
                    style={{
                      fontSize: "17px",
                    }}
                  >
                    Fullname User
                  </p>
                  <p
                    className="fw-regular m-0 text-gray-dark"
                    style={{
                      fontSize: "12px",
                    }}
                  >
                    Nick Name User
                  </p>
                </div>
              </div>
            </div>
          </DropdownHeader>
          <div className="d-flex flex-column gap-0 row-gap-2">
            {profileMenu.map(({ nama, icon, action }, index) => (
              <Dropdown.Item key={index} href="#" as="div">
                <div>
                  <div
                    className={`text-gray-dark text-start w-100 rounded-5 px-4 d-flex flex-row align-items-start gap-0 column-gap-1 px-4 py-2 ${
                      menuList === nama && "bg-primary-light text-primary"
                    }
              `}
                    style={{ fontSize: "14px", cursor: "pointer" }}
                    onClick={() => {
                      setMenuList(nama);
                      action();
                    }}
                    key={index}
                  >
                    {icon} {nama}
                  </div>
                </div>
              </Dropdown.Item>
            ))}
          </div>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

const HorizontalNavbar = () => {
  const [fixed, setFixed] = useState("");
  // useEffect(() => {
  //   window.addEventListener("scroll", () => {
  //     let windowHeight = window.scrollY;
  //     windowHeight >= 10 ? setFixed("fixed-top") : setFixed("");
  //   });
  // }, []);
  return (
    <BaseNavbar
      expand="lg"
      className={`bg-light py-2 shadow shadow-sm position-fixed w-100`}
      style={{
        height: "75px",
        zIndex: "100",
      }}
    >
      <Container fluid>
        <div
          className={`d-flex px-2 flex-row vw-100 text-gray-dark justify-content-between`}
        >
          <NavbarBrand />
          <NavbarRightIcons />
        </div>
      </Container>
    </BaseNavbar>
  );
};

export default HorizontalNavbar;
