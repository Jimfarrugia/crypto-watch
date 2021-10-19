import styled from "styled-components";

export const FooterStyled = styled.div`
  padding: 1.5rem 0;

  ul {
    padding: 0.75rem 0 0;
    margin: 0;
    font-size: 0.8rem;
    color: ${({ theme }) => theme.colors.gray};
    border-top: 1px solid ${({ theme }) => theme.colors.purple};

    li {
      display: block;
      position: relative;
      list-style: none;
      text-align: right;
      padding: 0.5rem 0;
    }
  }
`;
