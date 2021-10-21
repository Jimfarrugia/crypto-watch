import styled from "styled-components";

export const ButtonOutlinedStyled = styled.button`
  width: ${({ fullWidth }) => (fullWidth ? "100%" : "fit-content")};
  color: ${({ theme, color }) => theme.color[color || "main"].dark};
  font-size: 0.9rem;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.075rem;
  background: none;
  border: 0.125rem solid
    ${({ theme, color }) => theme.color[color || "main"].dark};
  border-radius: 0.2rem;
  padding: 0.75em 1.5em;
  outline: none;
  cursor: pointer;
  transition: 0.125s;

  &:hover,
  &:focus {
    color: ${({ theme, color }) => theme.color[color || "main"].light};
    border-color: ${({ theme, color }) => theme.color[color || "main"].light};
  }

  &:focus {
    box-shadow: 0 0 0.25em
      ${({ theme, color }) => theme.color[color || "main"].light};
  }

  &:disabled {
    color: ${({ theme }) => theme.color.neutral.gray.dark};
    border-color: ${({ theme }) => theme.color.neutral.gray.dark};
    svg {
      color: ${({ theme }) => theme.color.neutral.gray.dark};
      border-color: ${({ theme }) => theme.color.neutral.gray.dark};
    }
  }
`;
