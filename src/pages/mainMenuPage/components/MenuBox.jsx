import "./MenuBox.scss";
import LOCATION from "../../../assets/main/location.svg";
import CHECKBOX from "../../../assets/main/checkBox.svg";
import CHECKEDBOX from "../../../assets/main/checkedBox.svg";
import usePricing from "../../../hooks/usePricing";

export const MenuBox = ({ mode = "normal", isSelected = false, onToggleSelect, menuName, storeName, count = 1, price, originalPrice }) => {
    const isDelete = mode === "delete";

    const unitOriginal = typeof originalPrice === "number" ? originalPrice : price;
    const discountAmount = Math.max(unitOriginal - price, 0) * (count ?? 1);

    const { subtotal, discount, total, fmt } = usePricing(
    { price, count: count ?? 1 },
    discountAmount
    );

    const discountRate = subtotal > 0 ? Math.round((discount / subtotal) * 100) : 0;

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
                    { discount > 0 && <p className = "originalPrice">{ fmt(originalPrice) }</p> }
                    <p className = "originWon">원</p>                    
                </div>
                <div className = "finalInfo">
                    { discount > 0 && <p className = "discountRate">{ discountRate }%</p> }
                    <p className = "finalPrice">{ fmt(price) }원</p>                    
                </div>

            </div>
        </div>
    )
}