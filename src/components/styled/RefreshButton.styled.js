import styled from "styled-components";

export const RefreshButtonStyled = styled.button`
  font-size: 1rem;
  background: none;
  border: none;
  padding: 0;
  color: ${({ theme }) => theme.colors.purpleBright};
  cursor: pointer;
  text-decoration: underline;
  transition: 0.125s;

  &:hover {
    color: ${({ theme }) => theme.colors.purple};
  }

  &:focus {
    outline: 0.125rem solid ${({ theme }) => theme.colors.purple};
  }
`;
