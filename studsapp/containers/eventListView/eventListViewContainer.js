import { connect } from 'react-redux';
import EventListView from './eventListView'

const mapStateToProps = (state) => {
    return {
        events: []
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(EventListView);