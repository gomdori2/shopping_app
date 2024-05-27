import { useEffect, useState } from "react";
import { getProductList } from "../api/productListApi";
import { useNavigate } from "react-router-dom";
import { API_HOST } from "../api/config";
import Button from "./common/Button";
import "./styles/global.css";
const ProductList = () => {
  // hook 자리
  const navigate = useNavigate();

  // 최신상태를 계속 반영하기 때문에
  // 의존성 배열에 넣으면 무한루프에 빠진다.
  const [productList, setProductList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // 컴포넌트 뺄때 문제가 생긴다.
  // const handleMoveReadPage = () => navigate(`${API_HOST}/${id}`);
  // useEffect 자리
  useEffect(() => {
    setIsLoading(true);
    getProductList()
      .then(response => {
        // 옵셔널 체이닝으로 undefined 넘어와도 오류안나게 처리
        const data = response?.data.products;
        setProductList(data);
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        // 얘는 오류나도 무조건 한번 실행한다.
        // 오류 났을 때 로딩을 멈춰야한다.
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div>로딩중 입니다.</div>;
  }
  return (
    <div>
      <h2>상품 목록 보여주기</h2>
      {/* 컴포넌트로 뺄 소지가 있어서 function으로 나눠서 쓰지 않는다. */}
      {productList.map(item => (
        <ul key={item.id}>
          <li
            style={{ cursor: "pointer" }}
            onClick={() => navigate(`${API_HOST}/${item.id}`)}
          >
            {item.name}
          </li>
          <li>{item.price.toLocaleString("KO-kr")}원</li>
          <li>{item.explanation}</li>
        </ul>
      ))}
    </div>
  );
};

export default ProductList;
