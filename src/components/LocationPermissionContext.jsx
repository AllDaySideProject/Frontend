import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useKakaoLoader } from "react-kakao-maps-sdk";

const LocationPermissionCtx = createContext(null); // 전역 상태

export const LocationPermissionProvider = ({ children }) => {
    useKakaoLoader({
        appkey: process.env.REACT_APP_KAKAO_JS_KEY,
        libraries: ["services"],
    });
  
    const [agreed, setAgreed] = useState(() => localStorage.getItem("localAgreed") === "true"); // 허용 여부
    const [decided, setDecided] = useState(() => localStorage.getItem("localDecided") === "true"); // 결정 여부
    const [address, setAddress] = useState(() => localStorage.getItem("localAddress") || ""); // 한글 주소 문자열

    // 새로고침 시에도 유지
    useEffect(() => localStorage.setItem("localAgreed", String(agreed)), [agreed]);
    useEffect(() => localStorage.setItem("localDecided", String(decided)), [decided]);
    useEffect(() => localStorage.setItem("localAddress", address || ""), [address]);

    const fetchAddressKakao = (lat, lng) => {
        return new Promise((resolve, reject) => {
            if (!window.kakao || !window.kakao.maps) {
                console.warn("카카오 SDK 로드 안 됨");
                resolve("");
                return;
            }

            const geocoder = new window.kakao.maps.services.Geocoder();
            geocoder.coord2Address(lng, lat, (result, status) => {
                if (status === window.kakao.maps.services.Status.OK) {
                    const fullAddress =
                        result[0].road_address?.address_name ||
                        result[0].address?.address_name ||
                        "";

                    if (!fullAddress) {
                            resolve("");
                            return;
                    }

                    const parts = fullAddress.split(" ");
                    resolve(parts.length >= 2 ? `${parts[0]} ${parts[1]}` : fullAddress);
                } else {
                    reject("주소 변환 실패");
                }
            });
        });
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