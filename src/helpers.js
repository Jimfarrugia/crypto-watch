// Receives a 3-letter currency string and returns the appropriate currency symbol.
export const currencySymbol = (currency) => {
  let symbol = "";
  if (currency.charAt(currency.length - 1) === "d") {
    symbol = "$";
  } else if (currency.charAt(currency.length - 1) === "y") {
    symbol = "¥";
  } else {
    switch (currency) {
      case "gbp":
        symbol = "£";
        break;
      case "eur":
        symbol = "€";
        break;
      case "krw":
        symbol = "₩";
        break;
      case "nok":
        symbol = "Kr";
        break;
      case "chf":
        symbol = "Fr.";
        break;
      default:
        symbol = "";
    }
  }
  return symbol;
};

// Formats a number to a more readable format for currency.
// 50123456 -> $50,123,456 ....... 101.9 -> $101.90
export const formatPriceNumber = (number, currency) => {
  const symbol = currencySymbol(currency);
  let result =
    number > 1000
      ? number // commas
          .toString()
          .replace(/^/, symbol)
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      : number.toString().replace(/^/, symbol); // no commas
  if (
    // if there is a decimal point and it is in the 2nd last slot, append a "0"
    result.lastIndexOf(".") !== -1 &&
    result.lastIndexOf(".") === result.length - 2
  ) {
    return (result += "0");
  }
  return result;
};
