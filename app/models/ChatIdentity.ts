import { Schema, model } from 'mongoose';

  interface IChatIdentity {
    chat_id: string;
    campaing_name: string;
  }

  const chatIdentitySchema = new Schema<IChatIdentity>({
    chat_id: {type: String,required:true},
    campaing_name: {type:String,required:true},

});

const ChatIdentity = model<IChatIdentity>('ChatIdentity', chatIdentitySchema);

export default ChatIdentity;