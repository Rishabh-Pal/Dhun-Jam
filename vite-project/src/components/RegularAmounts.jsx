import React from "react";

const RegularAmounts = ({customAmount, regularAmounts, setRegularAmounts, setIsSaveEnabled }) => {
    const handleRegularAmountChange = (index, value) => {
        const newRegularAmounts = [...regularAmounts];
        newRegularAmounts[index] = parseInt(value, 10) || 0;
        setRegularAmounts(newRegularAmounts);
        setIsSaveEnabled(
          customAmount > 99 && areRegularAmountsValid(newRegularAmounts)
        );
      };

  return (
    <div className="setting-item">
      <div className="text">
        Regular song request amounts from high to low-
      </div>
      <div className="regular-amounts">
        {/* Your input fields mapping logic */} 
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
  );
};

export default RegularAmounts;
