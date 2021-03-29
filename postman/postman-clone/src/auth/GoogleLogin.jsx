import React, { Component } from 'react';
import firebase from '../config/fbConfig';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { addAuthId } from '../store/actions/authAction';
import { connect } from 'react-redux';
class GoogleLogin extends Component {
  state = {};
  uiConfig = {
    signInFlow: 'popup',
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
    callbacks: {
      signInSuccess: () => false
    }
  };
  componentDidMount = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const name = user.displayName.split(' ');
        console.log(name);
        console.log(user.uid, user.displayName);
        console.log('user logged in');
        this.props.addAuthId(user.uid, name);
      }
    });
  };

  render() {
    return (
      <div>
        {this.state.isSignedIn ? (
          <></>
        ) : (
          <StyledFirebaseAuth
            uiConfig={this.uiConfig}
            firebaseAuth={firebase.auth()}
          />
        )}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addAuthId: (userId, name) => dispatch(addAuthId(userId, name))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(GoogleLogin);
