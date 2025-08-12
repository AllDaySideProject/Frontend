import "./PickupIntro.scss";

import ScreenContainer from "../../../components/ScreenContainer";

import CHECK_GN from "../../../assets/pickup/check-green.svg";
import CHECK_GY from "../../../assets/pickup/check-grey.svg";
import STEP from "../../../assets/pickup/step.svg";
import PICKUP_GN from "../../../assets/pickup/pickup-green.svg";
import PICKUP_GY from "../../../assets/pickup/pickup-grey.svg";

export const PickupIntro = () => {
    return (
        <ScreenContainer>
            <div className = "pickupIntroContainer">
                <div className = "introText">
                    <p className = "titleText">픽업 예약을 완료했어요</p>
                    <p className = "subtitleText">예약 시간에 맞춰 픽업해 주세요.</p>
                </div>
                <div className = "pickupStep">
                    <div className = "stepBox">
                        <img src = { CHECK_GN } />
                        <p>예약</p>
                    </div>
                    <img src = { STEP } />
                    <div className = "stepBox">
                        <img src = { PICKUP_GY } />
                        <p>픽업</p>
                    </div>
                </div>
            </div>
        </ScreenContainer>
    )
}