const mongoose= require('mongoose');

const ArtikalShema=mongoose.Schema({
    nazivArtikla:{
        type:String,
        require:true
    },
    sifraArtikla:{
        type:String,
        require:true
    },
    cenaArtikla:{
        type:Number,
        require:true
    },
    kategorija:{
        type:String,
        require:true
    },
    vrstaProizvoda:{
        type:String,
        require:true
    },
    srcSlika:{
        type:String,
        require:true
    },
    jacina:{
        type:String,
        default:'no'
    },
    tipGrla:{
        type:String,
        default:'no'
    },
    izborSvetla:{
        type:String,
        default:'no'
    },
    bojaSvetla:{
        type:String,
        default:'no'
    },
    napon:{
        type:String,
        default:'no'
    },
    boja:{
        type:String,
        default:'no'
    },
    materijal:{
        type:String,
        default:'no'
    },
    dimenzije:{
        type:String,
        default:'no'
    },
    stepenZastite:{
        type:String,
        default:'no'
    },
    akcija:{
        type:Boolean,
        default:false
    }, 
    popust:{
        type:Number,
        default:0
    }


});

const Artikal = module.exports=mongoose.model('Item',ArtikalShema);

module.exports.getArtikalById=function(id, callback){
    
    Artikal.findById(id, callback);
}

module.exports.addArtikal=function(artikal,callback){
    artikal.save(callback);
}
module.exports.getAkcijaArtikal=function(akcija,callback){
    query={'akcija':true}
    Artikal.find(query,callback)
}
module.exports.getAllArtikle=function(query,callback){
    Artikal.find(query).populate().exec(callback);
}
module.exports.searchArt=function(query,callback){
    
    Artikal.find({"nazivArtikla":{'$regex':query,'$options':'i'}},callback);

}
module.exports.updateArtikla=function(id,artikal,callback){
    
    var query={_id:id};
   // var art=JSON.parse(artikal);
    console.log(query,artikal);
    Artikal.findByIdAndUpdate(query,{$set: artikal},callback);
}

module.exports.deleteArtikal=function(id,callback){
    var query={_id:id};
    Artikal.findByIdAndRemove(query,callback);
    
}




