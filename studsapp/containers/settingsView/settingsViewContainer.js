import {connect} from 'react-redux';
import SettingsView from './settingsView';
import {setInitialLoginState} from 'studsapp/store/global/login/actions';
import {setOfflineMode} from 'studsapp/store/global/settings/actions';

const mapStateToProps = state => {
    return {
        offlineMode: state.global.settings.offlineMode,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        removeLoginDetails: () => dispatch(setInitialLoginState()),
        setOfflineMode: offlineMode => dispatch(setOfflineMode(offlineMode)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsView);
