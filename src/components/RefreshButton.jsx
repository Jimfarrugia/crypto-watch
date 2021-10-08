const RefreshButton = () => {
  return (
    <button className="button-link" onClick={() => window.location.reload()}>
      refresh
    </button>
  );
};

export default RefreshButton;
