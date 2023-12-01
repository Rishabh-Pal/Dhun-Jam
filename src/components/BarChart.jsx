
import PropTypes from 'prop-types'
// import "./BarChart.css"
const BarGraph = ({ allAmounts }) => {
  const maxAmount = Math.max(...allAmounts);
  return (
    <>
    <div className="bar-graph">
    <div className='y-axis '>₹</div> 
      {allAmounts.map((value, index) => (
        <div
          key={index}
          className='bar'
          style={{
            height: `${(value/maxAmount) * 100}%`,
            border: "1px solid #333",
            margin: "0 35px",
            borderRadius: "5px"
          }}
        ></div>
      ))}
    </div>
    <div className='x-axis'>
      <span>category_6</span>
      <span>category_7</span>
      <span>category_8</span>
      <span>category_9</span>
      <span>category_10</span>

    </div>
    </>
  );
};

BarGraph.propTypes = {
  allAmounts: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default BarGraph;
