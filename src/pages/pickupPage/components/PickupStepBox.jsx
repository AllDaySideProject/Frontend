import "./PickupStepBox.scss";

import ScreenContainer from "../../../components/ScreenContainer";

export const PickupStepBox = ({ stepText }) => {
    return (
        <div className = "stepContainer">
            <p>{ stepText }</p>
        </div>
    )
}