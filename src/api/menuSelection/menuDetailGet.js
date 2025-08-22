import defaultInstance from "../utils/instance";
//lat: 위도  lng : 경도 

const menuDetailGet = async (lat, lng, name) => {
  try{
    const response = await defaultInstance.get('menus/stores', {
      params:{
        lat:lat,
        lng:lng,
        name:name,
      },
    });
    console.log("통신 성공");
    return response.data;
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

export default menuDetailGet;
