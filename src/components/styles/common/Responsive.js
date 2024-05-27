import styled from "@emotion/styled";

const ResponsiveStyle = styled.div`
  margin: 20px auto;
  padding: 0px 1rem;
  width: 1200px;

  @media all and (max-width: 1024px) {
    width: 768px;
  }

  @media all and (max-width: 768px) {
    width: 100%;
  }
`;

// 나머지 매개변수를
// 해당 위에 styled에 추가하는 형식으로 간다.
// 공통 반응형 컴포넌트
const Responsive = ({ children, ...rest }) => {
  return <ResponsiveStyle {...rest}>{children}</ResponsiveStyle>;
};

export default Responsive;
