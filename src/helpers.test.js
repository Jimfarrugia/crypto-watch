import { currencySymbol, formatPriceNumber } from "./helpers";

describe("currencySymbol helper returns the correct symbol", () => {
  test("USD & AUD are assigned the dollar symbol", () => {
    expect(currencySymbol("aud")).toBe("$");
    expect(currencySymbol("usd")).toBe("$");
  });
  test("JPY & CNY is assigned the yen symbol", () => {
    expect(currencySymbol("jpy")).toBe("¥");
    expect(currencySymbol("cny")).toBe("¥");
  });
  test("EUR is assigned the euro symbol", () => {
    expect(currencySymbol("eur")).toBe("€");
  });
  test("GBP is assigned the pound sterling symbol", () => {
    expect(currencySymbol("gbp")).toBe("£");
  });
  test("KRW is assigned the Korean won symbol", () => {
    expect(currencySymbol("krw")).toBe("₩");
  });
  test("NOK is assigned the krone symbol", () => {
    expect(currencySymbol("nok")).toBe("Kr");
  });
  test("CHF is assigned the franc symbol", () => {
    expect(currencySymbol("chf")).toBe("Fr.");
  });
  test("Returns a blank string when currency is unknown", () => {
    expect(currencySymbol("xyz")).toBe("");
  });
  test("Returns a blank string when no argument is provided", () => {
    expect(currencySymbol("")).toBe("");
  });
});

describe("formatPriceNumber returns an appropriately formatted string", () => {
  // 50123456 -> 50,123,456 ....... 101.9 -> 101.90
  test("Commas are added to large numbers", () => {
    expect(formatPriceNumber(50123456)).toBe("50,123,456");
    expect(formatPriceNumber(1250123456)).toBe("1,250,123,456");
    expect(formatPriceNumber(1250)).toBe("1,250");
  });
  test("Show either zero or at least two decimal places", () => {
    expect(formatPriceNumber(101.9)).toBe("101.90");
    expect(formatPriceNumber(1.000009)).toBe("1.000009");
    expect(formatPriceNumber(69.0)).toBe("69");
  });
});
