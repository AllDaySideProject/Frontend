import "./PickupState.scss";

import ScreenContainer from "../../../components/ScreenContainer"
import { PickupStepBox } from "./PickupStepBox"

export const PickupState = () => {
    return (
        <ScreenContainer>
            <div className = "stepTouchBox">
                <PickupStepBox stepText = "픽업경로" />
                <PickupStepBox stepText = "픽업코드" />                
            </div>
        </ScreenContainer>
    )
}