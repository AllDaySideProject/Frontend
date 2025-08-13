import "./TipHeader.scss";

import ScreenContainer from "../../../components/ScreenContainer"

import TIP1 from "../../../assets/tips/tip-1.svg";

export const TipHeader = ({ bgColor = "#EDF8F8" }) => {
    return (
        <ScreenContainer bgColor = { bgColor }>
            <div className = "tipHeaderContainer">
                <div className = "tipText">
                    <p className = "pageTitle">AI 알뜰식사 TIP</p>
                    <p className = "titleText">
                        내 자취 라이프,<br />
                        내 맘대로 즐기는 알뜰 한 끼
                    </p>
                </div>
                <img src = { TIP1 } />
            </div>            
        </ScreenContainer>

    )
}