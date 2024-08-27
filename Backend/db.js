const mongoose = require('mongoose');
const colors = require('colors');


// const mongoURI = process.env.MONGOURI || "mongodb+srv://my-notebook:suraj@mynotebook.hkkkssm.mongodb.net/?retryWrites=true&w=majority&appName=MyNotebook";

// connectToMongo().catch(err => console.log(err));

// async function connectToMongo() {
//     await mongoose.connect(mongoURI);
//     console.log("Connected to Mongo Successfully")
// }

const connectToMongo = async () => {
    console.log(process.env.MONGO_URI)
  try {
      const conn = await mongoose.connect(process.env.MONGO_URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
      });
      console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
      console.log(`Error:${error.message}`.red.bold);
      process.exit();
  }
};


module.exports= connectToMongo;