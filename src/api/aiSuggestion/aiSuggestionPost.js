import defaultInstance from "../utils/instance";
//lat: 위도  lng : 경도 
const aiSuggestionPost = async (lat, lng, concept, count=15) => {
  try{
    const token=localStorage.getItem("token");
    const body={
      latitude: lat,
      longitude:lng,
      concept,
      count,//15고정
    };
    const response=await defaultInstance.post("menus/recommend", body, {
      headers:{
         Authorization: `Bearer ${token}`,
      }
    });
    console.log("AI 통신 성공");
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
export default aiSuggestionPost;
