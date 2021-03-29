const initState = {};
const tabHistoryReducer = (state = initState, action) => {
  switch (action.type) {
    case 'ADDTABHISTORY':
      // console.log('this is the history of tabs', action.payload);
      return action.payload;

    default:
      return state;
  }
};

export default tabHistoryReducer;
