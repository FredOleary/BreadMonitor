import { UPDATE_BATCH } from "../constants/actionTypes";

const initialState = {
    batches: []
  };
  function rootReducer(state = initialState, action) {
      let newState;
      switch (action.type){
          case UPDATE_BATCH:
              newState = {batches:action.batches};
              return newState;
        default:
            break;
      }
    return state;
  };
  export default rootReducer;