import {dice_roller_array,final_roller_array} from "./CustomTypes";
class DiceRoller{
    dice_arr? : [dice_roller_array];
    final_result_array!: final_roller_array ;
    optional_sum_param : number = 0;
    constructor(dice_arr? : [dice_roller_array]){
        this.dice_arr = dice_arr;
    }
    roll_dice() : any{
        var limit_exceded : boolean  = false;
        var bad_dice_format : boolean = false;
        let final_result_array_temp: final_roller_array = {dice_ordered_by_type:[],dice_for_final_sum:[]};
        if(Array.isArray(this.dice_arr)){
            if(this.dice_arr.length <= 8) { 
                this.dice_arr.forEach((dice_inner_arr : dice_roller_array) =>{
                if(!Array.isArray(dice_inner_arr))
                {
                    if(dice_inner_arr.dice[0] != '')
                    {
                        if(dice_inner_arr.dice.length <= 2)
                        {						
                            var i = 0;
                            var temp_numb_1 : number = Math.abs(parseInt(dice_inner_arr.dice[0]));
                            var temp_numb_2 : number = Math.abs(parseInt(dice_inner_arr.dice[1]));
                            if(temp_numb_1 == NaN && temp_numb_2 === NaN)
                            {
                                bad_dice_format = true;
                            }
                            do{
                            if(temp_numb_1 <= 100 && temp_numb_2 <= 100)
                            {
                                var dice_max : number = temp_numb_2 + 1;
                                var random_num : number = Math.floor((Math.random() * (dice_max-1)) +1)
                                var obj_to_dice: {[key: string]: number}={};
                                
                                obj_to_dice[`d${dice_max-1}`] = random_num;
                                final_result_array_temp.dice_ordered_by_type?.push( obj_to_dice);
                                final_result_array_temp.dice_for_final_sum?.push(random_num);
                                i++;
                            }else
                            {
                                limit_exceded=true;
                                break;
                            }
                            }while(i < temp_numb_1)
                        }else{
                            bad_dice_format = true;
                        }
                    }else{
                        if(dice_inner_arr.dice.length <= 2)
                        {	temp_numb_1 = 1;
                            temp_numb_2 = Math.abs(parseInt(dice_inner_arr.dice[1]));
                            if(temp_numb_1 <= 100 && temp_numb_2 <= 100)
                            {
                            var dice_max : number = temp_numb_2 + 1;
                            var random_num = Math.floor((Math.random() * (dice_max-1)) +1)
                            var obj_to_dice: {[key: string]: number}={};
                            obj_to_dice[`d${dice_max-1}`] = random_num;

                            final_result_array_temp.dice_ordered_by_type?.push( obj_to_dice);
                            final_result_array_temp.dice_for_final_sum?.push(random_num);
                            

                            }else{
                                limit_exceded=true;
                            }
                        }else{
                            bad_dice_format = true;
                        }
                    }
    
                }
                this.final_result_array = final_result_array_temp;
            })
        }else{
            limit_exceded=true;
            }
    
        }else{
            this.final_result_array = {error:true, msg: 'Formato de dado invalido'};
        }

         if(limit_exceded){
            this.final_result_array = {error:true, msg: 'Haz excedido el maximo de dados no seas mamon'};
        }else if(bad_dice_format){
            this.final_result_array =  {error:true, msg: 'La estructura de tu comando es incorrecta'};
        }
    
    }
     give_answer_string() : any{
        var total_str : string = "Resultado final: ";
        var total_num : number= 0;
        var sub_str : string = "";


        if(this.final_result_array?.hasOwnProperty('error')){
            return this.final_result_array?.msg;
        }else if(this.final_result_array?.hasOwnProperty('dice_ordered_by_type') && this.final_result_array?.hasOwnProperty('dice_for_final_sum')){
            if(Array.isArray(this.final_result_array?.dice_ordered_by_type) && Array.isArray(this.final_result_array?.dice_for_final_sum)){
                this.final_result_array?.dice_for_final_sum.forEach(e =>{
                    total_num += e;
                })
                total_str += total_num;
                if(this.optional_sum_param != 0){
                    total_str += ` + ${ this.optional_sum_param } = ${total_num + this.optional_sum_param}`;
                }
                let dice_ordered_by_type = this.final_result_array?.dice_ordered_by_type.sort();
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
}

export default DiceRoller;