export const httpHistory = (newHttpData, auth) => {
    console.log('this is history',newHttpData);
    console.log('thi si auth',auth)
    console.log('this is auth in action', auth)
    return (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore();
        firestore.collection('history').add({

            ...newHttpData,
            userId: auth.uid,
            createdAt: new Date()
        }).then(() => {
            dispatch({ type: 'STORE_HTTPDATA', newHttpData })
        }).catch(err => {
            dispatch({ type: 'STORE_HTTPDATA_ERROR', err })
        })
    }
}

export const deleteHTTPHistory = (history) => {
    console.log('this is action of history', history)
    return (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore()

        firestore.collection('history').doc(history.id).delete()
            .then((response) => {
                dispatch({ type: 'DELETE_HISTORY' })
            }).catch(function (err) {
                dispatch({ type: 'DELETE_HISTORY_ERROR', err })
            });
    }
}

export const toRenderHistory = (renderData) => {
    console.log('ths is redmerig data', renderData)
    return {
        type: 'RENDER_HISTORY_DATA',
        payload: renderData
    }
}


