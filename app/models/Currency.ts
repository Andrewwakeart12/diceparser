import { Schema, model } from 'mongoose';

interface ICurrency {
    chat_id: string;
    name: string;
    symbol?: string;
  }

const currencySchema = new Schema<ICurrency>({
    chat_id: {type: String,required:true},
    name: {type:String,required:true},
    symbol: Array,
});

const Currency = model<ICurrency>('Currency', currencySchema);

export default Currency;