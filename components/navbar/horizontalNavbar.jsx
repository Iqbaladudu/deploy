"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useCollapseStore, useThemeStore } from "@/app/store";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { destroyCookie } from "nookies";
import {
  Bell,
  ChevronDown,
  Codepen,
  Info,
  Menu,
  Moon,
  Sun,
} from "react-feather";
import user from "@/public/user.png";
import { useClick, useFloating, useInteractions } from "@floating-ui/react";
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

const Notif = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = useCollapseStore((state) => state.toggle);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: "bottom-end",
  });

  const click = useClick(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([click]);
  return (
    <div className="ms-4">
      <Bell
        className="text-dark mx-2 pointer"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        width="16"
        height="16"
        ref={refs.setReference}
        {...getReferenceProps()}
      />
      {isOpen && (
        <ul
          className="list-group border border-0 shadow-sm mt-2"
          ref={refs.setFloating}
          style={floatingStyles}
          {...getFloatingProps()}
        >
          <li className="list-group-item border border-0">
            <div
              className="alert alert-info mb-0 text-smaller py-2 d-flex align-items-center"
              role="alert"
            >
              <Info className="me-2" width="14" height="14" />
              Belum ada notifikasi
            </div>
          </li>
        </ul>
      )}
    </div>
  );
};

const HorizontalNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = useCollapseStore((state) => state.toggle);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const theme = useThemeStore((state) => state.theme);
  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: "bottom-end",
  });

  const click = useClick(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([click]);

  return (
    <nav class="navbar fixed-top shadow-sm px-0 py-2">
      <div class="container-fluid">
        <button
          id="btn-collapse"
          type="button"
          className="btn border-0 outline-0 text-dark"
          data-toggle="collapse"
          data-target="#sidebar"
          aria-controls="sidebar"
          aria-expanded="false"
          aria-label="Toggle sidebar"
          onClick={toggle}
        >
          <Menu className="text-dark" />
        </button>
        <div
          className="bg-primary p-0 rounded-2 d-flex align-items-center justify-content-center ms-3 me-2"
          style={{ width: "30px", height: "30px" }}
        >
          <Codepen width="16" height="16" className="text-white" />
        </div>
        <p className="m-0 fs-6 fw-semibold me-auto text-dark">Axioma</p>
        <div className="ms-auto d-flex align-items-center">
          <Notif />
          {theme == "light" ? (
            <Moon
              className="text-dark mx-2 pointer"
              onClick={toggleTheme}
              id="toggle-dark-theme"
              width="16"
              height="16"
            />
          ) : (
            <Sun
              className="text-dark mx-2 pointer"
              onClick={toggleTheme}
              id="toggle-light-theme"
              width="16"
              height="16"
            />
          )}
          <div className="ms-4">
            <div
              className="d-flex align-items-center"
              aria-expanded="false"
              role="button"
              ref={refs.setReference}
              {...getReferenceProps()}
            >
              <Image
                src={user}
                className="rounded-circle"
                style={{ width: "30px", height: "30px" }}
                alt=""
              />
              <p className="text-dark text-smaller ms-2 mb-0 d-none d-md-block">
                admin
              </p>
              <ChevronDown width="16" className="mx-2" height="16" />
            </div>
            {isOpen && (
              <div
                ref={refs.setFloating}
                style={floatingStyles}
                {...getFloatingProps()}
                className="card border border-0 mt-2"
              >
                <ul
                  className="shadow-sm list-group border border-0"
                  style={{
                    minWidth: "10rem",
                  }}
                >
                  <li className="list-group-item border border-0 dropdown-li rounded-0">
                    <span href="/profile.html">Profile</span>
                  </li>
                  <li className="list-group-item border border-0 dropdown-li mb-2 rounded-0">
                    <span href="/index.html">Keluar</span>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default HorizontalNavbar;
