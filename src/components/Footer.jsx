import { FooterStyled } from "./styled/Footer.styled";

const Footer = () => (
  <FooterStyled>
    <ul>
      <li>
        <a
          href="https://github.com/Jimfarrugia/cryptocurrency-tracker"
          target="blank"
          title="Source Code"
        >
          Source Code
        </a>{" "}
        on Github
      </li>
      <li>
        Authored by{" "}
        <a
          href="https://www.jimfarrugia.com.au"
          target="blank"
          title="Jim Farrugia"
        >
          Jim Farrugia
        </a>
      </li>
      <li>
        Data provided by{" "}
        <a
          href="https://www.coingecko.com/en/api/documentation"
          target="blank"
          title="CoinGecko API"
        >
          CoinGecko API
        </a>
      </li>
    </ul>
  </FooterStyled>
);

export default Footer;
