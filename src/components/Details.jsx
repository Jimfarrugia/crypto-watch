const Details = ({ coinData, coinPriceHistory, error }) => {
  if (error) {
    return <p>{error}</p>;
  }
  return (
    <section className="chart">
      {coinData &&
        Object.keys(coinData).map((key) => <p>{`${key}: ${coinData[key]}`}</p>)}
      {coinPriceHistory &&
        coinPriceHistory.map((day, index) => (
          <p>{`${index}: Mkt Cap = ${day[0]}; Price = ${day[1]}`}</p>
        ))}
    </section>
  );
};

export default Details;
