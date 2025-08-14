import React, { useState } from 'react';
import { Map } from "react-kakao-maps-sdk";

function KakaoMap(props) {
  const userPos = { lat: 37.5820, lng: 127.0104 };
  const [stores, setStores] = useState([
    { lat: 37.5700, lng: 127.0204 },
    { lat: 37.5900, lng: 127.0164 },
    { lat: 37.5970, lng: 127.0064 }
  ]);

  const allPoints = [userPos, ...stores]; // 모든 좌표 배열
  const centerPos = { // 좌표 중앙 계산
    lat: allPoints.reduce((sum, p) => sum + p.lat, 0) / allPoints.length,
    lng: allPoints.reduce((sum, p) => sum + p.lng, 0) / allPoints.length,
  };

  return (
    <Map
      center = { centerPos }

      style = {{ width: '24.375rem', height: '50rem' }}
      level = { 5 }

      onCreate = {(map) => {
        const { kakao } = window;
        const bounds = new kakao.maps.LatLngBounds();

        bounds.extend(new kakao.maps.LatLng(userPos.lat, userPos.lng)); // 사용자 위치

        stores.forEach(store => {
          bounds.extend(new kakao.maps.LatLng(store.lat, store.lng));
        })

        map.setBounds(bounds);
      }}
    />
  );
}

export default KakaoMap;