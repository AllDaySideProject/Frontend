import "./MainPage.scss";

import { useEffect } from "react";
import { useLocationPermission } from "../../components/LocationPermissionContext"
import { Header } from "./components/Header"
import { MenuPlus } from "./components/MenuPlus"

import BGIMG from "../../assets/main/bgImage.svg";

export const MainPage = () => {
    const { decided, requestLocation} = useLocationPermission();

    useEffect(() => { // 최초 접속 또는 사용자가 결정하지 않았을 때 권한 요청
        if (!decided) requestLocation();
    }, [decided, requestLocation]);

    return (
        <>
            <Header />
            <div 
                className = "mainBg"
                style = {{ 
                    backgroundImage: `url(${ BGIMG })`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    minHeight: "100vh",
                }}
            >
                <MenuPlus />
            </div>
        </>
    )
}