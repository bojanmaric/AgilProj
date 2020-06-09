const mongoose=require('mongoose');


const ShopShema=new mongoose.Schema({
    
    imeKupca:{
        type:String,
        require:true
    },
    adresaKupca:{
        type:String,
        require:true
    },
    kontaktKupca:{
        type:String,
        require:true
    },
    emailPosiljaoca:{
        type:String,
        default:'no'
    },
    datum:{
        type:Date,
        require:true
        
    },
    artikli:[{
        nazivArtikla:{
            type:String,
            require:true
        },
       
        cenaArtikla:{
            type:Number,
            require:true
        },
        kolicina:{
            type:Number,
            require:true
        },
        ukupno:{
            type:Number,
            require:true
        }
      
    }]

})



const Shop=module.exports=mongoose.model('shop',ShopShema);

module.exports.addShop=function(shop,callback){
    shop.save(callback)
}
module.exports.deleteShop=function(id,callback){
    var query={_id:id};
    Shop.findByIdAndRemove(query, callback);
}
module.exports.getPorudzbenice=function(query,callback){
    Shop.find(query).populate().exec(callback)
}
module.exports.getPorudzbenicuByID=function(id,callback){
    Shop.findById(id,callback);
}












