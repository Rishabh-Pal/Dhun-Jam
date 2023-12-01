import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import ChargeCustomers from "./ChargeCustomers";
import BarGraph from "./BarChart";

const Dashboard = () => {
  const [chargeCustomers, setChargeCustomers] = useState(false);
  const [customAmount, setCustomAmount] = useState();
  const [regularAmounts, setRegularAmounts] = useState([]);
  const [allAmounts, setAllAmounts] = useState([]);
  const [rerenderSignal, setRerenderSignal] = useState(false);
  const [isSaveEnabled, setIsSaveEnabled] = useState(false);

  const navigate = useNavigate();

  const areRegularAmountsValid = (amounts = regularAmounts) => {
    const minValues = [79, 59, 39, 19];
    return amounts.every((amount, index) => amount > minValues[index]);
  };

  useEffect(() => {
    setIsSaveEnabled(
      customAmount > 99 && areRegularAmountsValid(regularAmounts)
    );
  }, [areRegularAmountsValid, customAmount, regularAmounts]);

  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      navigate("/login");
    }
  }, [navigate]);

  const handleSave = async () => {
    try {
      const response = await fetch("https://stg.dhunjam.in/account/admin/4", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
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
        console.log("Settings saved:", {
          chargeCustomers,
          customAmount,
          regularAmounts,
        });
        setRerenderSignal((prev) => !prev);
      } else {
        console.error("Failed to save settings:", response.statusText);
      }
    } catch (error) {
      console.error("Error saving settings:", error);
    }
  };

  useEffect(() => {
    const fetchChargeCustomers = async () => {
      try {
        const response = await fetch("https://stg.dhunjam.in/account/admin/4");
        const data = await response.json();
        console.log("Category data:", data);

        setChargeCustomers(data.data.charge_customers);
        setCustomAmount(data.data.amount.category_6);
        setRegularAmounts([
          data.data.amount.category_7,
          data.data.amount.category_8,
          data.data.amount.category_9,
          data.data.amount.category_10,
        ]);
        setAllAmounts([
          data.data.amount.category_6,
          data.data.amount.category_7,
          data.data.amount.category_8,
          data.data.amount.category_9,
          data.data.amount.category_10,
        ]);

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
  }, [rerenderSignal]);

  const handleRegularAmountChange = (index, value) => {
    const newRegularAmounts = [...regularAmounts];
    newRegularAmounts[index] = parseInt(value, 10) || 0;
    setRegularAmounts(newRegularAmounts);
    setIsSaveEnabled(
      customAmount > 99 && areRegularAmountsValid(newRegularAmounts)
    );
  };
  const handleCustomAmountChange = (value) => {
    const amount = parseInt(value, 10) || 0;
    setCustomAmount(amount);
    setIsSaveEnabled(amount > 99 && areRegularAmountsValid());
  };

  return (
    <div>
      <h1 className="venue-name">Social, Hebbal on Dhun Jam</h1>
      <div className="settings-container">
        <ChargeCustomers
          chargeCustomers={chargeCustomers}
          setChargeCustomers={setChargeCustomers}
        />
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
            <BarGraph allAmounts={allAmounts} />
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
