import styled from "styled-components";

export const SignInWithProviderButtonStyled = styled.button`
  width: ${({ fullWidth }) => (fullWidth ? "100%" : "fit-content")};
  color: ${({ theme }) => theme.color.main.dark};
  font-size: 1rem;
  font-weight: bold;
  background: none;
  border: 0.125rem solid ${({ theme }) => theme.color.main.dark};
  border-radius: 0.2rem;
  padding: 0.75em 1.5em;
  margin-bottom: 0.75em;
  outline: none;
  cursor: pointer;
  transition: 0.125s;

  &:hover,
  &:focus {
    color: ${({ theme }) => theme.color.main.light};
    border-color: ${({ theme }) => theme.color.main.light};
  }

  &:focus {
    box-shadow: 0 0 0.25em ${({ theme }) => theme.color.main.light};
  }

  &:disabled {
    color: ${({ theme }) => theme.color.disabled};
    border-color: ${({ theme }) => theme.color.disabled};
    svg {
      color: ${({ theme }) => theme.color.disabled};
      border-color: ${({ theme }) => theme.color.disabled};
    }
  }

  svg {
    margin-right: 0.5em;
    font-size: 1rem;
    color: ${({ theme }) => theme.color.main.light};
  }
`;
