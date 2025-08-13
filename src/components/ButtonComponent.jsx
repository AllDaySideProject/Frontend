import "./ButtonComponent.scss";

export const ButtonComponent = ({ className, width, bgColor, bdColor, onClick, textSize, textColor, buttonText, disabled = false }) => {
    return (
        <div 
            className = { `buttonBox ${ className ?? "" }` }
            style = {{ 
                width: width,
                backgroundColor: disabled ? "#B0B0B0" : bgColor,
                pointerEvents: disabled ? "none" : "auto",
                borderColor: disabled ? "#D9D9D9" : bdColor
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