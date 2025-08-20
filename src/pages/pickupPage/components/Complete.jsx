import "./Complete.scss";

import ScreenContainer from "../../../components/ScreenContainer";

import PICKUP from "../../../assets/pickup/pickupComplete.png";
import TIME from "../../../assets/pickup/second.svg";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import TIP2 from "../../../assets/tips/tip-2.png";
import TIP3 from "../../../assets/tips/tip-3.png";
import TIP4 from "../../../assets/tips/tip-4.png";
import SCROLL from "../../../assets/tips/tipScroll.png";

export const Complete = () => {
    const [sec, setSec] = useState(2);
    const navigate = useNavigate();

    useEffect(() => {
        [TIP2, TIP3, TIP4, SCROLL].forEach((src) => {
            const img = new Image();
            img.src = src;
        });
    }, []);

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
                <img 
                    style = {{ height: '12.5rem' }}
                    src = { PICKUP } 
                />
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