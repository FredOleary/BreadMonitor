var BatchDictionary = {};
var batchData ={};

batchData.addBatch = ( batch) =>{
    let batchInfo = {name:batch.name, alertTimes: [batch.createdAt]};
    BatchDictionary[batch.id] = batchInfo;
};

batchData.update = (batchId) => {
    if( BatchDictionary.hasOwnProperty( batchId ) ){
        let batchInfo = BatchDictionary[batchId];
        let nowDateTime = new Date();
        let diffTime = (nowDateTime.getTime() - batchInfo.alertTimes[batchInfo.alertTimes.length-1])/1000;
        if( diffTime > 60){     // Every minute
            batchInfo.alertTimes.push(nowDateTime );
            console.log( "----- Minute tick....");
        }

    }
}
module.exports = batchData;