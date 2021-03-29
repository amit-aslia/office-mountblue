import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import React, { Component } from 'react';
import HttpRequest from './HttpRequest';
import uuid from 'uuid';
import { connect } from 'react-redux';

class Newtabs extends Component {
  state = {
    arr: [
      {
        id: uuid(),
        name: 'GET',
        url: 'untitled',
        auth: this.props.auth.uid
      }
    ]
  };
  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem('tabHistory', JSON.stringify(nextState.arr));
  }

  handleClick = () => {
    const { arr } = this.state;
    const newTabObject = {
      id: uuid(),
      name: `GET`,
      url: 'Untitled',
      auth: this.props.auth.uid
    };
    this.setState({
      arr: [...arr, newTabObject]
    });
  };
  componentDidMount() {
    const tab = JSON.parse(localStorage.getItem('tabHistory'));
    if (tab !== null) this.setState({ arr: tab });
  }

  handleDelete = (toDelete) => {
    const { arr } = this.state;
    const tabDeleteIndex = arr.findIndex((arr) => arr.id === toDelete);
    const updatedTabs = arr.filter((tab, index) => {
      return index !== tabDeleteIndex;
    });
    this.setState({
      arr: updatedTabs
    });
  };
  render() {
    let counter = 0;
    const { arr } = this.state;
    const name = arr.map((data, index) => {
      if (this.props.auth.uid === data.auth) {
        counter = counter + 1;

        return (
          <Tab key={index + 1}>
            <div className="tabListStyle">
              <span>
                {' '}
                {data.name} &nbsp;
                <span style={{ color: 'black' }}> {data.url}</span>
              </span>
              <button
                onClick={() => this.handleDelete(data.id)}
                className="btn tabListButton"
              >
                X
              </button>
            </div>
          </Tab>
        );
      }
    });
    let content = this.state.arr.map((data, index) => {
      // if (this.props.auth.uid === data.auth)
      // {
      return (
        <TabPanel key={index + 1}>
          <HttpRequest
            key={uuid}
            location={index}
            index={data.id}
            auth={this.props.auth}
          />
        </TabPanel>
      );
      // }
    });

    // if(content[0]===undefined)
    // {
    //   content=<div className="styleTabMessage">To use workSpace , open a new tab by clicking on '+' icon</div>
    // }

    const fun = (
      <Tabs default={this.state.arr.length - 1}>
        <TabList>
          {name}
          <button onClick={this.handleClick} className="btn newTabOpenButton">
            +
          </button>
        </TabList>
        {content}
        {counter === 0 ? (
          <div style={{ height: '40vw' }}>
            {' '}
            <div className="emptyTabStyle">Click on new tab '+' button</div>
          </div>
        ) : null}
      </Tabs>
    );

    return <div>{fun}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth
  };
};

export default connect(
  mapStateToProps,
  null
)(Newtabs);
