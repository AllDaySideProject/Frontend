import React, { useEffect, useRef, useState } from 'react';
import { Map, MapMarker } from "react-kakao-maps-sdk";

import STORE_GR from "../../assets/map/storeLocation-green.svg";
import STORE_WH from "../../assets/map/storeLocation-white.svg";
import USER from "../../assets/map/userLocation.svg";

import { useLocationPermission } from '../LocationPermissionContext';
import { useCurrentPosition } from '../../hooks/useCurrentPosition';

function KakaoMap(props) {
  const { decided, agreed } = useLocationPermission();
  const { pos: userPos, loading, request } = useCurrentPosition();

  const [stores, setStores] = useState([
    { id: 1, lat: 37.5700, lng: 127.0204 },
    { id: 2, lat: 37.5900, lng: 127.0164 },
    { id: 3, lat: 37.5970, lng: 127.0064 }
  ]);
  
  const mapRef = useRef(null); 

  useEffect(() => { // 권한이 허용된 시점 현재 위치
    if (decided && agreed) request();
  }, [decided, agreed, request]);

  if (!userPos) return null; // 위치 못 받으면 렌더링 안 함

  return (
    <Map
      center = { userPos } // onCreat setBounds > 실제 표시 범위에 관여

      style = {{ width: '50rem', height: '50rem' }}
      level = { 4 }

      onCreate = {(map) => {
        mapRef.current = map;
        const { kakao } = window;

        const bounds = new kakao.maps.LatLngBounds();
        bounds.extend(new kakao.maps.LatLng(userPos.lat, userPos.lng)); // 사용자 위치

        stores.forEach(store => {
          bounds.extend(new kakao.maps.LatLng(store.lat, store.lng));
        })

        map.setBounds(bounds);
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

      { stores.map((store, idx) => (
        <MapMarker 
          key = { idx }
          position = { store }
          image = {{ 
            src: STORE_GR,
            size: { width: 40, height: 40 },
            options: { offset: { x: 25, y: 50 } }
          }}
        />
      ))}
    </Map>
  );
}

export default KakaoMap;