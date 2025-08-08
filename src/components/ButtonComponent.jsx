import "./ButtonComponent.scss";
import useNavigate from "react-router-dom";

export const ButtonComponent = ({ width, bgColor, onClick, textSize, textColor, buttonText }) => {
    return (
        <div 
            className = "buttonBox"
            style = {{ 
                width: width,
                backgroundColor: bgColor,
            }}
            onClick = { onClick }
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