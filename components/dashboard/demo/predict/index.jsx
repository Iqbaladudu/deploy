"use client";

import useImgArrStore from "@/app/store/useImgArrStore";
import DemoContainer from "../demoContainer";
import Image from "next/image";
import { convertToImage } from "@/app/utils";
import { useSearchParams } from "next/navigation";
import { useEngineStore } from "@/app/store";

const modelData = {
  predict_corrosion: {
    usecase: "Corrosion Classification",
    desc: "AI Engine ini mengklasifikasikan tingkat korosi pada suatu benda atau struktur dengan menggunakan teknologi pengolahan citra atau sensor lainnya.",
    modelName: "YOLOv8 Classification",
    modelDesc:
      "YOLO Classification, pada dasarnya, tidak menjadi istilah yang umum dalam konteks YOLO. YOLO lebih dikenal sebagai metode deteksi objek daripada klasifikasi. Klasifikasi gambar berkaitan dengan tugas mengidentifikasi atau memprediksi kelas atau label dari gambar, sedangkan YOLO secara khusus dikembangkan untuk deteksi objek dan lokalisasi objek-objek tersebut dalam gambar dengan menggunakan bounding box.",
    accuracy: "90",
    preccission: "70",
    recall: 90,
    f1: 60,
    map: 60,
    mse: 87,
  },
  predict_barcode_detection: {
    usecase: "Barcode Detection",
    desc: "Merupakan AI Engine untuk mendeteksi dan membaca informasi dari barcode pada suatu objek atau produk.",
    modelName: "YOLOv8 Detection",
    modelDesc:
      "YOLO Detection adalah pendekatan untuk deteksi objek real-time dalam bidang computer vision. YOLO mendeteksi dan mengidentifikasi objek-objek dalam gambar dengan cara yang efisien, membagi gambar ke dalam grid dan melakukan prediksi bounding box serta kelas objek pada setiap grid secara simultan. Metode ini memungkinkan deteksi objek multi-kelas dan lokalitas yang baik dengan kecepatan yang relatif tinggi.",
    accuracy: "90",
    preccission: "70",
    recall: 90,
    f1: 60,
    map: 60,
    mse: 87,
  },
  predict_garbage_detection: {
    usecase: "Garbage Classification",
    desc: "Menggunakan pengenalan gambar untuk mengklasifikasikan jenis sampah, seperti plastik, kertas, dan logam..",
    modelName: "YOLOv8 Detection",
    modelDesc:
      "YOLO Detection adalah pendekatan untuk deteksi objek real-time dalam bidang computer vision. YOLO mendeteksi dan mengidentifikasi objek-objek dalam gambar dengan cara yang efisien, membagi gambar ke dalam grid dan melakukan prediksi bounding box serta kelas objek pada setiap grid secara simultan. Metode ini memungkinkan deteksi objek multi-kelas dan lokalitas yang baik dengan kecepatan yang relatif tinggi.",
    accuracy: "90",
    preccission: "70",
    recall: 90,
    f1: 60,
    map: 60,
    mse: 87,
  },
  predict_ppe: {
    usecase: "PPE Detection",
    desc: "Fokus pada mendeteksi penggunaan peralatan pelindung diri (helm, sarung tangan, sepatu pengaman) oleh individu.",
    modelName: "YOLOv8 Detection",
    modelDesc:
      "YOLO Detection adalah pendekatan untuk deteksi objek real-time dalam bidang computer vision. YOLO mendeteksi dan mengidentifikasi objek-objek dalam gambar dengan cara yang efisien, membagi gambar ke dalam grid dan melakukan prediksi bounding box serta kelas objek pada setiap grid secara simultan. Metode ini memungkinkan deteksi objek multi-kelas dan lokalitas yang baik dengan kecepatan yang relatif tinggi.",
    accuracy: "90",
    preccission: "70",
    recall: 90,
    f1: 60,
    map: 60,
    mse: 87,
  },
  predict_banana_ripeness: {
    usecase: "Banana Ripeness Classification",
    desc: "Menggunakan pengolahan citra untuk membedakan tingkat kematangan pisang, membantu manajemen persediaan.",
    modelName: "YOLOv8 Classification",
    modelDesc:
      "YOLO Classification, pada dasarnya, tidak menjadi istilah yang umum dalam konteks YOLO. YOLO lebih dikenal sebagai metode deteksi objek daripada klasifikasi. Klasifikasi gambar berkaitan dengan tugas mengidentifikasi atau memprediksi kelas atau label dari gambar, sedangkan YOLO secara khusus dikembangkan untuk deteksi objek dan lokalisasi objek-objek tersebut dalam gambar dengan menggunakan bounding box.",
    accuracy: "90",
    preccission: "70",
    recall: 90,
    f1: 60,
    map: 60,
    mse: 87,
  },
  predict_vehicle_detection: {
    usecase: "Counting Vehicle Quantity",
    desc: "Menggunakan pengolahan citra atau rekaman video untuk otomatis menghitung jumlah kendaraan yang melewati suatu lokasi.",
    modelName: "YOLOv8 Detection",
    modelDesc:
      "YOLO Detection adalah pendekatan untuk deteksi objek real-time dalam bidang computer vision. YOLO mendeteksi dan mengidentifikasi objek-objek dalam gambar dengan cara yang efisien, membagi gambar ke dalam grid dan melakukan prediksi bounding box serta kelas objek pada setiap grid secara simultan. Metode ini memungkinkan deteksi objek multi-kelas dan lokalitas yang baik dengan kecepatan yang relatif tinggi.",
    accuracy: "90",
    preccission: "70",
    recall: 90,
    f1: 60,
    map: 60,
    mse: 87,
  },
};

const Predict = () => {
  // const images = useImgArrStore((state) => state.images);
  const params = useSearchParams();
  const engine = params.get("engine");
  const images = useImgArrStore((state) => state.images);
  const engines = useEngineStore((state) => state.engines);
  const model = engines.filter((arr) => arr.base_url_api === engine)[0]
    .model_data[0];

  const perform = JSON.parse(model.perform);

  return (
    <DemoContainer>
      <div className="row mb-4 justify-content-between">
        <div className="col-12">
          <p className="mb-0" id="total-image">
            {images[0].length} total gambar
          </p>
        </div>
      </div>
      <div className="row mb-4" id="previewImage">
        {images[0].map((img, index) => (
          <div key={index} className="col-3 col-md-2 col-xxl-2 mb-2 mb-md-3">
            <Image
              src={convertToImage(img.base64)}
              className="w-100 rounded-1"
              style={{ aspectRatio: "1/1" }}
              width={100}
              height={100}
              alt=""
            />
          </div>
        ))}
      </div>
      <hr className="opacity-25" />
      <div className="row mb-4 justify-content-between">
        <div className="col-4">
          <p className="mb-0">Use Case</p>
        </div>
        <div className="col-8">
          <p className="mb-0" id="usecase-name">
            {modelData[engine]?.usecase}
          </p>
        </div>
      </div>
      <hr className="opacity-25" />
      <div className="row mb-4 justify-content-between">
        <div className="col-4">
          <p className="mb-0">Deskripsi Use Case</p>
        </div>
        <div className="col-8">
          <p className="mb-0" id="desc-name">
            {model.desc}
          </p>
        </div>
      </div>
      <hr className="opacity-25" />
      <div className="row justify-content-between">
        <div className="col-4">
          <p className="mb-0">Model</p>
        </div>
        <div className="col-8">
          <p className="mb-0">
            <span
              className="badge bg-soft-primary text-primary fw-semibold"
              id="model-name"
            >
              {model.name}
            </span>
          </p>
        </div>
      </div>
      <hr className="opacity-25" />
      <div className="row justify-content-between">
        <div className="col-4">
          <p className="mb-0">Performa</p>
        </div>
        <div className="col-8">
          <p className="mb-0">
            {perform["accuracy"] && (
              <span className="badge bg-soft-success text-success fw-semibold me-2">
                Accuracy : <span id="accuracy_val">{perform["accuracy"]}</span>
              </span>
            )}
            {perform["precission"] && (
              <span className="badge bg-soft-success text-success fw-semibold me-2">
                Precission :{" "}
                <span id="preccission_val">{perform["precission"]}</span>
              </span>
            )}
            {perform["recall"] && (
              <span className="badge bg-soft-success text-success fw-semibold me-2">
                Recall : <span id="recall_val">{perform["recall"]}</span>
              </span>
            )}
            {perform["f1-score"] && (
              <span className="badge bg-soft-success text-success fw-semibold me-2">
                F1-Score :<span id="f1-score">{perform["f1-score"]}</span>{" "}
              </span>
            )}
            {perform["map50"] && (
              <span className="badge bg-soft-success text-success fw-semibold me-2">
                mAP : <span id="map">{perform["map50"]}</span>
              </span>
            )}
            {perform["map50-95"] && (
              <span className="badge bg-soft-success text-success fw-semibold me-2">
                mAP50-95 : <span id="mse">{perform["map50-95"]}</span>
              </span>
            )}
          </p>
        </div>
      </div>
      <hr className="opacity-25" />
      <div className="row mb-4 justify-content-between">
        <div className="col-4">
          <p className="mb-0">Deskripsi Model</p>
        </div>
        <div className="col-8">
          <p className="mb-0" id="model-desc">
            {modelData[engine].modelDesc}
          </p>
        </div>
      </div>
    </DemoContainer>
  );
};

export default Predict;
