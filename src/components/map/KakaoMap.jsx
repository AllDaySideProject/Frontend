import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Map, MapMarker, Polyline } from "react-kakao-maps-sdk";

import STORE_GR from "../../assets/map/storeLocation-green.svg";
import STORE_WH from "../../assets/map/storeLocation-white.svg";
import USER from "../../assets/map/userLocation.png";

import { useLocationPermission } from '../LocationPermissionContext';
import { useCurrentPosition } from '../../hooks/useCurrentPosition';

function KakaoMap(props) {
  const [selectedStoreId, setSelectedStoreId] = useState(null); // 매장 선택 여부

  const { decided, agreed } = useLocationPermission(); // 위치 권한 허용 여부
  const { pos: userPos, request } = useCurrentPosition(); // 현재 위치

  const [stores, setStores] = useState([ // 가게 목록
    { id: 1, lat: 37.5700, lng: 127.0204 },
    { id: 2, lat: 37.5900, lng: 127.0164 },
    { id: 3, lat: 37.5970, lng: 127.0064 }
  ]);

  const [routeCoords, setRouteCoords] = useState([]); // 경로 좌표 배열

  const mapRef = useRef(null);

  useEffect(() => { // 권한 허용 후 좌표 없을 때 한 번 요청
    if (decided && agreed && !userPos) request();
  }, [decided, agreed, userPos, request]);

  // 1) 클릭한 가게만 경로 생성
  function makePath(from, to) {
    if (!from || !to) return [];
    const mid = { lat: (from.lat + to.lat)/2, lng: (from.lng + to.lng)/2 };
    const kink = 0.001; // 살짝 꺾이게
    return [
      from,
      { lat: from.lat + kink, lng: mid.lng },  // 가로 이동
      { lat: mid.lat,        lng: mid.lng },  // 중간
      { lat: to.lat - kink,  lng: mid.lng },  // 세로 이동
      to
    ];
  }

  const fitAll = useCallback(() => { // 사용자 위치 + 가게 위치 중심 맞춤
    const map = mapRef.current;
    if (!map || !window.kakao?.maps) return;
    const { kakao } = window;

    const b = new kakao.maps.LatLngBounds();
    if (userPos) b.extend(new kakao.maps.LatLng(userPos.lat, userPos.lng));
    stores.forEach(s => b.extend(new kakao.maps.LatLng(s.lat, s.lng)));
    routeCoords.forEach(p => b.extend(new kakao.maps.LatLng(p.lat, p.lng)));

    map.relayout(); // 레이아웃 변경 시 재계산

    map.setBounds(b, 30, 30, 30, 30);
  }, [stores, userPos, routeCoords]);

  useEffect(() => { fitAll(); }, [fitAll]); // 자동으로 화면 다시 맞춤

  if (!userPos) return null;

  return (
    <Map
      center = { userPos }
      style = {{ width: '50rem', height: '50rem' }}
      onCreate = { (map) => {
        mapRef.current = map;
        fitAll();  
        setTimeout(fitAll, 0); 
      }}
    >

       <MapMarker 
         position = { userPos }
         image = {{ 
          src: USER,
          size: { width: 50, height: 50 },
          options: { offset: { x: 25, y: 50 } }
        }}
      />

      { stores.map((store) => {
        const isSelected = store.id === selectedStoreId;

        return (
          <MapMarker 
            key = { store.id }
            position = { store }

            image = {{ 
              src: isSelected ? STORE_GR : STORE_WH,
              size: { width: 40, height: 40 },
              options: { offset: { x: 20, y: 40 } }
            }}

            onClick = {(e) => {
              setSelectedStoreId(prev => {
                const next = prev === store.id ? null : store.id
              
                if (next === null) setRouteCoords([]);
                else setRouteCoords(makePath(userPos, store));
                return next;
              });
            }}
          />          
        );
      })}

      { routeCoords.length > 1 && (
        <Polyline 
          path = { routeCoords }
          strokeWeight = { 4 }
          strokeColor = '#0EA64B'
          strokeStyle = "solid"
        />
      )}


    </Map>
  );
}

export default KakaoMap;