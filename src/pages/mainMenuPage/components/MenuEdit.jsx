import "./MenuEdit.scss";

import ScreenContainer from "../../../components/ScreenContainer";
import { MenuBox } from "./MenuBox";
import { PriceText } from "./PriceText";
import usePricing from "../../../hooks/usePricing";
import { useMenu } from "../../../components/MenuContext";

export const MenuEdit = ({ mode, setMode, selectedIds, toggleSelect }) => {
    const { menus } = useMenu(); // 전역 상태에서 메뉴 목록 가져오기
    
    const isDelete = mode === "delete"; // 삭제 모드 여부

    const { subtotal, discount, total, fmt } = usePricing(menus, 9000);
    
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
                        { menus.map((m, idx) => (
                            <MenuBox
                                key = { m.id }
                                mode = { mode }
                                menuName = { m.name }
                                storeName = { m.store }
                                count = { m.count }
                                price = { m.price }
                                originalPrice = { m.originalPrice }
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
                                { subtotal > 0 ? Math.round((discount / subtotal) * 100) : 0 }%
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