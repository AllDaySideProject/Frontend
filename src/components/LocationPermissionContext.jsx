import { createContext, useCallback, useContext, useEffect, useState } from "react";

const LocationPermissionCtx = createContext(null); // 전역 상태

export const LocationPermissionProvider = ({ children }) => {
    const [agreed, setAgreed] = useState(() => localStorage.getItem("localAgreed") === "true"); // 허용 여부
    const [decided, setDecided] = useState(() => localStorage.getItem("localDecided") === "true"); // 결정 여부

    // 새로고침 시에도 유지
    useEffect(() => localStorage.setItem("localAgreed", String(agreed)), [agreed]);
    useEffect(() => localStorage.setItem("localDecided", String(decided)), [decided]);

    const requestLocation = useCallback(() => {
        if (!("geolocation" in navigator)) {
            setAgreed(false);
            setDecided(true);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            () => { setAgreed(true); setDecided(true); }, // 성공: 허용
            () => { setAgreed(false); setDecided(true); }, // 실패: 거부, 오류, 타임아웃
            { enableHighAccuracy: false, timeout: 8000 }
        );
    }, []);

    return (
        <LocationPermissionCtx.Provider value = {{ agreed, decided, requestLocation }}>
            { children }
        </LocationPermissionCtx.Provider>
    );
};

export const useLocationPermission = () => useContext(LocationPermissionCtx);