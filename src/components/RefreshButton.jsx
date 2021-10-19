import { RefreshButtonStyled } from "./styled/RefreshButton.styled";

const RefreshButton = () => {
  return (
    <RefreshButtonStyled onClick={() => window.location.reload()}>
      refresh
    </RefreshButtonStyled>
  );
};

export default RefreshButton;
