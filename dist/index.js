"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//test key : 5503208387:AAGqH8-2nsDD7KkdrUcZIN02BcVf1V87mqE
//original key : 5283041337:AAHrdImV57t298ZoZuEZii1jWGcqMIFPzKM
const token = '5283041337:AAHrdImV57t298ZoZuEZii1jWGcqMIFPzKM';
const telegraf_1 = require("telegraf");
const Dice_1 = __importDefault(require("./main_classes/Dice"));
const API_TOKEN = process.env.API_TOKEN || token;
//const PORT = process.env.PORT || 3000;
const bot = new telegraf_1.Telegraf(API_TOKEN);
const express_1 = __importDefault(require("express"));
const CheckCommand_1 = __importDefault(require("./helpers/CheckCommand"));
const expressApp = (0, express_1.default)();
const port = process.env.PORT || 3000;
expressApp.get('/', (_req, res) => {
    res.send('Hello World!');
});
expressApp.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
bot.hears(/^\%/, (ctx) => {
    var dice = new Dice_1.default(ctx.message.text);
    //send gif:
    //ctx.replyWithDocument('https://educacion30.b-cdn.net/wp-content/uploads/2019/06/homer.gif');
    ctx.reply(`${dice.execute_roll()}`, { reply_to_message_id: ctx.message.message_id })
        .then((result) => {
        setTimeout(() => {
            console.log("result");
            console.log(result);
            ctx.telegram.deleteMessage(result.chat.id, ctx.message.message_id).catch(() => {
                ctx.reply('El bot no puede eliminar mensajes de otros usuarios');
            });
            ctx.telegram.deleteMessage(result.chat.id, result.message_id).catch(() => {
                ctx.reply('El bot no puede eliminar mensajes de otros usuarios');
            });
        }, 300000);
    })
        .catch(err => console.log(err));
});
bot.hears(/^\!/, (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    if (ctx.chat.type === 'group') {
        var RC = new CheckCommand_1.default(ctx.message.text);
        RC.setChatId(String(ctx.chat.id));
        var result = yield RC.process_str();
        if (!result.error) {
            ctx.reply(String(result.result));
        }
        else {
            ctx.reply(String(result.msg));
        }
    }
}));
bot.launch();
