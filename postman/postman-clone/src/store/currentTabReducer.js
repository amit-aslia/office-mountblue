const initState = {};
const addCurrentTabId = (state = initState, action) => {
  switch (action.type) {
    case 'CURRENTTAB':
      return action.currentTabId;

    default:
      return state;
  }
};

export default addCurrentTabId;
