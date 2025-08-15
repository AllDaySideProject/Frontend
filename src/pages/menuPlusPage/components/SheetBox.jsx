import "./SheetBox.scss";

import MINUS from "../../../assets/map/sheet-minus.svg";
import PLUS from "../../../assets/map/sheet-plus.svg";

export const SheetBox = () => {
    return (
        <div className = "sheetBox">
            <div className = "sheetBoxLeft">
                <div className = "menuImg" />
                <div className ="sheetBoxLeftText">
                    <p className = "sheetMenuName">진미채볶음</p>
                    <p className = "sheetOriginalPrice">4500원</p>
                    <div className = "leftMainText">
                        <p className = "sheetPrice">3600원</p>
                        <p className = "sheetDiscount">-20%</p>
                    </div>
                </div>
            </div>
            <div className = "sheetBoxRight">
                <img src = { MINUS } />
                <p className = "sheetCount">0</p>
                <img src = { PLUS } />
            </div>
        </div>
    )
}