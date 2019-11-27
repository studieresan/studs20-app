import { connect } from 'react-redux';
import CheckInView from './checkInView';
import { getEventDetails } from 'studsapp/store/eventList/actions';

const mapStateToProps = (state) => {
    return {
        events: state.events,
        members: state.members,
        login: state.global.login
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getCheckInDetails: (eventId) => dispatch(getCheckInDetails(eventId))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckInView);