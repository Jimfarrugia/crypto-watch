import { AlertStyled } from "./styled/Alert.styled";

const Alert = ({ status, text, spacing }) => {
  return (
    <AlertStyled background={status || "main"} spacing={spacing}>
      {text}
    </AlertStyled>
  );
};

export default Alert;
