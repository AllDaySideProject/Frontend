import "./SheetBox.scss";

import MINUS from "../../../assets/map/sheet-minus.svg";
import PLUS from "../../../assets/map/sheet-plus.svg";
import usePricing from "../../../hooks/usePricing";
import { categoryIcons } from "../../../assets/icons/categoryIcons";

export const SheetBox = ({ menu, onCountChange }) => {
    const { name, originalPrice, price, count, category } = menu;

    const discountAmount = (originalPrice - price) * count;
    const discountRate = Math.round(((originalPrice - price) / originalPrice) * 100);

    const { fmt } = usePricing({ price, count }, discountAmount);

    const icon = categoryIcons[category]; // 카테고리별 아이콘 고르기

    return (
        <div className = "sheetBox">
            <div className = "sheetBoxLeft">
                <div className = "menuImg">
                    { icon && <img src = { categoryIcons[menu.category] } alt = { category } />}
                </div>
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