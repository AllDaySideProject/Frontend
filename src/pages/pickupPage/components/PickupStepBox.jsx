import "./PickupStepBox.scss";

export const PickupStepBox = ({ stepText, active, onClick }) => {
    return (
        <div 
            className = { `stepContainer ${ active ? "active" : "" }` }
            onClick = { onClick }
        >
            <p>{ stepText }</p>
        </div>
    )
}