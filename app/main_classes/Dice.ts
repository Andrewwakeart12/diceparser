import DiceRoller from "../helpers/DiceRoller";
class Dice{
     msg: string;
     selector : string = "%";
     dice_arr: any;
    constructor(msg : string){
        this.msg = msg;
    }

    process_message_to_dice_arr() : any{
        this.msg = this.msg.replace(this.selector,'')
        if(this.msg.includes("+")){
            var arr = this.msg.split('+');
            arr.forEach(e => {
                if(e.includes('d')){
                    this.dice_arr?.push({dice:e.split('d')})
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
        roller.roll_dice();
        return roller.give_answer_string();
    }
}

export default Dice;