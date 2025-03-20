import React, { useState } from "react";

const API_URL = "http://localhost:9876/numbers/";

const Calculator = () => {
  const [numberType, setNumberType] = useState("");
  const [numbers, setNumbers] = useState([]);
  const [average, setAverage] = useState(null);

  const fetchNumbers = async () => {
    if (!numberType) return alert("Please select a number type!");

    try {
      const response = await fetch(API_URL + numberType, {
        method: "GET", 
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (!response.ok) throw new Error(`API Error: ${response.status}`);

      const data = await response.json();
      setNumbers(data.windowCurrState || []);
      setAverage(data.avg || 0);
    } catch (error) {
      console.error("Error fetching numbers:", error);
      alert("Failed to fetch data. Please check your API.");
    }
  };

  return (
    <div className="calculator">
      <h2>Select Number Type</h2>
      <select onChange={(e) => setNumberType(e.target.value)} value={numberType}>
        <option value="">--Choose--</option>
        <option value="p">Prime</option>
        <option value="f">Fibonacci</option>
        <option value="e">Even</option>
        <option value="r">Random</option>
      </select>

    
      <div>
        <button onClick={fetchNumbers}>Fetch & Calculate</button>
      </div>

      {numbers.length > 0 && (
        <div className="result">
          <h3>Stored Numbers: {numbers.join(", ")}</h3>
          <h3>Average: {average}</h3>
        </div>
      )}
    </div>
  );
};

export default Calculator;
