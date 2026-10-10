import mongoose from "mongoose"

import dns from "dns";
// Custom DNS fallback for local ISP SRV resolution issues
dns.setServers(["8.8.8.8", "1.1.1.1"]);

export const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MONGO DB CONNECTED SUCCESSFULLY");
    }
    catch(error){
        console.error("Error connecting to DB",error);
        process.exit(1);
    }
}
