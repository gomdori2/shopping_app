import { useParams } from "react-router-dom";
import ProductItemPurchaseComp from "../components/ProductItemPurchaseComp";

const ProductItemPurchase = () => {
  const param = useParams("등록된 상품이 없습니다.");
  return (
    <div>
      <h1>상품 구매하기 페이지</h1>
      <div>상품 Id: {param.productId}</div>
      <ProductItemPurchaseComp />
    </div>
  );
};

export default ProductItemPurchase;
