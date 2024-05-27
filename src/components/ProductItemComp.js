import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductOne } from "../api/productItemApi";
import useCart from "../hooks/useCart";
import useModal from "../hooks/useModal";
import Modal from "./common/Modal";
import Button from "./common/Button";
import styled from "@emotion/styled";

const ProductItemComp = () => {
  const navigate = useNavigate();
  const { productId } = useParams();

  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { addCarts } = useCart();
  const { isModalOpen, modalMessage, confirmAction, openModal, closeModal } =
    useModal();

  const handleMoveModifyPage = () => {
    if (productId) {
      navigate(`/modify/${productId}`);
    }
  };
  const handleMovePurchasePage = () => {
    if (productId) {
      navigate(`/purchase/${productId}`);
    }
  };
  const handleCartAdd = () => {
    if (product) {
      addCarts(product.id);
      openModal({
        message: "장바구니에 담기 완료!",
        onConfirm: () => {
          closeModal(), navigate("/cart");
        },
      });
    }
  };
  useEffect(() => {
    setIsLoading(true);
    // api 호출
    if (productId) {
      getProductOne(productId)
        .then(response => {
          const data = response?.data.product;
          return setProduct(data);
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => setIsLoading(false));
    }
    if (isLoading) {
      // 컴포넌트 생성 시 props나 children으로 받아라.
      return <h3>상품 목록을 불러오는중입니다...</h3>;
    }
    return () => {};
    // 아이디가 누를때마다 동적으로 바뀌기 때문에 의존성배열에 추가
  }, [productId]);

  if (!product) {
    return <h3>찾으시는 상품이 없습니다.</h3>;
  }

  return (
    <div>
      <h2>상품 상세 페이지</h2>
      <div style={{ cursor: "pointer" }}>{product.name}</div>
      {/* input에다가는 적용이 불가능함. */}
      {/* 보여줄때만 , 보여줌. */}
      <div>{product.price.toLocaleString("KO-kr")}원</div>
      <div>{product.explanation}</div>

      <Button
        type="button"
        label="상품 수정하기"
        onClick={() => handleMoveModifyPage()}
      ></Button>
      <Button
        type="button"
        onClick={() => {
          handleMovePurchasePage();
        }}
        label="상품 구매하기"
      ></Button>
      <Button
        type="button"
        label="장바구니 담기"
        onClick={() => handleCartAdd()}
      ></Button>
      {/* 모달 관련 */}
      <Modal
        isOpen={isModalOpen}
        message={modalMessage}
        onClose={closeModal}
        onConfirm={confirmAction}
      ></Modal>
    </div>
  );
};

export default ProductItemComp;
