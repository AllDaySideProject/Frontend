import "./Complete.scss";

import ScreenContainer from "../../../components/ScreenContainer";

import PICKUP from "../../../assets/pickup/pickupComplete.svg";
import TIME from "../../../assets/pickup/second.svg";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Complete = () => {
    const [sec, setSec] = useState(2);
    const navigate = useNavigate();

    useEffect(() => {
        const t = setInterval(() => setSec(s => s - 1), 1000);
        return () => clearInterval(t);
    }, []);

    useEffect(() => {
        if (sec <= 0) navigate(`/tips`);
    })

    return (
        <ScreenContainer>
            <div className = "completeContainer">
                <img src = { PICKUP } />
                <div className = "completeContent">
                    <div className = "completeText">
                        <p className = "puTitle">픽업 완료!</p>
                        <p className = "puDescription">
                            픽업하실 메뉴를 더 알차게 즐길 수 있는<br />
                            알뜰식사TIP이 기다리고 있어요
                        </p>
                    </div>
                    <div className = "leftTime">
                        <img src = { TIME } />
                        <p>{ sec }초 뒤 이동</p>
                    </div>
                </div>
            </div>
        </ScreenContainer>
    )
}