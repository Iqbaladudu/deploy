import { useState } from "react";
import Alert from "./variants/alert";

const { Col, Modal } = require("react-bootstrap");

const ModalAlert = ({ children, variants }) => {
  const [alertClose, setAlertClose] = useState(false);
  return (
    <Col
      style={{ display: "block", position: "initial" }}
      className={`${alertClose && "d-none"} col-12 p-0`}
    >
      <Modal.Dialog className="p-0 m-0">
        <Alert variants={variants} className="p-0 m-0">
          <div className="d-flex flex-row justify-content-between">
            {children}
            <div
              className="fw-bold"
              onClick={() => setAlertClose(true)}
              style={{ cursor: "pointer" }}
            >
              X
            </div>
          </div>
        </Alert>
      </Modal.Dialog>
    </Col>
  );
};

export default ModalAlert;
