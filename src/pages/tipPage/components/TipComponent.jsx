import ScreenContainer from "../../../components/ScreenContainer";
import "./TipComponent.scss";

export const TipComponent = ({
    bgColor, padding, gap, title, description, imgPadding, image, imgWidth, imgHeight
}) => {
    const formattedTitle = title.split(",").map((line, idx, arr) => (
        <span key = { idx }>
            { line }
            { idx < arr.length - 1 && "," }
            <br />
        </span>
    ));
    
    return (
        <ScreenContainer bgColor = { bgColor }>
            <div 
                className = "tipContainer"
                style = {{ padding, gap }}
            >
                <div className = "tipText">
                    { title && <p className = "tipTitle">{ formattedTitle }</p> }
                    { description && <p className = "tipDescription">{ description }</p> }
                </div>
                <div 
                    className = "tipImgContainer"
                    style = {{ padding: imgPadding }}
                >
                    <img 
                        className = "tipComponentImg"
                        src = { image } 
                        style = {{
                            width: imgWidth || "15.625rem",
                            height: imgHeight || "15.625rem"
                        }}
                    />
                </div>
            </div>
        </ScreenContainer>
    )
}