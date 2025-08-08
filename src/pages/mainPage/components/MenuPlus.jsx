import "./MenuPlus.scss";
import ScreenContainer from "../../../components/ScreenContainer";

import MENUPLUS from "../../../assets/main/menuPlus.svg";
import PLUS from "../../../assets/main/plus.svg";

import { useNavigate } from "react-router-dom";

export const MenuPlus = () => {
    const navigate = useNavigate();

    const handlePlusClick = () => {
        navigate(``); // 내 밥상 추가 화면으로 이동
    }

    return (
        <ScreenContainer>
            <div className = "menuPlusContainer">
                <div className = "description">
                    <p className = "titleText">오늘은 어떤 반찬으로 밥상을 채워 볼까요?</p>
                    <p className = "subTitleText">내 주변 매물을 똑똑하게 연결해 드려요.</p>
                </div>
                <div className = "imageContainer">
                    <img src = { MENUPLUS } alt = "내 밥상 추가 아이콘" />
                </div>
                <div 
                    className = "plusButton"
                    onClick = { handlePlusClick }
                >
                    <img src = { PLUS } alt = "내 밥상 추가 버튼" />
                    <p className = "buttonText">내 밥상 추가하기</p>
                </div>
            </div>            
        </ScreenContainer>
    )
}