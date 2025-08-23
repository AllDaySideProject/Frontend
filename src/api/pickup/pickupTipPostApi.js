import defaultInstance from "../utils/defaultInstance";

export const pickupTipPostApi = async (menus) => {
    try {
        const response = await defaultInstance.post(`/menus/tips`, { menus });

        if (response.status === 200) {
            console.log("레시피 조회 성공: ", response.data.message);
        }

        return response.data.data;
    } catch (error) {
        const status = error.response?.status;
        const data = error.response?.data;

        switch (status) {
            case 400:
                console.error("잘못된 요청: ", data.message);
                break;

            case 500:
                switch (data.code) {
                    case "GLOBAL_500":
                        console.error("서버 내부 오류");
                        break;
                    case "AI_500":
                        console.error("AI 서버 호출 실패");
                }
                break;

            default:
                console.error("알 수 없는 오류: ", data.message || error.message);
        }

        throw error;
    }
}