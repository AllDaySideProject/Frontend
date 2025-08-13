import "./TipComponent.scss";

export const TipComponent = ({
    bgColor, padding, gap, title, description, imgPadding, image
}) => {
    return (
        <div 
            className = "tipContainer"
            style = {{ backgroundColor: bgColor, padding, gap }}
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