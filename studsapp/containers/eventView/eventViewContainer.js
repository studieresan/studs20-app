import { connect } from 'react-redux';
import EventView from './eventView';
import { getEventDetails, getCheckInDetails } from 'studsapp/store/eventList/actions';
import { getMembers } from 'studsapp/store/memberList/actions';

const mapStateToProps = (state) => {
    return {
        events: state.events,
        members: state.members
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getEventDetails: (eventId) => dispatch(getEventDetails(eventId)),
        getCheckInDetails: (eventId) => dispatch(getCheckInDetails(eventId)),
        getMembers: () => dispatch(getMembers())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(EventView);