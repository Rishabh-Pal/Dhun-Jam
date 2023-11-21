import { useNavigate } from "react-router-dom";
import "./Home.css";
import ChargeCustomers from "./ChargeCustomers";
import CustomAmount from "./CustomAmount";
import RegularAmounts from "./RegularAmounts";
import BarGraph from "./BarChart";
import { useEffect, useState } from "react";

const Dashboard = () => { 
    const [chargeCustomers, setChargeCustomers] = useState(false);
    const [customAmount, setCustomAmount] = useState(0);
    const [regularAmounts, setRegularAmounts] = useState([0, 0, 0, 0]);
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
      <ChargeCustomers
          chargeCustomers={chargeCustomers}
          setChargeCustomers={setChargeCustomers}
        />
        {chargeCustomers && (
          <>
            <CustomAmount
              customAmount={customAmount}
              setCustomAmount={setCustomAmount}
              setIsSaveEnabled={setIsSaveEnabled}
              areRegularAmountsValid={areRegularAmountsValid}
            />
           <RegularAmounts
           customAmount={customAmount}
              regularAmounts={regularAmounts}
              setRegularAmounts={setRegularAmounts}
              setIsSaveEnabled={setIsSaveEnabled}
            />
            <BarGraph regularAmounts={regularAmounts} />
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
