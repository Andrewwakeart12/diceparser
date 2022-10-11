const TelegramBot = require('node-telegram-bot-api');
const token = '5283041337:AAHrdImV57t298ZoZuEZii1jWGcqMIFPzKM';
const { Telegraf } = require('telegraf');
const bot = new Telegraf(token);

const selector = "%";
function roll_dice(dice_arr){
	var final_result_array= [];
	var limit_exceded = false;
	var bad_dice_format = false;
	if(Array.isArray(dice_arr)){
		if(dice_arr.length <= 8) {
		dice_arr.forEach(dice_inner_arr =>{
			console.log('dice_inner_arr')
			if(!Array.isArray(dice_inner_arr))
			{
				if(dice_inner_arr.dice[0] != '')
				{
					if(dice_inner_arr.dice.length <= 2)
					{						
						var i = 0;
						if(parseInt(dice_inner_arr.dice[0]) <= 100)
						{

						do{
							var dice_max = parseInt(dice_inner_arr.dice[1]);
							var random_num = Math.floor((Math.random() * (dice_max-1)) +1)
							final_result_array.push(random_num);
							i++;
						}while(i < dice_inner_arr.dice[0])
						}else
						{
							limit_exceded=true;
						}
					}else{
						bad_dice_format = true;
					}
				}else{
					if(dice_inner_arr.dice.length <= 2)
					{	
					var dice_max = parseInt(dice_inner_arr.dice[1]);
					var random_num = Math.floor((Math.random() * (dice_max-1)) +1)
					final_result_array.push(random_num);
					}else{
						bad_dice_format = true;
					}
				}

			}
			console.log(dice_inner_arr.dice[1])
		})
	}else{
		limit_exceded=true;
		}

	}else{
		return {error:true, msg: 'Formato de dado invalido'};
	}
	if(!limit_exceded && !bad_dice_format){
		return final_result_array;
	}else if(limit_exceded === true){
		return {error:true, msg: 'Haz excedido el maximo de dados no seas mamon'};
	}else if(bad_dice_format === true){
		return {error:true, msg: 'La estructura de tu comando es incorrecta'};
	}

}
//msg its an str in this case
function process_message_to_dice_arr(msg){
		msg = msg.replace(selector,'')
	if(msg.includes("+")){
		var arr = msg.split('+');
		var dices = [];
		arr.forEach(e => {
			if(e.includes('d')){
				 dices.push({dice:e.split('d')})
			}
		});
	}else if(msg.includes('d')){
	var dices = [{dice:msg.split('d')}];
	}else{
		return null
	}
	console.log(dices)
	return dices;
}

bot.hears(/^\%/, (ctx,extra) => {
	 console.log(ctx);
	 let chatId = ctx.chat.id;

	 dice_arr = process_message_to_dice_arr(ctx.message.text);
	 dice_arr = roll_dice(dice_arr)
	 //send gif:
	 //bot.sendDocument(msg.chat.id, 'https://educacion30.b-cdn.net/wp-content/uploads/2019/06/homer.gif');
     ctx.reply(
     	`Este es el arreglo de dados (la base de la que salen los numeros finales)\n ${JSON.stringify(dice_arr)}`,
     	{reply_to_message_id:ctx.message.message_id}
     	)     
        .then((result) => { setTimeout(() => {
     		console.log("result")
     		//ctx.telegram.deleteMessage(result.chat.id, ctx.message.message_id).catch(e=>{
     		//	ctx.reply('El bot no puede eliminar mensajes de otros usuarios');
     		//})
     		//ctx.telegram.deleteMessage(result.chat.id, result.message_id)
        }, 1000)})
        .catch(err => console.log(err));
 });

bot.launch();