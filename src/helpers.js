import imageToBase64 from "image-to-base64/browser";

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

// Capitalize the first letter of a string.
export const capitalizeFirstLetter = string =>
  string.charAt(0).toUpperCase() + string.slice(1);

// Look for a file format in a url string and
// return the appropriate data url prefix for the format.
export const getDataUrlPrefix = url => {
  const format = url.match(/.png/gm)
    ? "png"
    : url.match(/.jpeg/gm)
    ? "jpeg"
    : url.match(/.jpg/gm)
    ? "jpg"
    : url.match(/.webp/gm)
    ? "webp"
    : url.match(/.gif/gm)
    ? "gif"
    : url.match(/.svg/gm)
    ? "svg+xml"
    : url.match(/.bmp/gm)
    ? "bmp"
    : "jpg";
  return `data:image/${format};base64,`;
};

// Convert an image url into a data url and save it to localStorage.
// CoinGecko API normally returns a CORS error when doing this,
// so if/when the fetch fails, try again using a CORS proxy server.
// TODO - replace 'cors-anywhere.herokuapp.com' with our own CORS proxy server.
export const saveImageToLocalStorage = (key, url) => {
  imageToBase64(url)
    .then(base64 => {
      const prefix = getDataUrlPrefix(url);
      const dataUrl = prefix + base64;
      return localStorage.setItem(key, dataUrl);
    })
    .catch(error => {
      imageToBase64(`https://cors-anywhere.herokuapp.com/${url}`)
        .then(base64 => {
          const prefix = getDataUrlPrefix(url);
          const dataUrl = prefix + base64;
          return localStorage.setItem(key, dataUrl);
        })
        .catch(error => {
          console.error(error);
          console.log("Fetch still failed with CORS proxy.");
        });
    });
};
