import styled from "styled-components";

export const RefreshButtonStyled = styled.button`
  font-size: 1rem;
  background: none;
  border: none;
  padding: 0;
  color: ${({ theme }) => theme.color.text.link};
  cursor: pointer;
  text-decoration: underline;
  transition: 0.125s;

  &:hover {
    color: ${({ theme }) => theme.color.text.hover};
  }

  &:focus {
    outline: 0.125rem solid ${({ theme }) => theme.color.text.hover};
  }
`;
