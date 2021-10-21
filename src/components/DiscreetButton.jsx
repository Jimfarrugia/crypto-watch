import { DiscreetButtonStyled } from "./styled/DiscreetButton.styled";

const DiscreetButton = ({ text, ...props }) => {
  return <DiscreetButtonStyled {...props}>{text}</DiscreetButtonStyled>;
};

export default DiscreetButton;
