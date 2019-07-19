import { UPDATE_BATCH, UPDATE_READINGS, UPDATE_SELECTED_BATCH } from "../constants/actionTypes";
import { axiosService } from '../services/axiosService';
//import { id } from "postcss-selector-parser";

function updateBatches(batches) {
    return { type: UPDATE_BATCH, batches }
};

function updateSelectedBatch(selectedBatch) {
    return { type: UPDATE_SELECTED_BATCH, selectedBatch }
};

function updateReadings(readings) {
    let chartData = createChartData( readings);
    return { type: UPDATE_READINGS, chartData }
};

function fetchBatches() {
	return dispatch => {
		axiosService('/batches')
			.then(response => {
				if(response.status === 200){
                    let batches = response.data.map( entry =>{
                        let batchDate = new Date(entry.createdAt);
                        let label = entry.name + ' ' + batchDate.toLocaleString();
                        return ({entry:entry, value:entry.id, label:label, endDate:new Date(entry.endDate)});
                    });
					dispatch(updateBatches(batches));
				}else{
					dispatch(updateBatches([]));

				}
			})
			.catch( error =>{
				// This means the service isn't running.
				dispatch(updateBatches([]))
			});
	};
}

function fetchReadingsForBatch( batchId) {
    let params = {batch_id:batchId};
	return dispatch => {
		axiosService.get('/readings', {params})
			.then(response => {
				if(response.status === 200){
                    let readings = {co2:[],dateTime:[]};
                    let co2 = response.data.map( entry =>{
                         return entry.co2;
                    });
                    let createdAt = response.data.map( entry =>{
                        return (new Date(entry.createdAt)).toLocaleString();
                    });
                    readings.co2 = co2;
                    readings.createdAt = createdAt;
					dispatch(updateReadings(readings));
				}else{
					dispatch(updateReadings([]));

				}
			})
			.catch( error =>{
				// This means the service isn't running.
				dispatch(updateReadings([]))
			});
	};
}

const createChartData = readings => {

	console.log("createChartData");
	let chartData = {
        x_axis:[],
        datasets: []
    };
    if( readings.length == 0 ){
        return chartData;
    }
    if( readings.co2.length > 0 ){
        chartData.labels = readings.createdAt;
        let dataset = {};
        dataset.data = readings.co2;
        dataset.backgroundColor='rgb(53, 91, 183)';
        dataset.fill=false;
		dataset.pointRadius=0;
        dataset.borderColor='rgb(53, 91, 183)';
        dataset.label = "CO2";
        dataset.yAxisID = 'A';
        chartData.datasets.push( dataset);
        let deltaDataset = {};
        deltaDataset.data = readings.co2.map( (current, index, array) =>{
            if( index > 0 ){
                return Math.abs(array[index] - array[index-1]);
            }else{
                return 0;
            }
         });
        deltaDataset.backgroundColor='rgb(183, 53, 91)';
        deltaDataset.fill=false;
		deltaDataset.pointRadius=0;
        deltaDataset.borderColor='rgb(183, 53, 91)';
        deltaDataset.label = "Delta CO2";
        deltaDataset.yAxisID = 'B';
        chartData.datasets.push( deltaDataset);
       
    }

	return chartData;
};


export const batchesActions = {
    updateBatches,
    fetchBatches,
    fetchReadingsForBatch,
    updateSelectedBatch
}