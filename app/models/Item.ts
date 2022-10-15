import { Schema, model } from 'mongoose';

interface IItem {
    character_id: number;
    chat_id: string;
    type: string;
    name: string;
    damage?: string;
    value?: string;
  }

const currencySchema = new Schema<IItem>({
      character_id: {type: Number, required:true},
      chat_id: {type: String,required:true},
      name: {type:String,required:true},
      damage: String,
      value: String
});

const Item = model<IItem>('Currency', currencySchema);

export default Item;