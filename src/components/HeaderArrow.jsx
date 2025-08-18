import "./HeaderArrow.scss";

import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import BACK from "../assets/back.svg";
import AiIcon from "../assets/manuHeader/ai_header.svg";
import MapIcon from "../assets/manuHeader/map_header.svg";
import SuggestionIcon from "../assets/manuHeader/suggestion_header.svg";

export const HeaderArrow = ({ initialMode = "suggestion" }) => {
  const [mode, setMode] = useState(initialMode); // 'suggestion' | 'ai' | 'map'
  const navigate = useNavigate();
  const location = useLocation();

  // 경로에 맞춰 활성 탭 동기화
  useEffect(() => {
    const p = location.pathname.toLowerCase();
    if (p.startsWith("/menuselect")) setMode("suggestion");
    else if (p.startsWith("/aisuggest")) setMode("ai");
    else if (p.startsWith("/menu/map") || p === "/map") setMode("map");
  }, [location.pathname]);

  const goBack = () => navigate(-1);

  const select = (nextMode) => {
    setMode(nextMode);
    if (nextMode === "suggestion") navigate("/menuselect");
    else if (nextMode === "ai") navigate("/aiSuggest");
    else if (nextMode === "map") navigate("/menu/map");
  };

  return (
      <div className="HeaderBar">
        <button className="BackButton" onClick={goBack} aria-label="뒤로가기">
          <img src={BACK} alt="" />
        </button>

        <div className="SwitchGroup" role="tablist" aria-label="모드 전환">
          {/* 왼쪽: 맞춤 추천 */}
          <button
            type="button"
            className={`SwitchBtn ${mode === "suggestion" ? "active" : ""}`}
            role="tab"
            aria-selected={mode === "suggestion"}
            onClick={() => select("suggestion")}
            title="맞춤 추천"
          >
            <img className="btn-icon" src={SuggestionIcon} alt="" />
            {mode === "suggestion" && <span className="btn-label">맞춤 추천</span>}
          </button>

          {/* 가운데: AI 추천 */}
          <button
            type="button"
            className={`SwitchBtn ${mode === "ai" ? "active" : ""}`}
            role="tab"
            aria-selected={mode === "ai"}
            onClick={() => select("ai")}
            title="AI 추천"
          >
            <img className="btn-icon" src={AiIcon} alt="" />
            {mode === "ai" && <span className="btn-label">AI 추천</span>}
          </button>

          {/* 오른쪽: 지도 */}
          <button
            type="button"
            className={`SwitchBtn ${mode === "map" ? "active" : ""}`}
            role="tab"
            aria-selected={mode === "map"}
            onClick={() => select("map")}
            title="지도"
          >
            <img className="btn-icon" src={MapIcon} alt="" />
            {mode === "map" && <span className="btn-label">지도</span>}
          </button>
        </div>
      </div>
  );
};

export default HeaderArrow;
