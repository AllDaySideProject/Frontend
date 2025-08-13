import "./FirstTip.scss";

import ScreenContainer from "../../../components/ScreenContainer"

import TIP1 from "../../../assets/tips/tip-1.svg";

export const TipHeader = () => {
    return (
        <div className = "firstContainer">
            <div className = "tipText">
                <p className = "pageTitle">AI 알뜰식사 TIP</p>
                <p className = "titleText">
                    내 자취 라이프,<br />
                    내 맘대로 즐기는 알뜰 한 끼
                </p>
            </div>
            <img src = { TIP1 } />
        </div>
    )
}