import styled from "styled-components";
import { colors } from "../../constants";

export const AlertStyled = styled.div`
  background: ${({ theme, background }) => theme.color[background].dark};
  color: ${colors.white};
  width: fit-content;
  margin: 0 auto;
  padding: 1em;
  border-radius: 0.25em;
  line-height: 1.35;
  box-sizing: border-box;
  margin-bottom: ${({ spacing }) => `${spacing || 0}em`};
`;
