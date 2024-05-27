import { Route, Routes } from "react-router-dom";
import ProductListPage from "./pages/ProductListPage";
import ProductItemPage from "./pages/ProductItemPage";
import ProductItemPurchase from "./pages/ProductItemPurchase";
import ProductItemCreate from "./pages/ProductItemCreate";
import ProductItemModify from "./pages/ProductItemModify";
import NotFoundPage from "./pages/NotFoundPage";
import Layout from "./components/common/Layout";
import CartPage from "./pages/CartPage";
import Responsive from "./components/styles/common/Responsive";
import styled from "@emotion/styled";

const ResponsiveFullWidthStyle = styled(Responsive)``;

const App = () => {
  return (
    // 인라인 형식으로 사용하면 responsive 에 적용됨.
    <Responsive width="100%" style={{ backgroundColor: "#ffeeee" }}>
      <Layout>
        <Routes>
          {/* 루트페이지 설정 index == path="/" */}
          <Route path="/" element={<ProductListPage />} />
          <Route path="/product" element={<ProductListPage />} />
          <Route path="/create" element={<ProductItemCreate />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="/product/:productId" element={<ProductItemPage />} />
          <Route
            path="/purchase/:productId"
            element={<ProductItemPurchase />}
          />
          <Route path="/modify/:productId" element={<ProductItemModify />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </Responsive>
  );
};

export default App;
