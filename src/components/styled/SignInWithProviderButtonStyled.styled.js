import styled from "styled-components";

export const SignInWithProviderButtonStyled = styled.button`
  width: ${({ fullWidth }) => (fullWidth ? "100%" : "fit-content")};
  color: ${({ theme }) => theme.colors.purple};
  font-size: 1rem;
  font-weight: bold;
  background: none;
  border: 0.125rem solid ${({ theme }) => theme.colors.purple};
  border-radius: 0.2rem;
  padding: 0.75em 1.5em;
  margin-bottom: 0.75em;
  outline: none;
  cursor: pointer;
  transition: 0.125s;

  &:hover,
  &:focus {
    color: ${({ theme }) => theme.colors.purpleBright};
    border-color: ${({ theme, color }) =>
      theme.colors[color || "purpleBright"]};
  }

  &:focus {
    box-shadow: 0 0 0.25em ${({ theme }) => theme.colors.purpleBright};
  }

  &:disabled {
    color: ${({ theme }) => theme.colors.grayDark};
    border-color: ${({ theme }) => theme.colors.grayDark};
    svg {
      color: ${({ theme }) => theme.colors.grayDark};
      border-color: ${({ theme }) => theme.colors.grayDark};
    }
  }

  svg {
    margin-right: 0.5em;
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.purpleBright};
  }
`;
