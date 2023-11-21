 

const ChargeCustomers = ({ chargeCustomers, setChargeCustomers }) => {
  return (
    <div className="setting-item">
      <div className="text">
        Do you want to charge your customers for requesting songs?
      </div>
      <div className="radio-options">
        <input
          type="radio"
          name="requestCharge"
          id="yes"
          checked={chargeCustomers}
          onChange={() => setChargeCustomers(true)}
        />
        <label htmlFor="yes">Yes</label>
        <input
          type="radio"
          name="requestCharge"
          id="no"
          checked={!chargeCustomers}
          onChange={() => setChargeCustomers(false)}
        />
        <label htmlFor="no">No</label>
      </div>
    </div>
  );
};

export default ChargeCustomers;
