import { connect } from 'react-redux';
import MemberListView from './memberListView';
import { getMembers } from 'studsapp/store/memberList/actions';

const mapStateToProps = (state) => {
    return {
        members: state.members
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getMembers: () => dispatch(getMembers())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MemberListView);