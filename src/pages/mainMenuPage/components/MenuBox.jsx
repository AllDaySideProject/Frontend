import "./MenuBox.scss";
import LOCATION from "../../../assets/main/storeLocation.svg";
import CHECKBOX from "../../../assets/main/checkBox.svg";
import CHECKEDBOX from "../../../assets/main/checkedBox.svg";

export const MenuBox = ({ mode = "normal", isSelected = false, onToggleSelect, menuName, storeName, count, price }) => {
    const isDelete = mode === "delete";

    const fmt = (n) => Number(n).toLocaleString("ko-KR"); // 금액 12,345 형식으로

    if (isDelete) {
        return (
            <div className = "menuBoxContainer deleteMode">
                <img 
                    // alt = "메뉴 아이콘"
                    // src = { 추가 에정 }
                    className = "menuImage"
                />
                <div className = "menuContainer">
                    <div className = "infoBox">
                        <div className = "menuInfo">
                            <p className = "priceText">{ fmt(price) }원</p>
                            <p className = "section">l</p>
                            <div className = "priceInfo">
                                <p>{ menuName } { count }개</p>
                            </div>
                        </div>    
                        <div className = "storeInfo">
                            <img 
                                alt = "위치 아이콘"
                                src = { LOCATION } 
                                className = "locationImage"
                            />
                            <p>{ storeName }</p>
                        </div>    
                    </div>
                    <img 
                        src = { isSelected ? CHECKEDBOX : CHECKBOX } 
                        className = "checkBoxImage"
                        alt = { isSelected ? "선택 완료" : "미선택" }
                        onClick = { (e) => onToggleSelect?.() }
                    />       
                </div> 
            </div>

        )
    }

    return (
        <div className = "menuBoxContainer normalMode">
            <img 
                // alt = "메뉴 아이콘"
                className = "menuImage" 
            />
            <div className = "infoBox">
                <div className = "menuInfo">
                    <p className = "menuName">{ menuName }</p>
                    <div className = "storeInfo">
                        <img 
                            alt = "위치 아이콘"
                            src = { LOCATION } 
                            className = "locationImage"
                        />
                        <p>{ storeName }</p>
                    </div>
                </div>
                <div className = "priceInfo">
                    <p>{ count }개</p>
                    <p>{ fmt(price) }원</p>
                </div>
            </div>
        </div>
    )
}