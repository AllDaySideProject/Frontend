import { createContext, useCallback, useContext, useEffect, useState } from "react";

const LocationPermissionCtx = createContext(null); // 전역 상태

export const LocationPermissionProvider = ({ children }) => {
    const [agreed, setAgreed] = useState(() => localStorage.getItem("localAgreed") === "true"); // 허용 여부
    const [decided, setDecided] = useState(() => localStorage.getItem("localDecided") === "true"); // 결정 여부
    const [address, setAddress] = useState(() => localStorage.getItem("localAddress") || ""); // 한글 주소 문자열

    // 새로고침 시에도 유지
    useEffect(() => localStorage.setItem("localAgreed", String(agreed)), [agreed]);
    useEffect(() => localStorage.setItem("localDecided", String(decided)), [decided]);
    useEffect(() => localStorage.setItem("localAdress", address || ""), [address]);

    const fetchAddressKakao = async (lat, lng) => { // 카카오 사용 좌표 > 주소 역지오코딩
        const REST_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;

        const url = `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${lng}&y=${lat}`; // 경도: x = lng, 위도: y = lat

        const res = await fetch(url, {
            headers: { Authorization: `KakaoAK ${REST_KEY}`} // 카카오 API 인증 방식
        });

        if (!res.ok) return ""; // 호출 실패 시 빈 문자열 반환

        const json = await res.json();
        const fullAddress = json.documents?.[0]?.address?.address_name || ""; // 전체 지번 주소

        const parts = fullAddress.split(" "); // 시, 구 공백으로 분리
        return parts.length >= 2 ? `${ parts[0] } ${ parts[1] }` : fullAddress;
    }

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

                const { latitude, longitude } = pos.coords;
                const addr = await fetchAddressKakao(latitude, longitude);

                setAddress(addr || "");
            }, 
            () => { // 거부 또는 오류
                setAgreed(false); 
                setDecided(true);
                setAddress("");

                console.log("위치 정보 동의 상태: 거부");
            },
            { timeout: 8000 }
        );
    }, []);

    return (
        <LocationPermissionCtx.Provider value = {{ agreed, decided, address, requestLocation }}>
            { children }
        </LocationPermissionCtx.Provider>
    );
};

export const useLocationPermission = () => useContext(LocationPermissionCtx);