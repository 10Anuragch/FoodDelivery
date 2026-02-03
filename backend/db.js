
import mongoose from "mongoose";

const mongoURI = 'mongodb+srv://anurag12:ac2005ch@cluster0.8nbnmiz.mongodb.net/gofoodmern?retryWrites=true&w=majority';

async function connectDB() {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to database");

    const foodCollection = mongoose.connection.db.collection("food_items");
    const categoryCollection = mongoose.connection.db.collection("food_category");

    const foodData = await foodCollection.find({}).toArray();
    const foodCategory = await categoryCollection.find({}).toArray();

    global.foodData = foodData;
    global.foodCategory = foodCategory;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
}

export default connectDB;
