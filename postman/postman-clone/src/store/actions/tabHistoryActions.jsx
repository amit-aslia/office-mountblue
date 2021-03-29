export const addTabHistory = (tabData) =>
{
    // console.log('this i stabsHIstory',tabData)
    return { 
        type:'ADDTABHISTORY',
        payload:tabData
    }
}

export const addCurrentTabId = (currentTab) =>
{
    // console.log('current tab is',currentTab)
    return { 
        type:'CURRENTTAB',
        currentTabId:currentTab
    }
}