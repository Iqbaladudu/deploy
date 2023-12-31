import { useEngineStore } from "@/app/store";
import DemoContainer from "../demoContainer";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

import One from "@/public/tools/1.png";
import Two from "@/public/tools/2.png";
import Three from "@/public/tools/3.png";
import Four from "@/public/tools/4.png";
import Five from "@/public/tools/5.png";
import Six from "@/public/tools/6.png";
import Seven from "@/public/tools/7.png";
import Eight from "@/public/tools/8.png";
import Nine from "@/public/tools/9.png";
import Ten from "@/public/tools/10.png";
import Eleven from "@/public/tools/11.png";
import Tweleve from "@/public/tools/12.png";

import barcodeOne from "@/public/app/barcode/1.jpg";
import barcodeTwo from "@/public/app/barcode/2.jpg";
import ppeOne from "@/public/app/ppe/1.jpg";
import ppeTwo from "@/public/app/ppe/2.jpg";
import vehicleOne from "@/public/app/counting-vehicle-quantity/1.jpg";
import vehicleTwo from "@/public/app/counting-vehicle-quantity/2.jpg";
import bananaOne from "@/public/app/banana-ripeness-classification/1.png";
import countingVehicleOne from "@/public/app/counting-vehicle-quantity/1.jpg";
import countingVehicleTwo from "@/public/app/counting-vehicle-quantity/2.jpg";
import garbageOne from "@/public/app/garbage-classification/1.jpg";
import garbageTwo from "@/public/app/garbage-classification/2.jpg";

import Image from "next/image";

const engineData = [
  {
    url: "predict_ppe",
    title: "PPE Detection",
    category: "Manufacture",
    type: "Object Detection",
    description:
      "Fokus pada mendeteksi penggunaan peralatan pelindung diri (helm, sarung tangan, sepatu pengaman) oleh individu.",
    background:
      "Deteksi PPE (Perlengkapan Pelindung Diri) merujuk pada penggunaan teknologi, yang sering kali memanfaatkan teknik pembelajaran mesin dan visi komputer, untuk mengidentifikasi apakah individu di suatu tempat telah menggunakan perlengkapan pelindung yang sesuai. Teknologi ini sangat relevan dalam industri seperti konstruksi, manufaktur, perawatan kesehatan, dan lingkungan lain yang berisiko tinggi di mana protokol keselamatan memerlukan penggunaan PPE tertentu.<br><br>Tujuan utama dari teknologi deteksi PPE adalah untuk meningkatkan keselamatan dan kepatuhan di tempat kerja. Ini mengotomatisasi proses pemantauan apakah individu mematuhi peraturan keselamatan dengan menggunakan peralatan pelindung yang diperlukan. Secara keseluruhan, teknologi deteksi PPE memainkan peran penting dalam memastikan keselamatan di tempat kerja dan kepatuhan terhadap peraturan dengan mengotomatisasi proses pemantauan dan mengidentifikasi dengan cepat kasus di mana individu tidak menggunakan perlengkapan pelindung yang diperlukan.",
    image: "",
    technology_desc:
      "Sistem deteksi PPE biasanya menggunakan algoritma pembelajaran mesin, visi komputer, dan terkadang model deep learning. Sistem ini menganalisis gambar atau feed video untuk mengenali dan membedakan berbagai jenis PPE (seperti helm, kacamata pelindung, sarung tangan, masker, dll.) dan mendeteksi apakah individu menggunakan PPE tersebut dengan benar.",
    application_desc:
      "Sistem ini dapat diterapkan di berbagai industri. Misalnya, di lokasi konstruksi, sistem ini memastikan pekerja menggunakan helm, kacamata keselamatan, dan rompi. Di bidang kesehatan, sistem ini memonitor apakah staf medis menggunakan masker, sarung tangan, dan perlengkapan pelindung lainnya yang diperlukan.",
  },
  {
    url: "predict_banana_ripeness",
    title: "Banana Ripeness Classification",
    category: "Retail",
    type: "Classification",
    description:
      "Menggunakan pengolahan citra untuk membedakan tingkat kematangan pisang, membantu manajemen persediaan.",
    background:
      "Klasifikasi Kematangan Pisang (Banana Ripeness Classification) merujuk pada penggunaan teknologi, terutama menggunakan pembelajaran mesin dan teknik pengolahan citra, untuk mengidentifikasi tingkat kematangan dari buah pisang. Teknologi ini memiliki relevansi penting dalam industri pengolahan makanan, distribusi buah-buahan, dan sektor pertanian.<br><br>Teknologi klasifikasi kematangan pisang bertujuan untuk mengklasifikasikan buah pisang menjadi berbagai tingkat kematangan, seperti matang sepenuhnya, setengah matang, atau masih mentah. Hal ini membantu dalam manajemen stok, pengangkutan, dan pemasaran buah-buahan. Kesimpulannya, teknologi klasifikasi kematangan pisang memiliki peran penting dalam manajemen persediaan buah pisang, membantu industri makanan dan pertanian dalam mengoptimalkan distribusi serta memenuhi permintaan pasar dengan lebih efisien.",
    image: "",
    technology_desc:
      "Sistem klasifikasi kematangan pisang menggunakan teknik pembelajaran mesin dan pengolahan citra untuk menganalisis visual buah pisang. Algoritma pembelajaran mesin membantu dalam membedakan warna, tekstur, dan ciri-ciri visual lainnya yang berkaitan dengan tingkat kematangan pisang.",
    application_desc:
      "Teknologi ini dapat diterapkan di industri makanan untuk memilah-milah buah pisang yang matang secara optimal untuk pengemasan atau pengiriman. Di pasar, teknologi ini membantu dalam pengelompokan buah pisang berdasarkan tingkat kematangannya untuk memenuhi preferensi konsumen.",
  },
  {
    url: "predict_vehicle_detection",
    title: "Counting Vehicle Quantity",
    category: "Smart City",
    type: "Object Detection",
    description:
      "Menggunakan pengolahan citra atau rekaman video untuk otomatis menghitung jumlah kendaraan yang melewati suatu lokasi.",
    background:
      "Penghitungan Jumlah Kendaraan (Counting Vehicle Quantity) merujuk pada penggunaan teknologi, terutama teknik visi komputer dan pengolahan citra, untuk menghitung jumlah kendaraan yang melewati suatu titik atau wilayah tertentu. Teknologi ini memiliki aplikasi yang luas dalam pengelolaan lalu lintas, pemantauan jalan raya, parkir, dan pemahaman terhadap pola lalu lintas.<br><br>Teknologi penghitungan jumlah kendaraan bertujuan untuk memberikan informasi tentang volume lalu lintas yang akurat. Hal ini membantu dalam perencanaan lalu lintas, pemeliharaan jalan raya, pemantauan kepadatan lalu lintas, dan analisis pola pergerakan kendaraan. Secara keseluruhan, teknologi penghitungan jumlah kendaraan memainkan peran penting dalam memahami dan mengelola lalu lintas, membantu dalam perencanaan transportasi, serta memberikan informasi penting untuk meningkatkan keamanan dan efisiensi jalan raya.",
    image: "",
    technology_desc:
      "Sistem penghitungan jumlah kendaraan biasanya menggunakan kamera jalan raya, sensor lalu lintas, atau teknologi visi komputer. Sistem ini mampu mengenali dan menghitung kendaraan yang berbeda, seperti mobil, sepeda motor, truk, dan lainnya, dengan menggunakan pengolahan gambar dan analisis data.",
    application_desc:
      "Penghitungan jumlah kendaraan diterapkan di banyak lokasi, seperti persimpangan jalan, jalan tol, area parkir, dan kawasan pemukiman. Data yang diperoleh dari teknologi ini membantu dalam perencanaan lalu lintas, evaluasi kepadatan lalu lintas, perencanaan infrastruktur, dan analisis keamanan jalan.",
  },
  {
    url: "predict_corrosion",
    title: "Corrosion Classification",
    category: "Manufacture",
    type: "Classification",
    description:
      "AI Engine ini mengklasifikasikan tingkat korosi pada suatu benda atau struktur dengan menggunakan teknologi pengolahan citra atau sensor lainnya.",
    background:
      "Klasifikasi korosi merujuk pada penggunaan teknologi, seringkali menggunakan pembelajaran mesin dan teknik pemrosesan citra, untuk mengidentifikasi dan mengkategorikan jenis-jenis korosi yang terjadi pada material atau permukaan tertentu. Korosi merupakan proses degradasi material yang umumnya terjadi akibat interaksi dengan lingkungan, seperti paparan air, udara, atau zat kimia tertentu.<br><br>Tujuan utama dari klasifikasi korosi adalah untuk memahami, mengelompokkan, dan memprediksi jenis korosi yang terjadi pada suatu material. Teknologi ini membantu dalam memantau kondisi material dan memungkinkan tindakan pencegahan yang tepat untuk mencegah kerusakan lebih lanjut. Secara keseluruhan, teknologi klasifikasi korosi memainkan peran penting dalam memahami, mengkategorikan, dan mencegah kerusakan material akibat korosi dengan mengotomatisasi proses identifikasi dan memberikan informasi yang diperlukan untuk tindakan pencegahan yang tepat.",
    image: "",
    technology_desc:
      "Sistem klasifikasi korosi biasanya menggunakan algoritma pembelajaran mesin, analisis citra, dan kadang-kadang model jaringan saraf tiruan (deep learning). Sistem ini menganalisis gambar atau data visual dari material yang terkena korosi untuk mengklasifikasikan jenis korosi yang terjadi.",
    application_desc:
      "Teknologi ini dapat diterapkan di berbagai industri yang menggunakan material yang rentan terhadap korosi, seperti industri perkapalan, konstruksi, otomotif, dan manufaktur. Dengan memahami jenis korosi yang terjadi, perusahaan dapat mengambil langkah-langkah perawatan yang tepat dan menghindari kerugian material yang besar.",
  },
  {
    url: "predict_barcode_detection",
    title: "Barcode Detection",
    category: "Detail",
    type: "Object Detection",
    description:
      "Merupakan AI Engine untuk mendeteksi dan membaca informasi dari barcode pada suatu objek atau produk.",
    background:
      "Deteksi kode batang (barcode detection) mengacu pada penggunaan teknologi, sering kali menggunakan teknik pembelajaran mesin dan visi komputer, untuk mengenali dan memproses informasi dari kode batang yang ada dalam gambar atau video. Teknologi ini memiliki aplikasi luas dalam berbagai bidang, seperti manufaktur, ritel, logistik, dan pengelolaan inventaris.<br><br>Teknologi deteksi kode batang bertujuan untuk mengidentifikasi dan menguraikan informasi dari kode batang. Ini dapat mencakup informasi seperti nomor seri, informasi produk, data pengiriman, atau informasi lain yang terkait dengan objek atau produk tertentu. Secara keseluruhan, teknologi deteksi kode batang memegang peranan penting dalam memfasilitasi pengenalan informasi penting dari kode batang, mempercepat proses bisnis, dan meningkatkan efisiensi operasional dalam berbagai sektor.",
    image: "",
    technology_desc:
      "Sistem deteksi kode batang sering menggunakan algoritma pengolahan gambar dan visi komputer untuk mengidentifikasi pola khusus yang membentuk kode batang. Ini melibatkan analisis gambar atau video untuk menemukan, menangkap, dan mendekode kode batang yang ada.",
    application_desc:
      "Teknologi ini diterapkan di berbagai sektor. Misalnya, dalam industri ritel, digunakan untuk memindai dan mengelola inventaris. Di bidang logistik, digunakan untuk melacak pengiriman dan manajemen rantai pasok.",
  },
  {
    url: "predict_garbage_detection",
    title: "Garbage Classification",
    category: "Smart City",
    type: "Classification",
    description:
      "Menggunakan pengenalan gambar untuk mengklasifikasikan jenis sampah, seperti plastik, kertas, dan logam.",
    background:
      "Pengelompokkan sampah adalah proses mengidentifikasi dan memisahkan berbagai jenis sampah berdasarkan kategori atau jenisnya, seperti plastik, kertas, logam, kaca, organik, dan sebagainya. Teknologi pengelompokkan sampah bertujuan untuk meningkatkan manajemen sampah dan pengolahan limbah dengan lebih efisien dan ramah lingkungan.<br><br>Tujuan utama dari teknologi pengelompokkan sampah adalah untuk mengurangi pencemaran lingkungan, mempromosikan daur ulang, dan memastikan pengelolaan limbah yang lebih baik.Secara keseluruhan, teknologi pengelompokkan sampah memainkan peran penting dalam meningkatkan pengelolaan limbah dan memberikan kontribusi pada upaya perlindungan lingkungan dengan memisahkan dan memproses sampah secara lebih efisien dan tepat.",
    image: "",
    technology_desc:
      "Sistem pengelompokkan sampah sering menggunakan teknologi seperti visi komputer dan pembelajaran mesin untuk mengenali dan mengklasifikasikan sampah berdasarkan ciri-ciri visualnya. Ini bisa melibatkan penggunaan sensor, kamera, atau perangkat lain untuk memindai dan memproses sampah.",
    application_desc:
      "Teknologi pengelompokkan sampah diterapkan di berbagai skala, dari penggunaan rumah tangga hingga fasilitas pengelolaan limbah besar. Ini membantu dalam memisahkan sampah menjadi kategori yang tepat, memudahkan proses daur ulang, dan mengurangi limbah yang masuk ke tempat pembuangan akhir.",
  },
];

const applicationImg = {
  predict_barcode_detection: [barcodeOne, barcodeTwo],
  predict_ppe: [ppeOne, ppeTwo],
  counting_vehicle_quantity: [vehicleOne, vehicleTwo],
  predict_banana_ripeness: [bananaOne],
  predict_vehicle_detection: [countingVehicleOne, countingVehicleTwo],
  predict_garbage_detection: [garbageOne, garbageTwo],
};

const tools = [
  One,
  Two,
  Three,
  Four,
  Five,
  Six,
  Seven,
  Eight,
  Nine,
  Ten,
  Eleven,
  Tweleve,
];

const EngineDetail = () => {
  const searchParams = useSearchParams();
  const engines = useEngineStore((state) => state.engines);
  const url = searchParams.get("engine");
  const image = engines.filter((arr) => arr.base_url_api == url)[0].image;
  const trueEngineData = engineData.filter((arr) => arr.url == url);

  useEffect(() => {
    trueEngineData[0].image = image;
  }, [image, trueEngineData]);

  return (
    <>
      <DemoContainer>
        <OverviewCard {...trueEngineData[0]} />
        <Detail {...trueEngineData[0]} tools={tools} />
        <Application {...trueEngineData[0]} img={applicationImg} />
      </DemoContainer>
    </>
  );
};

export default EngineDetail;

const Application = ({ application_desc, img, url }) => {
  return (
    <div className="row">
      <div className="col-12">
        <div className="card border-0 outline-0 shadow-sm">
          <div className="card-body">
            <p className="text-smaller">Application</p>
            <p id="application_desc">{application_desc}</p>
            <div className="row p-2" id="application">
              {img[url]?.map((arr, index) => (
                <div className="col-3 p-1" key={index}>
                  <div
                    className="rounded-3"
                    style={{
                      backgroundImage: `url(${arr.src})`,
                      width: "100%",
                      aspectRatio: "1/1",
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                    }}
                  ></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const OverviewCard = ({ category, type, title, description, image }) => {
  return (
    <div className="row">
      <div className="col-12 col-md-2 mb-2 mb-md-0">
        <div className="w-100 h-100">
          <div
            id="image"
            className="w-100 h-100 rounded-2"
            style={{
              backgroundImage: `url("https://annotation.aiforindonesia.com${image}")`,
              aspectRatio: "1/1",
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
        </div>
      </div>
      <div className="col-12 col-md-10 d-flex align-items-center">
        <div>
          <p className="text-smaller">Overview</p>
          <div className="d-flex mb-2">
            <span
              className="badge bg-soft-primary text-primary rounded-1 me-2"
              id="category-name"
            >
              {category}
            </span>
            <span
              className="badge bg-soft-primary text-primary rounded-1"
              id="type-name"
            >
              {type}
            </span>
          </div>
          <p className="fw-semibold fs-5 mb-1 text-primary" id="title-name">
            {title}
          </p>
          <p id="desc-name">{description}</p>
        </div>
      </div>
    </div>
  );
};

const Detail = ({ background, technology_desc, tools }) => {
  return (
    <div className="row align-content-stretch mt-3 mb-md-3">
      <div className="col-12 col-md-12 mb-3">
        <div className="card border-0 outline-0 shadow-sm h-100">
          <div className="card-body">
            <p className="text-smaller">Background</p>
            <p id="background">{background}</p>
          </div>
        </div>
      </div>
      <div className="col-12 col-md-12 mb-3">
        <div className="card border-0 outline-0 shadow-sm h-100">
          <div className="card-body">
            <p className="text-smaller">Technology</p>
            <p id="technology_desc">{technology_desc}</p>
            <div className="row" id="technology">
              {tools.map((arr, index) => (
                <div className="col-1 p-2" key={index}>
                  <Image
                    style={{ width: "100%", height: "100%" }}
                    src={arr}
                    alt=""
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
