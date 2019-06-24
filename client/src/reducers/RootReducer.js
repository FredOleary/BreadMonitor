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
            newState = {batches:action.batches, chartData:state.chartData, selectedBatch:{}};
            return newState;
        case UPDATE_READINGS:
            newState = {batches:state.batches, chartData:action.chartData, selectedBatch:state.selectedBatch};
            return newState;
         case UPDATE_SELECTED_BATCH:
            newState = {batches:state.batches, chartData:state.chartData, selectedBatch:action.selectedBatch};
            return newState;
       default:
            break;
    }
    return state;
  };
  export default rootReducer;