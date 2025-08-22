import "./Code.scss";

import { ButtonComponent } from "../../../components/ButtonComponent";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Modal } from "../../../components/Modal";
import { pickupCodePutApi } from "../../../api/pickup/pickupCodePutApi";
import { useMenu } from "../../../components/MenuContext";

export const Code = () => {
    const navigate = useNavigate();

    // 전달받은 상태
    const location = useLocation();
    const reserveRes = location.state;
    const pickupCode = reserveRes?.code; 

    const [pressed, setPressed] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { clearMenus } = useMenu(); // 전역 상태 메뉴 비우기 함수

    const handleEndClick = () => { // 픽업 완료 버튼 클릭
        setPressed(prev => !prev);
        setIsModalOpen(true); // 완료 버튼 누를 때 모달 열기
    }

    const onEndBtnClick = async () => { // 모달 확인 버튼 클릭
        try {
            await pickupCodePutApi(pickupCode); // 서버에 픽업 완료 전달
            setIsModalOpen(false);
            clearMenus(); 
            console.log("픽업 완료 성공 후 화면 이동");            
            navigate(`/pickup/complete`);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className = "codeWrapper">
            <div className = "codeContainer">
                <p className = "codeText">{ pickupCode }</p>
                <p className = "description">
                    매장에 방문 후 계산대(카운터) 또는 지정된 픽업 장소에서<br />
                    직원의 안내에 따라 위의 픽업 코드를 보여 주시면<br />
                    신속하게 상품을 받아가실 수 있습니다.
                </p>
            </div>
            <ButtonComponent 
                className = "btnBox"
                buttonText = "픽업 완료"
                width = { "20.375rem" }
                bgColor = { pressed ? '#0EA64B' : '#FAFAFA' }
                bdColor = { '#0EA64B' }
                textColor = { pressed ? '#FAFAFA' : '#0EA64B' }
                onClick = { handleEndClick }
            />

            { isModalOpen && (
                <div className = "modalOverLay">
                    <Modal 
                        modalText = "픽업을 완료하셨나요?"
                        leftButtonText = "취소"
                        onLeftClick = { () => setIsModalOpen(false) }
                        rightButtonText = "확인"
                        onRightClick = { onEndBtnClick }
                    />
                </div>
            )}

        </div>
    )
}