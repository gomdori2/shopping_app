import { useNavigate } from "react-router-dom";
import useModal from "../hooks/useModal";
import Modal from "./common/Modal";

const ProductItemPurchaseComp = () => {
  const navigate = useNavigate();
  const { isModalOpen, modalMessage, confirmAction, openModal, closeModal } =
    useModal();

  const handleSubmit = e => {
    e.preventDefault();

    openModal({
      message: "성공적으로 구매하였습니다!",
      onConfirm: () => {
        closeModal();
        navigate("/product");
      },
    });
    console.log("성공적으로 구매하였습니다.");
  };

  const handleCartAdd = () => {
    openModal({
      message: "장바구니에 상품을 추가하였습니다!",
      onConfirm: () => {
        closeModal();
        navigate("/cart");
      },
    });
  };

  return (
    <div>
      <h2>상품 구매 페이지</h2>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <label htmlFor={"uname"}>이름</label>
        <input autoFocus type="text" id="uname" />
        <br />
        <br />

        <label htmlFor={"email"}>email</label>
        <input type="mail" id="email" />
        <br />
        <br />

        <label htmlFor={"uddr"}>배송 주소</label>
        <input type="text" id="uddr" />
        <br />
        <br />
        <label htmlFor="payInfo">결제 정보</label>

        <select id="pay">
          <option value={1}>신용카드/체크카드</option>
          <option value={2}>무통장 입금</option>
          <option value={3}>휴대폰 결제</option>
        </select>
        <br />
        <input type="submit" value={"구매완료"} />
      </form>
      <button type="button" onClick={handleCartAdd}>
        장바구니에 담기
      </button>
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

export default ProductItemPurchaseComp;
