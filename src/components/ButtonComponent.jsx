import "./ButtonComponent.scss";
import useNavigate from "react-router-dom";

export const ButtonComponent = ({ width, bgColor, onClick, textSize, textColor, buttonText, disabled = false }) => {
    return (
        <div 
            className = "buttonBox"
            style = {{ 
                width: width,
                backgroundColor: bgColor,
                pointerEvents: disabled ? "none" : "auto"
            }}
            onClick = { disabled ? undefined : onClick } // 버튼 비활성화 시 onClick: undefined
        >
            <p 
                className = "buttonText"
                style = {{ 
                    fontSize: textSize,
                    color: textColor
                }}
            >
                { buttonText }
            </p>
        </div>
    )
}