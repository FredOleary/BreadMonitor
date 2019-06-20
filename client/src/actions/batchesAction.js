import { UPDATE_BATCH } from "../constants/actionTypes";


export function updateBatches(batches) {
    return { type: UPDATE_BATCH, batches }
  };
