import "./SheetBox.scss";

import MINUS from "../../../assets/map/sheet-minus.svg";
import PLUS from "../../../assets/map/sheet-plus.svg";

import SOUP_ICON from "../../../assets/icons/soup.svg";
import BRAISED_ICON from "../../../assets/icons/braised.svg";
import SEASONED_ICON from "../../../assets/icons/seasoned.svg";
import STIRFRY_ICON from "../../../assets/icons/stirfry.svg";
import STEAMED_ICON from "../../../assets/icons/steamed.svg";

import { categoryIcons } from "../../../assets/icons/categoryIcons";

export const SheetBox = ({ menu, onCountChange }) => {
    const { name, originalPrice, salePrice, count, category, availableQuantity, salePercent } = menu;
    const fmt = (n) => Number(n).toLocaleString("ko-KR");
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
                        <p className = "sheetPrice">{ fmt(salePrice) }원</p>
                        <p className = "sheetDiscount">{ salePercent }%</p>
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