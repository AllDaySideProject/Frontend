import "./ButtonRow.scss";

import { useNavigate } from "react-router-dom";

import { ButtonComponent } from "../../../components/ButtonComponent"
import ScreenContainer from "../../../components/ScreenContainer"

export const ButtonRow = ({ mode = "normal", selectedCount = 0, setMode, onDeleteClick }) => {
    const navigate = useNavigate();
    const isDelete = mode === "delete"; // 삭제 모드 여부
    const rightDisabled = isDelete && selectedCount === 0; // 삭제 모드 + 선택 0 = 오른쪽 버튼 비활성화

    const handleLeftClick = () => {
        if (isDelete) {
            setMode("normal"); // 삭제 취소 시 일반 모드로
            console.log("일반 모드");
        } else {
            navigate(``);
            console.log("내 밥상 추가로 이동");            
        }
    }

    const handleRightClick = () => {
        if (isDelete) {
            if (selectedCount === 0) return; // 메뉴 선택되지 않았을 경우
            onDeleteClick?.();
            console.log("선택한 메뉴 삭제")
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
                    buttonText = { isDelete ? "취소" : "더 추가하기" } // 모드에 따른 문구 변경
                    textSize = { '0.88rem' }
                    textColor = { '#B0B0B0' }
                    onClick = { handleLeftClick }
                />
                <ButtonComponent
                    width = { '11.88rem' }
                    bgColor = { '#0EA64B' }
                    buttonText = { isDelete ? "삭제하기" : "픽업 예약하기" } // 모드에 따른 문구 변경
                    textSize = { '0.88rem' }
                    textColor = { '#FFFFFF' }
                    onClick = { handleRightClick }
                    disabled = { rightDisabled } // 선택하지 않으면 비활성화
                />
            </div>  
    </ScreenContainer>
    )
}