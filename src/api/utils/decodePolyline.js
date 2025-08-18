export const decodePolyline = (encoded) => {
    const points = []; // 최종 좌표 배열
    let index = 0;
    let lat = 0; // 초기 위도
    let lng = 0; // 초기 경도

    while (index < encoded.length) { // 인코딩된 문자열을 끝날 때까지 반복
        let b, shift = 0, result = 0;

        // 위도 값 디코딩
        do {
            b = encoded.charCodeAt(index++) - 63; // 아스키 코드 숫자로 변환
            result |= (b & 0x1f) << shift; // 다섯 비트씩 이어 붙임
            shift += 5;
        } while (b >= 0x20);
        const dlat = ((result & 1) ? ~(result >> 1) : (result >> 1)); // 짝수 비트는 양수, 홀수 비트는 음수로
        lat += dlat; // 누적 위도

        // 경도 값 디코딩
        shift = 0;
        result = 0;
        do {
            b = encoded.charCodeAt(index++) - 63;
            result |= (b & 0x1f) << shift;
            shift += 5;
        } while (b >= 0x20);
        const dlng = ((result & 1) ? ~(result >> 1) : (result >> 1));
        lng += dlng;

        points.push({ lat: lat / 1e5, lng: lng / 1e5 }); // 위도와 경도를 실제 좌표로 변환 (1e5로 나눔)
    }

    return points;
}