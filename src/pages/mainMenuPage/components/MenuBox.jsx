import "./MenuBox.scss";
import CHECKBOX from "../../../assets/main/checkBox.svg";
import CHECKEDBOX from "../../../assets/main/checkedBox.svg";
import usePricing from "../../../hooks/usePricing";

export const MenuBox = ({ mode = "normal", isSelected = false, onToggleSelect, menuName, storeName, count = 1, price, originalPrice }) => {
    const isDelete = mode === "delete";

    const unitOriginal = typeof originalPrice === "number" ? originalPrice : price;
    const discountAmount = Math.max(unitOriginal - price, 0) * (count);

    const { subtotal, discount, total, fmt } = usePricing(
    { price, count }, discountAmount
    );

    const unitDiscountRate = unitOriginal > 0 ? Math.round(((unitOriginal - price) / unitOriginal) * 100) : 0;
    // if (isDelete) {
    //     return (
    //         <div className = "menuBoxContainer deleteMode">
    //             <img 
    //                 // alt = "메뉴 아이콘"
    //                 // src = { 추가 에정 }
    //                 className = "menuImage"
    //             />
    //             <div className = "menuContainer">
    //                 <div className = "infoBox">
    //                     <div className = "menuInfo">
    //                         <p className = "priceText">{ fmt(price) }원</p>
    //                         <p className = "section">l</p>
    //                         <div className = "priceInfo">
    //                             <p>{ menuName } { count }개</p>
    //                         </div>
    //                     </div>    
    //                     <div className = "storeInfo">
    //                         <img 
    //                             alt = "위치 아이콘"
    //                             src = { LOCATION } 
    //                             className = "locationImage"
    //                         />
    //                         <p>{ storeName }</p>
    //                     </div>    
    //                 </div>
    //                 <img 
    //                     src = { isSelected ? CHECKEDBOX : CHECKBOX } 
    //                     className = "checkBoxImage"
    //                     alt = { isSelected ? "선택 완료" : "미선택" }
    //                     onClick = { (e) => onToggleSelect?.() }
    //                 />       
    //             </div> 
    //         </div>

    //     )
    // }

    return (
        <div className = "menuBoxContainer normalMode">
            <div className = "menuBoxLeft">
                <img 
                    // alt = "메뉴 아이콘"
                    className = "menuImage" 
                />
                <div className = "infoBox">
                    <div className = "menuInfo">
                        <p className = "storeName">{ storeName }</p>
                        <p className = "menuName">{ menuName }</p>
                        <p className = "menuCount">수량: { count }개</p>
                    </div>
                </div>
            </div>

            <div className = "menuBoxRight">
                <div className = "originText">
                    { discount > 0 && <p className = "originalPrice">{ fmt(unitOriginal) }</p> }
                    <p className = "originWon">원</p>                    
                </div>
                <div className = "finalInfo">
                    { discount > 0 && <p className = "discountRate">-{ unitDiscountRate }%</p> }
                    <p className = "finalPrice">{ fmt(price * count) }원</p>                    
                </div>

            </div>
        </div>
    )
}