const mongoose=require('mongoose');



const PorudzbinaShema=mongoose.Schema({

    imePosiljaoca:{
        type:String,
        require:true
    },
    kontaktPosiljaoca:{
        type:String,
        default:'no'
    },
    emailPosiljaoca:{
        type:String,
        require:true
    },
    sadrzaj:{
        type:String,
        require:true
    }
    

});

const Porudzbina=module.exports=mongoose.model('orders',PorudzbinaShema);

module.exports.addPorudzbina=function(porudzbina, callback){
   // console.log(porudzbina);
    porudzbina.save(callback);
}
module.exports.getAllPorudzbine=function(query,callback){
    Porudzbina.find(query).populate().exec(callback)
}

