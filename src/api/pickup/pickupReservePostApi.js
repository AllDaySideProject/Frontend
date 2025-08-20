import defaultInstance from "../utils/defaultInstance"

export const pickupReservePostApi = async (items) => {
    try {
        const response = await defaultInstance.post(`/orders`, { items });

        if (response.status === 201) {  
            console.log("예약 성공: ", response.data.message);
        }

        return response.data.data;
    } catch (error) {
        const status = error.response?.status;
        const data = error.response?.data;

        switch (status) {
            case 400:
                switch (data.code) {
                    case "GLOBAL_400_2":
                        console.error("잘못된 요청: ", data.message);
                        break;
                    case "MENU_OUT_OF_STOCK_400_2":
                        console.error("재고 부족: ", data.message);
                        break;
                    case "MENU_EXPIRED_400_1":
                        console.error("판매 마감: ", data.message);
                        break;
                    default:
                        console.error("기타 잘못된 요청: ", data.message);
                }
                break;

            case 404:
                console.error("찾을 수 없음: ", data.message);
                break;

            case 500:
                console.error("서버 에러: ", data.message);
                break;

            default:
                console.error("알 수 없는 오류: ", data.message || error.message);
        }

        throw error;
    }
}