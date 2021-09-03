const PriceChart = ({ coinData, error }) => {
  return (
    <section className="chart">
      {error || (coinData && coinData.name) || ""}
      {coinData && coinData.name && " data found!"}
    </section>
  );
};

export default PriceChart;
