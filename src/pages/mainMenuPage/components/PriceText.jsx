import "./PriceText.scss";

import ScreenContainer from "../../../components/ScreenContainer"

export const PriceText = ({ fontColor, priceTitle, price, tone = "normal" }) => {
    const isDiscount = tone === "discount";

    return (
        <div className = "priceContainer">
            <p className = "titleText">{ priceTitle }</p>
            <p 
                className = "priceText"
                style = {{ color: fontColor }}
            >
                { price }원
            </p>
        </div>
    )
}