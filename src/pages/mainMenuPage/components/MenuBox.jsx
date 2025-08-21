import "./MenuBox.scss";

import CHECKBOX from "../../../assets/main/checkBox.png";
import CHECKEDBOX from "../../../assets/main/checkedBox.png";
import { categoryIcons } from "../../../assets/icons/categoryIcons";

export const MenuBox = ({ mode = "normal", isSelected = false, onToggleSelect, menu }) => {
    const { name, storeName, costPrice, salePrice, category, count, salePercent  } = menu; // 가격 수정 필요

    const fmt = (n) => Number(n).toLocaleString("ko-KR");

    const isDelete = mode === "delete";

    return (
        <div className = { isDelete ? "deleteContainer" : undefined }>
            <div className = { `menuBoxContainer ${isDelete ? "deleteMode" : "normalMode"}` }>
                <div className = "menuBoxLeft">
                    <img 
                        // alt = "메뉴 아이콘"
                        className = "menuImage"
                        src = { categoryIcons[category] } 
                    />
                    <div className = "infoBox">
                        <div className = "menuInfo">
                            <p className = "storeName">{ storeName }</p>
                            <p className = "menuBoxName">{ name }</p>
                            <p className = "menuCount">수량: { count }개</p>
                        </div>
                    </div>
                </div>
                <div className = "menuBoxRight">
                    <div className = "originText">
                        <p className = "originalPrice">{ fmt(costPrice * count) }</p>
                        <p className = "originWon">원</p>                    
                    </div>
                    <div className = "finalInfo">
                        <p className = "discountRate">{ salePercent }%</p>
                        <p className = "finalPrice">{ fmt(salePrice * count) }원</p>                    
                    </div>
                </div>
            </div>   

            { isDelete && (
                <img 
                    className = "mainCheckImg"
                    src = { isSelected ? CHECKEDBOX : CHECKBOX }
                    onClick = { () => onToggleSelect?.() }
                />
            )}         
        </div>
    )
}