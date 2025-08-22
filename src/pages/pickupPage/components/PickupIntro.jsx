import "./PickupIntro.scss";

import ScreenContainer from "../../../components/ScreenContainer";

import STEP_GY from "../../../assets/pickup/step-grey.svg";
import STEP_GN from "../../../assets/pickup/step-green.svg";

import CHECK from "../../../assets/pickup/check.svg";
import PICKUP from "../../../assets/pickup/pickup.svg";

export const PickupIntro = ({ phase }) => {
    const stepIcon = phase === "step" ? STEP_GN : STEP_GY; // 단계 아이콘 선태
    
    return (
        <ScreenContainer>
            <div className = "pickupIntroContainer">
                <div className = "introText">
                    <p className = "titleText">픽업 예약을 완료했어요</p>
                    <p className = "subtitleText">예약 시간에 맞춰 픽업해 주세요.</p>
                </div>
                <div className = "pickupStep">
                    <div className = { `stepBox ${phase === "check" ? "active" : ""}` }>
                        <div className = "stateBox">
                            <img src = { CHECK } />
                        </div>
                        <p>예약</p>
                    </div>
                    <img 
                        src = { stepIcon } 
                        className = { phase === "step" ? "active" : "" }
                    />
                    <div className = { `stepBox ${phase === "pickup" ? "active" : ""}` }>
                        <div className = "stateBox">
                            <img src = { PICKUP } />
                        </div>
                        <p>픽업</p>
                    </div>
                </div>
            </div>
        </ScreenContainer>
    )
}