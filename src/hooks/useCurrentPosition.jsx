import { useCallback, useState } from "react"

export const useCurrentPosition = () => {
    const [pos, setPos] = useState(); // 현재 위치 좌표 상태
    const [loading, setLoading] = useState(false); // 로딩 상태

    const request = useCallback(() => {
        if (!("geolocation" in navigator)) return;
        setLoading(true);

        navigator.geolocation.getCurrentPosition(
            ({ coords }) => {
                setPos({ lat: coords.latitude, lng: coords.longitude });
                setLoading(false);
            }, () => {
                setLoading(false);
            }, { enableHighAccuracy: true, timeout: 8000, maximumAge: 30000 }
        );
    }, []);

    return { pos, loading, request };
}