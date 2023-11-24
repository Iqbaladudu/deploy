"use client";

import React, { Suspense, useEffect, useRef, useState } from "react";
import { Col, Container, Form, Row, Spinner } from "react-bootstrap";
import Link from "next/link";
import Button from "@/components/variants/button";
import Image from "next/image";
import loginImage from "@/public/loginImage.svg";

import styles from "./styles.module.css";
import { useMediaQuery } from "react-responsive";
import Slider from "react-slick";
import Loading from "./loading";
import { useLoginDataStore } from "./store";
import login from "./services/login";

const LoginPage = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    // speed: 2000,
    autoplaySpeed: 4000,
    cssEase: "linear",
    dotsClass: `${styles.sliderDots} slick-dots`,
    customPaging: (i) => <div className={styles.sliderDot}></div>,
    appendDots: (dots) => (
      <div>
        {dots.map((dot, index) => (
          <a
            key={index}
            className={dot.props.className === "slick-active" ? "" : ""}
          >
            {dot}
          </a>
        ))}
      </div>
    ),
  };

  return (
    <Container fluid>
      <Row>
        <Col className="col-12 col-md-5 vh-100 d-flex align-items-center justify-content-center">
          <div className="px-3 w-100 w-md-75">
            <div className="d-flex flex-column justify-content-center text-start">
              <p className="fs-title fw-bold mb-1 text-primary">
                Halo sahabat AI!
              </p>
              <p className="fs-normal">
                Selamat datang di Annotation Tools Apps
              </p>
            </div>
            <div className={`${isMobile && styles.mobileWidth} w-100`}>
              <LoginForm />
            </div>
          </div>
        </Col>
        <Col
          className={`col-12 col-md-7 bg-primary d-flex flex-column justify-contents-center align-items-center min-vh-100 d-none d-sm-block d-sm-none d-md-block`}
        >
          <div className="d-flex flex-column justify-contents-center align-items-center my-auto">
            <Image src={loginImage} alt="" className="w-75 h-auto mb-4" />
            <Suspense fallback={<Loading />}></Suspense>
            <Slider
              {...settings}
              className={`${styles.swiperWidth} px-md-5 px-4`}
              arrows={false}
              autoplay
              infinite
              pauseOnHover
              pauseOnDotsHover
            >
              <div className={`${styles.mb40}`}>
                <p className="fw-bold text-white text-center fs-normal mb-2">
                  Lorem ipsum dolor sit amet
                </p>
                <p className="text-white text-center w-100 mx-auto fs-label">
                  Consectetur adipiscing elit, sed do eiusmod tempor incididunt
                  ut labore et dolore magna aliqua. Ut enim ad minim veniam
                </p>
              </div>
              <div className={`${styles.mb40}`}>
                <p className="fw-bold text-white text-center fs-normal mb-2">
                  Lorem ipsum dolor sit amet 2
                </p>
                <p className="text-white text-center w-100 mx-auto fs-label mb-3">
                  Consectetur adipiscing elit, sed do eiusmod tempor incididunt
                  ut labore et dolore magna aliqua. Ut enim ad minim veniam
                </p>
              </div>
              <div className={`${styles.mb40}`}>
                <p className="fw-bold text-white text-center fs-normal mb-2">
                  Lorem ipsum dolor sit amet 3
                </p>
                <p className="text-white text-center w-100 mx-auto fs-label">
                  Consectetur adipiscing elit, sed do eiusmod tempor incididunt
                  ut labore et dolore magna aliqua. Ut enim ad minim veniam
                </p>
              </div>
            </Slider>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

function EmailForm(props) {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className="mb-2">
      <Form.Label className="fs-label opacity-50">Email</Form.Label>
      <div
        className={` d-flex rounded-2 border overflow-hidden border-1 ${
          props.inputEmail && styles.boxShadowPrimary
        }`}
      >
        <Form.Control
          autoFocus
          type="email"
          placeholder="Masukkan email"
          className={`bg-transparent border rounded-2 border-0 text-normal ${styles.inputStyles} form-control p-md-5 p-4 w-100`}
          onFocus={() => props.setInputEmail(true)}
          onBlur={() => props.setInputEmail(false)}
          aria-label="email"
          ref={inputRef}
          onChange={(e) => props.setEmailForm(e.currentTarget.value)}
        />
        <div className="d-flex align-items-center mx-3 fs-title fw-bold text-gray">
          <Image src="/email.svg" alt="Email" width={20} height={20} />
        </div>
      </div>
    </div>
  );
}

function PasswordForm(props) {
  const [passwordForm, setPasswordForm] = useState();
  const setPassword = useLoginDataStore((state) => state.setPassword);

  useEffect(() => {
    setPassword(passwordForm);
  }, [passwordForm, setPassword]);

  return (
    <div className="d-flex flex-column gap-0 row-gap-3 mb-3">
      <div>
        <Form.Label className="fs-label opacity-50">Password</Form.Label>
        <div
          className={`d-flex rounded-3 border overflow-hidden border-1 ${
            props.inputPassword && styles.boxShadowPrimary
          }`}
        >
          <Form.Control
            type="password"
            placeholder="Masukkan password"
            className={`bg-transparent border border-0 rounded-2 text-normal ${styles.inputStyles} form-control p-md-5 p-4 w-100`}
            onFocus={() => props.setInputPassword(true)}
            onBlur={() => props.setInputPassword(false)}
            aria-label="password"
            onChange={(e) => setPasswordForm(e.currentTarget.value)}
          />
          <div className="mx-3 my-auto fs-title fw-bold text-gray d-flex">
            <Image
              src="/lock.svg"
              alt="Lock"
              width={20}
              height={20}
              className=""
            />
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-between">
        <Form.Check className="fs-label" type="checkbox" label="Ingat saya" />
        <Link
          href="#"
          className="text-primary link-underline link-underline-opacity-0 fs-label"
        >
          Lupa password?
        </Link>
      </div>
    </div>
  );
}

const LoginForm = () => {
  const [inputEmail, setInputEmail] = useState(true);
  const [inputPassword, setInputPassword] = useState(false);
  const [emailForm, setEmailForm] = useState();
  const [passwordForm, setPasswordForm] = useState();
  const inputRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const handleClickLogin = () => {
    setLoading(true);
    login(emailForm, passwordForm);
    setLoading(false);
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div>
      <Form>
        <Form.Group className="mb-2 d-flex flex-column gap-0 row-gap-2">
          <div className="mb-2">
            <Form.Label className="fs-label opacity-50">Email</Form.Label>
            <div
              className={` d-flex rounded-2 border overflow-hidden border-1 ${
                inputEmail && styles.boxShadowPrimary
              }`}
            >
              <Form.Control
                autoFocus
                type="email"
                placeholder="Masukkan email"
                className={`bg-transparent border rounded-2 border-0 text-normal ${styles.inputStyles} form-control p-md-5 p-4 w-100`}
                onFocus={() => setInputEmail(true)}
                onBlur={() => setInputEmail(false)}
                aria-label="email"
                ref={inputRef}
                onChange={(e) => setEmailForm(e.currentTarget.value)}
              />
              <div className="d-flex align-items-center mx-3 fs-title fw-bold text-gray">
                <Image src="/email.svg" alt="Email" width={20} height={20} />
              </div>
            </div>
          </div>
          <div className="d-flex flex-column gap-0 row-gap-3 mb-3">
            <div>
              <Form.Label className="fs-label opacity-50">Password</Form.Label>
              <div
                className={`d-flex rounded-3 border overflow-hidden border-1 ${
                  inputPassword && styles.boxShadowPrimary
                }`}
              >
                <Form.Control
                  type="password"
                  placeholder="Masukkan password"
                  className={`bg-transparent border border-0 rounded-2 text-normal ${styles.inputStyles} form-control p-md-5 p-4 w-100`}
                  onFocus={() => setInputPassword(true)}
                  onBlur={() => setInputPassword(false)}
                  aria-label="password"
                  onChange={(e) => setPasswordForm(e.currentTarget.value)}
                />
                <div className="mx-3 my-auto fs-title fw-bold text-gray d-flex">
                  <Image
                    src="/lock.svg"
                    alt="Lock"
                    width={20}
                    height={20}
                    className=""
                  />
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-between">
              <Form.Check
                className="fs-label"
                type="checkbox"
                label="Ingat saya"
              />
              <Link
                href="#"
                className="text-primary link-underline link-underline-opacity-0 fs-label"
              >
                Lupa password?
              </Link>
            </div>
          </div>
        </Form.Group>
      </Form>
      <div className="mb-3">
        <button
          className="btn btn-primary text-primary-light w-100"
          onClick={() => handleClickLogin()}
          disabled={loading}
        >
          {loading ? (
            <Spinner
              animation="border"
              variant="primary-light"
              as="p"
              size="sm"
              className="m-0"
            />
          ) : (
            "Login"
          )}
        </button>
      </div>
      <div className="d-flex justify-content-center">
        Belum punya akun?{" "}
        <Link
          href="#"
          className="ms-2 text-primary link-underline link-underline-opacity-0"
        >
          Daftar
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
