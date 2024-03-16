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

  
  app.post('/login', (req, res) => {
    const { email, password } = req.body;
    UserModel.findOne({ email: email })
        .then(user => {
            if (user) {
                if (user.password === password) {
                    // Return user data along with success message
                    res.json({
                        message: "Login Successful...",
                        user: {
                            _id: user._id,
                            first: user.first,
                            last: user.last,
                            email: user.email,
                            // Add other user data fields as needed
                        }
                    });
                } else {
                    res.status(401).json({ error: "Password is incorrect..." }); // Unauthorized
                }
            } else {
                res.status(404).json({ error: "User not found..." }); // Not Found
            }
        })
        .catch(err => {
            console.error("Error occurred during login:", err);
            res.status(500).json({ error: 'Internal Server Error' });
        });
});


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

const PORT = 5000; 
app.listen(PORT, () => {
  console.log(`App is running on port: ${PORT}`);
});
