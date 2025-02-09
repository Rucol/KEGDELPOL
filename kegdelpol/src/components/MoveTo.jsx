import React from "react";
import { Link } from "react-router-dom";
import "./MoveTo.css";

const AssignTheDriver = ({ imageSrc, title, to }) => {
  return (
    <div className="assign-the-driver">
      <Link to={to}>
        <img src={imageSrc} alt="Driver License" className="driver-license-image" />
        <h1>{title}</h1>
      </Link>
    </div>
  );
};

export default AssignTheDriver;
