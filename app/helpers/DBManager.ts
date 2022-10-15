import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config();
declare var process : {
    env: {
        MONGODB_URL: string
    }
  }
  
class DBManager{
    connection : any;
    constructor(){
        this.connection = this.connectToDb();  
        if(this.connection != false){
            console.log('MongoDB connected...')
        }
    }
    async connectToDb(){
        try{
            return await mongoose.connect((process.env.MONGODB_URL as string));
        }catch(e){
            console.error(e);
            return false;
        }
    }
}

export default DBManager;