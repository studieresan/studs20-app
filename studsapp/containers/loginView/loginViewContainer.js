import { connect } from 'react-redux';
import LoginView from './loginView'
import { attemptLogin } from 'studsapp/store/global/login/actions';

const mapStateToProps = (state) => {
    return {
        login: state.global.login
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        attemptLogin: (email, password) => dispatch(attemptLogin(email, password))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginView);