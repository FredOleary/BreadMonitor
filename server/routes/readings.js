var express = require('express');
const db = require('../models/index');
const Reading = db.sequelize.models.Reading;
var router = express.Router();


router.get('/', function(req, res, next) {
  return Reading.findAll({
    raw: true,
    where:{BatchId:req.query.batch_id}
  }).then(function(result){
    res.send(result);
  }).catch( err =>{
    next(err);
  })
});
router.post('/', function(req, res, next) {
  return Reading.create({
    co2:req.body.co2,
    BatchId:req.body.BatchId
  }).then( newReading => {
    console.log( newReading.co2);
    res.send(newReading);
  }).catch( err =>{
    next(err);
  })
});

module.exports = router;
