import "./PickupState.scss";

import ScreenContainer from "../../../components/ScreenContainer"
import { PickupStepBox } from "./PickupStepBox"

export const PickupState = ({ phase, onChange }) => {
    return (
        <ScreenContainer>
            <div className = "stepTouchBox">
                <PickupStepBox 
                    stepText = "픽업경로" 
                    active = { phase === "check" }
                    onClick = { () => onChange("check") }
                />
                <PickupStepBox 
                    stepText = "픽업코드" 
                    active = { phase === "pickup" }
                    onClick = { () => onChange("pickup") }
                />                
            </div>
        </ScreenContainer>
    )
}