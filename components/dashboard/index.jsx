import Alert from "@/components/variants/alert";
import { useState } from "react";
import { Col, Modal, Row } from "react-bootstrap";
import carImg from "@/public/carImg.png";
import Image from "next/image";
import workspaceImg from "@/public/workspace.png";
import projectImg from "@/public/projects.png";
import { useMediaQuery } from "react-responsive";
import ModalAlert from "../modalAlert";

const Dashboard = () => {
  const [alertClose, setAlertClose] = useState(false);
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  return (
    <Row className="px-0 py-4 m-0">
      <ModalAlert variants="success">
        <div>
          🔥 Kamu bisa mencoba AI Engine yang kami sediakan dalam bentuk demo.{" "}
          <span style={{ cursor: "pointer" }} className="fw-bold">
            Coba Sekarang!
          </span>
        </div>
      </ModalAlert>
      <Col className="col-12">
        <Row>
          <Col className={`${isMobile ? "col-12" : "col-8"} p-0`}>
            <div className="row bg-primary w-full d-flex flex-row rounded-3 text-white p-0 m-0">
              <div
                className={`${
                  isMobile ? "col-6" : "col-7"
                } d-flex flex-column gap-0 row-gap-3 p-3 m-0`}
              >
                <div>
                  <div className="fs-label fw-normal text-gray">
                    Halo selamat datang
                  </div>
                  <div className="fs-sub-title fw-semibold">
                    Nama Lengkap Pengguna!
                  </div>
                </div>
                <div className="fs-label d-flex flex-column gap-0 row-gap-1">
                  <div className="d-flex flex-row justify-contents-center align-items-center gap-0 column-gap-2">
                    <div>
                      <Image src={workspaceImg} alt="Workspace" />
                    </div>
                    <div>1 Workspaces</div>
                  </div>
                  <div className="d-flex flex-row justify-contents-center align-items-center gap-0 column-gap-2">
                    <div>
                      <Image src={projectImg} alt="Projects" />
                    </div>
                    <div>3 Projects</div>
                  </div>
                </div>
              </div>
              <div
                className={`${
                  isMobile ? "col-6" : "col-5"
                } p-2 m-0 d-flex justify-contents-center align-items-center`}
              >
                <Image
                  src={carImg}
                  alt="Car"
                  quality={100}
                  className="img-fluid"
                />
              </div>
            </div>
          </Col>
          <Col className="col-4 p-0">col-4</Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Dashboard;
