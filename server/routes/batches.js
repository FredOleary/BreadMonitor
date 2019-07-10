var express = require('express');
const db = require('../models/index');
const Batch = db.sequelize.models.Batch;
var router = express.Router();


router.get('/', function(req, res, next) {
  return Batch.findAll({
    raw: true
  }).then(function(result){
    res.send(result);
  }).catch( err =>{
    next(err);
  })
});

router.post('/', function(req, res, next) {
  let endDate = new Date( req.body.endDate);
  return Batch.create({
    name:req.body.name,
    endDate:endDate
   }).then( newBatch => {
    console.log( newBatch.name);
    res.send(newBatch);
  }).catch( err =>{
    next(err);
  })
});

module.exports = router;
