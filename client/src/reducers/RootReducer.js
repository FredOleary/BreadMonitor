import { UPDATE_BATCH, UPDATE_READINGS, UPDATE_SELECTED_BATCH } from "../constants/actionTypes";

const initialState = {
    batches: [],
    chartData:{datasets: []},
    selectedBatch: {}
  };
  function rootReducer(state = initialState, action) {
    let newState;
    switch (action.type){
        case UPDATE_BATCH:
            newState = {...state}
            newState.batches = action.batches;
            return newState;
        case UPDATE_READINGS:
            newState = {...state}
            newState.chartData = action.chartData;
            return newState;
         case UPDATE_SELECTED_BATCH:
            newState = {...state}
            newState.selectedBatch = action.selectedBatch;
          return newState;
       default:
            break;
    }
    return state;
  };
  export default rootReducer;