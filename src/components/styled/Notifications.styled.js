import styled from "styled-components";
import { colors } from "../../constants";

export const NotificationsStyled = styled.div`
  /* Form section */
  & > section {
    display: grid;
    grid-template-columns: max-content auto;

    img {
      display: block;
      padding-right: 1em;
      margin: auto 0;
    }

    /* No img on small screen */
    @media screen and (max-width: 350px) {
      display: block;
      img {
        display: none;
      }
    }
    @media screen and (min-width: 490px) {
      img {
        width: 135px;
        height: auto;
      }
    }

    .threshold {
      display: flex;

      &:hover,
      &:focus-within {
        .prefix {
          background: ${({ theme }) => theme.color.main.light};
          border-color: ${({ theme }) => theme.color.main.light};
        }
        input[type="number"] {
          border-color: ${({ theme }) => theme.color.main.light};
        }
      }
      &:focus-within {
        box-shadow: 0 0 0.25em ${({ theme }) => theme.color.main.light};
      }

      .prefix {
        transition: 0.25s ease;
        color: ${colors.white};
        background: ${({ theme }) => theme.color.main.dark};
        line-height: 1.35;
        font-size: 0.9rem;
        padding: 0.6em 0.4em 0.4em;
        border: 1px solid ${({ theme }) => theme.color.main.dark};
        border-radius: 0.25em 0 0 0.25em;

        span {
          padding-left: 0.4em;
        }
      }
    }

    input[type="number"] {
      border-left: none;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      padding: 0.5em;
      font-size: 0.9rem;
      height: 100%;
      -moz-appearance: textfield;
      ::-webkit-outer-spin-button,
      ::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
      &:focus {
        box-shadow: none;
      }
    }

    button {
      margin: 1em 0 0;
    }

    & > form > div {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: 1em;
    }
  }
`;
