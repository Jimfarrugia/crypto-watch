import styled from "styled-components";
import { colors } from "../../constants";

export const HeaderWrapper = styled.div`
  margin: 0 0 1.5em;
  background: linear-gradient(
    ${({ theme }) => theme.color.main.light},
    ${({ theme }) => theme.color.main.dark}
  );
`;

export const HeaderStyled = styled.header`
  min-width: 285px;
  max-width: 700px;
  margin: 0 auto;
  padding: 0 0.75em;
  line-height: 1.35;
  position: relative;

  & > h1 > a {
    &:link,
    &:visited {
      color: ${colors.white};
      outline: none;
    }
  }

  & > h1 > a > img {
    margin-right: 0.25em;
    margin-bottom: -0.18em;
    -moz-animation: spinHorizontal 3s infinite linear;
    -o-animation: spinHorizontal 3s infinite linear;
    -webkit-animation: spinHorizontal 3s infinite linear;
    animation: spinHorizontal 3s infinite linear;
  }

  @keyframes spinHorizontal {
    0% {
      transform: rotateY(0deg);
    }
    100% {
      transform: rotateY(360deg);
    }
  }
`;

export const UserNav = styled.nav`
  position: absolute;
  top: 0;
  right: 0.75em;
  display: flex;
`;

export const UserNavButton = styled.button`
  margin: 0.9em 0 0 1em;
  padding: 0.5em 0.75em;
  color: ${colors.white};
  background: none;
  outline: none;
  border: 0.125rem solid ${colors.white};
  border-radius: 100%;
  cursor: pointer;

  svg {
    font-size: 1rem;
  }

  &:hover {
    color: ${({ theme }) => theme.color.highlight};
    border-color: ${({ theme }) => theme.color.highlight};
  }

  &:focus {
    border-color: ${({ theme }) => theme.color.highlight};
    & > svg {
      color: ${({ theme }) => theme.color.highlight};
    }
  }
`;

export const UserNavImageButton = styled.button`
  display: block;
  height: 2.575em;
  width: 2.825em;
  margin: 0.9em 0 0 1em;
  padding: 0;
  background: none;
  outline: none;
  border: 0.125rem solid ${colors.white};
  border-radius: 100%;
  overflow: hidden;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.color.highlight};
    border-color: ${({ theme }) => theme.color.highlight};
  }

  &:focus {
    border-color: ${({ theme }) => theme.color.highlight};
  }

  & > img {
    width: 100%;
    height: auto;
    pointer-events: none;
    display: inline-block;
    border-radius: 100%;
    position: relative;
    top: -0.125rem;
  }
`;
