import ChatIdentity from "../models/ChatIdentity";
import DBManager from "./DBManager";

class CheckCommand{
    private initialization_str : string;
    private chat_id? : string;
    private processed_array? : any[];
    final_str : string = '';
    processed_str? : string ;
    constructor(initialization_str:string, chat_id? : string, processed_array? : any []){
        this.initialization_str = initialization_str;
        this.chat_id = chat_id;
        this.processed_array = processed_array;
         
    }
    async process_str() {
                let regExp : RegExp = /rr/;
                
                if(regExp.test(this.initialization_str)){
                    
                this.initialization_str = this.initialization_str.replace(/!rr/,'')
                var str_array : any[] = this.initialization_str.split(' ');
                var i = 0;
                do{
                    if(str_array[i] === ''){
                        str_array[i] = null;
                    }
                    i++;
                }while(i < str_array.length)
                str_array = str_array.filter(Boolean);
                this.processed_array =  str_array;

            }else{
                this.processed_array = [];
            }
            return await this.registerGame();
    }
    get_register_name(){
        let i = 0;
        let first_bucle : boolean = true;
        console.log("this.processed_array")
        console.log(this.processed_array)
        while(i <= this.processed_array!.length -1 && this.processed_array!.length != 0){
            if(first_bucle){
                this.final_str = String(this.processed_array![i]);
                first_bucle = false;
            }else{
                this.final_str += " " + String(this.processed_array![i]);
            }
            i++;
        };
        console.log(this.final_str)
    }
    async registerGame(){
        this.get_register_name();
        if(typeof(this.chat_id) != "undefined" && this.processed_array!.length != 0){
            var db : any = new DBManager();
            db = db.connection;
            var CI =await ChatIdentity.findOne({chat_id:this.chat_id}).exec();
            console.log(CI);
            
            return {result:this.final_str};
        }else{
            return {error:true, msg : 'Error al intentar ejecutar comando : falta de identificador de chat'}
        }
    }
    setChatId(chat_id : string){
        this.chat_id = chat_id;
    }
}
export default CheckCommand;