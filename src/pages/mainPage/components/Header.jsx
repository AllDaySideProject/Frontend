import "./Header.scss";

import LOGO from "../../../assets/logo.svg";
import LOCATION from "../../../assets/main/location.svg";

import ScreenContainer from "../../../components/ScreenContainer";

export const Header = () => {
    return (
        <ScreenContainer>
            <div className = "HeaderContainer">
                <div className = "HeaderLeft">
                    <img src = { LOGO } alt = "잔반 플러팅 로고" />
                    <p className = "logoName">잔반플러팅</p>
                </div>
                <div className = "HeaderRight">
                    <img src = { LOCATION } alt = "위치 정보 활용 동의" />
                </div>                
            </div>
        </ScreenContainer>
    )
}