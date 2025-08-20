import defaultInstance from "../utils/defaultInstance";

export const pickupCodePutApi = async (code) => {
  try {
    const response = await defaultInstance.put(`/orders/complete`, { code });

    if (response.status === 200) {
      console.log("코드 호출 성공:", response.data.message);
    }

    return response.data;
  } catch (error) {
    const status = error.response?.status; 
    const data = error.response?.data;   

    switch (status) {
      case 400:
        switch (data.code) {
          case "GLOBAL_400_2":
            console.error("잘못된 요청: ", data.message);
            break;
          case "ORDER_400_1":
            console.error("잘못된 요청: ", data.message);
            break;       
        }
        break;

      case 404:
        console.error("주문을 찾을 수 없음: ", data.message);
        break;

      case 500:
        console.error("서버 오류: ", data.message);
        break;

      default:
        console.error("알 수 없는 오류: ", data.message || error.message);
    }

    throw error;
  }
};
