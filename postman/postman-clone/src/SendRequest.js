import React, { Component } from 'react';


class SendRequest extends Component {
    state = {
        testResult: []
    }
    userRequests = () => {
        return this.props.httpData.map((request, index) => (<div key={index} style={{paddingLeft: '10px', borderBottom: 'solid 1px'}}>
            <div
                style={{ color: "green", textDecoration: "none", fontWeight: "bold" }}
            >
                {request.method}
            </div>
            <div>
                <div style={{ maxWidth: "80%" }}> {request.url}</div>
            </div>
            <br />
            {this.state.testResult.length !== 0 ?
                (this.state.testResult[index] ? (<>Test-Result: <span style={{color: 'Green', fontWeight: 'bold'}}>Passed</span></>) : (request.test === '') ? 'No Test Cases ' : (<>Test-Result: <span style={{color: 'Red', fontWeight: 'bold'}}>Failed</span></>)) : null}
        </div>))
    }
    runCollection = async () => {
        for (let i = 0; i < this.props.httpData.length; i++) {
            await runFetch(this.props.httpData[i])
                .then(res => this.setState({ testResult: [...this.state.testResult, res] }));
        }
    }
    render() {
        return (<div className='sendRequestForCollection'>
            <div className='runCollectionUrls'>{this.userRequests()}</div>
            <button onClick={this.runCollection} className='runCollectionButton'>Run Collection</button>
        </div>)
    }
}

async function runFetch(request) {
    let result;
    if (request.method === 'GET') {
        await fetch(request.url,
            { header: request.headers })
            .then(res => (res.json()))
            .then(res => {
                result = (compareTestWithResponse(res, request.test));
            })
            .catch(err => console.log(err))
    }
    else {
        await fetch(request.url, {
            headers: request.headers,
            method: request.method,
            body: request.body
        })
            .then(res => res.json())
            .then(res => {
                result = (compareTestWithResponse(res, request.test));
            })
            .catch(err => console.log(err))
    }
    return result;
}

function compareTestWithResponse(result, test) {

    let testCheck = JSON.parse(test);
    let jsonKeyInTest = Object.keys(testCheck);
    let jsonKeyInResult = Object.keys(result);

    if (jsonKeyInResult.length !== jsonKeyInTest.length) {
        return false
    }
    else {
        for (let i = 0; i < jsonKeyInResult.length; i++) {
            if (!jsonKeyInTest.includes(jsonKeyInResult[i])) {
                return false;
            }
            if (testCheck[jsonKeyInResult[i]] !== result[jsonKeyInResult[i]]) {
                return false;
            }
        }
        return true;
    }
}


export default SendRequest;