const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const FoodItemModel = require('./Model/Food_Items');
const UserModel = require('./Model/User');
const MerchantModel = require('./Model/Merchant')

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

  
  app.post('/login', (req, res)=>{
    const {email, password} =  req.body;
    UserModel.findOne({email:email})
    .then(user => {
      if(user){
        if(user.password === password){
          res.json("Login Succesfull...")
        }
        else{
          res.json("Password is incorrect...")
        }
      }
      else{
        res.json("User not found...")
      }
    })
  })

  app.post('/register', cors(), (req, res)=>{
    UserModel.create(req.body)
    .then(user => res.json(user))
    .catch(err=> res.json(err))
  });
  
  app.post('/loginmerchant', (req, res)=>{
    const {email, password} =  req.body;
    MerchantModel.findOne({email:email})
    .then(user => {
      if(user){
        if(user.password === password){
          res.json("Login Succesfull...")
        }
        else{
          res.json("Password is incorrect...")
        }
      }
      else{
        res.json("User not found...")
      }
    })
  })

  app.post('/registermerchant', cors(), (req, res)=>{
    MerchantModel.create(req.body)
    .then(user => res.json(user))
    .catch(err=> res.json(err))
  });

  app.get('/profile', async (req, res) => {
    // Check if user is authenticated (you can implement this logic based on your session handling)
    if (!req.session.userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    try {
      // Retrieve user data based on user ID from the session
      const user = await UserModel.findById(req.session.userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Return user data excluding sensitive information like password
      const userData = {
        first: user.first,
        last: user.last,
        email: user.email,
        // Add more fields as needed
      };
      res.json(userData);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  

const PORT = 5000; 
app.listen(PORT, () => {
  console.log(`App is running on port: ${PORT}`);
});
