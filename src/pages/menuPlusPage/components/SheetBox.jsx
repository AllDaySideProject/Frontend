import "./SheetBox.scss";

import MINUS from "../../../assets/map/sheet-minus.svg";
import PLUS from "../../../assets/map/sheet-plus.svg";

import { categoryIcons } from "../../../assets/icons/categoryIcons";

export const SheetBox = ({ menu, onCountChange }) => {
    const { name, originalPrice, salePrice, count, category, availableQuantity, salePercent } = menu;
    const fmt = (n) => Number(n).toLocaleString("ko-KR");
    const icon = categoryIcons[category]; // 카테고리별 아이콘 고르기

    return (
        <div className = "sheetBox">
            <div className = "sheetBoxLeft">
                <div className = "menuImg">
                    { icon && 
                        <img 
                            src = { categoryIcons[menu.category] } 
                            className = "iconImg"
                            alt = { category } 
                        />
                    }
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
                <img src = { MINUS } onClick = { () => onCountChange(-1) } style = {{ cursor: "pointer" }} />
                <p className = "sheetCount">{ count }</p>
                <img src = { PLUS } onClick = {() => onCountChange(1) } style = {{ cursor: "pointer" }} />
            </div>
        </div>
    )
}