import "./Code.scss";

import ScreenContainer from "../../../components/ScreenContainer"
import { ButtonComponent } from "../../../components/ButtonComponent";

export const Code = () => {
    return (
        <ScreenContainer>
            <div className = "codeContainer">
                <p className = "codeText">JF0527</p>
                <p className = "description">
                    매장에 방문 후 계산대(카운터) 또는 지정된 픽업 장소에서<br />
                    직원의 안내에 따라 위의 픽업 코드를 보여 주시면<br />
                    신속하게 상품을 받아가실 수 있습니다.
                </p>
            </div>
            <ButtonComponent 
                buttonText = "픽업 완료"
                bgColor = { '#FAFAFA' }
                bdColor = { '#0EA64B' }
                textColor = { '#0EA64B' }
            />
        </ScreenContainer>
    )
}