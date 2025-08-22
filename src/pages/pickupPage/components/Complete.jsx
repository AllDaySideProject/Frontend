import "./Complete.scss";

import ScreenContainer from "../../../components/ScreenContainer";

import PICKUP from "../../../assets/pickup/pickupComplete.png";
import TIME from "../../../assets/pickup/second.svg";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import TIP2 from "../../../assets/tips/tip-2.png";
import TIP3 from "../../../assets/tips/tip-3.png";
import TIP4 from "../../../assets/tips/tip-4.png";
import SCROLL from "../../../assets/tips/tipScroll.png";
import { pickupTipPostApi } from "../../../api/pickup/pickupTipPostApi";

export const Complete = () => {
    const [sec, setSec] = useState(3);
    const navigate = useNavigate();
    const location = useLocation(); // 픽업 페이지에서 상태로 전달된 데이터
    const menus = location.state?.menus || []; // 넘겨받은 메뉴 배열 꺼냄

    const [tips, setTips] = useState([]);

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
        const preloadTips = async () => {
        try {
            const data = await pickupTipPostApi(menus);
            setTips(data);
        } catch (error) {
            console.error("불러오기 실패:", error);
        }
        };
        if (menus.length > 0) preloadTips();
    }, [menus]);

    useEffect(() => {
        if (sec <= 0 && tips.length > 0) navigate(`/tips`, { state: { menus, tips }});
    }, [sec, menus, tips, navigate]);

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