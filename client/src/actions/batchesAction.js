import { UPDATE_BATCH } from "../constants/actionTypes";
import { axiosService } from '../services/axiosService';
import { id } from "postcss-selector-parser";

function updateBatches(batches) {
    return { type: UPDATE_BATCH, batches }
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
export const batchesActions = {
    updateBatches,
    fetchBatches
}