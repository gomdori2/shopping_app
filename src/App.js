import { useRef, useState } from "react";

const ProductItem = ({ product, onDelete, onUpdate }) => {
  const { id, explanation, name, price } = product;
  const [isEditMode, setIsEditMode] = useState(false);
  const [editName, setEditName] = useState(product.name);
  const [editExplanation, setEditExplanation] = useState(product.explanation);
  const [editPrice, setEditPrice] = useState(product.price);

  return (
    <div>
      <div>{id}</div>
      <div>{name}</div>
      <div>{explanation}</div>
      <div>{price}</div>
      {/* 삼항으로 form 나오게  */}

      <button
        type="button"
        onClick={() => {
          onDelete(id);
        }}
      >
        삭제하기
      </button>
      {/* 버튼을 누르면 수정할 수 있는 폼이 나온다. */}
      <button
        type="button"
        onClick={() => {
          // 아래 왔다갔다 삼항연산자로 하는게 아니라
          // 부정연산자로 true false를 들어올때마다
          // 반대값으로 바꿔서 return한다.
          setIsEditMode(isEditMode => !isEditMode);
          // setIsEditMode(isEditMode === false ? true : false);
        }}
      >
        수정하기
      </button>
      {/* {isEditMode === true ? ()} */}
      {isEditMode && (
        <form
          onSubmit={e => {
            e.preventDefault();

            onUpdate({
              id,
              name: editName,
              explanation: editExplanation,
              price: editPrice,
            });
          }}
        >
          <input
            type="text"
            placeholder="상품 이름"
            value={editName}
            onChange={e => setEditName(e.target.value)}
          ></input>
          <input
            type="text"
            placeholder="상품 설명"
            value={editExplanation}
            onChange={e => setEditExplanation(e.target.value)}
          ></input>
          <input
            type="number"
            placeholder="상품 가격"
            value={editPrice}
            onChange={e => setEditPrice(parseInt(e.target.value, 10))}
          ></input>
          <input type="submit" value="상품 수정하기"></input>
        </form>
      )}
    </div>
  );
};

function App() {
  // 상태 관리
  const [products, setProducts] = useState([
    {
      id: 0,
      name: "스타벅스 기프티콘",
      explanation:
        "교환유효기간은 93일 입니다. (시즌성 상품, 기업경품(B2B), 할인상품의 경우 유효기간이 상이 할 수 있습니다.)",
      price: 10000,
    },
  ]);
  // 클로저라 최신값을 계속 물고 있음.
  const [name, setName] = useState("");
  const [explanation, setExplanation] = useState("");
  const [price, setPrice] = useState(0);

  // 순수 자바스크립트 객체를 반환한다.
  // 객체 : 프로퍼티 / 메서드 로 구성되어있다.
  const fakeId = useRef(0);

  // return을 반환하지 않는 함수
  // 보이드함수
  // 이벤트 핸들러 함수
  const handleCreate = newProduct => {
    fakeId.current += 1;
    // 스프레드 연산자로 products 내부의 값을 복사
    // newProduct 매개변수로 받는 값들 복사
    // 이후 id : fakeId.current 를 집어넣는다.
    setProducts([...products, { ...newProduct, id: fakeId.current }]);
  };
  const handleDelete = id => {
    setProducts(products.filter(product => product.id !== id));
  };
  function handleUpdate(updatedProduct) {
    setProducts(
      products.map(product =>
        product.id === updatedProduct.id ? updatedProduct : product,
      ),
    );
  }
  return (
    <>
      <form
        onSubmit={e => {
          e.preventDefault();
          handleCreate({ name, explanation, price });
        }}
      >
        <input
          type="text"
          placeholder="상품 이름"
          onChange={e => {
            setName(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="상품 설명"
          onChange={e => setExplanation(e.target.value)}
        />
        <input
          type="number"
          placeholder="상품 가격"
          onChange={e => {
            // parseInt(e.target.value), 십진수로 하겠다. : 10
            setPrice(parseInt(e.target.value), 10);
          }}
        />
        <input type="submit" value="상품 등록하기" />
      </form>

      {products.map(product => (
        <ProductItem
          key={product.id}
          product={product}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        ></ProductItem>
      ))}
    </>
  );
}

export default App;
