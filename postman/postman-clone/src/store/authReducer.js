const initState = {
  authError: null
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case 'LOGIN_ERROR':
      console.log('login error');
      return {
        ...state,
        authError: 'Login failed'
      };
    case 'LOGIN_SUCCESS':
      console.log('these are login states', state);

      console.log('login success');
      console.log('these are login states', ...state);
      return {
        ...state,
        authError: null
      };
    case 'SIGNOUT_SUCCESS':
      console.log('signout success');
      return state;
    case 'SIGNUP_SUCCESS':
      console.log('SignUp Success');
      return {
        ...state,
        authError: null
      };
    case 'SIGNUP_ERROR':
      console.log('Sign Up Error');
      return {
        ...state,
        authError: action.err.message
      };
      case  'GOOGLELOGIN_SUCCESS':
        return{
          ...state,
          authError:null
        }
      case 'GOOGLESIGNiN':
        return{
          ...state,
          authError:null
        }
      case 'GOOGLESIGNiN_ERROR':
        return{
          ...state,
          authError:action.err.message
        }

    default:
      return state;
  }
};

export default authReducer;
