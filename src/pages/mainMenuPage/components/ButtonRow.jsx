import "./ButtonRow.scss";

import { useNavigate } from "react-router-dom";

import { ButtonComponent } from "../../../components/ButtonComponent"
import ScreenContainer from "../../../components/ScreenContainer"

export const ButtonRow = () => {
    const navigate = useNavigate();

    const handleMoreClick = () => {
        navigate(``);
        console.log("내 밥상 추가로 이동");
    }

    const handleBookingClick = () => {
        navigate(``);
        console.log("픽업 예약으로 이동");
    }

    return (
        <ScreenContainer>
            <div className = "buttonContainer">
                <ButtonComponent 
                    width = { '6.88rem' }
                    bgColor = { '#FFFFFF' }
                    buttonText = "더 추가하기"
                    textSize = { '0.88rem' }
                    textColor = { '#B0B0B0' }
                    onClick = { handleMoreClick }
                />
                <ButtonComponent
                    width = { '11.88rem' }
                    bgColor = { '#0EA64B' }
                    buttonText = "픽업 예약하기"
                    textSize = { '0.88rem' }
                    textColor = { '#FFFFFF' }
                    onClick = { handleBookingClick }
                />
            </div>  
    </ScreenContainer>
    )
}