import "./Location.scss";

import { useEffect, useState } from "react";
import { useLocationPermission } from "../../../components/LocationPermissionContext";
import { useCurrentPosition } from "../../../hooks/useCurrentPosition";
import PickupMap from "./PickupMap";
import { mapRoutePostApi } from "../../../api/map/mapRoutePostApi";
import { decodePolyline } from "../../../api/utils/decodePolyline";
import { mapStoreListGetApi } from "../../../api/map/mapStoreListGetApi";

export const Location = () => {
    const { decided, agreed } = useLocationPermission();
    // const { pos: userPos, request } = useCurrentPosition();
    const [paths, setPaths] = useState([]);
    const [destinations, setDestinations] = useState([]);
    const [selectedId, setSelectedId] = useState(null);

    // useEffect(() => {
    //     if (decided && agreed && !userPos) request();
    // }, [decided, agreed, userPos, request]);

    // if (!userPos) return null; // 위치 잡히기 전엔 안 그림
    const userPos = { lat: 37.4683, lng: 127.0390 };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const stores = await mapStoreListGetApi(userPos.lat, userPos.lng);
                console.log("가게 목록:", stores);

                if (!stores || stores.length === 0) return;
                    
                const limitedStores = stores.slice(0, 8);
                const routeRes = await mapRoutePostApi(
                    userPos.lat,
                    userPos.lng,
                    limitedStores.map((s) => s.storeId)
                );
                console.log("경로 응답:", routeRes);

                if (routeRes.polyline) {
                    const decoded = decodePolyline(routeRes.polyline);
                    setPaths([decoded]);
                }

                if (routeRes.optimizedStoreIds) {
                    const filtered = routeRes.optimizedStoreIds
                        .map((id) => stores.find((s) => s.storeId === id))
                        .filter(Boolean);
                    setDestinations(filtered);
                } else {
                    setDestinations(stores); 
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
