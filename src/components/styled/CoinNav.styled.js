import styled from "styled-components";

export const CoinNavStyled = styled.nav`
  overflow: auto;

  ul {
    padding: 0;
    margin: 0;
    list-style-type: none;
    display: flex;
    justify-content: space-between;
  }

  ul > li {
    padding: 0.25em 0.25em 0;
    margin: 0;
    list-style-type: none;
    position: relative;

    &:first-child {
      padding-left: 0;
    }

    & > button {
      display: block;
      color: ${({ theme }) => theme.colors.gray};
      background: none;
      border: none;
      outline: none;
      cursor: pointer;
      padding: 0;
      margin: 0;
      text-align: center;

      & > img {
        pointer-events: none;
        display: inline-block;
      }

      & > span {
        font-family: "Ubuntu Mono", "Courier New", monospace;
        display: inline-block;
        padding: 0.25rem 0;
        transition: ease 0.25s;
        border-bottom: 0.15rem solid ${({ theme }) => theme.colors.black};
      }

      &:hover > span,
      &:focus > span {
        color: ${({ theme }) => theme.colors.purpleBright};
      }

      &:focus > span {
        border-color: ${({ theme }) => theme.colors.purpleBright};
      }
    }

    // Star
    & > svg {
      pointer-events: none;
      color: ${({ theme }) => theme.colors.yellow};
      position: absolute;
      top: 0px;
      right: -2px;

      & > path {
        filter: drop-shadow(
          -0.5em 1em 3em ${({ theme }) => theme.colors.black}
        );
      }
    }
  }
`;
