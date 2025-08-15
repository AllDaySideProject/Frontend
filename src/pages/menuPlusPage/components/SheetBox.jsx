import "./SheetBox.scss";

import MINUS from "../../../assets/map/sheet-minus.svg";
import PLUS from "../../../assets/map/sheet-plus.svg";
import usePricing from "../../../hooks/usePricing";

export const SheetBox = ({ menu, onCountChange }) => {
    const { name, originalPrice, price, count } = menu;

    const discountAmount = (originalPrice - price) * count;
    const discountRate = Math.round(((originalPrice - price) / originalPrice) * 100);

    const { fmt } = usePricing({ price, count }, discountAmount);

    return (
        <div className = "sheetBox">
            <div className = "sheetBoxLeft">
                <div className = "menuImg" />
                <div className ="sheetBoxLeftText">
                    <p className = "sheetMenuName">{ name }</p>
                    <p className = "sheetOriginalPrice">{ fmt(originalPrice) }원</p>
                    <div className = "leftMainText">
                        <p className = "sheetPrice">{ fmt(price) }원</p>
                        <p className = "sheetDiscount">-{ discountRate }%</p>
                    </div>
                </div>
            </div>
            <div className = "sheetBoxRight">
                <img src = { MINUS } onClick = { () => onCountChange(-1) } />
                <p className = "sheetCount">{ count }</p>
                <img src = { PLUS } onClick = {() => onCountChange(1) } />
            </div>
        </div>
    )
}