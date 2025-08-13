import "./ThirdTip.scss";

import ScreenContainer from "../../../components/ScreenContainer"

import TIP3 from "../../../assets/tips/tip-3.svg";

export const ThirdTip = () => {
    return (
        <div className = "thirdContainer">
            <div className = "tipText">
                <p className = "tipTitle">
                    버섯볶음,<br />
                    든든한 한 그릇 덮밥으로!
                </p>
                <p className = "tipDescription">
                    따뜻한 밥 위에 남은 버섯볶음 듬뿍 얹어 주세요.<br />
                    참기름 살짝 두르고, 김가루나 깨를 솔솔 뿌리면<br />
                    근사한 버섯덮밥이 뚝딱 완성돼요!
                </p>
            </div>
            <div className = "thirdImgBox">
                <img src = { TIP3 } />
            </div>
        </div>
    )
}