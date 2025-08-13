import "./FourthTip.scss";

import ScreenContainer from "../../../components/ScreenContainer"

import TIP4 from "../../../assets/tips/tip-4.svg";

export const FourthTip = () => {
    return (
        <div className = "fourthContainer">
            <div className = "tipText">
                <p className = "tipTitle">
                    남은 콩나물 무침,<br />
                    최고의 비빔밥 재료로 변신 !
                </p>
                <p className = "tipDescription">
                    남은 콩나물 무침은<br />
                    따뜻한 밥, 계란 프라이, 고추장, 참기름과 함께<br />
                    비벼 먹으면 최고의 비빔밥이 돼요!
                </p>
            </div>
            <div className = "fourthImgBox">
                <img src = { TIP4 } />
            </div>
        </div>
    )
}