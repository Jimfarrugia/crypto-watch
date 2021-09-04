const Footer = () => {
  return (
    <footer className="page-footer">
      <ul>
        <li>
          <a
            href="https://github.com/Jimfarrugia/cryptocurrency-tracker"
            target="blank"
          >
            Source Code
          </a>
        </li>
        <li>
          <a href="https://www.jimfarrugia.com.au" target="blank">
            Jim Farrugia
          </a>
        </li>
        <li>
          Data provided by{" "}
          <a
            href="https://www.coingecko.com/en/api/documentation"
            target="blank"
          >
            CoinGecko API
          </a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
