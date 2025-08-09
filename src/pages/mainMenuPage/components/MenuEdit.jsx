import "./MenuEdit.scss";

import ScreenContainer from "../../../components/ScreenContainer";
import { ButtonComponent } from "../../../components/ButtonComponent";
import { MenuBox } from "./MenuBox";
import { PriceText } from "./PriceText";

export const MenuEdit = ({ mode, setMode, items, selectedIds, toggleSelect }) => {
    const isDelete = mode === "delete"; // 삭제 모드 여부
    
    const handleDeleteClick = () => {
        setMode("delete"); // 삭제하기 버튼 클릭 시 delete 모드로 변경
        console.log("삭제 모드로 변경");
    }

    return (
        <ScreenContainer>
            <div className = "menuEditContainer">
                <p className = "mainTitle">
                    오늘은 어떤 메뉴로{ "\n" }밥상을 채워 볼까요?
                </p>
                <div className = "menuContainer">
                    <p 
                        className = "deleteText"
                        onClick = { handleDeleteClick } // 삭제 모드 진입
                    >
                        삭제하기
                    </p>    
                    <div className = "menuBoxList">
                        { items.map(m => (
                            <MenuBox
                            mode = { mode }
                            menuName = { m.name }
                            storeName = { m.store }
                            count = { m.count }
                            price = { m.price }
                            isSelected = { selectedIds.has(m.id) }
                            onToggleSelect = { () => toggleSelect(m.id) }
                            />
                        ))}
                    </div>
                </div>
                {!isDelete && (
                <>
                    <div className = "detailPrice">
                        <PriceText 
                            priceTitle = "상품 금액"
                            fontColor = { '#111111' }
                            price = "30,000"
                        />
                        <PriceText
                            tone = "discount"
                            priceTitle = "할인 금액"
                            fontColor = { '#DC2626' }
                            price = "9,000"
                        />
                    </div>
                    <div className = "finalPrice">
                        <p>총 구매 금액</p>
                        <div className = "priceInfo">
                            <p className = "percentInfo">20%</p>
                            <p>21,000원</p>
                        </div>
                    </div>                
                </>
                )}
            </div>
        </ScreenContainer>                
    )
}