import { ButtonOutlinedStyled } from "./styled/ButtonOutlined.styled";

const ButtonOutlined = ({ children, color, ...props }) => (
  <ButtonOutlinedStyled {...props} color={color}>
    {children}
  </ButtonOutlinedStyled>
);

export default ButtonOutlined;
