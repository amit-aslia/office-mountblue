const initState = {}
const httpHistoryReducer = (state = initState, action) => {
    switch (action.type) {

        case 'RENDER_HISTORY_DATA':
            console.log('this is added data', action.payload)
            return action.payload
        default:
            return state;
    }
};

export default httpHistoryReducer;
