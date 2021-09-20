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
