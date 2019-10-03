import { connect } from 'react-redux';
import SettingsView from './settingsView'
import { loginInitial } from 'studsapp/store/global/login/actions';

const mapStateToProps = (state) => {
    return {

    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        removeLoginToken: () => dispatch(loginInitial())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsView);