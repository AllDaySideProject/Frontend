import React, { useState } from "react";
import Map from "../../../assets/manuHeader/map_header.svg";
import AI from "../../../assets/manuHeader/ai_header.svg";
import Suggestion from "../../../assets/manuHeader/suggestion_header.svg"; // 텍스트로 대체
import "./HeaderArrow.scss";
import HeaderToggle from "./HeaderToggle";

export const HeaderArrow = () => {
  const [mode, setMode] = useState("recommend"); 

  const options = [
    { value: "recommend", label: "맞춤 추천" }, // 텍스트
    { value: "ai",        icon: AI,  alt: "AI 추천" },
    { value: "map",       icon: Map, alt: "지도" },
  ];

  return (
    <header className="Header">
      <div className="Header__left">
        <button className="BackBtn" aria-label="뒤로">←</button>
      </div>

      {/* <div className="Header__center">
        네비게이트 없이 토글만 동작
        <HeaderToggle options={options} value={mode} onChange={setMode} />
      </div> */}

      <div className="Header__right" />
    </header>
  );
};
