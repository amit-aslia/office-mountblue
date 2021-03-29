import React, { Component } from 'react';
import '../App.css';
import CollectionTab from './CollectionTab';
import HistorySummary from './historySummary'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";



class Sidebar extends Component {
  state = {
    showHistory: true,
    showCollection: false,
    hello: []
  };

  onClickHistory = () => {
    this.setState({
      showHistory: true,
      showCollection: false
    });
  };
  onClickCollection = () => {
    this.setState({
      showCollection: true,
      showHistory: false
    });
  };

  render() {

    //console.log('sidebar props', this.props.auth)

    return (
      <>
        {/* <div className="historyAndCollection">
          <button onClick={this.onClickHistory}>History</button>
          <button onClick={this.onClickCollection}>Collection</button>
        </div>
        <div>
          {this.state.showHistory ? <div>  {this.props.history &&
            this.props.history.map((historyData, index) => {
              return (
                <HistorySummary index={index} historyData={historyData} auth={this.props.auth} key={index} />
              );
            })}</div> : null}
<<<<<<< HEAD
          {this.state.showCollection ? <div className='collectionTab'><CollectionTab userId={this.props.auth.uid}/></div> : null}
        </div>
||||||| merged common ancestors
          {this.state.showCollection ? <div>{}</div> : null}
        </div>
=======
          {this.state.showCollection ? <div>{}</div> : null}
        </div> */}
        <Tabs>
          <TabList>
            <Tab>History</Tab>
            <Tab>Collection </Tab>

          </TabList>

          <TabPanel>
            <div>  {this.props.history &&
              this.props.history.map((historyData, index) => {
                return (
                  <HistorySummary index={index} historyData={historyData} auth={this.props.auth} key={index} />
                );
              })}</div>
          </TabPanel>
          <TabPanel>
            <div className='collectionTab'><CollectionTab userId={this.props.auth.uid}/></div>
          </TabPanel>
        </Tabs>
      </>


    );
  }
}

export default Sidebar;
