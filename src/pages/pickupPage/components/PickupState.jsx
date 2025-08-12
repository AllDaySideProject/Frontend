import "./PickupState.scss";

import ScreenContainer from "../../../components/ScreenContainer"
import { PickupStepBox } from "./PickupStepBox"

export const PickupState = ({ view, onChange }) => {
    return (
        <ScreenContainer>
            <div className = "stepTouchBox">
                <PickupStepBox 
                    stepText = "픽업경로" 
                    active = { view === "location" }
                    onClick = { () => onChange("location") }
                />
                <PickupStepBox 
                    stepText = "픽업코드" 
                    active = { view === "code" }
                    onClick = { () => onChange("code") }
                />                
            </div>
        </ScreenContainer>
    )
}