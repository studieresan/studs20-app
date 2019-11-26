import { connect } from 'react-redux';
import EventView from './eventView';
import { getEventDetails } from 'studsapp/store/eventList/actions';

const mapStateToProps = (state) => {
    return {
        events: state.events
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getEventDetails: (eventId) => dispatch(getEventDetails(eventId))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(EventView);