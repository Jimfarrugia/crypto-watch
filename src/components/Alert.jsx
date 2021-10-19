import { AlertStyled } from "./styled/Alert.styled";

const Alert = ({ status, text }) => {
  const background =
    status === "success"
      ? "greenDark"
      : status === "error"
      ? "redDark"
      : "purple";

  return <AlertStyled background={background}>{text}</AlertStyled>;
};

export default Alert;
