var express = require('express');
var router = express.Router();
const Artikal = require('../models/artikal');

const authenticate = require('../config/authenticate');
const path = require('path');
const crypto = require('crypto');
const multer = require('multer');
const fs = require('fs');
const { json } = require('express');


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/artikli')
    },

    filename: function (req, file, cb) {
        crypto.pseudoRandomBytes(16, function (err, raw) {
            var ext = file.originalname.split('.').pop();//.jpg   .

            cb(null, raw.toString('hex') + Date.now() + '.' + ext);
        });
    }
});
var upload = multer({
    storage: storage
})

router.post('/addArtikal', upload.single('file'), authenticate, function (req, res, next) {


    let arti = new Artikal(JSON.parse(req.body.artikal));
    console.log(arti)
    arti.srcSlika = req.file.filename;
    Artikal.addArtikal(arti, (err, user) => {
        if (err) {
            res.json({ success: false, msg: 'failed to add artikal' });
        } else {
            res.json({ success: true, msg: 'Artikal successful added' })
        }
    })

});
router.put('/:id', authenticate, function (req, res) {


    let data = {
        nazivArtikla: req.body.nazivArtikla,
        sifraArtikla: req.body.sifraArtikla, cenaArtikla: req.body.cenaArtikla, kategorija: req.body.kategorija, vrstaProizvoda: req.body.vrstaProizvoda,
        jacina: req.body.jacina, tipGrla: req.body.tipGrla, izborSvetla: req.body.izborSvetla, bojaSvetla: req.body.bojaSvetla, napon: req.body.napon,
        boja: req.body.boja, materijal: req.body.materijal, dimenzije: req.body.dimenzije, stepenZastite: req.body.stepenZastite, akcija: req.body.akcija, poslednji: req.body.poslednji, popust: req.body.popust
    }

    //  console.log(artikal)

    Artikal.updateArtikla(req.params.id.toString(), data, (err, art) => {
        if (err) {
            res.json({ success: false, msg: "Doslo je do greske prilikom update-a" })
        }
        else {
            res.json({ success: true, msg: "Uspesno izmenjen artikal" })
        }
    })



})
router.get('/searchArt/:search', function (req, res) {

    var search = req.params.search.toString();
    Artikal.searchArt(search, (err, art) => {
        if (err)
            res.json({ success: false, msg: 'Failed to seach articles' });
        else
            res.json({ success: true, artikli: art });
    });

});

router.get('/getAll', function (req, res, next) {

    Artikal.getAllArtikle((err, art) => {
        if (err)
            res.json({ success: false, msg: 'Failled to get data' });
        else {
            res.json({ artikli: art })
        }
    })

});
router.get('/akcija', (req, res) => {

    Artikal.getAkcijaArtikal(true, (err, artikli) => {
       
        if (err) {
            res.json({ success: false, msg: 'greska prilikom slanja zahteva' })
        } else {
           
            res.json({ artikli: artikli })
        }
    })


});
router.get('/poslednjiKom', (req, res) => {
    
    Artikal.getPoslednjeArtikle(true,(err, artikli) => {
        if (err) {
            res.json({ success: false, msg: 'greska prilikom pretrage' })
        } else {
            res.json({ artikli: artikli })
        }
    })
})
router.get('/getArt/:id', (req, res) => {

    console.log(req.params.id)
    Artikal.getArtikalById(req.params.id.toString(), (err, artikal) => {
        if (err) {
            res.json({ success: false, msg: 'Greska prilikom pretrage' })
        } else {
            res.json({ artikal: artikal })
        }


    })


});
router.get('/image/:image', (req, res) => {

    if (!fs.existsSync(path.join(__dirname, '../uploads/artikli/', req.params.image)))
        res.send("no")
    else res.status(200).sendFile(path.resolve(path.join(__dirname, '../uploads/artikli/', req.params.image)));

});

router.delete('/:id', authenticate, (req, res) => {



    Artikal.deleteArtikal(req.params.id.toString(), (err, user) => {
        if (err) {

            res.json({ success: false, msg: 'Failled to get data' });
        }
        else {
            res.json({ success: true, msg: 'Uspesno ste izbrisali artikal' });
        }

    });
});
router.get('/kategorijaVrsta', (req, res) => {
    console.log(req.vrstaProizvoda)
    Artikal.getartikleByVrstaAndKategorija(req.body.kategorija, req.body.vrstaProizvoda, (err, artikli) => {
        if (err) {
            res.json({ success: false, error: { err } })
        } else {
            res.json({ success: true, artikli: artikli })
        }
    })
})
router.delete('/brisi/:image', (req, res) => {

    fs.unlinkSync('./uploads/artikli/' + req.params.image)
});

module.exports = router;
