import { connect } from 'react-redux';
import EventListView from './eventListView'
import { getEvents } from 'studsapp/store/global/eventList/actions';

const mapStateToProps = (state) => {
    return {
        events: state.global.events
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getEvents: () => dispatch(getEvents())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(EventListView);