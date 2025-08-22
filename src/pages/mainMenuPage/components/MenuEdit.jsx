import "./MenuEdit.scss";

import ScreenContainer from "../../../components/ScreenContainer";
import { MenuBox } from "./MenuBox";
import { PriceText } from "./PriceText";
import { useMenu } from "../../../components/MenuContext";

export const MenuEdit = ({ mode, setMode, selectedIds, toggleSelect, menuIds }) => {
    const { menus } = useMenu(); // 전역 상태에서 메뉴 목록 가져오기
    
    const isDelete = mode === "delete"; // 삭제 모드 여부

    // 가격 계산
    const originalTotal = menus.reduce((sum, m) => sum + (m.costPrice) * (m.count), 0);
    const discount = menus.reduce((sum, m) => sum + ((m.costPrice) - (m.salePrice)) * (m.count), 0);
    const saleTotal = menus.reduce((sum, m) => sum + (m.salePrice) * (m.count), 0);

    const fmt = (n) => Number(n).toLocaleString("ko-KR");

    const handleDeleteClick = () => { // 삭제 모드 진입 버튼 핸들러
        setMode("delete");
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
                        { menus.map(menu  => (
                            <MenuBox
                                key = { menu.menuId }
                                mode = { mode } // 모드 전달
                                menu = { menu }
                                isSelected = { selectedIds.has(menu.menuId) } // 선택 여부
                                onToggleSelect = { () => toggleSelect(menu.menuId) } // 클릭 시 토글
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
                            price = { fmt(originalTotal) }
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
                                { originalTotal > 0 ? Math.round((discount / originalTotal) * 100) : 0 }%
                            </p>
                            <p>{ fmt(saleTotal) }원</p>
                        </div>
                    </div>                
                </>
                )}
            </div>
        </ScreenContainer>                
    )
}