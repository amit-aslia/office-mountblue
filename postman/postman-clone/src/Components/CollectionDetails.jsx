import React, { Component } from "react";
import ReactModal from "react-modal";
import SendRequest from "../SendRequest";
import CollectionUrls from './CollectionUrls';

ReactModal.setAppElement("#root");
const modalStyle = {
  overlay: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.75)"
  },
  content: {
    position: "relative",
    width: "600px",
    height: "600px",
    padding: "0",
    background: "#f0eee9"
  }
};
class CollectionDetails extends Component {
  state = {
    showHttpRequest: false,
    openModal: false
  };
  onClick = () => {
    this.setState({
      showHttpRequest: !this.state.showHttpRequest
    });
  };
  deleteCollection = () => {
    this.props.deletingCollection(this.props.collection.collectionId);
  };
  runCollection = () => {
    this.setState({ showModal: true });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    return (
      <div
        key={this.props.collection.collectionId}
        style={{ position: "relative" }}
      >
        <div className="collectionName">
          <p onClick={this.onClick}><i className="fa fa-folder" aria-hidden="true" />{this.props.collection.collectionName}</p>
          <div style={{ fontSize: "0.7rem" }}>
            {this.props.collection.RequestUrl.length} requests
          </div>
          <div className="runAndDeleteContainer">
            <button className="runButton" onClick={this.runCollection}>
              <i className="fa fa-play" aria-hidden="true" />
            </button>
            <button className="deleteButton" onClick={this.deleteCollection}>
              <i className="fa fa-trash" aria-hidden="true" />
            </button>
          </div>
        </div>
        {this.state.showHttpRequest ? (
          <div className="collectionRequests">
            {this.props.collection.RequestUrl.length === 0 ? (
              <div>
                The collection is empty. Add new request to this collection
              </div>
            ) : (
              <CollectionUrls urlArray={this.props.collection.RequestUrl} collectionId={this.props.collection.collectionId}/>
              // this.props.collection.RequestUrl.map((url, index) =>
              //   this.renderUrl(url, index)
              // )
            )}
          </div>
        ) : null}

        <ReactModal isOpen={this.state.showModal} style={modalStyle}>
          <div className='runCollectionHeader'>
            <header style={{paddingLeft: '15px'}}>{this.props.collection.collectionName}</header><button
            onClick={this.handleCloseModal}
            className="runCollectionCloseButton"
          >
            X
          </button>
          </div>
          <div style={{height: '90%'}}>
            <SendRequest httpData={this.props.collection.RequestUrl} />
          </div>
        </ReactModal>
      </div>
    );
  }
}

export default CollectionDetails;
