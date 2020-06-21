var express = require('express');
var router = express.Router();
const mutler=require('multer');
const Katalog=require('../models/katalog');
const fs=require('fs');
const path=require('path');
const crypto=require('crypto');
const authenticate=require('../config/authenticate');


var storage=mutler.diskStorage({
    destination:function(req,file,cb){
      cb(null,'./uploads/katalog')
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
  
  router.post('/add', upload.single('file'),authenticate,function(req,res,next){
      console.log(req.body.filename)
  
   let katalog= new Katalog({
      srcSlika:req.file.filename,
      nazivKataloga:req.body.nazivKataloga,
      link:req.body.link,
    });
  
    console.log(katalog)
  
    Katalog.addKatalog(katalog,(err)=>{
      if(err){
        res.json({success:false,msg:'Greska prilikom dodavanja slike'})
      }else{
        res.json({success:true,msg:'Uspesno dodata slika u galeriju'})
      }
    })
  
  
  })
  
  router.get('/',function(req,res,next){
  
      Katalog.getKataloge((err,katalozi)=>{
          if(err){
              res.json({success:false,msg:'Failed to get data'})
          }else{
              res.json({katalozi:katalozi})
          }
      })
  })
  router.get('/image/:image',(req,res)=>{
  
      if(!fs.existsSync(path.join(__dirname, '../uploads/katalog/',req.params.image)))
          res.send("no")
      else res.status(200).sendFile(path.resolve(path.join(__dirname,'../uploads/katalog/',req.params.image)));
  
  });
  router.delete('/delete/:id',(req,res)=>{
  
    Katalog.deleteKatalog(req.params.id.toString(),(err)=>{
      if(err){
        res.json({success:false,msg:"greska prilikom brisanja"})
      }else{
        res.json({success:true,msg:"uspesno obrisana slika"})
      }
    })
  
  })
  router.delete('/brisi/:image', (req, res) => {
  
    fs.unlinkSync('./uploads/katalog/' + req.params.image)
  });
  
  module.exports = router;