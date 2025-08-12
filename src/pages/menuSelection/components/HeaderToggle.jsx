import React from "react";
import "./HeaderToggle.scss";

export default function HeaderToggle({
  options,
  value,
  onChange = () => {},
  name = "header-toggle",
}) {
  return (
    <div className="Toggle" role="radiogroup" aria-label="보기 전환">
      {options.map((opt) => (
        <label
          key={opt.value}
          className={`Toggle__item ${value === opt.value ? "is-active" : ""}`}
        >
          <input
            type="radio"
            name={name}
            value={opt.value}
            checked={value === opt.value}
            onChange={() => onChange(opt.value)}
          />
          {opt.icon && (
            <img className="Toggle__icon" src={opt.icon} alt={opt.alt ?? ""} />
          )}
          {opt.label && <span className="Toggle__label">{opt.label}</span>}
        </label>
      ))}
    </div>
  );
}
