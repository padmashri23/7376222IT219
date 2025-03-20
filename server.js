
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 9876;

app.use(cors());
app.use(express.json());
app.get("/numbers/:type", (req, res) => {
  const { type } = req.params;
  let numbers = [];

  switch (type) {
    case "p": 
      numbers = [2, 3, 5, 7, 11];
      break;
    case "f": 
      numbers = [55,89,144,233,377,610,987,1597,4181,6765];
      break;
    case "e":
      numbers = [2, 4, 6, 8, 10];
      break;
    case "r": 
      numbers = Array.from({ length: 5 }, () => Math.floor(Math.random() * 100));
      break;
    default:
      return res.status(400).json({ error: "Invalid number type" });
  }

  const avg = numbers.reduce((sum, num) => sum + num, 0) / numbers.length;
  res.json({ windowCurrState: numbers, avg });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
