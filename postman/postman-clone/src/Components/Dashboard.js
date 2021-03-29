import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../store/actions/authAction';
import '../App.css';
import logo from '../image/postman-logo.svg';
import Sidebar from './Sidebar';
import { Redirect } from 'react-router-dom';
// import HttpRequest from './HttpRequest';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import Newtabs from './Newtabs'




class Dashboard extends Component {
  indexofHistory = (index) => {

  }
  render() {
    const { auth, history } = this.props;
    // console.log('thsi is auth', this.props)

    if (!auth.uid) return <Redirect to="/" />;
    if (this.props.auth !== undefined) {
      return (
        <main>
        
          <div className="postmanImage">
            <img id="logo" src={logo} alt="postman-logo" />
            <Link to={'/'}>
              <button onClick={this.props.signOut} className="signoutButton">
                Signout
            </button>
            </Link>
          </div>
          <div className="sidebarAndHttpRequestContainer">
            <section className="sidebar">
              <div style={{ overflowWrap: 'break-word', background: '#fafafa', overflow: 'auto', height: '100%' }}>
                <Sidebar history={(history)} auth={auth} />
              </div>
            </section>
            <section className="httpRequest">
              <div style={{ overflowWrap: 'break-word' }}>
                <Newtabs auth={auth} />
              </div>
            </section>
          </div>
        </main>
      );
    }
    else {
      return (
        <h1>Loading...</h1>
      )
    }

  }


};
// }
const mapStateToProps = (state) => {
  // //console.log('asdf', state.firestore.ordered.history)
  return {
    auth: state.firebase.auth,
    history: state.firestore.ordered.history,


  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([{ collection: 'history', orderBy: ['createdAt', 'desc'] }])
)(Dashboard);
