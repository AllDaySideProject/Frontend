import { useCallback, useEffect, useRef } from "react";
import { Map } from "react-kakao-maps-sdk";

export const BaseKakaoMap = ({ // 지도 기본 래퍼
    center, // 지도 중심 좌표
    boundsPoints = [], // 화면에 보여 줄 모든 좌표
    height = "100%", width = "100%",
    children, // 마커 + 경로
}) => {
    const mapRef = useRef(null);

    const fitBounds = useCallback(() => { // 지도 범위 설정
        const map = mapRef.current;
        const kakao = window.kakao;
        if (!map || !kakao?.maps || boundsPoints.length === 0) return;

        const b = new kakao.maps.LatLngBounds();
        boundsPoints.forEach((p) => b.extend(new kakao.maps.LatLng(p.lat, p.lng)));

        map.relayout(); // 지도 크기 변경 시 재계산
        map.setBounds(b, 30, 30, 30, 30); // 패딩 값 30
    }, [boundsPoints]);

    useEffect(() => { fitBounds(); }, [fitBounds]); // boundPoints 변화 시 영역 다시 맞춤

    return (
        <Map
        center = { center }
        style = {{ height, width }}
        onCreate = { (map) => {
            mapRef.current = map;
            fitBounds();
            setTimeout(fitBounds, 0); // 초기 로드 시 레이아웃 
        }}
        >
        { children }
        </Map>
    );
}