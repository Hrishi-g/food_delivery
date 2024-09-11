const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://foodiee:foodiee123@cluster0.nyv5l.mongodb.net/foodiee?retryWrites=true&w=majority&appName=Cluster0';

const mongoDB = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(mongoURI);
        console.log("Connected successfully");

        // Fetch data from the 'food_items' collection
        const collection = mongoose.connection.db.collection("food_items");
        const data = await collection.find({}).toArray();

        // Fetch data from the 'food_category' collection
        const foodCategory = mongoose.connection.db.collection("food_category");
        const catData = await foodCategory.find({}).toArray();

        // Assign the fetched data to global variables
        global.food_items = data;
        global.food_cat = catData;
    } catch (err) {
        console.error("Error connecting to MongoDB or fetching data:", err);
    }
};

module.exports = mongoDB;
