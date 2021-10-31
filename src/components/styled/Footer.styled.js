import styled from "styled-components";

export const FooterStyled = styled.div`
  padding: 1.5em 0;
  margin-top: 2em;
  border-top: 1px solid ${({ theme }) => theme.color.main.dark};
  text-align: right;

  ul {
    margin: 0;
    font-size: 0.8rem;
    line-height: 1.35;
    color: ${({ theme }) => theme.color.text.secondary};

    li {
      display: block;
      position: relative;
      list-style: none;
      padding: 0.5rem 0;

      &:first-child {
        padding-top: 0.25em;
      }

      button {
        font-size: 0.8rem;
        text-decoration: none;
        text-transform: capitalize;
      }
    }
  }
`;
