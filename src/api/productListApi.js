import axios from "axios";
import { API_HOST } from "./config";

const dataUrl = `${API_HOST}`;
// 매개변수로 이벤트 핸들러 등등을 호출 시켜서 그 순간에
// 모달을 띄우든 예외처리 시키면 된다.
export const getProductList = async () => {
  try {
    const response = await axios.get(dataUrl);
    // 예외처리
    if (response.status === 200) {
      // console.log("상품 목록을 불러오는데 성공");
      // 모달을 띄운다는 전제가 됬을 때 카카오 블로그 POPUP 참고 할것.
      // 매개변수로 이벤트 핸들러 등등을 호출 시켜서 그 순간에
      // 모달을 띄우든 예외처리 시키면 된다.
      // 매개 변수로 받은 이벤트로 모달
    }
    return response;
  } catch (error) {
    console.log(error);
  }
};
