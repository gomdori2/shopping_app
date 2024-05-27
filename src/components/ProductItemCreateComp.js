import { useEffect, useState } from "react";
import { createProduct } from "../api/productItemCreateApi";
import { useNavigate } from "react-router-dom";
import { API_HOST } from "../api/config";
import Button from "./common/Button";

const ProductItemCreateComp = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [explanation, setExplanation] = useState("");

  // 모달 true / false
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 로딩 true / false
  const [isLoading, setIsLoading] = useState(false);

  const handleNameChange = e => {
    setName(e.target.value);
  };
  const handlePriceChange = e => {
    setPrice(Number(e.target.value));
  };
  const handleExplanationChange = e => {
    setExplanation(e.target.value);
  };
  // async await 걸어야 promise 형태로 안넘어옴.
  // promise로 넘어온다면 Promise all 이란것도 있다고 함.
  const handleCreateProduct = async e => {
    e.preventDefault();
    setIsLoading(true);
    const response = await createProduct({ name, price, explanation });

    if (response) {
      setIsLoading(false);
      setIsModalOpen(true);
    }
  };

  const handleMoveListPage = () => {
    setIsModalOpen(false);
    navigate(`${API_HOST}`);
  };

  if (isLoading) {
    return <h3>상품을 등록 하는 중 입니다...</h3>;
  }
  if (isModalOpen) {
    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.4)",
        }}
      >
        <div
          style={{
            position: "absolute",
            display: "flex",
            top: "45%",
            left: "40%",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
            backgroundColor: "white",
          }}
        >
          <div>상품을 성공적으로 추가하였습니다.</div>
          <div>확인을 누르면 상품 목록 페이지로 이동합니다.</div>
          <Button label={"확인"} onClick={handleMoveListPage} />
        </div>
      </div>
    );
  }
  return (
    <div>
      <h2>상품등록 페이지</h2>
      <form onSubmit={handleCreateProduct}>
        {/* value 바꿔야함. */}
        <input
          type="text"
          placeholder="상품 이름"
          value={name}
          onChange={handleNameChange}
        />
        <br />
        <br />
        <input
          type="number"
          placeholder="상품 가격"
          value={price}
          onChange={handlePriceChange}
        />
        <br />
        <br />
        <textarea
          type="text"
          placeholder="상품 설명"
          value={explanation}
          onChange={handleExplanationChange}
          rows={4}
        />
        <br />
        <br />
        <Button label="상품 정보 등록하기" />
      </form>
    </div>
  );
};

export default ProductItemCreateComp;
