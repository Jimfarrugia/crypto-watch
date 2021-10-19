import { AlertStyled } from "./styled/Alert.styled";

const Alert = ({ status, text, spacing }) => {
  const background =
    status === "success"
      ? "greenDark"
      : status === "error"
      ? "redDark"
      : "purple";

  return (
    <AlertStyled background={background} spacing={spacing}>
      {text}
    </AlertStyled>
  );
};

export default Alert;
