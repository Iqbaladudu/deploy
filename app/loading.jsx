"use client";

export default function Loading({ children }) {
  return (
    <div
      className="d-flex h-100 w-100 align-items-center justify-content-center"
      style={{
        marginTop: "20px",
      }}
    >
      <div
        className="spinner-border spinner-border-sm text-white"
        role="status"
      ></div>
    </div>
  );
}
