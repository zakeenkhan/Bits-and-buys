import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./BackButton.css";

const BackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Hide back button on home page
  if (location.pathname === "/bits-and-buy-frontend/src/pages/Home.jsx") return null;

  return (
    <button className="back-button" onClick={() => navigate("/")}>
      ⬅ Home
    </button>
  );
};

export default BackButton;
