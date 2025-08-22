import { useCallback, useState } from "react"

export const useCurrentPosition = () => {
    const [pos, setPos] = useState(null); // 현재 위치 좌표 상태
    const [loading, setLoading] = useState(false); // 로딩 상태

    const request = useCallback(() => { // 위치 요청 함수
        if (!("geolocation" in navigator)) return; 
        setLoading(true); // 요청 시작 후 로딩

        navigator.geolocation.getCurrentPosition( // 현재 위치 가져오기
            ({ coords }) => { // 성공 콜백
                setPos({ lat: coords.latitude, lng: coords.longitude });
                setLoading(false);
            }, () => { // 실패 콜백
                setLoading(false);
            }, { enableHighAccuracy: true, timeout: 8000, maximumAge: 30000 } // 조건
        );
    }, []);

    return { pos, loading, request };
}