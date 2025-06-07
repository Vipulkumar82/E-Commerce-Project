import mongoose from 'mongoose';

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.DB);
        console.log('Database connected successfully');
    }
    catch(error){
        console.log(error);
    }
};

export default connectDB;
// This code connects to a MongoDB database using Mongoose.