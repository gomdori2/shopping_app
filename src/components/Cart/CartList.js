import React from "react";
import { useNavigate } from "react-router-dom";
import useCart from "../../hooks/useCart";
import useModal from "../../hooks/useModal";
import Modal from "../common/Modal";
import Button from "../common/Button";

const CartList = () => {
  const navigate = useNavigate();
  const { carts, changeCount } = useCart();
  const { closeModal, confirmAction, isModalOpen, modalMessage, openModal } =
    useModal();
  const totalPrice = carts.reduce(
    (prev, cur) => prev + cur.price * cur.count,
    0,
  );
  const handlePurchase = e => {
    openModal({
      message: "성공적으로 구매하였습니다.",
      onConfirm: () => {
        closeModal();
        navigate("/");
      },
    });
  };
  return (
    <div>
      <h2>장바구니</h2>
      <div>
        {carts.length === 0 ? (
          <h3>장바구니에 담긴 상품이 없습니다.</h3>
        ) : (
          carts.map(item => (
            <div key={item.id}>
              <ul>
                <li>{item.name}</li>
                <li>{item.price}</li>
              </ul>
              <div>
                <Button
                  label="-"
                  onClick={() => {
                    changeCount(item.id, "decrease");
                  }}
                />
                <strong>{item.count}</strong>
                <Button
                  label="+"
                  onClick={() => {
                    changeCount(item.id, "increase");
                  }}
                />
              </div>
            </div>
          ))
        )}
      </div>
      <div>
        <h2>결제 정보</h2>
        <ul>
          <li>배 송 비 : 무료</li>
          <li>총 결제 금액 : {totalPrice}원</li>
        </ul>
        <Button label="결제하기" onClick={handlePurchase} />
      </div>
      {/* 모달관련 */}
      <Modal
        isOpen={isModalOpen}
        message={modalMessage}
        onClose={closeModal}
        onConfirm={confirmAction}
      />
    </div>
  );
};

export default CartList;
