var express = require('express');
var router = express.Router();
const nodemailer = require('nodemailer');

const AuthController = require('../controllers/AuthController');
const Porudzbina = require('../models/porudzbina')

const authenticate = require('../config/authenticate');
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', AuthController.register);

router.post('/login', AuthController.login);

router.post('/email', (req, res, next) => {


  // let email= JSON.parse( req.body.email)

 // console.log(req.body.imePosiljaoca);

  const porudzbina = {
    imePosiljaoca: req.body.imePosiljaoca,
    kontaktPosiljaoca: req.body.kontaktPosiljaoca,
    emailPosiljaoca: req.body.emailPosiljaoca,
    sadrzaj: req.body.sadrzaj,
    datum:req.body.datum
  }
  
  let por= new Porudzbina(porudzbina);
  console.log(por)

  Porudzbina.addPorudzbina(por, (err, user)=>{
    if(err){
      res.json({success:false, msg:'Failed to add porudzbinu'})
    }
    else{
      const output =
      '<h2> Poruka sa sajta </h2>' +
      '<h3>Detalji</h3>' +
      '<ul>  ' +
      '<li>Ime i prezime: ' + req.body.imePosiljaoca + '</li>' +
  
  
      '<li>Kontakt: ' + req.body.kontaktPosiljaoca + '</li>' +
      '<li>Email: ' + req.body.emailPosiljaoca + '</li>' +
      '</ul>  <h3>Poruka</h3><p>' + req.body.sadrzaj + '</p>'
  
      ;
  
    let transporter = nodemailer.createTransport({
  
      service: 'gmail',
      auth: {
        user: 'email', // generated ethereal user
        pass: 'password'
/* 
        user: 'ledmasterweb@gmail.com', // generated ethereal user
        pass: 'Divcibare.014' */
      }
    });
  
    let mailOptions = {
      from: '"Poruka LedMasterWeb" <ledmasterweb@gmail.com>', // sender address
      to: 'bojanmaric98@gmail.com', // list of receivers
      subject: 'Info Message', // Subject line
      text: 'Hello world?', // plain text body
      html: output // html body
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
  
        res.json({ success: false, msg: 'Greska prilikom slanja' });
      }
      //console.log('Message sent: %s', info.messageId);
      //console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      else{
          res.json({ success: true, msg: 'Poruka posalta' });
      }
  
    });
     
    }

  })
/* 

 
 */

})

router.delete('/deletePoruku/:id',authenticate,(req,res)=>{

  Porudzbina.deletePoruku(req.params.id.toString(),(err)=>{
    if(err){
      res.json({success:false, msg:'Greska prilikom brisanja'})
    }else{
      res.json({success:true,msg:'Uspesno obrisana poruka'})
    }
  })
})
router.get('/poruke',authenticate, (req, res, next) => {

  Porudzbina.getAllPorudzbine(req.query,(err,poruke)=>{
    if(err){
      res.json({success:false,msg:'Greska prilikom slanja zahteva'})
    }else{
      res.json({poruke:poruke})
    }
  })


})

router.get('/poruke/:id',authenticate,(req,res)=>{
  Porudzbina.getPorukuByID(req.params.id,(err,poruka)=>{
    if(err){
      res.json({success:false, msg:'Greska prilikom pretrage poruke'})
    }else{
      res.json({poruka:poruka})
    }
  })
})

module.exports = router;
