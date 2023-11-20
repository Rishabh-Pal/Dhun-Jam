import { useNavigate } from "react-router-dom";
import "./Home.css";
import { useEffect, useState } from "react";

const Dashboard = () => {
    const [values, setValues] = useState([0, 0, 0, 0]);

  const handleChange = (index, value) => {
    const newValues = [...values];
    newValues[index] = parseInt(value, 10) || 0;
    setValues(newValues);
  };

  useEffect(() => {
    // You can perform additional logic here if needed
    console.log("Values changed:", values);
  }, [values]);
    const navigate = useNavigate();
    useEffect(()=>{
        if (!localStorage.getItem('authToken')) {
            navigate('/login');
          }
    },[navigate])
    const handleSave = () => {
        // Add logic for saving the settings
        console.log('Settings saved:', values);
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
            <input type="radio" name="requestCharge" id="yes" />
            <label htmlFor="yes">Yes</label>
            <input type="radio" name="requestCharge" id="no" />
            <label htmlFor="no">No</label>
          </div>
        </div>
        <div className="setting-item">
          <div className="text">Custom song request amount-</div>
          <div>
            <input type="number" className="custom-number-input" />
          </div>
        </div>
        <div className="setting-item">
          <div className="text">
            Regular song request amounts from high to low-
          </div>
          <div className="regular-amounts">
            {/* <input type="number" className="custom-number-input"/>
            <input type="number" className="custom-number-input"/>
            <input type="number" className="custom-number-input"/>
            <input type="number" className="custom-number-input"/> */}
            {values.map((value, index) => (
              <input
                key={index}
                type="number"
                className="custom-number-input"
                value={value}
                onChange={(e) => handleChange(index, e.target.value)}
              />
            ))}
          </div>
        </div>
          <div className="bar-graph">
            {values.map((value, index) => (
              <div
                key={index}
                className="bar"
                style={{ height: `${value * 3}px` , border: '1px solid #333', margin: '0 4px'}}
              ></div>
            ))}
          </div>
      </div>
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default Dashboard;
