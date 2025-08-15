import "./MenuPlusMap.scss";

import React, { useEffect, useMemo, useState } from "react";
import { CustomOverlayMap, MapMarker, Polyline } from "react-kakao-maps-sdk";
import { BaseKakaoMap } from "../../../components/map/BaseKakaoMap";
import { bentPath, getDistanceMeters } from "../../../components/map/mapUtils";

import STORE_GR from "../../../assets/map/storeLocation-green.svg";
import STORE_WH from "../../../assets/map/storeLocation-white.svg";
import USER from "../../../assets/map/userLocation.svg";

import { useLocationPermission } from "../../../components/LocationPermissionContext"; // 위치 권한
import { useCurrentPosition } from "../../../hooks/useCurrentPosition"; // 현재 위치
import ScreenContainer from "../../../components/ScreenContainer";
import { DistanceBox } from "../../../components/map/DistanceBox";

export default function MenuPlusMap() { // 내 위치 + 주변 가게 마커 표시 + 가게 클릭 시 경로
    const [selectedStoreId, setSelectedStoreId] = useState(null);
    const [selectedDistance, setSelectedDistance] = useState(null);

    const { decided, agreed } = useLocationPermission();
    const { pos: userPos, request } = useCurrentPosition();

    useEffect(() => {
        if (decided && agreed && !userPos) request();
    }, [decided, agreed, userPos, request]);

    const [stores] = useState([
        { id: 1, name: "유진이네 밥상", lat: 37.5700, lng: 127.0204 },
        { id: 2, name: "김가네 분식", lat: 37.5900, lng: 127.0164 },
        { id: 3, name: "할매반찬", lat: 37.5970, lng: 127.0064 },
    ]);

    const selectedStore = useMemo( // 선택된 가게
        () => stores.find((s) => s.id === selectedStoreId) || null,
        [stores, selectedStoreId]
    );

    const [routeCoords, setRouteCoords] = useState([]); // 경로 좌표 배열

    const boundsPoints = [userPos, ...stores, ...routeCoords];

    if (!userPos) return null;

    return (
        <div className = "exploreMapContainer"> 
            <BaseKakaoMap 
                center = { userPos } 
                boundsPoints = { boundsPoints }
                height = "52.75rem"
            >

            <MapMarker // 내 위치 마커
                position = { userPos }
                image = {{
                src: USER,
                size: { width: 50, height: 50 },
                options: { offset: { x: 25, y: 25 } },
                }}
            />

            { stores.map((s) => { // 가게 마커
                const isSel = s.id === selectedStoreId; // 선택 여부
                return (
                <MapMarker
                    key = { s.id }
                    position = {{ lat: s.lat, lng: s.lng }}
                    image = {{
                    src: isSel ? STORE_GR : STORE_WH,
                    size: { width: 40, height: 40 },
                    options: { offset: { x: 20, y: 20 } },
                    }}

                    onClick = { () =>
                        setSelectedStoreId(prev => {
                            const next = prev === s.id ? null : s.id
                        
                            if (next === null) {
                                setRouteCoords([]);
                                setSelectedDistance(null);
                            } else {
                                setRouteCoords([userPos, { lat: s.lat, lng: s.lng }]);
                                setSelectedDistance(getDistanceMeters(userPos, s));
                            } return next;
                        }
                    )}
                />
                );
            })}

            { routeCoords.length > 1 && ( // 선택 시 경로 표시
                <Polyline
                    path = { routeCoords }
                    strokeWeight = { 2 }
                    strokeColor = "#0EA64B"
                    strokeOpacity = { 1 }
                    strokeStyle = "dash"
                />
            )}

            { selectedStore && (
                <CustomOverlayMap 
                    position = {{ lat: selectedStore.lat, lng: selectedStore.lng }}
                    xAnchor = { 1 }
                    yAnchor = { -0.2 }
                >
                    <DistanceBox 
                        name = { selectedStore.name }
                        distance = { selectedDistance }
                    />
                </CustomOverlayMap>
            )}
            </BaseKakaoMap>            
        </div>
  );
}
