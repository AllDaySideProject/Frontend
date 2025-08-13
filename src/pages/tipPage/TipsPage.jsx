import { TipHeader } from "./components/TipHeader";

import { useState } from "react";
import { TipComponent } from "./components/TipComponent";
import { ButtonComponent } from "../../components/ButtonComponent"
import { useNavigate } from "react-router-dom";

import TIP2 from "../../assets/tips/tip-2.svg";
import TIP3 from "../../assets/tips/tip-3.svg";
import TIP4 from "../../assets/tips/tip-4.svg";

export const TipsPage = () => {
    const navigate = useNavigate();

    const [tipsData, setTipsData] = useState([
        {
            title: "두부조림은\n자투리 채소 활용에 좋아요",
            description: "양파, 대파, 청양고추, 느타리버섯 등\n냉장고에 애매하게 남아있는 자투리 채소들이 있다면\n두부와 함께 푸짐한 조림으로 변신시켜 보세요!",
            image: TIP2,
            imgPadding: "0 0.81rem",
            gap: "0.12rem"
        },
        {
            title: "버섯볶음,\n든든한 한 그릇 덮밥으로!",
            description: "따뜻한 밥 위에 남은 버섯볶음 듬뿍 얹어 주세요.\n참기름 살짝 두르고, 김가루나 깨를 솔솔 뿌리면\n근사한 버섯덮밥이 뚝딱 완성돼요 !",
            image: TIP3,
            bgColor: "#EDEDF8",
            imgPadding: "0 2.38rem 1.63rem 2.38rem",
            gap: "1.25rem"
        },
        {
            title: "남은 콩나물 무침,\n최고의 비빔밥 재료로 변신!",
            description: "남은 콩나물 무침은\n밥, 계란 프라이, 고추장과 함께\n비벼먹으면 최고의 비빔밥이 돼요 !",
            image: TIP4,
            imgPadding: "0 2.38rem 2.12rem 2.38rem",
            gap: "0.75rem"
        }]);

    return (
        <>
            <TipHeader />
            { tipsData.map((tip, index) => (
                <TipComponent key = { index } { ...tip } />
            ))}
            
            <ButtonComponent 
                width = "20.38rem"
                bgColor = { '#0EA64B' }
                bdColor = { '#0EA64B' }
                textColor = { '#F1F1F1' }
                buttonText = "메인으로"
                className = "fixedBtn"
                onClick = { () => navigate("/") }
            />
        </>
    )
}