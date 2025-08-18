import defaultInstance from "../utils/defaultInstance";

export const mapMenuListGetApi = async (storeId, lat, lng) => {
    try {
        const response = await defaultInstance.get(`/stores/${storeId}/menus`, {
            params: { lat, lng },
        });

        if (response.status === 200) {
            console.log("메뉴 목록 조회 성공: ", response.data.message);
        }

        return response.data.data;
    } catch (error) {
        const status = error.response?.status;
        const data = error.response?.data;

        switch (status) {
            case 400:
                console.error("잘못된 요청: ", data.message);
                break;

            case 404:
                console.error("찾을 수 없음: ", data.message);
                break;

            case 500:
                console.error("내부 서버 오류: ", data.message);
                break;

            default:
                console.error("알 수 없는 오류: ", data.message || error.message);
        }

        throw error;
    }
}