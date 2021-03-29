import React, { Component } from "react";
import Modal from "react-modal";
import CollectionList from "./CollectionList";
import firebase from "../config/fbConfig";
import { connect } from "react-redux";

Modal.setAppElement("#root");
const modalStyle = {
  overlay: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.75)"
  },
  content: {
    position: "relative",
    width: "400px",
    height: "400px",
    padding: "0",
    background: "#f0eee9"
  }
};

class CollectionTab extends Component {
  state = {
    openModal: false,
    collectionList: [],
    alertMessage: false
  };
  handleOpenModal = () => {
    this.setState({ openModal: true });
  };
  handleCloseModal = () => {
    this.setState({ openModal: false });
  };
  addCollection = () => {
    if (this.refs.collectionInput.value !== "") {
      let newCollection = {
        uid: this.props.auth.uid,
        collectionName: this.refs.collectionInput.value,
        RequestUrl: []
      };
      console.log("before", newCollection);
      this.setState({ alertMessage: false });
      firebase
        .firestore()
        .collection("UserCollection")
        .add(newCollection)
        .then(function(docRef) {
          newCollection["collectionId"] = newCollection["uid"];
          newCollection["collectionId"] = docRef.id;
          delete newCollection["uid"];
          console.log("Document written with ID: ", docRef.id);
        })
        .then(() => {
          this.setState({
            collectionList: [newCollection, ...this.state.collectionList]
          });
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });
      console.log("after", newCollection);

      this.handleCloseModal();
    } else {
      this.setState({ alertMessage: true });
    }
  };
  componentDidMount() {
    this.fetchingCollectionData();
  }

  fetchingCollectionData = () => {
    firebase
      .firestore()
      .collection("UserCollection")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          if (doc.data().uid === this.props.auth.uid) {
            let list = this.state.collectionList.slice();
            let collectionData = {
              collectionId: doc.id,
              collectionName: doc.data().collectionName,
              RequestUrl: doc.data().RequestUrl
            };
            list.push(collectionData);
            this.setState({ collectionList: list });
          }
        });
      });
  };
  deletingCollection = id => {
    firebase
      .firestore()
      .collection("UserCollection")
      .doc(`${id}`)
      .delete()
      .then(function() {
        console.log("Document successfully deleted!");
      })
      .then(() => {
        this.setState({
          collectionList: this.state.collectionList.filter(
            collection => collection.collectionId !== id
          )
        });
      })
      .catch(function(error) {
        console.error("Error removing document: ", error);
      });
  };

  render() {
    return (
      <React.Fragment>
        <button onClick={this.handleOpenModal} className="newCollectionButton">
          + New Collection
        </button>
        <div className="collectionList">
          <CollectionList
            list={this.state.collectionList}
            deletingCollection={this.deletingCollection}
          />
        </div>
        <Modal isOpen={this.state.openModal} style={modalStyle}>
          <div className="modalHeader">
            <div>CREATE A NEW COLLECTION</div>
            <button
              onClick={this.handleCloseModal}
              className="modalCloseButton"
            >
              X
            </button>
          </div>
          <div className="modalBody">
            <label>Name</label>
            <input
              type="text"
              ref="collectionInput"
              placeholder="Collection Name"
            />
            <label>Description</label>
            <textarea></textarea>
            <button onClick={this.addCollection}>Submit</button>
          </div>
          {this.state.alertMessage ? (
            <div>Please include a valid collection name</div>
          ) : null}
        </Modal>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  };
};
export default connect(mapStateToProps)(CollectionTab);
