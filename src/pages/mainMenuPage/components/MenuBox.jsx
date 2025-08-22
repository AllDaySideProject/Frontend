import "./MenuBox.scss";

import CHECKBOX from "../../../assets/main/checkBox.png";
import CHECKEDBOX from "../../../assets/main/checkedBox.png";
import { categoryIcons } from "../../../assets/icons/categoryIcons";

export const MenuBox = ({ mode = "normal", isSelected = false, onToggleSelect, menu }) => {
    const { name, storeName, costPrice, salePrice, category, count, salePercent  } = menu; // 메뉴 데이터 구조 분해

    const fmt = (n) => Number(n).toLocaleString("ko-KR");

    const isDelete = mode === "delete"; // 삭제 모드 여부

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
                            <p className = "storeName">{ storeName }</p> {/* 가게 이름 */}
                            <p className = "menuBoxName">{ name }</p> {/* 메뉴 이름 */}
                            <p className = "menuCount">수량: { count }개</p> {/* 수량 */}
                        </div>
                    </div>
                </div>
                <div className = "menuBoxRight">
                    <div className = "originText">
                        <p className = "originalPrice">{ fmt(costPrice * count) }</p> {/* 메뉴 원가 */}
                        <p className = "originWon">원</p>                    
                    </div>
                    <div className = "finalInfo">
                        <p className = "discountRate">{ salePercent }%</p> {/* 메뉴 할인율 */}
                        <p className = "finalPrice">{ fmt(salePrice * count) }원</p> {/* 메뉴 할인가 */}             
                    </div>
                </div>
            </div>   

            { isDelete && ( // 삭제 모드일 때만 체크 박스 표시
                <img 
                    className = "mainCheckImg"
                    src = { isSelected ? CHECKEDBOX : CHECKBOX } // 선택 여부에 따라 이미지 변경
                    onClick = { () => onToggleSelect?.() } // 클릭 시 토글
                />
            )}         
        </div>
    )
}