import mongoose from "mongoose";

const connectDB = async () => {

    mongoose.Connection.on('connected' , () => console.log("Database is connected..."))

    await mongoose.connect(`${process.env.MONGDB_URI}/HealSpace`)
}

export default connectDB;