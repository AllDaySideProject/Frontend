import "./DeleteModal.scss";
import { ModalButton } from "./ModalButton";

export const DeleteModal = () => {
    return (
        <div className = "modalContainer">
            <p className = "modalText">선택하신 메뉴를 삭제하겠습니까?</p>
            <div className = "buttonContainer">
                <ModalButton 
                    bgColor = { '#FAFAFA' }
                    buttonText = "취소"
                    textColor = { '#000000' }
                />
                <ModalButton 
                    bgColor = { '#8FB88B' }
                    buttonText = "삭제하기"
                    textColor = { '#FFFFFF' }
                />
            </div>
        </div>
    )
}