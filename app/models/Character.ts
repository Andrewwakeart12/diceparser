import { Schema, model } from 'mongoose';

interface ICharacter {
    chat_id: string;
    user_chat_id: string;
    class: string;
    name: string;
    armor_class?: number;
    money?: number;
    items?: [ ];
  }

  const characterSchema = new Schema<ICharacter>({
    chat_id: {type: String,required:true},
    user_chat_id: {type:String,required:true},
    class: {type:String,required:true},
    name: {type:String,required:true},
    armor_class: Number,
    money: Number,
    items: Array,
});

const Character = model<ICharacter>('Character', characterSchema);

export default Character;