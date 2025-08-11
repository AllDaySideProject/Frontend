import "./ButtonComponent.scss";

export const ButtonComponent = ({ width, bgColor, onClick, textSize, textColor, buttonText, disabled = false }) => {
    return (
        <div 
            className = "buttonBox"
            style = {{ 
                width: width,
                backgroundColor: disabled ? "#B0B0B0" : bgColor,
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