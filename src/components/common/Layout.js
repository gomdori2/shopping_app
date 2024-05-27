import { useNavigate } from "react-router-dom";
import useCart from "../../hooks/useCart";
const Layout = ({ children }) => {
  const navigate = useNavigate();
  const { carts } = useCart();
  const handleMoveHome = () => navigate("/");
  const handleMoveCreate = () => navigate("/create");
  const handleMoveCart = () => navigate("/cart");
  return (
    <>
      <ul>
        <li onClick={handleMoveHome} style={{ cursor: "pointer" }}>
          집으로
        </li>
        <li onClick={handleMoveCreate} style={{ cursor: "pointer" }}>
          상품 등록하기
        </li>
        <li onClick={handleMoveCart} style={{ cursor: "pointer" }}>
          장바구니{carts.length}
        </li>
      </ul>
      <div>{children}</div>
    </>
  );
};

export default Layout;
