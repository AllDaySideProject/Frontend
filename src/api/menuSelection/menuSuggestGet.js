import defaultInstance from "../utils/instance";
//lat: 위도  lng : 경도 
const menuSuggestGet = async (lat, lng) => {
  try{
    const token=localStorage.getItem("token");
    const response = await defaultInstance.get('menus', {
      params:{
        lat:lat,
        lng: lng,
      },
      headers:{
         Authorization: `Bearer ${token}`,
      }
    });
    console.log("통신 성공");
    return response.data
  }catch(error){
    if(error.httpStatus===400){
      console.log("!!! 400 ");
    }
    if(error.httpStatus===500){
      console.log("!!! 500 ")
    }
    console.log("에러 발생 !!!", error);
    throw error;
  }
};

export default menuSuggestGet;
