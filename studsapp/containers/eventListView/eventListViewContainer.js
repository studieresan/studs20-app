import { connect } from 'react-redux';
import EventListView from './eventListView'
import { getEvents } from 'studsapp/store/eventList/actions';

const mapStateToProps = (state) => {
    return {
        events: state.events
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getEvents: () => dispatch(getEvents())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(EventListView);