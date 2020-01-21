import { connect } from 'react-redux';
import AuthenticationView from './authenticationView'
import { loginSuccess } from 'studsapp/store/global/login/actions';

const mapStateToProps = (state) => {
    return {

    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setLoginDetails: (token, id) => dispatch(loginSuccess({ success: true, token, id }))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticationView);