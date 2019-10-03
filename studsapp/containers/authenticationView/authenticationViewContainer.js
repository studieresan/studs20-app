import { connect } from 'react-redux';
import AuthenticationView from './authenticationView'
import { loginSuccess } from 'studsapp/store/global/login/actions';

const mapStateToProps = (state) => {
    return {
        
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setLoginToken: (token) => dispatch(loginSuccess({success: true, token}))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticationView);