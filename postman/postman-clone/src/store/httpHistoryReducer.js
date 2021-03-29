const initState = {}
const httpHistoryReducer = (state = initState, action) => {
    switch (action.type) {
        case 'STORE_HTTPDATA':
            console.log('created project', action.newHttpData);
            return state;
        case 'STORE_HTTPDATA_ERROR':
            console.log('create project err', action.err);
            return state;
        case 'DELETE_HISTORY':
            console.log('deleted', action.history)
            return state
        case 'DELETE_HISTORY_ERROR':
            console.log('Error is ', action.err)
            return state
        case 'RENDER_HISTORY_DATA':
            console.log('this is added data', action.payload)
            return state
        default:
            return state;
    }
};

export default httpHistoryReducer;

