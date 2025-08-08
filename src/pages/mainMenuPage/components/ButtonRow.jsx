import "./ButtonRow.scss";

import { ButtonComponent } from "../../../components/ButtonComponent"
import ScreenContainer from "../../../components/ScreenContainer"

export const ButtonRow = () => {
    return (
        <ScreenContainer>
            <div className = "buttonContainer">
                <ButtonComponent 
                    width = { '6.88rem' }
                    bgColor = { '#FFFFFF' }
                    buttonText = "더 추가하기"
                    textSize = { '0.88rem' }
                    textColor = { '#B0B0B0' }
                />
                <ButtonComponent
                    width = { '11.88rem' }
                    bgColor = { '#0EA64B' }
                    buttonText = "픽업 예약하기"
                    textSize = { '0.88rem' }
                    textColor = { '#FFFFFF' }
                />
            </div>  
    </ScreenContainer>
    )
}