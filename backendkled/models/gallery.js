const mongoose=require('mongoose');

const GalleryShema=new mongoose.Schema({

    srcSlika:{
        type:String,
        require:true
    }

});


const Gallery=module.exports=mongoose.model('gallerija',GalleryShema);

module.exports.addGalery=function(gallerija,callback){
    gallerija.save(callback);
}
module.exports.deleteSliku=function(id,callback){
    Gallery.findByIdAndRemove({_id:id},callback);
}

module.exports.getSlike=function(query,callback){
    Gallery.find(query).populate().exec(callback);
}
