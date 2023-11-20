import { useNavigate } from "react-router-dom";
import "./Home.css";
import { useEffect, useState } from "react";

const Dashboard = () => { 
    const [chargeCustomers, setChargeCustomers] = useState(false);
    const [customAmount, setCustomAmount] = useState(0);
    const [regularAmounts, setRegularAmounts] = useState([0, 0, 0, 0]);
    const [isSaveEnabled, setIsSaveEnabled] = useState(false);
    
    const navigate = useNavigate();
  const handleCustomAmountChange = (value) => {
    const amount = parseInt(value, 10) || 0;
    setCustomAmount(amount);
    setIsSaveEnabled(amount > 99 && areRegularAmountsValid());
  };

  const handleRegularAmountChange = (index, value) => {
    const newRegularAmounts = [...regularAmounts];
    newRegularAmounts[index] = parseInt(value, 10) || 0;
    setRegularAmounts(newRegularAmounts);
    setIsSaveEnabled(
      customAmount > 99 && areRegularAmountsValid(newRegularAmounts)
    );
  };
  const areRegularAmountsValid = (amounts = regularAmounts) => {
    const minValues = [79, 59, 39, 19];
    return amounts.every((amount, index) => amount > minValues[index]);
  };

  useEffect(() => {
    setIsSaveEnabled(
      customAmount > 99 && areRegularAmountsValid(regularAmounts)
    );
  }, [customAmount, regularAmounts]); 

  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchChargeCustomers = async () => {
      try {
        const response = await fetch("https://stg.dhunjam.in/account/admin/4");
        const data = await response.json();
        console.log("this is the category data", data);
        setChargeCustomers(data.data.charge_customers);
        setCustomAmount(data.data.amount.category_6);
        setRegularAmounts([
          data.data.amount.category_7,
          data.data.amount.category_8,
          data.data.amount.category_9,
          data.data.amount.category_10,
        ]);
        // console.log(customAmount);
        setIsSaveEnabled(
          data.data.amount.category_6 > 99 &&
            areRegularAmountsValid([
              data.data.amount.category_7,
              data.data.amount.category_8,
              data.data.amount.category_9,
              data.data.amount.category_10,
            ])
        );
      } catch (error) {
        console.error("Error fetching values:", error);
      }
    };

    fetchChargeCustomers();
  }, []);

  const handleSave = async () => {
    try {
      const response = await fetch("https://stg.dhunjam.in/account/admin/4", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // Add any other headers you need, including the authorization header with the token
        },
        body: JSON.stringify({
          amount: {
            category_6: customAmount,
            category_7: regularAmounts[0],
            category_8: regularAmounts[1],
            category_9: regularAmounts[2],
            category_10: regularAmounts[3],
          },
        }),
      });

      if (response.ok) {
        console.log("Settings saved:", { chargeCustomers, customAmount, regularAmounts }); 
      } else {
        console.error("Failed to save settings:", response.statusText); 
      }
    } catch (error) {
      console.error("Error saving settings:", error);
    }
  };

  return (
    <div>
      <h1 className="venue-name">Social, Hebbal on Dhun Jam</h1>
      <div className="settings-container">
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
        {chargeCustomers && (
          <>
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
            <div className="setting-item">
              <div className="text">
                Regular song request amounts from high to low-
              </div>
              <div className="regular-amounts">
                {regularAmounts.map((value, index) => (
                  <input
                    key={index}
                    type="number"
                    className="custom-number-input"
                    value={value}
                    onChange={(e) =>
                      handleRegularAmountChange(index, e.target.value)
                    }
                  />
                ))}
              </div>
            </div>
            <div className="bar-graph">
              {regularAmounts.map((value, index) => (
                <div
                  key={index}
                  className="bar"
                  style={{
                    height: `${value * 3}px`,
                    border: "1px solid #333",
                    margin: "0 4px",
                  }}
                ></div>
              ))}
            </div>
          </> 
        )}
      </div>
      <button onClick={handleSave} disabled={!isSaveEnabled}>
        Save
      </button>
    </div>
  );
};

export default Dashboard;
