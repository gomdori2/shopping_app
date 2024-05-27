import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteProduct,
  getProductOne,
  modifyProduct,
} from "../api/productItemModify";
import useModal from "../hooks/useModal";
import Modal from "./common/Modal";
import Button from "./common/Button";
import styled from "@emotion/styled";

// 오류 수정을 위해서 초기값을 설정해서 아래 product에 지정해줌.
// typeScript 할 때 이렇게 기본적으로 지정해주고 오는거 같음.
const initState = {
  id: "",
  name: "",
  price: 0,
  explanation: "",
};

// 보통 수정하기 페이지는 종속되어서 상위 컴포넌트에서
// props로 데이터를 받아서 하면 이럴일이 없다고 하심.
const ProductItemModifyComp = () => {
  const navigate = useNavigate();
  // useModal 커스텀 훅을 사용하여 모달 상태와 제어 함수 가져오기
  const { closeModal, confirmAction, isModalOpen, modalMessage, openModal } =
    useModal();

  // url에 있는 id 뽑기위한 useParams
  const { productId } = useParams();

  // 단건 조회를 위한 useState
  const [product, setProduct] = useState(initState);

  // 모달 / 로딩을 위한 useState 변수들
  // 시간을 어느정도 잡아먹는 페이지면 걸어주자
  const [isLoading, setIsLoading] = useState(false);

  // 입력 값이 변경될 때 마다 product를 업데이트하는 펑션
  const handleChange = e => {
    // 객체 리터럴에 스프레드 연산자로 복사 후
    // name에 잡혀있는 value들을 넣음.
    // 구조분해할당 , 변수에 담아서 활용
    const updateProduct = { ...product, [e.target.name]: e.target.value };
    setProduct(updateProduct);
  };

  // 단건 상품 조회
  const fetchProduct = async id => {
    try {
      const response = await getProductOne(id);

      const data = response.data;

      if (data && data.product) {
        setProduct(data?.product);
        console.log("상품 조회 완료", data.message);
      } else {
        console.log("상품 불러오는데 실패");
        return;
      }
    } catch (error) {
      console("상품 조회 중 오류 발생", error);
    } finally {
      setIsLoading(false);
    }
  };
  // 상품 정보를 수정하는 함수
  const handlePatchProduct = async product => {
    try {
      await modifyProduct(product);
      // 수정 완료 후 모달
      openModal({
        message: "수정이 완료 되었습니다.",
        onConfirm: () => {
          closeModal();
          navigate(`/product/${productId}`);
        },
      });
    } catch (error) {
      console.log("수정 중 오류 발생", error);
    }
  };

  // form 제출 시 호출 되는 함수
  const handleSubmit = async e => {
    e.preventDefault();
    await handlePatchProduct(product);
  };

  // async > await 안해주면 데이터가 반영이 안된채로 그냥 넘어가버림
  // 그러면 list 화면에 해당 데이터가 반영이 안됨.
  // 뭔가 데이터가 안불러 와질 때 async > await 를 생각해보자

  // 상품 삭제 확인 모달을 여는 함수
  const handleDelete = () => {
    // 삭제 기다려야함 모달에서 확인해서
    openModal({
      message: "정말 삭제하시겠습니까?",
      onConfirm: async () => {
        try {
          const response = await deleteProduct(productId);
          const resStatus = response.status.toString().charAt(0);
          console.log(resStatus);
          if (resStatus === "2") {
            console.log("삭제 완료");
            closeModal();
            navigate(`/product`);
          }
        } catch (error) {
          console.log("삭제중 오류 발생 : ", error);
        }
      },
    });
  };

  // 기능들
  useEffect(() => {
    setIsLoading(true);
    // async await > 비동기를 동기처럼 사용할 수 있게 해준다.
    // promise 쭉 다해놓고 한꺼번에 데이터를 들고 있다가 하나하나씩 주는것.
    // 그냥 함수를 쓰지않고 쓸지

    // API 호출하는 함수를 만들어서 쓸지

    fetchProduct(productId);
    console.log(product?.name);
  }, [productId]);

  // 로딩
  if (isLoading) {
    return <h3>상품 정보를 불러오는 중입니다.</h3>;
  }

  return (
    <div>
      <h2>상품 수정 페이지</h2>
      <form onSubmit={handleSubmit} autoComplete="off">
        <div>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={e => handleChange(e)}
          />
          <br />
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={e => handleChange(e)}
          />
          <br />
          <textarea
            type="text"
            name="explanation"
            value={product.explanation}
            rows={4}
            onChange={e => handleChange(e)}
          />
          <br />
          <Button label="상품 수정하기" onClick={""}></Button>

          {/* 모달 관련 */}
        </div>
      </form>
      <Modal
        isOpen={isModalOpen}
        message={modalMessage}
        onClose={closeModal}
        onConfirm={confirmAction}
      />
      <Button label="상품 삭제하기" onClick={handleDelete}>
        상품 삭제하기
      </Button>
    </div>
  );
};

export default ProductItemModifyComp;
