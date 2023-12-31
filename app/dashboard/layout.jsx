"use client";

import HorizontalNavbar from "@/components/navbar/horizontalNavbar";
import VerticalNavbar from "@/components/sidebar/verticalNavbar";
import { useMutation } from "@tanstack/react-query";
import { permanentRedirect, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getUser } from "../service";
import { useUserStore } from "../store";

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
    <div className="container-fluid d-flex flex-column vh-100 p-0">
      <HorizontalNavbar />
      <div
        className="container-fluid p-0 flex-grow-1"
        style={{
          marginTop: "60px",
        }}
      >
        <div className="row m-0 p-0 vh-100">
          <VerticalNavbar />
          <div className={``}>{children}</div>
        </div>
      </div>
    </div>
  );
}
