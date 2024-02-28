const mongoose = require('mongoose');

const foodItemSchema = new mongoose.Schema({
  CategoryName:String, 
  name: String,
  description: String,
  options: {
    full: String,
    half: String
  }
});

const FoodItemModel = mongoose.model('food_items', foodItemSchema);

module.exports = FoodItemModel;
