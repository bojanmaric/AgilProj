var express = require('express');
var router = express.Router();

/*const mutler=require('multer');
const Gallery=require('../models/gallery');
const fs=require('fs');
const path=require('path');
const crypto=require('crypto')


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

/* GET home page. 

router.post('/gallery',upload.single('file'),function(req,res,next){

  let slika= new Gallery({
    srcSlika:req.file.filename
  });
  //slika.srcSlika=req.file.filename;

  Gallery.addGalery(slika,(err)=>{
    if(error){
      res.json({success:false,msg:'Greska prilikom dodavanja slike'})
    }else{
      res.json({success:true,msg:'Uspesno dodata slika u galeriju'})
    }
  })


})
*/

router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
