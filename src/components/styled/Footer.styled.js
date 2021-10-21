import styled from "styled-components";

export const FooterStyled = styled.div`
  padding: 1.5rem 0;

  ul {
    padding: 0.75rem 0 0;
    margin: 0;
    font-size: 0.8rem;
    color: ${({ theme }) => theme.color.text.secondary};
    border-top: 1px solid ${({ theme }) => theme.color.main.dark};

    li {
      display: block;
      position: relative;
      list-style: none;
      text-align: right;
      padding: 0.5rem 0;

      button {
        font-size: 0.8rem;
        text-decoration: none;
        text-transform: capitalize;
      }
    }
  }
`;
