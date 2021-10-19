import styled from "styled-components";

export const AlertStyled = styled.div`
  background: ${({ theme, background }) => theme.colors[background]};
  width: fit-content;
  margin: 0 auto;
  padding: 1em;
  border-radius: 0.25em;
  line-height: 1.35;
  box-sizing: border-box;
`;
