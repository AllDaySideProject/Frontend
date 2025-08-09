import "./Modal.scss";
import { ButtonComponent } from "./components/ButtonComponent";

export const DeleteModal = ({ modalText, leftButtonText, rightButtonText }) => {
    return (
        <div className = "modalContainer">
            <p className = "modalText">{ modalText }</p>
            <div className = "buttonContainer">
                <ButtonComponent 
                    width = { '8.125rem' }
                    bgColor = { '#FAFAFA' }
                    buttonText = { leftButtonText }
                    textSize = { '1rem' }
                    textColor = { '#000000' }
                />
                <ButtonComponent 
                    width = { '8.125rem' }
                    bgColor = { '#8FB88B' }
                    buttonText = { rightButtonText }
                    textSize = { '1rem' }
                    textColor = { '#FFFFFF' }
                />
            </div>
        </div>
    )
}