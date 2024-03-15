const mongoose = require('mongoose');

const foodItemSchema = new mongoose.Schema({
  CategoryName:String, 
  name: String,
  description: String,
  price: Number,
});

const FoodItemModel = mongoose.model('food_items', foodItemSchema);

module.exports = FoodItemModel;
