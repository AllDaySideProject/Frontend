import "./ButtonComponent.scss";

export const ButtonComponent = ({ width, bgColor, textSize, textColor, buttonText }) => {
    return (
        <div 
            className = "buttonBox"
            style = {{ 
                width: width,
                backgroundColor: bgColor }}
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