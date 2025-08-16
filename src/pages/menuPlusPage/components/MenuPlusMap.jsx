import "./MenuPlusMap.scss";

import { useEffect, useState } from "react";
import { CustomOverlayMap, MapMarker, Polyline } from "react-kakao-maps-sdk";
import { BaseKakaoMap } from "../../../components/map/BaseKakaoMap";
import { getDistanceMeters } from "../../../components/map/mapUtils";

import STORE_GR from "../../../assets/map/storeLocation-green.svg";
import STORE_WH from "../../../assets/map/storeLocation-white.svg";
import USER from "../../../assets/map/userLocation.svg";

import { useLocationPermission } from "../../../components/LocationPermissionContext"; // 위치 권한
import { useCurrentPosition } from "../../../hooks/useCurrentPosition"; // 현재 위치
import { DistanceBox } from "../../../components/map/DistanceBox";
import { BottomSheet } from "./BottomSheet";
import { Toast } from "./Toast";

export default function MenuPlusMap() { // 내 위치 + 주변 가게 마커 표시 + 가게 클릭 시 경로
    const [selectedStoreId, setSelectedStoreId] = useState(null);
    const [selectedDistance, setSelectedDistance] = useState(null);
    const [showToast, setShowToast] = useState(false);

    const [sheetHeight, setSheetHeight] = useState(0); // BottomSheet 높이

    const { decided, agreed } = useLocationPermission();
    const { pos: userPos, request } = useCurrentPosition();

    useEffect(() => {
        if (decided && agreed && !userPos) request();
    }, [decided, agreed, userPos, request]);

    const [stores] = useState([
        { id: 1, name: "유진이네 밥상", type: "한식 전문점", lat: 37.5700, lng: 127.0204 },
        { id: 2, name: "김가네 분식", type: "분식 전문점", lat: 37.5900, lng: 127.0164 },
        { id: 3, name: "할매반찬", type: "한식 전문점", lat: 37.5970, lng: 127.0064 },
    ]);

    const [selectedStore, setSelectedStore] = useState(null); // 선택한 가게 정보
    
    const handleMarkerClick = (store) => { // 마커 클릭 시
        setSelectedStore(store);
        setSheetHeight(24.63); // 처음 열릴 때 높이
        // setTimeout(() => setSheetHeight(40.19), 200); // 애니메이션 확장 가능
    };

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

                    onClick = { () => {
                        setSelectedStoreId(s.id); // 선택한 가게 ID 저장
                        setRouteCoords([userPos, { lat: s.lat, lng: s.lng }]);
                        setSelectedDistance(getDistanceMeters(userPos, s));
                        setSheetHeight(24.63); // BottomSheet 열기
                    }}
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

            { stores.find(s => s.id === selectedStoreId) && (
                <CustomOverlayMap 
                    position = {{
                        lat: stores.find(s => s.id === selectedStoreId)?.lat,
                        lng: stores.find(s => s.id === selectedStoreId)?.lng
                    }}                    
                    xAnchor = { 1 }
                    yAnchor = { -0.2 }
                >
                    <DistanceBox 
                        name = { stores.find(s => s.id === selectedStoreId)?.name }
                        distance = { selectedDistance }
                    />
                </CustomOverlayMap>
            )}
            </BaseKakaoMap>  

            { selectedStoreId && (
                <BottomSheet
                    height = { sheetHeight }
                    setHeight = { setSheetHeight }
                    storeId = { selectedStoreId }
                    setStoreId = { setSelectedStoreId }
                    stores = { stores }
                    setShowToast = { setShowToast }
                />                   
            )}

            { showToast && (
                <div className = "toastContainer">
                    <Toast
                        duration = { 2000 }
                        onClose = { () => setShowToast(false) }
                    />                    
                </div>
            )}
       
        </div>
  );
}
