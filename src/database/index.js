"use server"

import mongoose from "mongoose";


const connectToDB = async () => {
  try {
   
    const connectionURL = "mongodb+srv://isha:isha@cluster0.if36jgo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
    await mongoose.connect(connectionURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connection to MongoDB is successful');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
  }
};


export default connectToDB;
