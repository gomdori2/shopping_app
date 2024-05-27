import styled from "@emotion/styled";
import { colorSystem } from "../styles/color";

const ButtonStyle = styled.button`
  border: 1px solid ${colorSystem.p600};
  background-color: #fff;
  color: ${colorSystem.p600};
  cursor: pointer;
  padding: 8px 16px;
  border-radius: 8px;
  &:hover {
    border: 1px solid #fff;
    background-color: ${colorSystem.p400};

    color: ${colorSystem.p700};
  }
  &:active {
    border: 1px solid ${colorSystem.primary[3]};
    background-color: ${colorSystem.primary};
    color: #fff;
  }
`;
const Button = ({ label = "버튼", onClick }) => {
  return (
    <>
      {/* 나머지 매개변수로 넘기면 따로 뭐 안해줘도 다 받을 수 있음. */}
      <ButtonStyle onClick={() => onClick()}>{label}</ButtonStyle>
    </>
  );
};

export default Button;
