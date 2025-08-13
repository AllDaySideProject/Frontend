import "./SecondTip.scss";

import ScreenContainer from "../../../components/ScreenContainer"

import TIP2 from "../../../assets/tips/tip-2.svg";

export const SecondTip = () => {
    return (
        <div className = "secondContainer">
            <div className = "tipText">
                <p className = "tipTitle">
                    두부조림은<br />
                    자투리 채소 활용에 좋아요
                </p>
                <p className = "tipDescription">
                    양파, 대파, 청양고추, 느타리버섯 등<br />
                    냉장고에 애매하게 남아 있는 자투리 채소들이 있다면<br />
                    두부와 함께 푸짐한 조림으로 변신시켜 보세요!
                </p>
            </div>
            <div className = "secondImgBox">
                <img src = { TIP2 } />
            </div>
        </div>
    )
}