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
                        return ({value:entry.id, label:label});
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
                        return (new Date(entry.createdAt)).toLocaleTimeString();
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
    if( readings.co2.length > 0 ){
        chartData.labels = readings.createdAt;
//        chartData.x_axis = readings.createdAt;
        let dataset = {};
        dataset.data = readings.co2;
        dataset.backgroundColor='rgb(53, 91, 183)';
        dataset.fill=false;
		dataset.pointRadius=0;
        dataset.borderColor='rgb(53, 91, 183)';
        dataset.label = "CO2";
        chartData.datasets.push( dataset);
    }

	return chartData;
};


export const batchesActions = {
    updateBatches,
    fetchBatches,
    fetchReadingsForBatch,
    updateSelectedBatch
}