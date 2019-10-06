import { connect } from 'react-redux';
import EventView from './eventView'

const mapStateToProps = (state) => {
    return {
        events: state.events
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(EventView);