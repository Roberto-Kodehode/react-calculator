import React from "react";
import "./Wrapper.css";

export default function Wrapper({ id, children }) {
  return (
    <div className="wrapper" id={id}>
      {children}
    </div>
  );
}
