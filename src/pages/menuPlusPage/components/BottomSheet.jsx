import "./BottomSheet.scss";

import ScreenContainer from "../../../components/ScreenContainer"
import { SheetBox } from "./SheetBox"

export const BottomSheet = () => {
    return (
        <ScreenContainer>
            <div className = "bottomSheet">
                <div className = "bottomSheetHeader">
                    <div className = "grabber">
                        {/* 그랩 바 */}
                    </div>
                </div>
                <div className = "sheetStoreInfo">
                   <p className = "sheetStoreName">유진이네 밥상</p> 
                   <p className = "sheetStoreType">한식 전문점</p>
                </div>
                <SheetBox />
            </div>
        </ScreenContainer>
    )
}