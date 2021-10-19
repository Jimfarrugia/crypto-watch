import styled from "styled-components";

export const ButtonOutlinedStyled = styled.button`
  width: ${({ fullWidth }) => (fullWidth ? "100%" : "fit-content")};
  color: ${({ theme, color }) =>
    theme.colors[color ? `${color}Dark` : "purple"]};
  font-size: 0.9rem;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.075rem;
  background: none;
  border: 0.125rem solid
    ${({ theme, color }) => theme.colors[color ? `${color}Dark` : "purple"]};
  border-radius: 0.2rem;
  padding: 0.75em 1.5em;
  outline: none;
  cursor: pointer;
  transition: 0.125s;

  &:hover,
  &:focus {
    color: ${({ theme, color }) => theme.colors[color || "purpleBright"]};
    border-color: ${({ theme, color }) =>
      theme.colors[color || "purpleBright"]};
  }

  &:focus {
    box-shadow: 0 0 0.25em
      ${({ theme, color }) =>
        theme.colors[color ? `${color}Dark` : "purpleBright"]};
  }

  &:disabled {
    color: ${({ theme }) => theme.colors.grayDark};
    border-color: ${({ theme }) => theme.colors.grayDark};
    svg {
      color: ${({ theme }) => theme.colors.grayDark};
      border-color: ${({ theme }) => theme.colors.grayDark};
    }
  }
`;
