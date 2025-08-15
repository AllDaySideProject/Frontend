export const haversineMeters = (a, b) => { // 좌표 간의 직선 거리 계산
  const R = 6371000; // 지구 반지름
  const toRad = (d) => (d * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
};

export const kmLabel = (m) => (m >= 1000 ? (m / 1000).toFixed(1) + "km" : Math.round(m) + "m"); // 단위 km 또는 m 문자열로 반환

export const bentPath = (from, to) => { // 직선이 아닌 조금 꺾인 경로
  const midLng = (from.lng + to.lng) / 2;
  return [from, { lat: from.lat, lng: midLng }, { lat: to.lat, lng: midLng }, to];
};

export function getDistanceMeters(a, b) { // 거리 계산
  const R = 6371000;
  const toRad = (d) => (d * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat), lat2 = toRad(b.lat);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}
