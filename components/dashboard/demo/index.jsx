"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import SelectDataset from "./select-dataset";
import Predict from "./predict";
import Result from "./result";

import demoHeroImg from "@/public/demoHeroImg.png";
import imgMenu from "@/public/demoImgIconMenu.png";
import { createSlug } from "@/app/utils";
import { engineData } from "@/app/constant";

const SmartCityLabels = ({ label }) => (
  <div
    className="d-flex flex-row gap-0 column-gap-2 text-primary"
    style={{
      fontSize: "10px",
    }}
  >
    {label.map((array_data, index) => (
      <div key={index} className="bg-primary-light px-1 rounded-2">
        {array_data}
      </div>
    ))}
  </div>
);

const Description = ({ description }) => (
  <div className="fs-label">{description}</div>
);

const DemoCard = ({ title, tags, description }) => {
  const router = useRouter();
  return (
    <div className="col">
      <div
        className="d-flex flex-row-auto gap-0 justify-content-start justify-content-md-center align-items-stretch column-gap-3 bg-white p-2"
        style={{ cursor: "pointer" }}
        onClick={() =>
          router.push(
            `/dashboard/demo?engine=${createSlug(title)}&option=select-dataset`
          )
        }
      >
        <div>
          <Image src={imgMenu} alt="" />
        </div>
        <div>
          <SmartCityLabels label={tags} />
          <div className="fs-label fw-semibold text-primary text-decoration-underline">
            {title}
          </div>
          <div>
            <Description description={description} />
          </div>
        </div>
      </div>
    </div>
  );
};

const SelectEngine = () => {
  return (
    <>
      <div
        style={{
          height: "50vh",
          backgroundImage: `url(${demoHeroImg.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="border d-flex flex-column justify-content-center p-5 w-100"
      >
        <div>
          <div className="text-primary fw-bold fs-title">Axioma API Demo</div>
          <div className="text-white w-100 w-md-50 fs-normal">
            <p>
              Kami punya beberapa mesin kecerdasan buatan yang bisa kamu gunakan
              secara cuma-cuma di berbagai sektor industri besar. 😄🚀
            </p>
          </div>
          <div className="d-flex flex-column flex-md-row text-primary gap-0 column-gap-5">
            <div>Smart City</div>
            <div>Retail</div>
            <div>Manufacture</div>
          </div>
        </div>
      </div>
      <div className="d-flex flex-column gap-0 row-gap-5 mb-5">
        <div className="container">
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 gap-0 row-gap-4 flex-wrap d-flex flex-row align-items-stretch">
            {engineData.map((props, index) => (
              <DemoCard {...props} key={index} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

const Option = () => {
  const searchParams = useSearchParams();
  const option = searchParams.get("option");
  const engine = searchParams.get("engine");

  const components = {
    "select-dataset": <SelectDataset />,
    predict: <Predict />,
    result: <Result />,
  };

  return components[option] || <div>Not Found</div>;
};

// Refactor Demo
const Demo = () => {
  const searchParams = useSearchParams();
  const option = searchParams.get("option");
  const engine = searchParams.get("engine");

  return option && engine ? <Option /> : <SelectEngine />;
};

export default Demo;
