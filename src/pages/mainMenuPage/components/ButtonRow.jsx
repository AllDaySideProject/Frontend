import "./ButtonRow.scss";

import { useNavigate } from "react-router-dom";

import { ButtonComponent } from "../../../components/ButtonComponent"
import ScreenContainer from "../../../components/ScreenContainer"

export const ButtonRow = ({ mode = "normal", selectedCount = 0, setMode }) => {
    const navigate = useNavigate();
    const isDelete = mode === "delete";
    const rightDisabled = isDelete && selectedCount === 0;

    const handleLeftClick = () => {
        if (isDelete) {
            setMode("normal");
            console.log("일반 모드");
        } else {
            navigate(``);
            console.log("내 밥상 추가로 이동");            
        }
    }

    const handleRightClick = () => {
        if (isDelete) {
            if (selectedCount === 0) return; // 메뉴 선택되지 않았을 경우
            console.log("선택 항목 삭제")
            setMode("normal");
        } else {
            navigate(``);
            console.log("픽업 예약으로 이동"); 
        }
    }

    return (
        <ScreenContainer>
            <div className = "buttonContainer">
                <ButtonComponent 
                    width = { '6.88rem' }
                    bgColor = { '#FFFFFF' }
                    buttonText = { isDelete ? "취소" : "더 추가하기" }
                    textSize = { '0.88rem' }
                    textColor = { '#B0B0B0' }
                    onClick = { handleLeftClick }
                />
                <ButtonComponent
                    width = { '11.88rem' }
                    bgColor = { '#0EA64B' }
                    buttonText = { isDelete ? "삭제하기" : "픽업 예약하기" }
                    textSize = { '0.88rem' }
                    textColor = { '#FFFFFF' }
                    onClick = { handleRightClick }
                    disabled = { rightDisabled }   
                />
            </div>  
    </ScreenContainer>
    )
}