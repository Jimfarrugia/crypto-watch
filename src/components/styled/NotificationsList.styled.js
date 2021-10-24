import styled from "styled-components";

export const NotificationsListStyled = styled.div`
  margin-top: 2em;
  padding-top: 1em;
  border-top: 1px solid ${({ theme }) => theme.color.main.dark};

  ul,
  li {
    padding: 0;
    margin: 0;
    list-style: none;
  }

  ul {
    max-width: 400px;
    margin: 0 auto;
  }

  li {
    display: flex;
    border-bottom: 1px solid ${({ theme }) => theme.color.main.dark};
    margin-bottom: 1em;
    padding-bottom: 1em;

    &:last-child {
      border: none;
      margin: 0 0 -1em;
      padding: 0;
    }
  }

  img {
    display: block;
    padding-right: 1em;
    margin: auto 0;
  }

  h4 {
    margin: 0.5em 0;
  }

  p {
    margin: 0.5em 0;
  }

  div:nth-child(2) {
    flex-grow: 1;
  }

  div:last-child {
    align-self: center;

    button {
      color: ${({ theme }) => theme.color.error.dark};
      background: none;
      cursor: pointer;
      outline: none;
      border: none;
      padding: 0 0.5em 0 0;

      svg {
        font-size: 1.75rem;
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
