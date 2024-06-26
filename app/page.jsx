"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import useAuth from "./hooks/useAuth";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import bgImage from "@/public/bg-image-corporate.png";
import whiteLogo from "@/public/logo-iai-white.png";
import primaryLogo from "@/public/logo-iai-primary.png";
import { AtSign, Lock } from "react-feather";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { getToken } from "./service";
import { setCookie } from "nookies";

const mySwal = withReactContent(Swal);

const LoginPage = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [blankForm, setBlankForm] = useState();
  const [error, setError] = useState(false);
  const router = useRouter();
  const emailRef = useRef(null);

  const login = useMutation({
    mutationFn: getToken,
    onSuccess: (data) => {
      setCookie(null, "iaiaccess", `${data.access}`, {
        maxAge: 60 * 60,
      });
      router.push("/dashboard/labeling");
    },
    onError: () => {
      setError(true);
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (email && password) {
      login.mutate({
        email: email,
        password: password,
      });
    } else {
      setBlankForm(true);
    }
  };

  useEffect(() => emailRef.current.focus(), []);

  const LoginErrorAlert = ({ msg }) => {
    mySwal
      .fire({
        icon: "error",
        title: "Oops...",
        text: `${msg}`,
        confirmButtonText: "Oke",
      })
      .then((result) => {
        if (result.isConfirmed) {
          if (blankForm) {
            setBlankForm(null);
          }
          if (error) {
            setError(false);
          }
        }
      });
  };

  return (
    <div
      className="row vh-100 mx-0 justify-content-center align-items-center"
      style={{
        backgroundImage: `url(${bgImage.src})`,
        backgroundPPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      {error && <LoginErrorAlert msg={"Terjadi kesalahan"} />}
      {blankForm && (
        <LoginErrorAlert msg={"Username atau password tidak boleh kosong"} />
      )}
      <div className="col-12 col-md-4 col-xxl-3">
        <center>
          <Image
            src={primaryLogo}
            className="logo-iai-light mb-5"
            width="200"
            alt=""
          />
          <Image
            src={whiteLogo}
            className="logo-iai-dark mb-5"
            width="200"
            alt=""
          />
        </center>
        <div className="card border-0 shadow-sm">
          <div className="card-body p-4">
            <p
              className="text-center mb-4 fw-bold fs-2 text-dark"
              style={{ fontSize: "32px" }}
            >
              Login
            </p>
            <form action="">
              <div className="form-group mb-3">
                <label className="mb-2" for="">
                  Username
                </label>
                <div className="input-icon position-relative">
                  <AtSign
                    width={16}
                    height={16}
                    className="position-absolute"
                    style={{ right: "10px", top: "12px" }}
                  />
                  <input
                    type="text"
                    name="username"
                    placeholder="username"
                    className="form-control outline-none shadow-none py-2 ps-3 rounded-2 pe-5"
                    onChange={(e) => setEmail(e.currentTarget.value)}
                    ref={emailRef}
                  />
                </div>
              </div>
              <div className="form-group mb-3">
                <label className="mb-2" for="">
                  Password
                </label>
                <div className="input-icon position-relative">
                  <Lock
                    width={16}
                    height={16}
                    className="position-absolute"
                    style={{ right: "10px", top: "12px" }}
                  />
                  <input
                    type="password"
                    name="password"
                    placeholder="password"
                    className="form-control outline-none shadow-none py-2 ps-3 rounded-2 pe-5"
                    onChange={(e) => setPassword(e.currentTarget.value)}
                  />
                </div>
              </div>
              <div className="form-group mb-4 d-flex justify-content-between align-items-center">
                {/* <div className="d-flex align-items-center">
                  <input
                    type="checkbox"
                    className="form-check-input shadow-none outline-0 me-2"
                    id="remember_me"
                  />
                  <label for="remember_me">Ingat saya</label>
                </div> */}

                {/* <a
                  href="#"
                  className="text-primary text-decoration-none text-smaller"
                >
                  Lupa password
                </a> */}
              </div>
              <button
                onClick={handleSubmit}
                className={`btn btn-primary w-100 outline-0 border-0 shadow-none text-white mt-4`}
                disabled={login.isPending || login.status === "success"}
              >
                <div className="py-1">
                  {login.isPending || login.status === "success" ? (
                    <div
                      className="spinner-border text-white spinner-border-sm"
                      role="status"
                    ></div>
                  ) : (
                    "Login"
                  )}
                </div>
              </button>
            </form>
          </div>
        </div>
        {/* <center>
          <div className="mt-4">
            <span className="text-dark">Belum punya akun? </span>
            <a
              href="#"
              className="text-primary text-decoration-none fw-semibold"
            >
              Daftar
            </a>
          </div>
        </center> */}
      </div>
    </div>
  );
};

export default LoginPage;
