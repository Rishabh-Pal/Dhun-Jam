 

const CustomAmount = ({ customAmount, setCustomAmount, setIsSaveEnabled, areRegularAmountsValid}) => {
    const handleCustomAmountChange = (value) => {
        const amount = parseInt(value, 10) || 0;
        setCustomAmount(amount);
        setIsSaveEnabled(amount > 99 && areRegularAmountsValid());
      };

  return (
    <div className="setting-item">
      <div className="text">Custom song request amount-</div>
      <div>
        <input
          type="number"
          className="custom-number-input"
          value={customAmount}
          onChange={(e) => handleCustomAmountChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default CustomAmount;
