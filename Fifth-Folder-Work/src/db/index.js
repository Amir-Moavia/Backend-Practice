import mongoose from "mongoose";
import { DB_NAME } from "../constrants.js";

const connectDB = async () => {
    try {

        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);

        console.log({
            host: connectionInstance.connection.host,
            port: connectionInstance.connection.port,
            name: connectionInstance.connection.name,       // Database name
            readyState: connectionInstance.connection.readyState // 1 = connected
        });
        
    } catch (error) {
        console.log("Mongoo DB error ", error);
        process.exit(1)
    }   
}


export default connectDB;