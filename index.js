const TelegramBot = require('node-telegram-bot-api');
const token = '5283041337:AAHrdImV57t298ZoZuEZii1jWGcqMIFPzKM';
const { Telegraf } = require('telegraf');

const API_TOKEN = process.env.API_TOKEN || token;
const PORT = process.env.PORT || 3000;
const URL = process.env.URL || 'https://diceappparser.herokuapp.com/';
const bot = new Telegraf(API_TOKEN);


const selector = "%";
function roll_dice(dice_arr){
	var final_result_array= {
		dice_ordered_by_type : [],
		dice_for_final_sum : [],
	};
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
						dice_inner_arr.dice[0] = Math.abs(parseInt(dice_inner_arr.dice[0]));
						dice_inner_arr.dice[1] = Math.abs(parseInt(dice_inner_arr.dice[1]));

						do{
						if(dice_inner_arr.dice[0] <= 100 && dice_inner_arr.dice[1] <= 100)
						{
							var dice_max = dice_inner_arr.dice[1] + 1;
							var random_num = Math.floor((Math.random() * (dice_max-1)) +1)
							var obj_to_dice ={};
							obj_to_dice[`d${dice_max-1}`] = random_num;
							final_result_array.dice_ordered_by_type.push( obj_to_dice);
							final_result_array.dice_for_final_sum.push(random_num);
							i++;
						}else
						{
							limit_exceded=true;
							break;
						}
						}while(i < dice_inner_arr.dice[0])
					}else{
						bad_dice_format = true;
					}
				}else{
					if(dice_inner_arr.dice.length <= 2)
					{	dice_inner_arr.dice[0] = 1;
						dice_inner_arr.dice[0] = Math.abs(parseInt(dice_inner_arr.dice[0]));
						dice_inner_arr.dice[1] = Math.abs(parseInt(dice_inner_arr.dice[1]));
						if(dice_inner_arr.dice[0] <= 100 && dice_inner_arr.dice[1] <= 100)
						{
						var dice_max = dice_inner_arr.dice[1] + 1;
						console.log("dice_inner_arr.dice[0]");
						console.log(dice_inner_arr.dice[0]);
						var random_num = Math.floor((Math.random() * (dice_max-1)) +1)
						var obj_to_dice ={};
						obj_to_dice[`d${dice_max-1}`] = random_num;
						final_result_array.dice_ordered_by_type.push( obj_to_dice);
						final_result_array.dice_for_final_sum.push(random_num);

						}else{
							limit_exceded=true;
						}
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
function give_answer_string(roll_dice_result){
	var total_str = "Resultado final:";
	var total_num = 0;
	var sub_str = "";
	if(roll_dice_result.hasOwnProperty('error')){
		return roll_dice_result.msg;
	}else if(roll_dice_result.hasOwnProperty('dice_ordered_by_type') && roll_dice_result.hasOwnProperty('dice_for_final_sum')){
		if(Array.isArray(roll_dice_result.dice_ordered_by_type) && Array.isArray(roll_dice_result.dice_for_final_sum)){
			roll_dice_result.dice_for_final_sum.forEach(e =>{
				total_num += e;
			})
			total_str += total_num;

			let dice_ordered_by_type = roll_dice_result.dice_ordered_by_type.sort();
			console.log(Object.keys(dice_ordered_by_type));
			dice_ordered_by_type.forEach(dice_obj => {
				Object.keys(dice_obj).forEach(key => {
					sub_str += ` ${key} : (${dice_obj[key]})`;
				})
			})
		}
	}
	return `${total_str}\nTotal por dados: ${sub_str}
	`;
}
bot.hears(/^\%/, (ctx,extra) => {
	 console.log(ctx);
	 let chatId = ctx.chat.id;

	 dice_arr = process_message_to_dice_arr(ctx.message.text);
	 dice_arr = roll_dice(dice_arr)
	 dice_arr = give_answer_string(dice_arr)
	 //send gif:
	 //ctx.replyWithDocument('https://educacion30.b-cdn.net/wp-content/uploads/2019/06/homer.gif');
     ctx.reply(
     	`${dice_arr}`,
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
bot.telegram.setWebhook(`${URL}/bot${API_TOKEN}`);
bot.startWebhook(`/bot${API_TOKEN}`, null, PORT)
bot.launch();