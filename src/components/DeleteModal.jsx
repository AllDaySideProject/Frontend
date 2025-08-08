import "./DeleteModal.scss";
import { ButtonComponent } from "./ButtonComponent";

export const DeleteModal = () => {
    return (
        <div className = "modalContainer">
            <p className = "modalText">선택하신 메뉴를 삭제하겠습니까?</p>
            <div className = "buttonContainer">
                <ButtonComponent 
                    width = { '8.125rem' }
                    bgColor = { '#FAFAFA' }
                    buttonText = "취소"
                    textSize = { '1rem' }
                    textColor = { '#000000' }
                />
                <ButtonComponent 
                    width = { '8.125rem' }
                    bgColor = { '#8FB88B' }
                    buttonText = "삭제하기"
                    textSize = { '1rem' }
                    textColor = { '#FFFFFF' }
                />
            </div>
        </div>
    )
}