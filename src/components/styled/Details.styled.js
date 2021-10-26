import styled from "styled-components";
const currentTheme =
  localStorage.getItem("theme") === "light" ? "light" : "dark";

export const DetailsStyled = styled.div`
  header {
    text-align: center;

    & > div:first-child {
      position: relative;
      width: fit-content;
      margin: 3em auto 0;

      button {
        display: inline-block;
        cursor: pointer;
        background: none;
        outline: none;
        border: none;
        border-radius: 100%;
        font-size: 2rem;
        position: absolute;
        top: -0.25em;
        right: -0.5em;

        svg {
          margin-left: -0.125em;
          color: ${({ theme }) => theme.color.highlight};

          path {
            filter: drop-shadow(
              -0.5em 1em 3em ${({ theme }) => theme.color.background}
            );
          }
        }

        &:hover,
        &:focus {
          color: ${({ theme }) => theme.color.main.light};

          svg {
            color: ${({ theme }) => theme.color.main.light};
          }
        }
      }
    }
  }

  h2 {
    margin: 1em 0 0;

    small {
      font-size: 1rem;
      font-weight: normal;
      font-family: "Ubuntu Mono", "Courier New", monospace;
    }
  }

  p {
    font-size: 2.5rem;
    font-weight: bold;
    padding: 0;
    margin: 0.5em 0 1em;
    color: ${({ theme, priceColor }) =>
      priceColor
        ? currentTheme === "light"
          ? theme.color[priceColor].dark
          : theme.color[priceColor].light
        : theme.color.text.main};
  }
`;
