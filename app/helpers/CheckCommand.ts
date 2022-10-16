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
                let helpExp : RegExp = /!h/;
                let registerRExp : RegExp = /!rr/;
                let registerCharRExp : RegExp = /!rc/;
                let registerCurrencyRExp : RegExp = /!gcn/;
                let getCampaingNameRExp : RegExp = /!gcn/;
                
            if(registerRExp.test(this.initialization_str)){
                    
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

            }else if(getCampaingNameRExp.test(this.initialization_str)){
                this.initialization_str = this.initialization_str.replace(/!gcn/,'')
                return await this.getCampaingName();
                var i = 0;
            }
            else if(registerCharRExp.test(this.initialization_str)){

            }

            else if(registerCurrencyRExp.test(this.initialization_str)){

            }
            else if(helpExp.test(this.initialization_str)){
                return {result : `Los comandos del bot son los siguientes(lo que esta en parentesis es opcional):\n 1) %{cantidad de dados}{d}{caras del dado}+{numero}{cantidad de dados}{d}{caras del dado}+(bonificador)\n2)!rr {nombre de la campaña} `}                
            }
            else{
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
            if(CI == null ){
                var newCI = new ChatIdentity({
                    chat_id:this.chat_id,
                    campaing_name:this.final_str

                });
                newCI.save();
                return {result:`${this.final_str} ha sido registrado existosamente`}
            }else{
                console.log('CI ITS NOT NULL');
                return {result:`este grupo ya ha sido registrado con el nombre de "${CI.campaing_name}"`}
            }
            
            return {result:this.final_str};
        }else{
            return {error:true, msg : 'Error al intentar ejecutar comando : falta de identificador de chat'}
        }
    }
    setChatId(chat_id : string){
        this.chat_id = chat_id;
    }
    async getCampaingName(){
        var db : any = new DBManager();
        db = db.connection;
        var CI =await ChatIdentity.findOne({chat_id:this.chat_id}).exec();
        if(CI != null){
            return {result:`${CI.campaing_name}`}
        }else{
            return {result: `Esta Campaña aun no tiene nombre`}
        }
    }
}
export default CheckCommand;