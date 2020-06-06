var express = require('express');
var router = express.Router();
const mutler=require('multer');
const Gallery=require('../models/gallery');
const fs=require('fs');
const path=require('path');
const crypto=require('crypto');


var storage=mutler.diskStorage({
  destination:function(req,file,cb){
    cb(null,'./uploads/gallery')
  },
  filename:function(req,file,cb){
    crypto.pseudoRandomBytes(16,function(err,raw){
      var ext=file.originalname.split('.').pop();

      cb(null, raw.toString('hex')+Date.now()+'.'+ext)
    })
  }
});
var upload=mutler({
  storage:storage
})

router.post('/add', upload.single('file'),function(req,res,next){
    console.log(req.body.filename)

 let slika= new Gallery({
    srcSlika:req.file.filename
  });

  console.log(slika)
  //slika.srcSlika=req.file.filename;

  Gallery.addGalery(slika,(err)=>{
    if(err){
      res.json({success:false,msg:'Greska prilikom dodavanja slike'})
    }else{
      res.json({success:true,msg:'Uspesno dodata slika u galeriju'})
    }
  })


})

router.get('/',function(req,res,next){

    Gallery.getSlike((err,slike)=>{
        if(err){
            res.json({success:false,msg:'Failed to get data'})
        }else{
            res.json({slika:slike})
        }
    })
})
router.get('/image/:image',(req,res)=>{

    if(!fs.existsSync(path.join(__dirname, '../uploads/gallery/',req.params.image)))
        res.send("no")
    else res.status(200).sendFile(path.resolve(path.join(__dirname,'../uploads/gallery/',req.params.image)));

});


module.exports = router;