import "./MainPage.scss";

import { useEffect } from "react";
import { useLocationPermission } from "../../components/LocationPermissionContext"
import { Header } from "./components/Header"
import { MenuPlus } from "./components/MenuPlus"

export const MainPage = () => {
    const { decided, requestLocation } = useLocationPermission(); // 위치 권한 상태 및 요청 함수 가져오기

    useEffect(() => {
        if (!decided) requestLocation();
    }, [decided, requestLocation]);

    return (
        <>
            <Header />
            <div className = "mainBg">
                <div className = "mainBgInner">
                    <MenuPlus />
                </div>
            </div>
        </>
    );
};
