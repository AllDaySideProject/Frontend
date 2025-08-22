import "./Location.scss";
import { useEffect, useState } from "react";
import { useLocationPermission } from "../../../components/LocationPermissionContext";
import PickupMap from "./PickupMap";
import { mapRoutePostApi } from "../../../api/map/mapRoutePostApi";
import { decodePolyline } from "../../../api/utils/decodePolyline";
import { mapStoreListGetApi } from "../../../api/map/mapStoreListGetApi";
import { mapMenuListGetApi } from "../../../api/map/mapMenuListGetApi";
import { useLocation } from "react-router-dom";

export const Location = () => {
  const { decided, agreed } = useLocationPermission();
  // const { pos: userPos, request } = useCurrentPosition();
  const [paths, setPaths] = useState([]); // 경로
  const [destinations, setDestinations] = useState([]); // 방문할 가게 리스트
  const [selectedId, setSelectedId] = useState(null); // 선택한 가게

  const location = useLocation(); // 이전 페이지에서 넘겨받은 예약
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

        const routeRes = await mapRoutePostApi( // 최적 경로 조회
          userPos.lat,
          userPos.lng,
          reservation.storeList
        );
        console.log("경로 응답:", routeRes);

        if (routeRes.polyline) { // 경로 디코딩해서 저장
          const decoded = decodePolyline(routeRes.polyline);
          setPaths([decoded]); // 지도에 표시할 경로
        }

        const stores = await mapStoreListGetApi(userPos.lat, userPos.lng); // 전체 가게 좌표 가져오기

        const storeDetails = await Promise.all( // 예약된 가게 상세 조회
            reservation.storeList.map(async (storeId) => {
                const menuData = await mapMenuListGetApi(
                    storeId,
                    userPos.lat,
                    userPos.lng
                );

                const store = stores.find((s) => s.storeId === storeId); // 아이디에 맞는 좌표 매칭

                return {
                    storeId,
                    storeName: menuData.name, // 가게 이름
                    category: menuData.category,
                    distance: menuData.distance, // km 단위 거리
                    lat: store?.lat,
                    lng: store?.lng,
                    menus: menuData.menus, // 메뉴 리스트
                };
            })
        );

        if (routeRes.optimizedStoreIds) { // 최적 경로 순서 반영
            const filtered = routeRes.optimizedStoreIds
                .map((id) => storeDetails.find((s) => s.storeId === id))
                .filter(Boolean);

            setDestinations(filtered);
        } else {
            setDestinations(storeDetails);
        }
      } catch (err) {
            console.error("경로 불러오기 실패:", err);
      }
    };

    fetchData();
  }, [reservation, userPos]);

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
};
