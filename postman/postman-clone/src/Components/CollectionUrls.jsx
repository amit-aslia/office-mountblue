import React, { Component } from "react";
import firebase from "../config/fbConfig";

class CollectionUrls extends Component {
  state = {
    requestUrl: this.props.urlArray
  };

  deleteRequest = (url, collectionId, index) => {
    // console.log(collectionId);
    firebase
      .firestore()
      .collection("UserCollection")
      .doc(collectionId)
      .update({
        RequestUrl: firebase.firestore.FieldValue.arrayRemove(url)
      })
      .then(() => {
        let list = this.state.requestUrl;
        list.splice(index, 1);
        this.setState({ requestUrl: list });
        console.log("Data deleted Successfully");
      })
      .catch(err => {
        console.log("Error Occurred", err);
      });
  };
  render() {
    return this.state.requestUrl.map((url, index) => (
      <div key={index} style={{ position: "relative", marginBottom: "1rem" }}>
        <div
          style={{ color: "green", textDecoration: "none", fontWeight: "bold" }}
        >
          {url.method}
        </div>
        <div>
          <div className="urlStyle"> {url.url}</div>
          <button
            className="deleteRequestButton"
            onClick={e =>
              this.deleteRequest(url, this.props.collectionId, index)
            }
          >
            <i className="fa fa-trash" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    ));
  }
}

export default CollectionUrls;
