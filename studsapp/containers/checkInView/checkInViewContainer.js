import { connect } from 'react-redux';
import CheckInView from './checkInView';
import { getCheckInDetails, checkIn } from 'studsapp/store/eventList/actions';
import { getMembers } from 'studsapp/store/memberList/actions';

const mapStateToProps = (state) => {
    return {
        events: state.events,
        members: state.members,
        login: state.global.login
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getCheckInDetails: (eventId) => dispatch(getCheckInDetails(eventId)),
        checkIn: (eventId) => dispatch(checkIn(eventId)),
        getMembers: () => dispatch(getMembers())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckInView);