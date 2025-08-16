import "./Location.scss";

import { useEffect, useState } from "react";
import { useLocationPermission } from "../../../components/LocationPermissionContext";
import ScreenContainer from "../../../components/ScreenContainer";
import { useCurrentPosition } from "../../../hooks/useCurrentPosition";
import PickupMap from "./PickupMap";

export const Location = () => {
    const { decided, agreed } = useLocationPermission();
    const { pos: userPos, request } = useCurrentPosition();
    const [selectedId, setSelectedId] = useState(null);

    useEffect(() => {
        if (decided && agreed && !userPos) request();
    }, [decided, agreed, userPos, request]);

    const destinations = [
        { id: 1, name: "우찬이네 반찬", lat: 37.5900, lng: 127.0164 },
        { id: 2, name: "오색퓨전찬", lat: 37.5770, lng: 127.0204 },
        { id: 3, name: "초록찬 비건키친", lat: 37.5970, lng: 127.0064 },        
    ];

    if (!userPos) return null; // 위치 잡히기 전엔 안 그림

    return (
        <div className = "locationBg">
            <div className = "locationContainer">
                <PickupMap 
                    userPos = { userPos } 
                    destinations = { destinations} 
                    selectedId = { selectedId }
                    onDestinationClick = { (id) => {
                        setSelectedId(prev => prev === id ? null : id);
                    }}
                    width = "24.375rem"
                    height = "31.81rem"
                    useBent = { false }
                />
            </div>
        </div>
    );
}
