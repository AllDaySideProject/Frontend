import "./ButtonComponent.scss";

export const ButtonComponent = ({ bgColor, textColor, buttonText }) => {
    return (
        <div 
            className = "buttonBox"
            style = {{ backgroundColor: bgColor }}
        >
            <p 
                className = "buttonText"
                style = {{ color: textColor }}
            >
                { buttonText }
            </p>
        </div>
    )
}