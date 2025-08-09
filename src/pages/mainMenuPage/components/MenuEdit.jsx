import "./MenuEdit.scss";

import ScreenContainer from "../../../components/ScreenContainer";
import { MenuBox } from "./MenuBox";
import { PriceText } from "./PriceText";

export const MenuEdit = ({ mode, setMode, items, selectedIds, toggleSelect }) => {
    const isDelete = mode === "delete"; // 삭제 모드 여부

    const fmt = (n) => n.toLocaleString("ko-KR"); // 숫자 12,345 형식

    const subtotal = items.reduce((sum, it) => { // 총 상품 금액
        return sum + (it.price * (it.count ?? 1)); 
    }, 0);

    const discount = 9000; // 할인 금액

    const total = Math.max(subtotal - discount, 0); // 최종 결제 금액
    
    const handleDeleteClick = () => {
        setMode("delete"); // 삭제하기 버튼 클릭 시 delete 모드로 변경
        console.log("삭제 모드로 변경");
    }

    return (
        <ScreenContainer>
            <div className = { `menuEditContainer ${ isDelete ? "deleteMode" : "" }` }>
                <p className = "mainTitle">
                    오늘은 어떤 메뉴로{ "\n" }밥상을 채워 볼까요?
                </p>
                <div className = "editContainer">
                    <p 
                        className = "deleteText"
                        onClick = { handleDeleteClick } // 삭제 모드 진입
                    >
                        삭제하기
                    </p>    
                    <div className = "menuBoxList">
                        { items.map(m => (
                            <MenuBox
                            key = { m.id }
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

                {!isDelete && ( // 삭제하기 클릭 시 표시 안 함
                <>
                    <div className = "detailPrice">
                        <PriceText 
                            priceTitle = "상품 금액"
                            fontColor = { '#111111' }
                            price = { fmt(subtotal) }
                        />
                        <PriceText
                            tone = "discount"
                            priceTitle = "할인 금액"
                            fontColor = { '#DC2626' }
                            price = { fmt(discount) }
                        />
                    </div>
                    <div className = "finalPrice">
                        <p>총 구매 금액</p>
                        <div className = "priceInfo">
                            <p className = "percentInfo">
                                {subtotal > 0 ? Math.round((discount / subtotal) * 100) : 0}%
                            </p>
                            <p>{ fmt(total) }원</p>
                        </div>
                    </div>                
                </>
                )}
            </div>
        </ScreenContainer>                
    )
}