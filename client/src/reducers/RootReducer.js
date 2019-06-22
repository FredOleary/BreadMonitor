import { UPDATE_BATCH, UPDATE_READINGS } from "../constants/actionTypes";

const initialState = {
    batches: [],
    chartData:{datasets: []}
  };
  function rootReducer(state = initialState, action) {
    let newState;
    switch (action.type){
        case UPDATE_BATCH:
            newState = {batches:action.batches, chartData:state.chartData};
            return newState;
        case UPDATE_READINGS:
            newState = {batches:state.batches, chartData:action.chartData};
            return newState;
        default:
            break;
    }
    return state;
  };
  export default rootReducer;