import "./TipComponent.scss";

export const TipComponent = ({
    bgColor, gap, title, description, imgPadding, image
}) => {
    return (
        <div 
            className = "tipContainer"
            style = {{ backgroundColor: bgColor, gap }}
        >
            <div className = "tipText">
                { title && <p className = "tipTitle">{ title }</p> }
                { description && <p className = "tipDescription">{ description }</p> }
            </div>
            <div 
                style = {{ padding: imgPadding }}
            >
                <img src = { image } />
            </div>
        </div>
    )
}