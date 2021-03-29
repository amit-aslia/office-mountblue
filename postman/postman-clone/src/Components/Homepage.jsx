import React, { Component } from 'react';
import '../App.css';
import logo from '../image/postman-logo.svg';
import spaceship from '../image/api-5000.svg';
import SignIn from '../auth/SignedIn';
import SignUp from '../auth/SignUp';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import GoogleLogin from '../auth/GoogleLogin';

class Homepage extends Component {
  state = {
    signInDisplay: false,
    signUpDisplay: false
  };
  onClickLogin = () => {
    this.setState({
      signInDisplay: !this.state.signInDisplay,
      signUpDisplay: false
    });
  };
  onClickSignUp = () => {
    this.setState({
      signUpDisplay: !this.state.signUpDisplay,
      signInDisplay: false
    });
  };

  render() {
    if (!this.props.auth.isEmpty) {
      return (
        <div>
          Redirecting to DashBoard...
          <Redirect to="/Dashboard"></Redirect>
        </div>
      );
    }
    return (
      <div className="Homepage">
        <div className="headingAndLogo">
          <h1>The Collaboration Platform for API Development</h1>
          <img src={logo} alt="PostMan logo" />
        </div>
        <div className="container">
          <div className="spaceshipImage">
            <img src={spaceship} alt="spaceship" style={{ margin: '2%' }} />{' '}
          </div>
          <div className="loginSignUpForm">
            {' '}
            <button name="Login" onClick={this.onClickLogin}>
              Login
            </button>
            <button name="SignUp" onClick={this.onClickSignUp}>
              Sign Up
            </button>
            {this.state.signInDisplay ? <SignIn /> : null}
            {this.state.signUpDisplay ? <SignUp /> : null}
            <Link to="/">
              <GoogleLogin />
            </Link>
          </div>
        </div>
        <div className="info">
          <div>8 Million + Developer</div>
          <div>400,000 + Companies</div>
          <div>250 million + APIs</div>
        </div>
        <div> </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth
  };
};

export default connect(mapStateToProps)(Homepage);
