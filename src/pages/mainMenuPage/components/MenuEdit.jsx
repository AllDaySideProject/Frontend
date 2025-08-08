import "./MenuEdit.scss";

import ScreenContainer from "../../../components/ScreenContainer";
import { ButtonComponent } from "../../../components/ButtonComponent";
import { MenuBox } from "./MenuBox";
import { PriceText } from "./PriceText";

export const MenuEdit = () => {
    return (
        <ScreenContainer>
            <div className = "menuEditContainer">
                <p className = "mainTitle">
                    오늘은 어떤 메뉴로{ "\n" }밥상을 채워 볼까요?
                </p>
                <div className = "menuContainer">
                    <p className = "deleteText">삭제하기</p>    
                    <div className = "menuBoxList">
                        <MenuBox 
                            menuName = "진미채볶음"
                            storeName = "희망식당"
                            count = "1"
                            price = "4,500"
                        />
                    </div>
                </div>
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
            </div>
        </ScreenContainer>                
    )
}