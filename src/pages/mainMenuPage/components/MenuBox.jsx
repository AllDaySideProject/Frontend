import "./MenuBox.scss";
import LOCATION from "../../../assets/main/location.svg";
import CHECKBOX from "../../../assets/main/checkBox.svg";
import CHECKEDBOX from "../../../assets/main/checkedBox.svg";
import usePricing from "../../../hooks/usePricing";

export const MenuBox = ({ mode = "normal", isSelected = false, onToggleSelect, menuName, storeName, count = 1, price, originalPrice }) => {
    const isDelete = mode === "delete";

    const unitOriginal = typeof originalPrice === "number" ? originalPrice : price;
    const finalPrice = price * count; // 최종 금액
    const discountAmount = (unitOriginal - price) * count;

    const { fmt } = usePricing({ price, count }, discountAmount);

    const discountRate = Math.round(((unitOriginal - price) / unitOriginal) * 100);

    return (
        <div className = { isDelete ? "deleteContainer" : undefined }>
            <div className = { `menuBoxContainer ${isDelete ? "deleteMode" : "normalMode"}` }>
                <div className = "menuBoxLeft">
                    <img 
                        // alt = "메뉴 아이콘"
                        className = "menuImage" 
                    />
                    <div className = "infoBox">
                        <div className = "menuInfo">
                            <p className = "storeName">{ storeName }</p>
                            <p className = "menuBoxName">{ menuName }</p>
                            <p className = "menuCount">수량: { count }개</p>
                        </div>
                    </div>
                </div>
                <div className = "menuBoxRight">
                    <div className = "originText">
                        <p className = "originalPrice">{ fmt(unitOriginal) }</p>
                        <p className = "originWon">원</p>                    
                    </div>
                    <div className = "finalInfo">
                        <p className = "discountRate">-{ discountRate }%</p>
                        <p className = "finalPrice">{ fmt(finalPrice) }원</p>                    
                    </div>
                </div>
            </div>   

            { isDelete && (
                <img 
                    src = { isSelected ? CHECKEDBOX : CHECKBOX }
                    onClick = { () => onToggleSelect?.() }
                />
            )}         
        </div>
    )
}