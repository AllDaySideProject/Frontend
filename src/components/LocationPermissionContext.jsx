import { createContext, useCallback, useContext, useEffect, useState } from "react";

const LocationPermissionCtx = createContext(null); // 전역 상태

export const LocationPermissionProvider = ({ children }) => {
    const [agreed, setAgreed] = useState(() => localStorage.getItem("localAgreed") === "true"); // 허용 여부
    const [decided, setDecided] = useState(() => localStorage.getItem("localDecided") === "true"); // 결정 여부
    const [address, setAddress] = useState(() => localStorage.getItem("localAddress") || ""); // 한글 주소 문자열

    // 새로고침 시에도 유지
    useEffect(() => localStorage.setItem("localAgreed", String(agreed)), [agreed]);
    useEffect(() => localStorage.setItem("localDecided", String(decided)), [decided]);
    useEffect(() => localStorage.setItem("localAddress", address || ""), [address]);

    const fetchAddressKakao = async (lat, lng) => {
        const REST_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
        if (!REST_KEY) {
            console.warn("REST API KEY 누락");
            return "";
        }

        const url = `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${lng}&y=${lat}`;
        try {
            const res = await fetch(url, {
                headers: { Authorization: `KakaoAK ${REST_KEY}` }
            });

            if (!res.ok) {
                return "";
            }

            const json = await res.json();
            const d = json.documents?.[0];
            const fullAddress =
                d?.address?.address_name ||
                d?.road_address?.address_name || "";

            if (!fullAddress) return "";

            const parts = fullAddress.split(" ");
            return parts.length >= 2
                ? `${parts[0]} ${parts[1]}`
                : fullAddress;
        } catch (err) {
            console.log("예외 에러: ", err);
            return "";
        }
    };


    const requestLocation = useCallback(() => { // 위치 권한 요청
        if (!("geolocation" in navigator)) {
            setAgreed(false);
            setDecided(true);
            setAddress("");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (pos) => { // 성공: 허용
                setAgreed(true); 
                setDecided(true); 

                console.log("위치 정보 동의 상태: 허용");

                const latitude = 37.468355;
                const longitude = 127.039073;

                // const { latitude, longitude } = pos.coords;
                const addr = await fetchAddressKakao(latitude, longitude);

                setAddress(addr || "");
            }, 
            () => { // 거부 또는 오류
                setAgreed(false); 
                setDecided(true);
                setAddress("");

                console.log("위치 정보 동의 상태: 거부");
            },
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
        );
    }, [fetchAddressKakao]);

    useEffect(() => {
        if (!decided) requestLocation();
    }, [decided, requestLocation]);

    return (
        <LocationPermissionCtx.Provider value = {{ agreed, decided, address, requestLocation }}>
            { children }
        </LocationPermissionCtx.Provider>
    );
};

export const useLocationPermission = () => {
    const ctx = useContext(LocationPermissionCtx);
    if (!ctx) throw new Error("프로바이더 누락");
    return ctx;
}