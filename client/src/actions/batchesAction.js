import { UPDATE_BATCH, UPDATE_READINGS } from "../constants/actionTypes";
import { axiosService } from '../services/axiosService';
import { id } from "postcss-selector-parser";

function updateBatches(batches) {
    return { type: UPDATE_BATCH, batches }
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
                        return entry.createdAt;
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
        // let dataset = {
        // data: [5,5,7,9,6], //readings.co2;
        // backgroundColor:'rgb(53, 91, 183)',
        // fill:false,
		// pointRadius:2,
        // borderColor:'rgb(53, 91, 183)',
        // label: "CO2"};
        // chartData.datasets.push( dataset);

        let dataset = {};
        dataset.data = readings.co2;
        dataset.backgroundColor='rgb(53, 91, 183)';
        dataset.fill=false;
		dataset.pointRadius=2;
        dataset.borderColor='rgb(53, 91, 183)';
        dataset.label = "CO2";
        chartData.datasets.push( dataset);
    }

	return chartData;
};

const Dummydata = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'My First dataset',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [65, 59, 80, 81, 56, 55, 40]
      }
    ]
  };
export const batchesActions = {
    updateBatches,
    fetchBatches,
    fetchReadingsForBatch
}