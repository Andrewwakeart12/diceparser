"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const token = '5283041337:AAHrdImV57t298ZoZuEZii1jWGcqMIFPzKM';
const telegraf_1 = require("telegraf");
const Dice_1 = __importDefault(require("./main_classes/Dice"));
const API_TOKEN = process.env.API_TOKEN || token;
//const PORT = process.env.PORT || 3000;
const bot = new telegraf_1.Telegraf(API_TOKEN);
bot.hears(/^\%/, (ctx) => {
    console.log(ctx.message.text);
    var dice = new Dice_1.default(ctx.message.text);
    //send gif:
    //ctx.replyWithDocument('https://educacion30.b-cdn.net/wp-content/uploads/2019/06/homer.gif');
    ctx.reply(`${dice.execute_roll()}`, { reply_to_message_id: ctx.message.message_id });
    /*       .then((result) => { setTimeout(() => {
                console.log("result")
                console.log(result)
                //ctx.telegram.deleteMessage(result.chat.id, ctx.message.message_id).catch(e=>{
                //	ctx.reply('El bot no puede eliminar mensajes de otros usuarios');
                //})
                //ctx.telegram.deleteMessage(result.chat.id, result.message_id)
           }, 1000)})
           .catch(err => console.log(err));*/
});
bot.launch();
