import { useParams } from "react-router-dom";
import ProductItemComp from "../components/ProductItemComp";

const ProductItemPage = () => {
  const param = useParams(null);
  return (
    <div>
      <h1>상품 상세보기 페이지 입니다.</h1>
      <div>
        상품 Id:{" "}
        {param.productId !== null ? param.productId : "해당 상품이 없습니다."}
      </div>
      {/* 이거 ListItem을 누르면 오게 해야함. */}
      <ProductItemComp />
    </div>
  );
};

export default ProductItemPage;
