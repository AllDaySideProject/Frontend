import "./Location.scss";

import { useEffect, useState } from "react";
import { useLocationPermission } from "../../../components/LocationPermissionContext";
import { useCurrentPosition } from "../../../hooks/useCurrentPosition";
import PickupMap from "./PickupMap";
import { mapRoutePostApi } from "../../../api/map/mapRoutePostApi";
import { decodePolyline } from "../../../api/utils/decodePolyline";
import { mapStoreListGetApi } from "../../../api/map/mapStoreListGetApi";
import { useLocation } from "react-router-dom";

export const Location = () => {
    const { decided, agreed } = useLocationPermission();
    // const { pos: userPos, request } = useCurrentPosition();
    const [paths, setPaths] = useState([]);
    const [destinations, setDestinations] = useState([]);
    const [selectedId, setSelectedId] = useState(null);

    const location = useLocation();
    const reservation = location.state;

    // useEffect(() => {
    //     if (decided && agreed && !userPos) request();
    // }, [decided, agreed, userPos, request]);

    // if (!userPos) return null; // 위치 잡히기 전엔 안 그림
    const userPos = { lat: 37.4683, lng: 127.0390 };

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!reservation?.storeList || reservation.storeList.length === 0) {
                    console.warn("예약한 가게가 없음");
                    return;
                }

                const routeRes = await mapRoutePostApi(
                    userPos.lat,
                    userPos.lng,
                    reservation.storeList
                );

                console.log("경로 응답:", routeRes);

                if (routeRes.polyline) {
                    const decoded = decodePolyline(routeRes.polyline);
                    setPaths([decoded]);
                }

                const stores = await mapStoreListGetApi(userPos.lat, userPos.lng);
                const reservedStores = stores.filter(s => reservation.storeList.includes(s.storeId));

                if (routeRes.optimizedStoreIds) {
                    const filtered = routeRes.optimizedStoreIds
                        .map((id) => reservedStores.find((s) => s.storeId === id))
                        .filter(Boolean);
                    setDestinations(filtered);
                } else {
                    setDestinations(reservedStores);
                }
                            
            } catch (err) {
                console.error("경로 불러오기 실패:", err);
            }
        };

        fetchData();
    }, []);

    return (
        <div className = "locationBg">
            <div className = "locationContainer">
                <PickupMap 
                    userPos = { userPos }
                    paths = { paths }
                    destinations = { destinations }
                    width = "24.375rem"
                    height = "31.81rem"
                    selectedId = { selectedId }
                    onDestinationClick = { setSelectedId } 
                />
            </div>
        </div>
    );
}
