import { connect } from 'react-redux';
import SettingsView from './settingsView'
import { setInitialLoginState } from 'studsapp/store/global/login/actions';

const mapStateToProps = (state) => {
    return {

    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        removeLoginToken: () => dispatch(setInitialLoginState())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsView);