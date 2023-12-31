"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { useCollapseStore, useThemeStore, useUserStore } from "@/app/store";
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
import usrImg from "@/public/user.png";
import { usePathname, useRouter } from "next/navigation";
import { getUser } from "@/app/service";
import { useMutation } from "@tanstack/react-query";

const HorizontalNavbar = () => {
  const toggle = useCollapseStore((state) => state.toggle);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const theme = useThemeStore((state) => state.theme);
  const router = useRouter();

  function logoutNow() {
    destroyCookie(null, "iaiaccess");
    router.push("/");
  }

  const user = useUserStore((state) => state.user);
  const addUser = useUserStore((state) => state.addUser);
  const pathname = usePathname();
  if (pathname === "/dashboard") {
    permanentRedirect("/dashboard/home/");
  }
  const userData = useMutation({
    mutationFn: getUser,
    onSuccess: (data) => {
      addUser(data.data);
    },
  });

  useEffect(() => {
    if (user == null) {
      userData.mutate();
    } else {
      return;
    }
  }, []);

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
          <div class="dropdown ms-4">
            <Bell
              class="text-dark mx-2 pointer"
              data-feather="bell"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              width="16"
              height="16"
            />
            <ul
              class="dropdown-menu border-0 p-2 shadow-sm"
              style={{ width: "300px" }}
            >
              <li>
                <div class="alert alert-info mb-0 text-smaller py-2 d-flex align-items-center">
                  <Info
                    data-feather="info"
                    class="me-2"
                    width="14"
                    height="14"
                  />
                  Belum ada notifikasi
                </div>
              </li>
            </ul>
          </div>
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
          <div class="dropdown ms-4">
            <div
              class="d-flex align-items-center"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <Image
                src={usrImg}
                class="rounded-circle"
                style={{
                  height: "30px",
                  width: "30px",
                }}
                alt=""
              />
              <p class="text-dark text-smaller ms-2 mb-0 d-none d-md-block">
                {user?.username}
              </p>
              <ChevronDown
                data-feather="chevron-down"
                width="16"
                class="mx-2"
                height="16"
              />
            </div>
            <ul class="dropdown-menu border-0 shadow-sm">
              <li>
                <span class="dropdown-item pointer">Akun</span>
              </li>
              <li>
                <span class="dropdown-item pointer" onClick={() => logoutNow()}>
                  Keluar
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default HorizontalNavbar;
