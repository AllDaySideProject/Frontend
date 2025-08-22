import "./MenuPlusMap.scss";

import { useEffect, useState } from "react";
import { CustomOverlayMap, MapMarker, Polyline } from "react-kakao-maps-sdk";
import { BaseKakaoMap } from "../../../components/map/BaseKakaoMap";
import { getDistanceMeters } from "../../../components/map/mapUtils";

import STORE_GR from "../../../assets/map/storeLocation-green.png";
import STORE_WH from "../../../assets/map/storeLocation-white.png";
import USER from "../../../assets/map/userLocation.png";

import { useLocationPermission } from "../../../components/LocationPermissionContext"; // 위치 권한
import { useCurrentPosition } from "../../../hooks/useCurrentPosition"; // 현재 위치
import { DistanceBox } from "../../../components/map/DistanceBox";
import { BottomSheet } from "./BottomSheet";
import { Toast } from "./Toast";
import HeaderArrow from "../../../components/HeaderArrow";
import { mapStoreListGetApi } from "../../../api/map/mapStoreListGetApi";

export default function MenuPlusMap() { // 내 위치 + 주변 가게 마커 표시 + 가게 클릭 시 경로
    const [storeDetail, setStoreDetail] = useState(null); // 선택한 가게 상세 정보
    const [selectedStoreId, setSelectedStoreId] = useState(null); // 선택한 가게 ID
    const [selectedDistance, setSelectedDistance] = useState(null); // 선택한 가게와의 거리
    const [routeCoords, setRouteCoords] = useState([]); // 경로 좌표 배열
    const [showToast, setShowToast] = useState(false); // 토스트 메시지 표시 여부
    const [toastMessage, setToastMessage] = useState("");
    const [sheetHeight, setSheetHeight] = useState(0); // BottomSheet 높이

    // const { decided, agreed } = useLocationPermission(); // 위치 권한 결정 여부
    const { pos: userPos, request } = useCurrentPosition(); // 현재 위치

    const [stores, setStores] = useState([]); // 가게 목록

    // useEffect(() => { // 위치 권한이 허용되고, 위치가 결정되면 가게 목록 요청
    //     if (decided && agreed && !userPos) request();
    // }, [decided, agreed, userPos, request]);

    const TEST_POS = { lat: 37.4683, lng: 127.0390 };  // 테스트 용 위치
    const currentPos = userPos || TEST_POS; 

    useEffect(() => { // 위치가 결정되면 가게 목록 요청
        const fetchStores = async () => {
            try {
                const lat = (userPos?.lat) || TEST_POS.lat;
                const lng = (userPos?.lng) || TEST_POS.lng;
                const data = await mapStoreListGetApi(lat, lng); 
                setStores(data); 
            } catch (error) {
                console.error("가게 목록 조회 실패:", error);
            }
        };

        fetchStores();
    }, [userPos]);

    const CATEGORY_LABELS = { // 카테고리 라벨
        KOREAN: "한식 전문점",
        FUSION_SIDE_DISH: "퓨전 반찬 전문점",
        VEGAN_SIDE_DISH: "채식/비건 반찬 전문점",
        PREMIUM_SIDE_DISH: "고급 반찬 전문점",
        HOME_MADE: "수제 반찬가게",
    };

    const boundsPoints = [currentPos, ...stores, ...routeCoords];

    // if (!userPos) return null;

    return (
        <div className = "exploreMapContainer"> 
            <HeaderArrow initialMode = "map" />
            <BaseKakaoMap 
                center = { currentPos } 
                boundsPoints = { boundsPoints }
                height = "52.75rem"
            >

            <MapMarker // 내 위치 마커
                position = { currentPos }
                image = {{
                src: USER,
                size: { width: 50, height: 50 },
                options: { offset: { x: 25, y: 25 } },
                }}
            />

            { stores.map((s) => { // 가게 마커
                const isSel = s.storeId === selectedStoreId; // 선택 여부
                return (
                <MapMarker
                    key = { s.storeId }
                    position = {{ lat: s.lat, lng: s.lng }}
                    image = {{
                    src: isSel ? STORE_GR : STORE_WH,
                    size: { width: 40, height: 40 },
                    options: { offset: { x: 20, y: 20 } },
                    }}

                    onClick = { () => {
                        const dist = getDistanceMeters(currentPos, s);

                        setSelectedStoreId(s.storeId); // 선택한 가게 ID
                        setRouteCoords([currentPos, { lat: s.lat, lng: s.lng }]);
                        setSelectedDistance(dist);

                        setStoreDetail({ ...s, distance: dist });

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

            { selectedStoreId && (
                <CustomOverlayMap 
                    position = {{ 
                        lat: stores.find(s => s.storeId === selectedStoreId)?.lat,
                        lng: stores.find(s => s.storeId === selectedStoreId)?.lng
                    }}
                    xAnchor = { 1 }
                    yAnchor = { -0.2 }
                >
                    <DistanceBox 
                        name = { storeDetail?.name }
                        distance = { `${ storeDetail.distance.toFixed(1) }` }
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
                    setToastMessage = { setToastMessage }
                    categoryLabels = { CATEGORY_LABELS }
                    userPos = { currentPos }
                    setStoreDetail = { setStoreDetail }
                    setRouteCoords = { setRouteCoords }
                />                   
            )}

            { showToast && (
                <div className = "toastContainer">
                    <Toast
                        duration = { 2000 }
                        toastText = { toastMessage }
                        onClose = { () => setShowToast(false) }
                    />                    
                </div>
            )}
       
        </div>
  );
}
