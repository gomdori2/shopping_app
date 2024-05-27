import { useParams } from "react-router-dom";
import ProductItemModifyComp from "../components/ProductItemModifyComp";

const ProductItemModify = () => {
  const param = useParams("");
  return (
    <div>
      <h1>상품 수정 페이지</h1>
      <div>상품 Id: {param.productId}</div>
      <ProductItemModifyComp />
    </div>
  );
};

export default ProductItemModify;
