import DiceRoller from "../helpers/DiceRoller";
import {dice_roller_array} from "../helpers/CustomTypes";

class Dice{
     msg: string;
     selector : string = "%";
     dice_arr?: [dice_roller_array] ;
     check_sum : number = 0;
    constructor(msg : string){
        this.dice_arr = [{dice:[]}];
        this.msg = msg;
    }

    process_message_to_dice_arr() : any{
        this.msg = this.msg.replace(this.selector,'')
        if(this.msg.includes("+")){
            var arr = this.msg.split('+');
            var bucle_start : boolean = true;
            arr.forEach((e : string) => {
                if(bucle_start === true){
                    this.dice_arr![0]={dice:e.split('d')};
                    bucle_start = false;
                }else{
                    if(e.includes('d')){
                        this.dice_arr!.push({dice:e.split('d')})
                    }else{
                        if(Number(e) != NaN){
                            this.check_sum += Number(e);
                        }
                        console.log(this.check_sum)
                    }
                }
            });
        }else if(this.msg.includes('d')){
            this.dice_arr = [{dice:this.msg.split('d')}];
        }else{
            return null;
        }

    }
    execute_roll() : string{
        this.process_message_to_dice_arr() ;
        let roller = new DiceRoller(this.dice_arr);
        roller.optional_sum_param = this.check_sum;
        roller.roll_dice();
        
        return roller.give_answer_string();
    }
}

export default Dice;