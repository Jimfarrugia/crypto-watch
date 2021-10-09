// Receives a 3-letter currency string and returns the appropriate currency symbol.
export const currencySymbol = currency => {
  return !currency
    ? ""
    : currency.charAt(currency.length - 1) === "d"
    ? "$"
    : currency.charAt(currency.length - 1) === "y"
    ? "¥"
    : currency === "gbp"
    ? "£"
    : currency === "eur"
    ? "€"
    : currency === "krw"
    ? "₩"
    : currency === "nok"
    ? "Kr"
    : currency === "chf"
    ? "Fr."
    : "";
};

// Formats a number to a more readable format for currency.
// 50123456 -> "50,123,456" ....... 101.9 -> "101.90"
export const formatPriceNumber = number => {
  let result =
    number > 1000
      ? number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") // commas
      : number.toString(); // no commas
  return (
    // if there is a decimal point and it is in the 2nd last slot, append a "0"
    result.lastIndexOf(".") !== -1 &&
      result.lastIndexOf(".") === result.length - 2
      ? (result += "0")
      : result
  );
};

export const capitalizeFirstLetter = string =>
  string.charAt(0).toUpperCase() + string.slice(1);
