//test key : 5503208387:AAGqH8-2nsDD7KkdrUcZIN02BcVf1V87mqE
//original key : 5283041337:AAHrdImV57t298ZoZuEZii1jWGcqMIFPzKM
import dotenv from "dotenv"

dotenv.config();
declare var process : {
    env: {
      TELEGRA_BOT_ENV: string
      PORT: any
    }
  }
import { Telegraf } from 'telegraf';
import Dice from './main_classes/Dice';
const API_TOKEN = process.env.TELEGRA_BOT_ENV || "5503208387:AAGqH8-2nsDD7KkdrUcZIN02BcVf1V87mqE";
//const PORT = process.env.PORT || 3000;
const bot = new Telegraf(API_TOKEN);
import express from 'express';
import CheckCommand from './helpers/CheckCommand';
const expressApp = express();

const port = process.env.PORT || 3000
expressApp.get('/', (_req: any, res: { send: (arg0: string) => void; }) => {
  res.send('Hello World!')
})
expressApp.listen(port, () => {
  console.log(`Listening on port ${port}`)
})



bot.hears(/^\%/, (ctx) => {
    var dice = new Dice(ctx.message.text);
    //send gif:
    //ctx.replyWithDocument('https://educacion30.b-cdn.net/wp-content/uploads/2019/06/homer.gif');
    ctx.reply(
        `${dice.execute_roll()}`,
        {reply_to_message_id:ctx.message.message_id}
        )     
       .then((result) => { setTimeout(() => {
            console.log("result")
            console.log(result)
            ctx.telegram.deleteMessage(result.chat.id, ctx.message.message_id).catch(()=>{
            	ctx.reply('El bot no puede eliminar mensajes de otros usuarios');
            })
            ctx.telegram.deleteMessage(result.chat.id, result.message_id).catch(()=>{
            	ctx.reply('El bot no puede eliminar mensajes de otros usuarios');
            })
       }, 300000)})
       .catch(err => console.log(err));
});
bot.hears(/^\!/,async (ctx)=>{
  if(ctx.chat.type === 'group'){
    var RC = new CheckCommand(ctx.message.text);
    RC.setChatId(String(ctx.chat.id));
    var result = await RC.process_str();
    if(!result.error)
    {
    ctx.reply(String(result.result));
    }else{
    ctx.reply(String(result.msg));
    }
  }
})
bot.launch();
