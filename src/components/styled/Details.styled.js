import styled from "styled-components";

export const DetailsStyled = styled.div`
  header {
    text-align: center;

    & > div:first-child {
      position: relative;
      width: fit-content;
      margin: 0 auto;

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
          color: ${({ theme }) => theme.colors.yellow};

          path {
            filter: drop-shadow(-0.5em 1em 3em var(--black));
          }
        }

        &:hover,
        &:focus {
          color: ${({ theme }) => theme.colors.purpleBright};
          border-color: ${({ theme }) => theme.colors.purpleBright};

          svg {
            color: ${({ theme }) => theme.colors.purpleBright};
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
    color: ${({ theme, priceColor }) => theme.colors[priceColor]};
  }
`;
