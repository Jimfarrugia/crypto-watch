import styled from "styled-components";

export const NotificationsListStyled = styled.div`
  margin-top: 1.75em;
  padding-top: 2em;
  border-top: 1px solid ${({ theme }) => theme.color.main.dark};

  ul,
  li {
    padding: 0;
    margin: 0;
    list-style: none;
  }

  ul {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 1em;
  }
  @media screen and (max-width: 700px) {
    ul {
      grid-template-columns: 1fr 1fr;
    }
  }
  @media screen and (max-width: 500px) {
    ul {
      grid-template-columns: 1fr;
    }
  }

  li {
    display: flex;
    border: 1px solid ${({ theme }) => theme.color.main.dark};
    padding: 1em;
    border-radius: 0.25em;
    align-items: center;

    img {
      display: block;
      padding-right: 1em;
    }

    h4 {
      line-height: 1.35;
      margin: 0 0 0.25em;
    }

    p {
      margin: 0;
      span {
        font-size: 0.9rem;
      }
    }

    div:nth-child(2) {
      flex-grow: 1;
    }

    button {
      color: ${({ theme }) => theme.color.error.dark};
      background: none;
      cursor: pointer;
      outline: none;
      border: none;
      padding: 0 0 0 1em;

      svg {
        font-size: 24px;
      }

      &:hover {
        color: ${({ theme }) => theme.color.error.light};
      }

      &:focus {
        & > svg {
          color: ${({ theme }) => theme.color.error.light};
        }
      }
    }
  }
`;
