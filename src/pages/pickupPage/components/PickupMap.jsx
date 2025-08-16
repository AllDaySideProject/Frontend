import React, { useMemo } from "react";
import { CustomOverlayMap, MapMarker, Polyline } from "react-kakao-maps-sdk";
import { BaseKakaoMap } from "../../../components/map/BaseKakaoMap";
import USER from "../../../assets/map/userLocation.svg";
import STORE_GR from "../../../assets/map/storeLocation-green.svg";
import STORE_WH from "../../../assets/map/storeLocation-white.svg";
import { getDistanceMeters } from "../../../components/map/mapUtils";
import { DistanceBox } from "../../../components/map/DistanceBox";

export default function PickupMap({ userPos, destinations = [], paths = [], height = "50rem", width, useBent = false, selectedId, onDestinationClick }) {
  if (!userPos) return null;

  const selectedDest = destinations.find(d => d.id === selectedId) || null;
  const selectedDistance = selectedDest
    ? getDistanceMeters(userPos, selectedDest)
    : null;

  const sequentialPath = [userPos, ...destinations.map(d => ({ lat: d.lat, lng: d.lng }))];

  const boundsPoints = [  // 사용자 위치 + 모든 목적지 + 모든 경로 좌표
    // userPos,
    // ...destinations,
    // ...paths.flat()
    ...sequentialPath
  ];

  return (
    <BaseKakaoMap 
      center = { userPos}  
      boundsPoints = { boundsPoints }  
      height = { '100vh' } 
      width = { width }
    >
      
      <MapMarker // 사용자 마커
        position = { userPos }
        image = {{
          src: USER,
          size: { width: 50, height: 50 },
          options: { offset: { x: 25, y: 25 } }
        }}
      />

      { destinations.map(dest => { // 목적지 마커
        const isSelected = dest.id === selectedId;
        return (
          <MapMarker
            key = { dest.id }
            position = {{ lat: dest.lat, lng: dest.lng }}
            image = {{
              src: isSelected ? STORE_GR : STORE_WH,
              size: { width: 40, height: 40 },
              options: { offset: { x: 20, y: 20 } }
            }}
            onClick = { () => onDestinationClick?.(dest.id) }
          />          
        )
      })}

      {/* { paths.map((path, idx) => ( // 목적지 있을 때 경로 표시 */}
        <Polyline
          // key = { idx }
          // path = { path }
          path = { sequentialPath }
          strokeWeight = { 2 }
          strokeColor = "#0EA64B"
          strokeOpacity = { 1 }
          strokeStyle = "dash"
        />
      {/* ))} */}

      { selectedDest && (
        <CustomOverlayMap
          position = {{ lat: selectedDest.lat, lng: selectedDest.lng }}
          xAnchor = { 1 }
          yAnchor = { -0.2 }
        >
          <DistanceBox
            name = { selectedDest.name ?? "목적지" }
            distance = { selectedDistance }
          />
        </CustomOverlayMap>
      )}

    </BaseKakaoMap>
  );
}
