import "./PickupIntro.scss";

import ScreenContainer from "../../../components/ScreenContainer";

import CHECK_GN from "../../../assets/pickup/check-green.svg";
import CHECK_GY from "../../../assets/pickup/check-grey.svg";
import STEP_GY from "../../../assets/pickup/step-grey.svg";
import STEP_GN from "../../../assets/pickup/step-green.svg";
import PICKUP_GN from "../../../assets/pickup/pickup-green.svg";
import PICKUP_GY from "../../../assets/pickup/pickup-grey.svg";

export const PickupIntro = ({ phase }) => {
    const checkIcon = phase === "check" ? CHECK_GN : CHECK_GY;
    const stepIcon = phase === "step" ? STEP_GN : STEP_GY;
    const pickupIcon = phase === "pickup" ? PICKUP_GN : PICKUP_GY;
    
    return (
        <ScreenContainer>
            <div className = "pickupIntroContainer">
                <div className = "introText">
                    <p className = "titleText">픽업 예약을 완료했어요</p>
                    <p className = "subtitleText">예약 시간에 맞춰 픽업해 주세요.</p>
                </div>
                <div className = "pickupStep">
                    <div className = { `stepBox ${phase === "check" ? "active" : ""}` }>
                        <img src = { checkIcon } />
                        <p>예약</p>
                    </div>
                    <img 
                        src = { stepIcon } 
                        className = { phase === "step" ? "active" : "" }
                    />
                    <div className = { `stepBox ${phase === "pickup" ? "active" : ""}` }>
                        <img src = { pickupIcon } />
                        <p>픽업</p>
                    </div>
                </div>
            </div>
        </ScreenContainer>
    )
}