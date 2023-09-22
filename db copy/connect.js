const mongoose = require( "mongoose");
 const dotenv = require('dotenv')
dotenv.config()


const connectDB= async()=>{
    try{
        mongoose.set('strictQuery', false)
        mongoose.connect(process.env.DB_URI,{
        useUnifiedTopology:true,
        useNewUrlParser:true
        //useCreateIndex:true
        })
        console.log("database is connected")

// console.log(`mongoDB connected:${conn.connection.host}`)
    }catch(error){

        console.log(`Error: ${error.message}`)
        process.exit(1)

    }
}

// export default connectDB
module.exports = connectDB;
