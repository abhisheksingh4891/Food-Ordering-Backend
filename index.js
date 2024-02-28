const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const FoodItemModel = require('./Model/Food_Items');

const app = express();
app.use(cors());
app.use(express.json());

const MONGODB_URL = "mongodb+srv://2811asingh:abhishek00@cluster0.r253rsy.mongodb.net/gofoodmern?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(MONGODB_URL)
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });

  app.get('/data', async (req, res) => {
    try {
      const allData = await FoodItemModel.find({});
      console.log(allData);
      res.json(allData);
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

const PORT = 5000; 
app.listen(PORT, () => {
  console.log(`App is running on port: ${PORT}`);
});
