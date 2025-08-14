import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Map, MapMarker } from "react-kakao-maps-sdk";

import STORE_GR from "../../assets/map/storeLocation-green.svg";
import STORE_WH from "../../assets/map/storeLocation-white.svg";
import USER from "../../assets/map/userLocation.svg";

import { useLocationPermission } from '../LocationPermissionContext';
import { useCurrentPosition } from '../../hooks/useCurrentPosition';

function KakaoMap(props) {
  const { decided, agreed } = useLocationPermission(); // 위치 권한 허용 여부
  const { pos: userPos, request } = useCurrentPosition(); // 현재 위치

  const [stores, setStores] = useState([ // 가게 목록
    { id: 1, lat: 37.5700, lng: 127.0204 },
    { id: 2, lat: 37.5900, lng: 127.0164 },
    { id: 3, lat: 37.5970, lng: 127.0064 }
  ]);
  
  const mapRef = useRef(null);

  useEffect(() => { // 권한 허용 후 좌표 없을 때 한 번 요청
    if (decided && agreed && !userPos) request();
  }, [decided, agreed, userPos, request]);

  const fitAll = useCallback(() => { // 사용자 위치 + 가게 위치 중심 맞춤
    const map = mapRef.current;
    if (!map || !window.kakao || !userPos) return;
    const { kakao } = window;

    if (stores.length === 0) {
      map.setCenter(new kakao.maps.LatLng(userPos.lat, userPos.lng));
      return;
    }
    const b = new kakao.maps.LatLngBounds();
    b.extend(new kakao.maps.LatLng(userPos.lat, userPos.lng));
    stores.forEach(s => b.extend(new kakao.maps.LatLng(s.lat, s.lng)));

    map.relayout(); // 레이아웃 변경 시 재계산

    map.setBounds(b, 30, 30, 30, 30);
  });

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

      { stores.map((store, idx) => (
        <MapMarker 
          key = { store.id }
          position = { store }
          image = {{ 
            src: STORE_GR,
            size: { width: 40, height: 40 },
            options: { offset: { x: 20, y: 40 } }
          }}
        />
      ))}

    </Map>
  );
}

export default KakaoMap;