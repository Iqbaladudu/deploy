"use client";

import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";

import styles from "./styles.module.css";

export default function Loading({ children }) {
  const [isLoaded, setIsloaded] = useState(true);

  useEffect(() => {
    setIsloaded(true);
  }, []);

  return (
    <>
      {!isLoaded && (
        <div
          className="position-fixed vh-100 vw-100 bg-black"
          style={{ "--bs-bg-opacity": 0.5, zIndex: "100" }}
        >
          <div
            className={`bg-white text-center d-flex flex-column align-items-center justify-content-center rounded-3 p-2 ${styles.loading}`}
            style={{ width: "4rem", height: "4rem" }}
          >
            <Spinner animation="border" variant="primary" />
          </div>
        </div>
      )}
      {children}
    </>
  );
}
