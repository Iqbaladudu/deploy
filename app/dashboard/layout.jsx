"use client";

import HorizontalNavbar from "@/components/navbar/horizontalNavbar";
import VerticalNavbar from "@/components/sidebar/verticalNavbar";
import { Col, Container, Row } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";
import { permanentRedirect, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardLayout({ children }) {
  const [isDemo, setIsDemo] = useState();
  const pathname = usePathname();
  if (pathname === "/dashboard") {
    permanentRedirect("/dashboard/home/");
  }

  useEffect(() => {
    if (pathname.toString().match(/(?<=\/dashboard\/)\w+/) == "demo") {
      setIsDemo(true);
    } else {
      setIsDemo(false);
    }
  }, [pathname]);

  return (
    <Container fluid className="d-flex flex-column vh-100 p-0">
      <HorizontalNavbar />
      <Container
        fluid
        className="p-0 flex-grow-1"
        style={{
          marginTop: "60px",
        }}
      >
        <Row className="m-0 vh-100">
          <VerticalNavbar />
          <Col
            className={`row d-flex flex-column gap-0 row-gap-5 justify-content-start`}
          >
            {children}
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
