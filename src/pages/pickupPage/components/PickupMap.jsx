import React, { useEffect, useState } from "react";
import { CustomOverlayMap, MapMarker, Polyline } from "react-kakao-maps-sdk";
import { BaseKakaoMap } from "../../../components/map/BaseKakaoMap";
import USER from "../../../assets/map/userLocation.png";
import STORE_GR from "../../../assets/map/storeLocation-green.svg";
import STORE_WH from "../../../assets/map/storeLocation-white.svg";
import { getDistanceMeters } from "../../../components/map/mapUtils";
import { DistanceBox } from "../../../components/map/DistanceBox";

export default function PickupMap({ userPos, destinations = [], paths = [], height = "50rem", width, useBent = false, selectedId, onDestinationClick }) {
  // if (!userPos) return null;

  const selectedDest = destinations.find(d => d.storeId === selectedId) || null;
  const selectedDistance = selectedDest
    ? (getDistanceMeters(userPos, selectedDest) / 1000).toFixed(2)
    : null;

  const boundsPoints = [  // 사용자 위치 + 모든 목적지 + 모든 경로 좌표
    userPos,
    ...destinations,
    ...paths.flat()
    // ...sequentialPath
  ];

  return (
    <BaseKakaoMap 
      center = { userPos}  
      boundsPoints = { boundsPoints }  
      height = { height } 
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
        const isSelected = dest.storeId === selectedId;
        return (
          <MapMarker
            key = { dest.storeId }
            position = {{ lat: dest.lat, lng: dest.lng }}
            image = {{
              src: dest.storeId === selectedId ? STORE_GR : STORE_WH,
              size: { width: 40, height: 40 },
              options: { offset: { x: 20, y: 20 } }
            }}
            onClick = { () => onDestinationClick?.(dest.storeId) }
          />          
        )
      })}

      { paths.map((path, idx) => ( // 목적지 있을 때 경로 표시
        <Polyline
          key = { idx }
          path = { path }
          strokeWeight = { 2 }
          strokeColor = "#0EA64B"
          strokeOpacity = { 1 }
          strokeStyle = "dash"
        />
      ))}

      { selectedDest && (
        <CustomOverlayMap
          position = {{ lat: selectedDest.lat, lng: selectedDest.lng }}
          xAnchor = { 1 }
          yAnchor = { -0.2 }
        >
          <DistanceBox
            name = { selectedDest.storeName }
            distance = { `${selectedDest.distance.toFixed(2)}` }
          />
        </CustomOverlayMap>
      )}

    </BaseKakaoMap>
  );
}
