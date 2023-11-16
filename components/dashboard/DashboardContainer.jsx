"use client";

import { Container } from "react-bootstrap";
import HorizontalNavbar from "../navbar/horizontalNavbar";
import VerticalNavbar from "../sidebar/verticalNavbar";

const DashboardContainer = ({ children }) => {
  return (
    <Container fluid className="bg-gray vh-100 vw-100 p-0">
      <HorizontalNavbar />
      <VerticalNavbar />
    </Container>
  );
};

export default DashboardContainer;
