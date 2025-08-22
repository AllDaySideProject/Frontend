import "./TipsPage.scss";

import { TipHeader } from "./components/TipHeader";

import { useEffect, useState } from "react";
import { TipComponent } from "./components/TipComponent";
import { ButtonComponent } from "../../components/ButtonComponent"
import { useLocation, useNavigate } from "react-router-dom";

import TIP2 from "../../assets/tips/tip-2.png";
import TIP3 from "../../assets/tips/tip-3.png";
import TIP4 from "../../assets/tips/tip-4.png";
import SCROLL from "../../assets/tips/tipScroll.png";
import axios from "axios";
import { pickupTipPostApi } from "../../api/pickup/pickupTipPostApi";

export const TipsPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const preloadedTips = location.state?.tips || [];

    const images = [TIP2, TIP3, TIP4];
    const tipsData = preloadedTips.map((item, idx) => ({
        title: item.title,
        description: item.content,
        image: images[idx % images.length]
    }));

    return (
        <>
            <TipHeader />
            { tipsData.map((tip, index) => (
                <TipComponent key = { index } { ...tip } />
            ))}

            <img 
                src = { SCROLL } 
                alt = "알뜰 식사 팁 스크롤" 
                className = "fixedArrowOverlay" 
            />
            <ButtonComponent 
                width = "20.38rem"
                bgColor = { '#0EA64B' }
                bdColor = { '#0EA64B' }
                textColor = { '#F1F1F1' }
                buttonText = "메인으로"
                textSize = { '1.125rem' }
                textWeight = '700'
                className = "fixedBtn"
                onClick = { () => navigate("/") }
            />
        </>
    )
}