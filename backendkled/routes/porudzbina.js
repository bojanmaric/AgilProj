var express = require('express');
var router = express.Router();
const nodemailer = require('nodemailer');
const Shop=require('../models/shop');


router.post('/shop',(req,res)=>{

   // console.log(req.body.imeKupca,req.body.adresaKupca,req.body.kontaktKupca,req.body.emailKupca);
    console.log( req.body);

    artikli=new Shop({
        imeKupca:req.body.imeKupca,
        adresaKupca:req.body.adresaKupca,
        kontaktKupca:req.body.kontaktKupca,
        emailPosiljaoca:req.body.emailKupca,
        artikli:req.body.artikli


    })

    console.log(artikli);

    Shop.addShop(artikli,(error)=>{
        if(error){
            res.json({success:false,msg:"greska prilikom dodavanja"})
        }else{
            const output =
            '<h2> Porudzbina sa sajta </h2>' +
            '<h3>Detalji</h3>' +
            '<ul>  ' +
            '<li>Ime i prezime: ' + req.body.imeKupca + '</li>' +
            '<li>Adresa: ' + req.body.adresaKupca + '</li>' +
            '<li>Kontakt: ' + req.body.kontaktKupca + '</li>' +
            '<li>Email: ' + req.body.emailKupca + '</li>' +
            
            '</ul>  <h3>Porudzbina</h3>'+
          
            
           ' <p>' + JSON.stringify( req.body.artikli )+ '</p>'
        
            ;
        
          let transporter = nodemailer.createTransport({
        
            service: 'gmail',
            auth: {
              user: 'ledmasterweb@gmail.com', // generated ethereal user
              pass: 'Divcibare.014'
            }
          });
        
          let mailOptions = {
            from: '"Poruka LedMasterWeb" <ledmasterweb@gmail.com>', // sender address
            to: 'bojanmaric98@gmail.com', // list of receivers
            subject: 'Porudzbina', // Subject line
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

   //console.log(JSON.parse(req.podaci),JSON.parse( req.artikli))
    



})





















module.exports = router;
