import "./Location.scss";

import { useEffect, useState } from "react";
import { useLocationPermission } from "../../../components/LocationPermissionContext";
import { useCurrentPosition } from "../../../hooks/useCurrentPosition";
import PickupMap from "./PickupMap";
import { mapRoutePostApi } from "../../../api/map/mapRoutePostApi";
import { decodePolyline } from "../../../api/utils/decodePolyline";

export const Location = () => {
    const { decided, agreed } = useLocationPermission();
    // const { pos: userPos, request } = useCurrentPosition();
    const [paths, setPaths] = useState([]);

    // useEffect(() => {
    //     if (decided && agreed && !userPos) request();
    // }, [decided, agreed, userPos, request]);

    // if (!userPos) return null; // 위치 잡히기 전엔 안 그림
    const userPos = { lat: 37.4683, lng: 127.0390 };

    useEffect(() => {
        const fetchRoute = async () => {
            try {
                const res = await mapRoutePostApi(userPos.lat, userPos.lng, [1, 2, 4, 5]);
                console.log("경로 응답:", res);

                if (res.polyline) {
                const decoded = decodePolyline(res.polyline);
                setPaths([decoded]);
                }
            } catch (err) {
                console.error(err);
            }
        };
        fetchRoute();
    }, []);

    return (
        <div className = "locationBg">
            <div className = "locationContainer">
                <PickupMap 
                    userPos = { userPos }
                    paths = { paths }
                    width = "24.375rem"
                    height = "31.81rem"
                />
            </div>
        </div>
    );
}
