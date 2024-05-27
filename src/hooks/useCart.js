import React, { useEffect, useMemo, useState } from "react";
import { useCookies } from "react-cookie";
import { getProductOne } from "../api/productItemApi";

// 정말 지금은 몰라도 됩니다!!
// 쿠키는 기본적으로 키와 값의 형태로 저장이 된다.
// COOKIE_KEY 라는 상수를 만들어서 cart라는 쿠키값의 키를 지정
const COOKIE_KEY = "cart";

const useCart = () => {
  const [cookies, setCookies] = useCookies([COOKIE_KEY]);
  const [carts, setCarts] = useState([]);

  // productIds 변수는 cookie로 부터 가져온 id들의 정보를 저장해놓는 공간
  const productIds = useMemo(() => cookies[COOKIE_KEY] ?? [], [cookies]);

  // 상품 정보 자체를 받는 것이 아니라 id를 넘겨받아서 저장
  const addCarts = id => {
    const nextCartIds = [...productIds, id];

    setCookies(COOKIE_KEY, nextCartIds, { path: "/" });
  };

  // getProductById 함수는 인자값으로 id를 넣어주면 요청을 보내고
  // 각 상품의 id를 담아놓은 배열들을 0부터 끝까지 순회하면서
  // 각각 요청을 보내서 그 응답을 배열에 누적해야한다.
  //   const getProductById = id => {
  //     return fetch(`/product/${id}`).then(response => response.json());
  //   };

  useEffect(() => {
    if (productIds && productIds.length) {
      // 요청할 함수들을 잠시 저장해놓는 변수
      const requestIds = productIds.reduce(
        (acc, cur) => acc.set(cur, (acc.get(cur) || 0) + 1),
        new Map(),
      );

      const fetchData = async () => {
        const newCartData = [];
        for (let id of requestIds.keys()) {
          const response = await getProductOne(id);
          newCartData.push({
            ...response.data.product,
            count: requestIds.get(response.data.product.id),
          });
        }

        setCarts(prevCarts => {
          // 이전 상태를 복사하고, 새 데이터로 덮어쓰기
          const updatedCarts = [...prevCarts];
          newCartData.forEach(newCart => {
            const index = updatedCarts.findIndex(
              cart => cart.id === newCart.id,
            );
            if (index !== -1) {
              // 기존 항목을 업데이트
              updatedCarts[index] = newCart;
            } else {
              // 새 항목을 추가
              updatedCarts.push(newCart);
            }
          });
          return updatedCarts;
        });
      };

      fetchData();
    }
  }, [productIds]);

  const changeCount = (productId, mode) => {
    const index = productIds.indexOf(productId);

    if (index === -1) {
      return;
    }

    if (mode === "decrease") {
      const tempArr = [...productIds];
      tempArr.splice(index, 1);

      if (!tempArr.includes(productId)) {
        return;
      }

      setCookies(COOKIE_KEY, tempArr, { path: "/" });
    }

    if (mode === "increase") {
      setCookies(COOKIE_KEY, [...productIds, productId], { path: "/" });
    }
  };

  return { carts, addCarts, changeCount };
};

export default useCart;
// 교수님이 알려주신거
// import { useEffect, useMemo, useState } from "react";
// import { useCookies } from "react-cookie";
// import { getProductOne } from "../api/productItemApi";

// // 쿠키는 기본적으로 키와 값의 형태로 저장이 된다.
// // COOKIE_KEY 라는 상수를 만들어서 cart라는 쿠키값의 키를 지정
// // 앱 전역에서 발생

// const COOKIE_KEY = "cart";

// const useCart = () => {
//   // 비회원일 경우
//   // 쿠키에
//   // 카트의 정보 저장한다.
//   // 상품의 아이디 문자를 저장할거다.
//   // 상품의 아이디 문자로 데이터를 불러와야함.
//   const [cookies, setCookies] = useCookies([COOKIE_KEY]);

//   const [carts, setCarts] = useState([]);

//   // productIds 변수는 cookie로 부터 가져온 id들의 정보를 저장해놓는 공간
//   // 연산을 계속 해두는게 아니라 변수를 저장 해둔다.
//   // 한번 담아놓으면 계속 쓴다.

//   const productIds = useMemo(() => cookies[COOKIE_KEY] ?? [], [cookies]);

//   // 상품 정보 자체를 받는 것이 아니라 id를 넘겨받아서 저장
//   const addCarts = id => {
//     const nextCartIds = [...productIds, id];
//     setCookies(COOKIE_KEY, nextCartIds, { path: "/" });
//   };
//   // getProductById 함수는 인자값으로 id를 넣어주면 요청을 보내고
//   // 각 상품의 id를 담아놓은 배열들을 0부터 끝까지 순회하면서
//   // 각각 요청을 보내서 그 응답을 배열에 누적해야한다.
//   // const getProductById = id => {
//   //   return fetch(`/product/${id}`).then(response => {
//   //     response.json();
//   //   });
//   // };

//   useEffect(() => {
//     if (productIds && productIds.length) {
//       // requestList 변수는 요청 보낼 함수들을 잠시 저장해놓는 변수
//       const requestList = [];
//       const requestIds = productIds.reduce(
//         (acc, cur) =>
//           // 누산기 > 받아온 값을 반복 시키면서 담아둠.
//           acc.set(cur, (acc.get(cur) || 0) + 1),
//         // 새로운 배열 인스턴스를 생성해라
//         new Map(),
//       );
//       // requestIds 고유한 키값을 부여해라. - requestIds에.고유한keys()를 부여해라
//       // map이랑 비슷하다.
//       Array.from(requestIds.keys()).forEach(id => {
//         // push 할 때 api호출 해서
//         // 해당 id에 데이터를 requestList에 담아둔다.
//         requestList.push(getProductOne(id));
//       });
//       // 위에 getProductOne은 axios로 받아올 때 promise로 받아오기 때문에
//       // 데이터를 뽑아낼때 사용한다.
//       // async / await 비동기 처리를 동기처럼
//       // promise 다 동기 처럼 실행한다.
//       // 많은사람들이 서버를 계속 왔다갔다 하면 다운됨.
//       // 그렇기때문에 localStorage나 cookies 등등
//       Promise.all(requestList).then(responseList => {
//         const cartData = responseList.map(item => ({
//           ...item.data.product,
//           count: requestIds.get(item.data.product.id),
//         }));
//         setCarts(cartData);
//       });
//     }
//   }, [productIds]);

//   // 숫자가 카운트 되야하는데 데이터가 각각 하나씩 추가되듯이 들어간다
//   // 그거 방지해주려고 splice로 중복되는 값을 제거해준다.
//   // [이런식이 되야하는데 [1,2,3] 이렇게 데이터가 각각으로 들어감 [1,1,1,2,3,4]
//   const changeCount = (productId, mode) => {
//     // productId
//     // index 번호를 알고 싶을 때 indexOf
//     // 해당 id를 찾기위해서 그럼.
//     const index = productIds.indexOf(productId);

//     // 배열에서 없는 것
//     if (index === -1) {
//       return;
//     }

//     if (mode === "decrease") {
//       const tempArr = [...productIds];
//       // 동일한 index의 값이 있으면 배열에 계속 생기는게 아니라
//       // 1개만 있고 숫자만 늘고 줄게 해라 제거해라.
//       tempArr.splice(index, 1);
//       if (!tempArr.includes(productId)) {
//         return;
//       }
//       setCookies(COOKIE_KEY, tempArr, { path: "/" });
//     }

//     if (mode === "increase") {
//       setCookies(COOKIE_KEY, [...productIds, productId], { path: "/" });
//     }
//   };
//   return {
//     carts,
//     addCarts,
//     changeCount,
//   };
// };

// export default useCart;
