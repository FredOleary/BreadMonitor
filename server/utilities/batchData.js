const db = require('../models/index');
const Reading = db.sequelize.models.Reading;
var smsMessage = require( '../utilities/twilio')

var BatchDictionary = {};
var batchData ={};

batchData.addBatch = ( batch) =>{
    let batchInfo = {batch:batch, alertTimes: [batch.createdAt], alertMsgSent:false};
    BatchDictionary[batch.id] = batchInfo;
};

batchData.update = (batchId) => {
    if( BatchDictionary.hasOwnProperty( batchId ) ){
        let batchInfo = BatchDictionary[batchId];
        let nowDateTime = new Date();
        let diffTime = (nowDateTime.getTime() - batchInfo.alertTimes[batchInfo.alertTimes.length-1])/1000;
        if( diffTime > 60){     // Every minute
            batchInfo.alertTimes.push(nowDateTime );
            console.log( "----- Minute tick - checking for fermentation complete");
            if( !batchInfo.alertMsgSent ){
                Reading.findAll({
                    raw: true,
                    where:{BatchId:batchInfo.batch.id}
                }).then(function(readings){
                    batchData.checkFermentation( batchInfo, readings);
                }).catch( err =>{
                    console.log(err);
                })
            }
         }

    }
}
// Empirically, fermentation is complete when a series of delta readings of greater than 
// 1000 are detected. (This may result from CO2 bubbles bursting)
// Note that readings from the CO2 sensor are in ppm/100. E.g. a reading from the sensor
// of 61 corresponds to a C02 ppm value of 610
const deltaReadingThreshold = 100;
const noOfDeltas = 2;
const minCO2Level = 1000;
batchData.checkFermentation =(batchInfo, readings) => {

    deltaReadings = readings.map( (current, index, array) =>{
        if( index > 0 ){
            return Math.abs(array[index].co2 - array[index-1].co2);
        }else{
            return 0;
        }
    });
    let idx = 0;
    let count = 0;
    while( idx < deltaReadings.length){
        if( deltaReadings[idx] > deltaReadingThreshold && readings[idx] > minCO2Level){
            count++;
            if( count >= noOfDeltas){
                batchInfo.alertMsgSent = true;
                batchInfo.batch.update(
                    { alertedDate: new Date( readings[idx].createdAt) },
                    { where: { id: batchInfo.batch.id } }
                );
                // Send a message
                let fermentationStartDate = new Date( readings[0].createdAt);
                let fermentationEndDate = new Date( readings[idx].createdAt);

                let fermentationTimeInMinutes = (fermentationEndDate.getTime()- fermentationStartDate.getTime())/(60*1000);
                let message = "Batch:" + batchInfo.batch.name + ". Fermentation complete at " + fermentationEndDate.toLocaleString() + 
                 " ("  + Math.round(fermentationTimeInMinutes) + "mins)";
                console.log( message);
                smsMessage.sendMessage( message );
                break;
            }
        }
        idx++;
    }
    

}
module.exports = batchData;