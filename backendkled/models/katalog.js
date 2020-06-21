const mongoose=require('mongoose');

const KatalogShema=new mongoose.Schema({
    srcSlika:{
        type:String,
        require:true
    }
    ,
    nazivKataloga:{
        type:String,
        require:true
    },
    link:{
        type:String,
        require:true
    }
});

const Katalog=module.exports=mongoose.model('katalog',KatalogShema);

module.exports.addKatalog=function(katalog,callback){
    katalog.save(callback);
}
module.exports.deleteKatalog=function(id,callback){
    Katalog.findByIdAndRemove({_id:id},callback);
}

module.exports.getKataloge=function(query,callback){
    Katalog.find(query).populate().exec(callback)
}