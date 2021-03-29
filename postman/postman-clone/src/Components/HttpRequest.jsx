import React, { Component } from 'react';
import { connect } from 'react-redux';
import { httpHistory } from '../store/actions/httpHistoryActions';
import HttpRequestHeaders from './HttpRequestHeaders';
import HttpRequestBody from './HttpRequestBody';
import HttpResponse from './HttpResponse';
import { Tabs, Tab, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import ReactModal from 'react-modal';
import firebase from '../config/fbConfig';


ReactModal.setAppElement('#root');
const modalStyle = {
  overlay: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.75)'
  },
  content: {
    position: 'relative',
    width: '400px',
    height: '400px',
    padding: '0',
    background: '#f0eee9'
  }
};
class HttpRequest extends Component {
  state = {
    url: '',
    result: '',
    method: 'GET',
    body: '',
    headerKeys: ['Content-Type'],
    headerValues: ['application/json'],
    headers: {},
    showHeader: true,
    showBody: false,
    openModal: false,
    collectionList: [],
    test: '',
    testOutput: '',
    title: 'Untitled'
  };
  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem(this.props.index, JSON.stringify(nextState));
  }
  componentDidMount() {
    let savedState = localStorage.getItem(this.props.index);
    if (savedState !== null) {
      let savedStateObject = JSON.parse(savedState);
      this.setState({
        url: savedStateObject.url,
        result: savedStateObject.result,
        method: savedStateObject.method,
        body: savedStateObject.body,
        headerKeys: savedStateObject.headerKeys,
        headerValues: savedStateObject.headerValues,
        headers: savedStateObject.headers,
        test: savedStateObject.test,
        testOutput: savedStateObject.testOutput
      });
    }
  }

  componentWillReceiveProps() {
    let history = this.props.historyData;
    if (Object.keys(history).length !== 0) {
      if (this.props.location === 0) {
        this.setState(
          {
            url: history.url,
            method: history.method,
            body: history.body,
            headerKeys: history.headerKeys,
            headerValues: history.headerValues,
            headers: history.headers,
            title: history.title
          },
          () => {
            localStorage.setItem(this.props.index, JSON.stringify(this.state));
          }
        );

      }
    }
  }

  compareTestWithResponse = (result) => {
    if (this.state.test.length === 0) {
      this.setState({ testOutput: 'No test case.' });
      return;
    }

    try {
      let test = JSON.parse(this.state.test);
      if (test.length >= 0) {
        for (
          let eachObjectInTest = 0;
          eachObjectInTest < test.length;
          eachObjectInTest++
        ) {
          let testCase = test[eachObjectInTest];
          let resultCase = result[eachObjectInTest];
          let jsonKeyinTest = Object.keys(testCase);
          let jsonKeyInResult = Object.keys(resultCase);
          if (jsonKeyInResult.length !== jsonKeyinTest.length) {
            this.setState({
              testOutput: 'Failed, length of test case and response not equal'
            });
            break;
          } else {
            for (let i = 0; i < jsonKeyinTest.length; i++) {
              console.log(
                i +
                  '. result key' +
                  jsonKeyInResult[i] +
                  ' , test key' +
                  jsonKeyinTest
              );
              if (!jsonKeyInResult.includes(jsonKeyinTest[i])) {
                this.setState({
                  testOutput:
                    'Failed ' + jsonKeyinTest[i] + ' not present in response'
                });

                break;
              } else if (
                testCase[jsonKeyinTest[i]] !== resultCase[jsonKeyinTest[i]]
              ) {
                this.setState({
                  testOutput:
                    'Failed not equal properties of ' + jsonKeyInResult[i] + ''
                });
                break;
              } else {
                this.setState({ testOutput: 'Passed' });
              }
            }
          }
        }
      } else {
        let jsonKeyinTest = Object.keys(test);
        let jsonKeyInResult = Object.keys(result);
        if (jsonKeyInResult.length !== jsonKeyinTest.length) {
          this.setState({
            testOutput: 'Failed, length of test case and response not equal'
          });
          return;
        } else {
          for (let i = 0; i < jsonKeyinTest.length; i++) {
            if (!jsonKeyInResult.includes(jsonKeyinTest[i])) {
              this.setState({
                testOutput:
                  'Failed ' + jsonKeyinTest[i] + ' not present in response'
              });

              return;
            } else if (
              test[jsonKeyInResult[i]] !== result[jsonKeyInResult[i]]
            ) {
              this.setState({
                testOutput:
                  'Failed not equal properties of ' + jsonKeyInResult[i] + ''
              });
              return;
            } else {
              this.setState({ testOutput: 'Passed' });
            }
          }
        }
      }
    } catch (err) {
      console.log('ERROR ' + err);
      this.setState({ testOutput: 'Badly formatted test case.' });
    }
  };
  handleUrlChange = (event) => {
    this.setState({ url: event.target.value });
  };
  handleFormSubmit = (event) => {
    event.preventDefault();
    if (this.state.url !== '') {
      const headObj = {};
      this.state.headerKeys.map((headerKey, index) => {
        return (headObj[headerKey] = this.state.headerValues[index]);
      });

      this.setState({ headers: headObj }, () => {
        this.props.httpHistory(this.state, this.props.auth);
        console.log(this.state);
        if (this.state.method === 'GET') {
          fetch(this.state.url, {
            headers: this.state.headers
          })
            .then((a) => a.json())
            .then((result) =>
              this.setState({ result: JSON.stringify(result) }, () => {
                this.compareTestWithResponse(result);
              })
            )
            .catch((err) => {});
        } else {
          fetch(this.state.url, {
            headers: this.state.headers,
            method: this.state.method,
            body: this.state.body
          })
            .then((a) => a.json())
            .then((result) => this.setState({ result: JSON.stringify(result) }))
            .catch((err) => {});
        }
      });
    } else {
      this.setState({ result: 'EMPTY URL' });
    }
  };

  handleSelectChange = (event) => {
    this.setState({ method: event.target.value });
  };

  handleHeaderRemove = (index) => {
    let updatedHeaderKeys = this.state.headerKeys;
    let updatedHeaderValues = this.state.headerValues;
    updatedHeaderKeys.splice(index, 1);
    updatedHeaderValues.splice(index, 1);
    this.setState({ headerKeys: updatedHeaderKeys });
    this.setState({ headervalues: updatedHeaderValues });
  };

  handleHeaderKeyChange = (e, index) => {
    let updatedHeaderKeys = this.state.headerKeys;
    updatedHeaderKeys[index] = e.target.value;
    this.setState({ headerKeys: updatedHeaderKeys });
  };

  handleHeaderValueChange = (e, index) => {
    let updatedHeaderValues = this.state.headerValues;
    updatedHeaderValues[index] = e.target.value;
    this.setState({ headerValues: updatedHeaderValues });
  };

  addHeader = () => {
    this.setState({ headerKeys: [...this.state.headerKeys, ''] });
    this.setState({ headerValues: [...this.state.headerValues, ''] });
  };
  onClickHeader = () => {
    this.setState({ showHeader: true, showBody: false });
  };
  onClickBody = () => {
    this.setState({ showHeader: false, showBody: true });
  };
  handleBodyRawInputChange = (e) => {
    this.setState({ body: e.target.value });
  };
  handleTestChange = (e) => {
    this.setState({ test: e.target.value });
  };

  // ------for save Button modal------

  handleOpenModal = () => {
    this.setState({ openModal: !this.state.openModal });
    firebase
      .firestore()
      .collection('UserCollection')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.data().uid === this.props.auth.uid) {
            let list = [];
            let collectionData = {
              collectionId: doc.id,
              collectionName: doc.data().collectionName
            };
            list.push(collectionData);
            this.setState({ collectionList: list });
          }
        });
      });
  };
  showCollection = () => {
    return this.state.collectionList.map((collection) => (
      <option key={collection.collectionId} value={collection.collectionId}>
        {collection.collectionName}
      </option>
    ));
  };
  saveCollection = () => {
    if (this.refs.selectedCollection.value !== '') {
      console.log(this.refs.selectedCollection.value);
      let requestObject = {
        url: this.state.url,
        method: this.state.method,
        body: this.state.body,
        headerKeys: this.state.headerKeys,
        headerValues: this.state.headerValues,
        headers: this.state.headers,
        test: this.state.test
      };
      firebase
        .firestore()
        .collection('UserCollection')
        .doc(`${this.refs.selectedCollection.value}`)
        .update({
          RequestUrl: firebase.firestore.FieldValue.arrayUnion(requestObject)
        })
        .then(() => {
          console.log('Data Written Successfully');
        })
        .catch((err) => {
          console.log('Error Occurred', err);
        });
      this.setState({ openModal: !this.state.openModal });
    }
  };
  handleCloseModal = () => {
    this.setState({ openModal: !this.state.openModal });
  };
  // ------for save Button Modal------
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleTitle = () => {
    this.setState({ title: '' });
  };
  render() {
    return (
      <div className="urlArea">
        <div>
          <input
            className="handleTitle"
            type="text"
            name="title"
            value={this.state.title}
            onClick={this.handleTitle}
            onChange={this.handleChange}
          />
        </div>
        <div className="form-section">
          <form onSubmit={this.handleFormSubmit}>
            <select onChange={this.handleSelectChange}>
              {this.state.method === 'GET' ? (
                <option value="GET" selected>
                  GET
                </option>
              ) : (
                <option value="GET">GET</option>
              )}
              {this.state.method === 'POST' ? (
                <option value="POST" selected>
                  POST
                </option>
              ) : (
                <option value="POST">POST</option>
              )}
              {this.state.method === 'PUT' ? (
                <option value="PUT" selected>
                  PUT
                </option>
              ) : (
                <option value="PUT">PUT</option>
              )}
              {this.state.method === 'DELETE' ? (
                <option value="DELETE" selected>
                  DELETE
                </option>
              ) : (
                <option value="DELETE">DELETE</option>
              )}
            </select>
            <input
              type="url"
              placeholder="Enter Request URL"
              value={this.state.url}
              onChange={this.handleUrlChange}
              className="inputUrl"
            />
            <input type="submit" value="Send" className="sendButton" />
          </form>
          <button onClick={this.handleOpenModal} className="saveButton">
            Save
          </button>
        </div>
        {/* to handle save collection button event */}

        <ReactModal isOpen={this.state.openModal} style={modalStyle}>
          <div className="saveCollectionHeader">
            <header>Save To Collection</header>
          </div>
          <div className="collectionText">
            Select a Collection to save Http Request to
          </div>
          <select id="collection" ref="selectedCollection">
            <option value="" disabled selected>
              Select your option
            </option>
            {this.showCollection()}
          </select>
          <div className="saveCollectionButtonContainer">
            <button onClick={this.saveCollection}>Save to Collection</button>
            <button onClick={this.handleCloseModal} className="cancelButton">
              Cancel
            </button>
          </div>
        </ReactModal>

        {/* To handle save collection button event */}

        <Tabs>
          <TabList>
            <Tab>Header</Tab>
            <Tab>Body</Tab>

            <Tab>Test</Tab>
            <Tab>Test Result</Tab>
          </TabList>
          <TabPanel>
            <HttpRequestHeaders
              addHeader={(e) => {
                this.addHeader(e);
              }}
              handleHeaderRemove={(index) => {
                this.handleHeaderRemove(index);
              }}
              handleHeaderValueChange={(e, index) => {
                this.handleHeaderValueChange(e, index);
              }}
              handleHeaderKeyChange={(e, index) => {
                this.handleHeaderKeyChange(e, index);
              }}
              headerValues={this.state.headerValues}
              headerKeys={this.state.headerKeys}
              showHeader={this.state.showHeader}
            />
          </TabPanel>
          <TabPanel>
            <HttpRequestBody
              body={this.state.body}
              showBody={this.state.showBody}
              handleBodyRawInputChange={(e) => {
                this.handleBodyRawInputChange(e);
              }}
            />
          </TabPanel>
          <TabPanel>
            <textarea
              className="test-tab"
              placeholder={'Test'}
              value={this.state.test}
              onChange={(e) => {
                this.handleTestChange(e);
              }}
            />
          </TabPanel>
          <TabPanel>
            <textarea
              className="test-tab"
              placeholder={'Test'}
              value={this.state.testOutput}
            />
          </TabPanel>
        </Tabs>
        <div className="response-label">Response</div>
        <HttpResponse result={this.state.result} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    historyData: state.historyData,
    tabHistory: state.tabHistory,
    previousTab: state.currentTabId
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    httpHistory: (newHttpData, auth) => dispatch(httpHistory(newHttpData, auth))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HttpRequest);
