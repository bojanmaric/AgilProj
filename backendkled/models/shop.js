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
        ukupna:{
            type:Number,
            require:true
        }

    }]

})



const Shop=module.exports=mongoose.model('shop',ShopShema);

module.exports.addShop=function(shop,callback){
    shop.save(callback)
}













